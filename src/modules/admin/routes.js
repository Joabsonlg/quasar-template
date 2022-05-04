export default [
  {
    path: '/admin',
    component: () => import('./layouts/MainLayout.vue'),
    children: [{
      name: 'Admin Dashboard',
      path: '',
      component: () => import('./pages/IndexPage.vue'),
      meta: {requireLogin: true}
    }]
  }
]
