import Vue from "vue";
import Router from "vue-router";
import Home from "./views/Home.vue";
import PageNotFound from "./views/PageNotFound.vue";
import Contact from "@/components/Contact.vue";

Vue.use(Router);

export default new Router({
  routes: [{
      path: "/",
      name: "home",
      component: Home
    },
    {
      path: "/search",
      name: "search",
      // route level code-splitting
      // this generates a separate chunk (search.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () =>
        import( /* webpackChunkName: "search" */ "./views/Search.vue")
    },
    {
      path: '/contact/:id',
      component: Contact
    },
    {
      path: "*",
      component: PageNotFound
    }
  ]
});