import {useAuthStore} from "stores/all";

export const addBeforeEach = (Router) => {
  const store = useAuthStore();
  Router.beforeEach(async (to, from, next) => {
    await store.CHECK_TOKEN().catch(() => {
    });

    const destination = to.name;
    const requiresLogin = to.meta.requireLogin;
    const requiresAdmin = to.meta.isAdmin;
    const isAuthenticated = store.isAuthenticated;
    const isBlocked = store.isBlocked;

    if (destination === 'Login Page') {
      if (isAuthenticated) next({name: 'Admin Dashboard'});
      else if (isBlocked) next({name: 'Lock Screen'});
      else next();
    } else if (destination === 'Lock Screen') {
      if (isAuthenticated) next({name: 'Admin Dashboard'});
      else if (isBlocked) next();
      else next({path: '/login'});
    } else {
      if (requiresLogin) {
        if (isAuthenticated) {
          // if (requiresAdmin) {
          //   if (store.isAdmin) next();
          //   else next({name: 'Erro 403'});
          // } else next();
          next();
        } else if (isBlocked) next({name: 'Lock Screen', query: {to: to.path}})
        else next({path: '/login', query: {to: to.path}});
      } else next();
    }
  });
};
