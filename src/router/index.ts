import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import { useAuthStore } from "../store/authStore";
import SignInView from "../views/SignInView.vue";
import SignUpView from "../views/SignUpView.vue";
import Mainiew from "../views/MainView.vue";
import RoomView from "../views/RoomView.vue";
import BlankRoomView from "../views/BlankRoomView.vue";
import RoomSettings from "../components/UserInfoDialog.vue";

const requireAuth = {
  requireAuth: true,
};

const routes: Array<RouteRecordRaw> = [
  {
    name: "signIn",
    path: "/signin",
    component: SignInView,
  },
  {
    name: "signUp",
    path: "/signup",
    component: SignUpView,
  },
  {
    name: "main",
    path: "/",
    component: Mainiew,
    meta: requireAuth,
    children: [
      {
        path: "/setting",
        name: "room.setting",
        component: RoomSettings,
      },
      {
        path: "/",
        name: "room.empty",
        component: BlankRoomView,
      },
      {
        path: "/room",
        name: "room",
        component: RoomView,
      },
    ],
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes: routes,
});

router.beforeEach((to, from, next) => {
  if (to.name == "signIn" && useAuthStore().authrized) {
    next("/");
    return;
  }
  if (to.meta.requireAuth && !useAuthStore().authrized) {
    next("/signIn");
    return;
  } else next();
});

export default router;
