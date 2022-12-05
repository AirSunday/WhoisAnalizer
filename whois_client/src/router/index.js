import { createRouter, createWebHistory } from "vue-router";
import NProgress from "nprogress";
import "nprogress/nprogress.css";

const routes = [
  {
    path: "/",
    name: "HomeMain",
    component: () => import("@/views/Home.vue"),
  },
  {
    path: "/whois",
    name: "WhoisMain",
    component: () => import("@/views/Whois.vue"),
  },
  {
    path: "/analiz",
    name: "AnalizMain",
    component: () => import("@/views/Analiz.vue"),
  },
  {
    path: "/news",
    name: "NewsMain",
    component: () => import("@/views/News.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeResolve((to, from, next) => {
  if (to.name) {
    NProgress.inc(); // увеличение прогресса на случайный процент
    NProgress.start();
  }
  next();
});

router.afterEach(() => {
  NProgress.done();
});

export default router;
