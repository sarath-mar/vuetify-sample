<template>
  <v-app>
    <NavigationBar v-if="showNavBar" />
    <v-main>
      <router-view />
    </v-main>
  </v-app>
</template>

<script>
import NavigationBar from "./components/NavigationBar.vue";
export default {
  name: "App",
  components: {
    NavigationBar,
  },
  data: () => ({
    //
  }),
  computed: {
    showNavBar() {
      let routePath = this.$route.path;
      let routeName = this.$route.name;
      let routeOptions = this.$router.options.routes;
      let routeNames=["Login","Signin","Error-404"]
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
