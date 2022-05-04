import { boot } from 'quasar/wrappers'
import axios from 'axios'

const API_VERSION_PREFIX = '/api/v1';

const api = axios.create({ baseURL: 'https://my-investments-jlg.herokuapp.com/' })

export default boot(({ app }) => {
  app.config.globalProperties.$axios = axios
  app.config.globalProperties.$api = api
})

const setToken = (token) => api.defaults.headers.common.Authorization = `JWT ${token}`
const deleteToken = () => delete api.defaults.headers.common['Authorization']

export { api, setToken, deleteToken, API_VERSION_PREFIX }
