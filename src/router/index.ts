import { createRouter, createWebHistory } from "vue-router";
// import FrontView from "../views/Front/FrontView.vue";
const routes = [
  {
    path: "/",
    name: "front",
    component: () => import("@/views/Front/FrontView.vue"),
    children: [
      {
        path: "",
        name: "home",
        component: () => import("@/views/Front/HomeView.vue"),
      },
      {
        path: "/products",
        name: "products",
        component: () => import("@/views/Front/Products/ProductsView.vue"),
      },
    ],
  },
  {
    path: "/login",
    name: "login",
    component: () => import("@/views/Login/LoginView.vue"),
  },
  {
    path: "/admin",
    name: "admin",
    component: () => import("@/views/Admin/AdminView.vue"),
    redirect: { name: "adminUser" },
    children: [
      {
        path: "/admin/user",
        name: "adminUser",
        component: () => import("@/views/Admin/User/UserView.vue"),
      },
    ],
  },
  {
    path: "/:pathMatch(.*)*",
    name: "NotFound",
    component: () => import("@/views/NotFound.vue"),
  },
];
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

export default router;
