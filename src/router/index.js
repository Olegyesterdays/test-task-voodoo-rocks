import { createRouter, createWebHistory } from 'vue-router';
import { routes } from './routes';
import { restrictRoute } from './restrict-route';

const router = createRouter({
  routes,
  history: createWebHistory()
});

restrictRoute(router);

export default router;
