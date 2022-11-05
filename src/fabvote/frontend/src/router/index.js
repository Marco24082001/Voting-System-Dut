import { createWebHistory, createRouter } from "vue-router";
import routes from "@/router/routes.js";
import middlewarePipeline from "./middlewarePipeline";
import store from "@/store";
// import About from "@/views/About.vue";

const router = createRouter({
  history: createWebHistory(),
  linkActiveClass: "active",
  routes,
});

router.beforeEach((to, from, next) => {
  if (!to.meta.middleware) {
      return next()
  }
  console.log(to);
  const middleware = to.meta.middleware

  const context = {
      to,
      from,
      next,
      store
  }


  return middleware[0]({
      ...context,
      next: middlewarePipeline(context, middleware, 1)
  })

})

export default router