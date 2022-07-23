import { boot } from "quasar/wrappers";
import axios, { AxiosInstance } from "axios";

declare module "@vue/runtime-core" {
  interface ComponentCustomProperties {
    $axios: AxiosInstance;
  }
}

const api = axios.create({
  baseURL: "https://my-investments-jlg.herokuapp.com/",
});

export default boot(({ app }) => {
  app.config.globalProperties.$axios = axios;
  app.config.globalProperties.$api = api;
});

const setToken = (token: string) =>
  (api.defaults.headers.common.Authorization = `JWT ${token}`);
const deleteToken = () => delete api.defaults.headers.common["Authorization"];

export { api, setToken, deleteToken };
