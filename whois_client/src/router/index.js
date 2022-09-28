import { createRouter, createWebHistory } from "vue-router";

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

export default router;