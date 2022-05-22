import {api} from "boot/axios";
import {useAuthStore, useCommonStore} from "stores/all";
import * as storage from "src/modules/auth/storage";

export const addInterceptors = (Router) => {
  const commonStore = useCommonStore();
  const authStore = useAuthStore();
  api.interceptors.response.use(
    (response) => {
      commonStore.REMOVE_REQUEST()
      return response
    },
    async (error) => {
      commonStore.REMOVE_REQUEST()
      if (!error.response) return Promise.reject(new Error('Falha de conexão, tente novamente mais tarde!'));
      if (error.response.status === 401) {
        if (Router.currentRoute.value.path.includes('lock')) return Promise.resolve()
        if (error.config.url.includes('refresh')) {
          commonStore.ADD_REQUEST()
          storage.setBlocked(true)
          await authStore.SET_BLOCK(true).then(() => {
            Router.push({name: 'Lock Screen', query: {to: Router.currentRoute.value.path}})
          })
        } else if (!error.config.url.includes('create') && !error.config.url.includes('refresh') && !error.config.url.includes('verify')) {
          try {
            commonStore.ADD_REQUEST()
            await authStore.VALID_TOKEN(authStore.getUserToken?.access)
          } catch (error) {
            commonStore.REMOVE_REQUEST()
            if (authStore.isBlocked) Router.push({
              name: 'Lock Screen',
              query: {to: Router.currentRoute.value.path}
            })
            else {
              commonStore.ADD_REQUEST()
              await authStore.SIGN_OUT()
              Router.push({
                path: '/login',
                query: {to: Router.currentRoute.value.path}
              })
            }
          }
        }
        return Promise.reject(error)
      } else return Promise.reject(error)
    })
};
