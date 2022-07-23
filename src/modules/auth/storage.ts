import { setToken, deleteToken } from "boot/axios";
import { Token, User } from "./models";

export const setHeaderToken = (token: Token) => setToken(token.access);
export const deleteHeaderToken = () => deleteToken();
export const getLocalToken = () =>
  JSON.parse(localStorage.getItem("token") || "{}");
export const deleteLocalToken = () => localStorage.removeItem("token");
export const setLocalToken = (token: Token) =>
  localStorage.setItem("token", JSON.stringify(token));
export const isBlocked = () => localStorage.getItem("blocked") === "true";
export const setBlocked = (value: boolean) =>
  localStorage.setItem("blocked", JSON.stringify(value));
export const getUser = () => JSON.parse(localStorage.getItem("user") || "{}");
export const setUser = (user: User) =>
  localStorage.setItem("user", JSON.stringify(user));
export const deleteUser = () => localStorage.removeItem("user");
