<template>
  <v-app class="font" style="">
    <NavigationBar v-if="showNavBar" />

    <AppBarOnTop v-if="showAppBar" />
    <!-- <v-main> -->
    <router-view v-slot="{ Component }">
      <transition appear name="router" mode="out-in">
        <component :is="Component"></component>
      </transition>
    </router-view>
    <Footer v-if="showAppBar" />
    <!-- </v-main> -->
  </v-app>
</template>

<script>
import AppBarOnTop from "./components/AppBarOnTop.vue";
import NavigationBar from "./components/NavigationBar.vue";
import Footer from "./components/Users/footer.vue";
export default {
  name: "App",
  components: {
    NavigationBar,
    AppBarOnTop,
    Footer,
  },
  data: () => ({}),
  computed: {
    showNavBar() {
      let routePath = this.$route.path;
      let routeName = this.$route.name;
      let routeOptions = this.$router.options.routes;
      console.log(routeOptions) 
      let routeNames = ["Admin","Admin-Video","Admin-Document"];  
      if (routeNames.includes(routeName)) {
        return true;
      }
      let data = routeOptions.find((x) => x.path == routePath);
      if (!data) {
        this.$router.replace({ path: "/" });
      }
      return false;
    },
    showAppBar() {
      let routePath = this.$route.path;
      let routeName = this.$route.name;
      let routeOptions = this.$router.options.routes; 
      let routeNames = ["Error-404", "Home", "About", "Gallery", "All-Gallery","Category-Details","Video-Gallery","Published-Works"];    
      if (routeNames.includes(routeName)) {
        return true;
      }
      let data = routeOptions.find((x) => x.path == routePath); 
      if (!data) {
        this.$router.replace({ path: "/" });
      }
      return false;
    },
  },
  created() {
    let routeName = this.$route.name;
    let noBar = ["Login", "Signin"];
    if (noBar.includes(routeName)) {
      // this.showAppBar=false
      this.showAppBar = false;
    }
  },
};
</script>
<style>
.login {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
} 
.font {
  font-family: "Gill Sans", "Gill Sans MT", Calibri, "Trebuchet MS", sans-serif;
  background: #f5f4f0 !important;
}
.heading {
  font: 5em "Allison";
}
.heading-one {
  font: 3em "Allison";
}
.stories {
   font-size: 1.4em;   
   /* font: 1.4em "overlock";     */
}
.sub-title {
  font-size: 1.7em;
  /* font: 2em ; */
  /* font: 2em "julee"; */
}
.fade-leave-active,
.fade-enter-active {
  transition: all 0.8s cubic-bezier(1, 0.5, 0.8, 1);
}

.fade-enter,
.fade-leave-to {
  transform: translateX(20px);
  opacity: 0;
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
/* .router-leave-active,.router-enter-active {
  transition: all 0.8s cubic-bezier(1, 0.5, 0.8, 1);
} 

.router-enter,  
.router-leave-to {
  transform: translateX(20px);
  opacity: 0;
}    */
</style>
