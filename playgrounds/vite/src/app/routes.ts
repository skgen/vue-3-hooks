import ThePlaygroundView from '@/app/views/ThePlaygroundView.vue';

export default [
  {
    path: '/',
    name: 'playground',
    component: ThePlaygroundView,
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'not-found',
    component: () => import('@/app/views/TheNotFoundView.vue'),
  },
];
