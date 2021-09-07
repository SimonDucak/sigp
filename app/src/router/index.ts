import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router';
import {
  MiddlewareImplementation,
  MiddlewareNegativeResolution,
  RouteMiddleware,
  RouteName,
} from '@/router/routes';
import LogIn from '@/views/LogIn.vue';
import Draw from "@/views/Draw.vue";

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: RouteName.ROOT,
    redirect: '/login',
  },
  {
    path: '/login',
    name: RouteName.LOG_IN,
    component: LogIn,
    meta: {
      middleware: RouteMiddleware.REQUIRED_GUEST,
    },
  },
  {
    path: '/draw',
    name: RouteName.DRAW,
    component: Draw,
    meta: {
      middleware: RouteMiddleware.REQUIRED_USER,
    },
  },
  {
    path: '/:catchAll(.*)',
    name: 'NotFound',
    redirect: '/login',
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

/*
* Router guard
* */
router.beforeEach((to, from, next) => {
  if (!window.localStorage) {
    alert('Download better browser please! Thanks ;)');
    return;
  }
  if (to.meta?.middleware) {
    if (MiddlewareImplementation[to.meta.middleware as RouteMiddleware]()) next();
    else next(MiddlewareNegativeResolution[to.meta.middleware as RouteMiddleware]());
  } else {
    next();
  }
});

export default router;
