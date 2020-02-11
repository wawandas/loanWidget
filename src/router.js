import Vue from "vue";
import Router from "vue-router";

import LoanWidget from "./components/LoanWidget";

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: "*",
      redirect: {
        path: "/"
      }
    },
    {
      path: "/",
      component: LoanWidget,
      props: true
    },
    {
      path: "/result",
      component: LoanWidget,
      props: true
    }
  ]
});
