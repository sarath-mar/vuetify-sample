<template>
  <v-app>
    <NavigationBar v-if="showNavBar" />
    <AppBarOnTop v-else/>
    <v-main>
      <router-view />
    </v-main>
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
      let routeNames = ["Login", "Signin", "Error-404","Home","About","Gallery"]; 
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
