import {setToken, deleteToken} from "boot/axios"

export const setHeaderToken = token => setToken(token.access)
export const deleteHeaderToken = () => deleteToken()
export const getLocalToken = () => JSON.parse(localStorage.getItem("token"))
export const deleteLocalToken = () => localStorage.removeItem("token")
export const setLocalToken = token => localStorage.setItem("token", JSON.stringify(token))
export const getUser = () => JSON.parse(localStorage.getItem("user"))
export const setUser = user => localStorage.setItem("user", JSON.stringify(user))
export const deleteUser = () => localStorage.removeItem("user")
