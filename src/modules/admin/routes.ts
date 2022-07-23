export default [
  {
    path: "/admin",
    component: () => import("src/modules/admin/layouts/MainLayout.vue"),
    children: [
      {
        name: "Admin Dashboard",
        path: "/admin/dashboard",
        component: () => import("src/modules/admin/pages/IndexPage.vue"),
        meta: { requireLogin: true, requireAdmin: true },
      },
    ],
  },
];
