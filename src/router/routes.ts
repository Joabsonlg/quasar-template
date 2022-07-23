import { RouteRecordRaw } from "vue-router";
import { routes as authRoutes } from "src/modules/auth";
import { routes as adminRoutes } from "src/modules/admin";

const routes = [
  {
    path: "/",
    component: () => import("layouts/MainLayout.vue"),
    children: [{ path: "", component: () => import("pages/IndexPage.vue") }],
  },
  {
    path: "/:catchAll(.*)*",
    component: () => import("pages/ErrorNotFound.vue"),
  },
];

const allRoutes: RouteRecordRaw[] = [...routes, ...authRoutes, ...adminRoutes];

export default allRoutes;
