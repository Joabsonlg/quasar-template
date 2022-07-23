export default [
  {
    path: "/",
    component: () => import("src/modules/auth/layouts/MainLayout.vue"),
    children: [
      {
        name: "Login",
        path: "/login",
        component: () => import("src/modules/auth/pages/LoginPage.vue"),
      },
      {
        name: "Lock Screen",
        path: "lock-screen",
        component: () => import("src/modules/auth/pages/LockScreen.vue"),
      },
    ],
  },
];
