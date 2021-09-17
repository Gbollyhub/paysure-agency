import Vue from "vue";
import Router from "vue-router";
import Home from "@/components/home";
import Verifyemail from "@/components/verifyemail";
import signup from "@/components/signup";
import TokenPage from "@/components/tokenPage";
import PhoneTokenPage from "@/components/PhoneToken";
import Verifysuccess from "@/components/verifysuccess";
import {store} from "./store"
Vue.use(Router);
export default new Router({
  routes: [
    {
      path: "/",
      redirect: {
          name: "home"
      }
  },
    {
      path: "/signUp",
      name: "SignUp",
      component: signup,
    },

    {
      path: "/",
      name: "home",
      component: Home,
    },
    {
      path: "/verifyemail",
      name: "verifyemail",
      component: Verifyemail,
      beforeEnter: (to, from, next) => {
        if(store.state.authenticated == false) {
            next({ name: 'home' });
        } else {
            next();
        }
    }
    },
    {
      path: "/verifysuccess",
      name: "verifysuccess",
      component: Verifysuccess,
      beforeEnter: (to, from, next) => {
        if(store.state.authenticated == false) {
          next({ name: 'home' });
        } else {
            next();
        }
    }
    },
    {
      path: "/tokenpage",
      name: "tokenpage",
      component: TokenPage,
      beforeEnter: (to, from, next) => {
        if(store.state.authenticated == false) {
          next({ name: 'home' });
        } else {
            next();
        }
    }
    },
    {
      path: "/phone-token",
      name: "phoneToken",
      component: PhoneTokenPage,
      beforeEnter: (to, from, next) => {
        if(store.state.authenticated == false) {
          next({ name: 'home' });
        } else {
            next();
        }
    }
    },

    // {
    //   path: "*",
    //   name: "notfound",
    //   component: notfound,
    // },
  ],
  mode: "history",
});
