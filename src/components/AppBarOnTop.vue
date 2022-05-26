<template>
  <v-card class="overflow-hidden">
    
    <v-app-bar
      fixed
      :color="scrollValue <= 468  && $route.name=='Home'? 'transparent' : 'white'"
      elevate-on-scroll
      scroll-target="#scrolling-techniques-7"
    >
      <!-- <v-app-bar-nav-icon></v-app-bar-nav-icon> -->
<v-layout wrap class="mt-5">
  <v-flex xs12 sm6>
      <v-toolbar-title class="mx-10">
        <span class="font-weight-light h1 green--text">Madhuraj </span>
        <span>Snaps</span>
      </v-toolbar-title>
</v-flex >
      <v-spacer></v-spacer>
      <v-flex xs12 sm6 >
      <v-layout class="mx-10" justify-end>
       
          <div
            v-for="item in items"
            :key="item.title"
            
          > 
          <router-link :to="item.route">
            <v-btn class="green--text mx-5" icon>
              <!-- <v-icon>mdi-magnify</v-icon> -->
              {{ item.title }}
            </v-btn>
          </router-link>
          </div>  
        

        <!-- <v-btn class="green--text mx-5" icon>
          About
        </v-btn>

        <v-btn class="green--text mx-5" icon>
          Gallery
        </v-btn> -->
      </v-layout>
      </v-flex>
</v-layout>
    </v-app-bar>
    <v-sheet
      id="scrolling-techniques-7"
      class="overflow-y-auto"
      max-height="600"
    >
    </v-sheet>
  </v-card>
</template>
<script>
export default {
  data() {
    return {
      scrollValue: 0,
      routeName:"",
      items: [
        { title: "Home", icon: "mdi-home", route: "/" },
        { title: "About", icon: "mdi-account", route: "/about" },
        { title: "Gallery", icon: "mdi-image", route: "/gallery" },
      ],
    };
  },
  mounted() {
    window.addEventListener("scroll", this.onScroll);
  },
  beforeDestroy() {
    window.removeEventListener("scroll", this.onScroll);
  },
  // watch: {
  //   onScroll(newValue) {
  //     console.log(newValue);
  //   },
  // },
  methods: {
    onScroll() {
      this.scrollValue =
        window.pageYOffset || document.documentElement.scrollTop;
    },
  },
};
</script>
<style>
.hiddenNavBar {
  color: green;
}
</style>
