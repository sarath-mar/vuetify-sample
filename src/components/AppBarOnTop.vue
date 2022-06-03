<template>
  <div>
    <!-- <nav> -->

    <v-card elevation="24" class="mb-5">
      <v-app-bar
        fixed
        rounded
        color="white"
        class="deep-purple--text"
        dark
        scroll-target="#scrolling-techniques-7"
        height="90px"
      >
        <v-layout wrap class="mt-5">
          <v-flex xs12 sm6>
            <v-toolbar-title>
              <span class="font-weight-light h1 black--text">Madhuraj </span>
              <span>Snaps</span>
            </v-toolbar-title>
          </v-flex>
          <v-spacer></v-spacer>
          <v-flex xs12 sm6>
            <v-layout class="mx-10" justify-end>
              <div v-for="item in items" :key="item.title">
                <span v-if="item.title == 'Gallery'">
                  <div class="text-center">
                    <v-menu open-on-hover offset-y > 
                      <template v-slot:activator="{ on, attrs }">
                        <v-btn
                          icon
                          class="mx-5 deep-purple--text"
                          v-bind="attrs"
                          v-on="on"
                        >
                          Gallery
                        </v-btn>
                      </template>

                      <v-list > 
                        <v-list-item
                          v-for="(item, index) in item.data"
                          :key="index"
                        >
                          <router-link
                            style="text-decoration: none"
                            :to="item.route"
                          >
                            <v-list-item-title
                              class="mx-5 deep-purple--text"
                              :class="{
                                'green--text': $route.path === item.route,
                              }"
                              >{{ item.title }}</v-list-item-title
                            >
                          </router-link>
                        </v-list-item>
                      </v-list>
                    </v-menu>
                  </div>
                </span>
                <span v-else>
                  <router-link style="text-decoration: none" :to="item.route">
                    <v-btn
                      class="mx-5 deep-purple--text"
                      :class="{
                        'green--text': $route.path === item.route,
                      }"
                      icon
                    >
                      {{ item.title }}
                    </v-btn>
                  </router-link>
                </span>
              </div>
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
    <!-- </nav>   -->
    <!--  :color="
        scrollValue <= 468 && $route.name == 'Home' ? 'transparent' : 'white'
      " -->
    <!-- <v-app-bar-nav-icon></v-app-bar-nav-icon> -->
  </div>
</template>
<script>
export default {
  data() {
    return {
      scrollValue: 0,
      routeName: "",
      items: [
        { title: "Home", icon: "mdi-home", route: "/" },
        { title: "About", icon: "mdi-account", route: "/about" },
        {
          title: "Gallery",
          icon: "mdi-image",
          route: "/gallery",
          data: [
            { title: "Photo Category", icon: "mdi-image", route: "/gallery" },
            {
              title: "Video Gallery",
              icon: "mdi-video",
              route: "/video-gallery",
            },
            {
              title: "Image Gallery",
              icon: "mdi-image",
              route: "/all-gallery", 
            },
            {
              title: "Published Works",
              icon: "mdi-image",
              route: "/published-works",  
            },
          ],
        },
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
.activeClass {
  color: red;
  background: green;
}
</style>
