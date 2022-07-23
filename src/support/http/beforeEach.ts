import { useAuthStore } from "stores/all";
import { Router } from "vue-router";

export const addBeforeEach = (router: Router) => {
  const store = useAuthStore();
  router.beforeEach(async (to, from, next) => {
    await store.CHECK_TOKEN().catch(() => {
      console.log("Erro ao validar token!");
    });

    document.title = to.name
      ? `${String(to.name)} - Quasar Template`
      : "Quasar Template";

    const destination = to.name;
    const requiresLogin = to.meta.requireLogin;
    const requiresAdmin = to.meta.requireAdmin;
    const isAuthenticated = store.isAuthenticated;
    // const isAdmin = store.isAdmin
    const isBlocked = store.isBlocked;

    if (destination === "Login") {
      if (isAuthenticated) next({ path: "/admin/dashboard" });
      else if (isBlocked) next({ name: "Lock Screen" });
      else next();
    } else if (destination === "Lock Screen") {
      if (isBlocked) next();
      else if (isAuthenticated) next({ path: "/admin/dashboard" });
      else next({ path: "/login" });
    } else {
      if (requiresLogin) {
        if (isBlocked) {
          next({
            name: "Lock Screen",
            query: { to: to.path },
          });
        } else if (isAuthenticated) {
          next();
        } else {
          next({
            path: "/login",
            query: { to: to.path },
          });
        }
      } else next();
    }
  });
};
