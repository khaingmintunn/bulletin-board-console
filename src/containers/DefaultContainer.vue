<template>
  <div class="app">
    <AppHeader fixed class="header">
      <SidebarToggler class="d-lg-none" display="md" mobile />
      <b-link class="navbar-brand" to="/">
        <img
          class="navbar-brand-full"
          src="img/brand/logo.svg"
          width="140"
          height="45"
          alt="Bulletin Board Logo"
        />
        <img
          class="navbar-brand-minimized"
          src="img/brand/sygnet.svg"
          width="30"
          height="30"
          alt="Bulletin Board Logo"
        />
      </b-link>
      <SidebarToggler class="d-md-down-none" display="lg" />
      <b-navbar-nav class="d-md-down-none ml-auto" fixed> </b-navbar-nav>
    </AppHeader>
    <div class="app-body body">
      <AppSidebar fixed class="sidebar">
        <SidebarForm />
        <SidebarNav :navItems="navItems"></SidebarNav>
        <SidebarFooter style="cursor: pointer" @click.native="submitlogout()">
          <i class="cui-lock-locked icons mr-3"></i>Logout
        </SidebarFooter>
        <SidebarMinimizer class="d-lg-none" display="md" mobile />
      </AppSidebar>
      <main class="main">
        <div class="container-fluid">
          <router-view></router-view>
        </div>
      </main>
    </div>
  </div>
</template>

<script>
import { mapActions } from "vuex";
import { user_nav_item, admin_nav_item } from "@/_nav";
import {
  Header as AppHeader,
  SidebarToggler,
  Sidebar as AppSidebar,
  SidebarFooter,
  SidebarForm,
  SidebarMinimizer,
  SidebarNav,
  Footer as TheFooter,
} from "@coreui/vue";
import { getItem } from "../utils";
import { USER_TYPE } from "../../constant";

export default {
  name: "DefaultContainer",
  components: {
    AppHeader,
    AppSidebar,
    TheFooter,
    SidebarForm,
    SidebarFooter,
    SidebarToggler,
    SidebarNav,
    SidebarMinimizer,
  },
  data() {
    return {
      navItems:
        getItem(process.env.VUE_APP_NAME).user.user_type === USER_TYPE.ADMIN
          ? admin_nav_item
          : user_nav_item,
    };
  },

  methods: {
    ...mapActions("auth", ["logout"]),
    submitlogout() {
      this.logout();
    },
  },
};
</script>
