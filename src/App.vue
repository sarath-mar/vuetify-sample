<template>
  <v-app class="font" style="">
    <NavigationBar v-if="showNavBar" />
    <AppBarOnTop v-else />
    <!-- <v-main> --> 
      <router-view v-slot="{ Component }">
        <transition name="router" mode="out-in"> 
          <component :is="Component"></component>
        </transition>
      </router-view>
    <!-- </v-main> -->
  </v-app>
</template>

<script>
import AppBarOnTop from "./components/AppBarOnTop.vue";
import NavigationBar from "./components/NavigationBar.vue";
export default {
  name: "App",
  components: {
    NavigationBar,
    AppBarOnTop,
  },
  data: () => ({
    //
  }),
  computed: {
    showNavBar() {
      let routePath = this.$route.path;
      let routeName = this.$route.name;
      let routeOptions = this.$router.options.routes;
      let routeNames = [
        "Login",
        "Signin",
        "Error-404",
        "Home",
        "About",
        "Gallery",
        "All-Gallery",
      ];
      if (routeNames.includes(routeName)) return false;
      let data = routeOptions.find((x) => x.path == routePath);
      if (!data) {
        this.$router.replace({ path: "/" });
      }
      return true;
    },
  },
  created() {},
};
</script>
<style>
.font {
  font-family: "Gill Sans", "Gill Sans MT", Calibri, "Trebuchet MS", sans-serif;
  background: #f5f4f0 !important;
}
.router-enter-from {
  opacity: 0;
  transform: translateX(100px);
}
.router-enter-active {
  transition: ass 0.3s ease-out;
}
.router-enter-to {
  opacity: 0;
  transform: translateX(-100px); 
}
</style>
