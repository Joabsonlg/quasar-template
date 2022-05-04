export default [
  {
    path: '/common',
    component: () => import('./layouts/Main.vue'),
    children: [{
      name: 'common',
      path: '',
      component: () => import('./pages/Index.vue')
    }]
  }
]