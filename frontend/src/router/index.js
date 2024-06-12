import { createRouter, createWebHashHistory } from 'vue-router';

import mainRoutes from './modules/mainRoutes.js';

const routes = [
  ...mainRoutes
];

const router = createRouter({
  history: createWebHashHistory(process.env.BASE_URL),
  routes,
  scrollBehavior() {
    return { top: 0 };
  },
});

export default router;