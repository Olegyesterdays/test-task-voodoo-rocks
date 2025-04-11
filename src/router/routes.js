import PostPage from '@/views/posts-page.vue';
import notFoundPage from '@/views/not-found-page.vue';

export const routes = [
  {
    path: '/',
    name: 'post',
    component: PostPage,
    meta: { requiresAuth: true }
  },
  {
    path: '/:catchAll(.*)',
    name: 'notFound',
    component: notFoundPage
  }
];
