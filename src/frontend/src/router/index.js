import Vue from "vue";
import VueRouter from "vue-router";
import routes from "../router/routes.js";

Vue.use(VueRouter);
console.log("VueRouter", routes);
export default new VueRouter({
  routes,
  mode: "history",
  base: process.env.BASE_URL,
});
