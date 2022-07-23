import { defineStore } from "pinia";
import { Token, User } from "./models";
import * as storage from "./storage";
import { api } from "boot/axios";

export const useAuthStore = defineStore("auth", {
  state: () => ({
    user: {} as User,
    token: {} as Token,
    authenticated: false,
    blocked: false,
  }),
  getters: {
    getUser: (state) => state.user,
    getUserToken: (state) => state.token,
    isAuthenticated: (state) => state.authenticated,
    isBlocked: (state) => state.blocked,
    isAdmin: (state) => state.user.user_type === "Admin",
  },
  actions: {
    SET_TOKEN(payload: Token) {
      storage.setLocalToken(payload);
      storage.setHeaderToken(payload);
      this.token = payload;
      this.authenticated = true;
      this.blocked = this.isBlocked;
    },
    async DO_LOGIN(payload: Record<string, unknown>) {
      await api.post("/api/v1/jwt/create/", payload).then(async (response) => {
        this.SET_TOKEN(response.data);
        await this.GET_USER(response.data.access);
        storage.setBlocked(false);
      });
    },
    async GET_USER(token: Token) {
      await api
        .get<User>("/api/v1/users/me/", { data: { token: token.access } })
        .then(async (response) => {
          storage.setUser(response.data);
          this.user = response.data;
        });
    },
    async UPDATE_USER(payload: User) {
      await api
        .put(`/api/v1/users/${payload.id}/`, payload)
        .then((response) => {
          storage.setUser(response.data);
          this.user = response.data;
        });
    },
    LOAD_SESSION() {
      return new Promise((resolve, reject) => {
        try {
          this.user = storage.getUser();
          resolve(this.user);
        } catch (error) {
          this.SIGN_OUT();
          reject(error);
        }
      });
    },
    SIGN_OUT() {
      storage.deleteLocalToken();
      storage.deleteHeaderToken();
      storage.deleteUser();
      storage.setBlocked(false);
      this.user = {} as User;
      this.token = {} as Token;
      this.authenticated = false;
      this.blocked = false;
    },
    async CHECK_TOKEN() {
      this.blocked = storage.isBlocked();
      if (this.token.access) return Promise.resolve(this.token);
      const token = storage.getLocalToken();
      if (!token.access) return Promise.reject(new Error("Token inválido!"));
      this.SET_TOKEN(token);
      return this.LOAD_SESSION();
    },
    async VALID_TOKEN(payload: string) {
      if (!payload) return Promise.reject(new Error("Token inválido!"));
      await api
        .post("/api/v1/jwt/verify/", { token: payload })
        .catch(async () => {
          await api.post("/api/v1/jwt/refresh/", { refresh: payload });
        });
    },
    async RESET_PASSWORD(payload: Record<string, unknown>) {
      await api.post("/api/v1/users/reset_password/", payload);
    },
    async RESET_PASSWORD_CONFIRM(payload: Record<string, unknown>) {
      await api.post("/api/v1/users/reset_password_confirm/", payload);
    },
    SET_BLOCK(payload: boolean) {
      this.blocked = payload;
      this.authenticated = !payload;
    },
  },
});
