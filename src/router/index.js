import Vue from "vue";
import Router from "vue-router";
import { getItem } from "../utils";
import { AUTH_STATUS, USER_TYPE } from "../../constant";

// Containers
const DefaultContainer = () => import("@/containers/DefaultContainer");

// views
const Index = () => import("@/views/Index");
const Page404 = () => import("@/views/Page404");
// auth
const Login = () => import("@/views/auth/Login");
const Signup = () => import("@/views/auth/Signup");
const SignupConfirm = () => import("@/views/auth/SignupConfirm");
const ForgetPassword = () => import("@/views/auth/ForgetPassword");
const ResetPassword = () => import("@/views/auth/ResetPassword");
// user
const Profile = () => import("@/views/user/Profile");
const UserCreate = () => import("@/views/user/Create");
const UserDetail = () => import("@/views/user/Detail");
const UserEdit = () => import("@/views/user/Edit");
const UserList = () => import("@/views/user/List");
// post
const PostCreate = () => import("@/views/post/Create");
const PostDetail = () => import("@/views/post/Detail");
const PostEdit = () => import("@/views/post/Edit");
const PostList = () => import("@/views/post/List");

Vue.use(Router);

export const router = new Router({
  mode: "hash", // https://router.vuejs.org/api/#mode
  linkActiveClass: "open active",
  scrollBehavior: () => ({ y: 0 }),
  routes: [
    {
      path: "/",
      name: "root",
      redirect: "/post/list",
      component: DefaultContainer,
      children: [
        {
          path: "user",
          name: "User",
          redirect: "/user/list",
          component: {
            render(c) {
              return c("router-view");
            },
          },
          children: [
            {
              path: "profile",
              name: "Profile",
              component: Profile,
              meta: {
                isAuthed: true,
              },
            },
            {
              path: "create",
              name: "UserCreate",
              component: UserCreate,
              meta: {
                isAdmin: true,
              },
            },
            {
              path: "detail/:user_id",
              name: "UserDetail",
              component: UserDetail,
              meta: {
                isAdmin: true,
              },
            },
            {
              path: "edit/:user_id",
              name: "UserEdit",
              component: UserEdit,
              meta: {
                isAdmin: true,
              },
            },
            {
              path: "list",
              name: "UserList",
              component: UserList,
              meta: {
                isAdmin: true,
              },
            },
          ],
        },
        {
          path: "post",
          name: "Post",
          redirect: "/post/list",
          component: {
            render(c) {
              return c("router-view");
            },
          },
          children: [
            {
              path: "create",
              name: "PostCreate",
              component: PostCreate,
              meta: {
                isUser: true,
              },
            },
            {
              path: "detail/:post_id",
              name: "PostDetail",
              component: PostDetail,
              meta: {
                isUser: true,
              },
            },
            {
              path: "edit/:user_id",
              name: "PostEdit",
              component: PostEdit,
              meta: {
                isUser: true,
              },
            },
            {
              path: "list",
              name: "PostList",
              component: PostList,
              meta: {
                isUser: true,
              },
            },
          ],
        },
      ],
    },

    { path: "*", redirect: "/404" },

    {
      path: "/",
      redirect: "/",
      name: "Auth",
      component: {
        render(c) {
          return c("router-view");
        },
      },
      children: [
        {
          path: "login",
          name: "login",
          component: Login,
          meta: {
            isAuthed: false,
          },
        },
        {
          path: "signup",
          name: "signup",
          component: Signup,
          meta: {
            isAuthed: false,
          },
        },
        {
          path: "signup-confirm/:token_id",
          name: "Signup-confirm",
          component: SignupConfirm,
          meta: {
            isAuthed: false,
          },
        },
        {
          path: "forget-password",
          name: "ForgetPassword",
          component: ForgetPassword,
          meta: {
            isAuthed: false,
          },
        },
        {
          path: "reset-password/:token_id",
          name: "ResetPassword",
          component: ResetPassword,
          meta: {
            isAuthed: false,
          },
        },
        {
          path: "404",
          name: "page404",
          component: Page404,
          meta: {
            isAuthed: true,
          },
        },
      ],
    },
  ],
});

/**
 * Route Authentication beforeEach
 */
router.beforeEach((to, from, next) => {
  const item = getItem(process.env.VUE_APP_NAME);
  if (to.meta.isAuthed) {
    if (
      !item ||
      (item && item.user && item.user.auth_status !== AUTH_STATUS.AUTHED)
    ) {
      next("/login");
    } else {
      next();
    }
  } else if (to.meta.isAdmin) {
    if (
      !item ||
      (item && item.user && item.user.auth_status !== AUTH_STATUS.AUTHED)
    ) {
      next("/login");
    } else if (
      item &&
      item.user &&
      item.user.auth_status === AUTH_STATUS.AUTHED &&
      item.user.user_type !== USER_TYPE.ADMIN
    ) {
      next("/post/list");
    } else {
      next();
    }
  } else if (to.meta.isUser) {
    if (
      !item ||
      (item && item.user && item.user.auth_status !== AUTH_STATUS.AUTHED)
    ) {
      next("/login");
    } else if (
      item &&
      item.user &&
      item.user.auth_status === AUTH_STATUS.AUTHED &&
      item.user.user_type !== USER_TYPE.USER
    ) {
      next("/user/list");
    } else {
      next();
    }
  } else {
    if (
      item &&
      item.user &&
      item.user.auth_status === AUTH_STATUS.AUTHED &&
      item.user.user_type === USER_TYPE.ADMIN
    ) {
      next("/user/list");
    } else if (
      item &&
      item.user &&
      item.user.auth_status === AUTH_STATUS.AUTHED &&
      item.user.user_type === USER_TYPE.USER
    ) {
      next("/post/list");
    } else {
      next();
    }
  }
});
