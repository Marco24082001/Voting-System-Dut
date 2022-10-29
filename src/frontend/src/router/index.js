import { createWebHistory, createRouter } from "vue-router";
import routes from "@/router/routes.js"
// import About from "@/views/About.vue";

const router = createRouter({
  history: createWebHistory(),
  linkActiveClass: "active",
  routes,
});


export default router