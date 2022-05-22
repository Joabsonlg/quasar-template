import {defineStore} from 'pinia';
import * as storage from "src/modules/auth/storage";
import {api} from "boot/axios";
import {isBlocked} from "src/modules/auth/storage";

export const authStore = defineStore('auth', {
  state: () => ({
    user: {},
    token: '',
    authenticated: false,
    blocked: false
  }),
  getters: {
    getUser: state => state.user,
    getUserToken: state => state.token,
    isAuthenticated: state => state.authenticated,
    isBlocked: state => state.blocked
  },
  actions: {
    SET_TOKEN(payload) {
      storage.setLocalToken(payload)
      storage.setHeaderToken(payload)
      this.token = payload
      this.authenticated = true
      this.blocked = isBlocked()
    },
    async DO_LOGIN(payload) {
      await api.post('/api/v1/jwt/create/', payload).then(async response => {
        this.SET_TOKEN(response.data)
        await this.GET_USER(response.data.access)
      })
    },
    async GET_USER(token) {
      await api.get('/api/v1/users/me/', {token: token.access}).then(response => {
        storage.setUser(response.data)
        this.user = response.data
      })
    },
    LOAD_SESSION() {
      return new Promise((resolve, reject) => {
        try {
          this.user = storage.getUser()
          resolve()
        } catch (error) {
          this.SIGN_OUT()
          reject(error)
        }
      })
    },
    SIGN_OUT() {
      storage.deleteLocalToken()
      storage.deleteHeaderToken()
      storage.deleteUser()
      this.user = {}
      this.token = ''
      this.authenticated = false
      this.blocked = false
    },
    async CHECK_TOKEN() {
      if (this.token) return Promise.resolve(this.token)
      const token = storage.getLocalToken()
      if (!token) return Promise.reject(new Error('Token inválido!'))
      this.SET_TOKEN(token)
      return this.LOAD_SESSION()
    },
    async VALID_TOKEN(payload) {
      if (!payload) return Promise.reject(new Error('Token inválido!'))
      await api.post('/api/v1/jwt/verify/', {token: payload}).catch(async () => {
        await api.post('/api/v1/jwt/refresh/', {refresh: payload})
      })
    },
    async RESET_PASSWORD(payload) {
      await api.post('/api/v1/users/reset_password/', payload).then(() => {
      })
    },
    async RESET_PASSWORD_CONFIRM(payload) {
      await api.post('/api/v1/users/reset_password_confirm/', payload).then(() => {
      })
    },
    SET_BLOCK(payload) {
      this.blocked = payload
      this.authenticated = !payload
    }
  },
});
