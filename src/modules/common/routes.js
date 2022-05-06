export default [
  {
    path: '/common',
    component: () => import('./layouts/MainLayout.vue'),
    children: [{
      name: 'common',
      path: '',
      component: () => import('./pages/IndexPage.vue')
    }]
  }
]
