import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../components/home.vue";
import Meetups from "../components/Meetup/Meetups.vue";
import CreateMeetup from "../components/Meetup/CreateMeetup";
import Profile from "../components/User/Profile";
import Signup from "../components/User/Signup";
import Signin from "../components/User/Signin";
import Meetup from "../components/Meetup/Meetup";
import AuthGuard from "./auth-guard";

/*
import RouterView from "./views/RouterView.vue";

import { i18n } from "./main.js";


 */
Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/meetups",
    name: "Meetups",
    component: Meetups,
  },

  {
    path: "/meetup/new",
    name: "CreateMeetup",
    component: CreateMeetup,
    //Auth Guard checkt, ob ein Login stattgefunden hat
    beforeEnter: AuthGuard,
  },
  {
    path: "/meetup/:id",
    name: "Meetup",
    //damit die id als Prop weiter gegeben wird
    props: true,
    component: Meetup,
  },
  {
    path: "/profile",
    name: "Profile",
    component: Profile,
    beforeEnter: AuthGuard,
  },
  {
    path: "/signup",
    name: "Signup",
    component: Signup,
  },
  {
    path: "/signin",
    name: "Signin",
    component: Signin,
  },
  {
    path: "/about",
    name: "About",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/About.vue"),
  },
];

const router = new VueRouter({
  routes,
});

export default router;
