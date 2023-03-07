<template>
  <div>
    <div v-if="!$vuetify.breakpoint.mdAndUp">
      <!-- <nav class="navbar">
        <v-toolbar>
          <v-toolbar-title class="text-uppercase grey--text">
            <v-app-bar-nav-icon
              @click.stop="drawer = !drawer"
            ></v-app-bar-nav-icon>
            <span class="font-weight-light">Madhuraj</span>
            <span> Snaps</span>
          </v-toolbar-title>
          <v-spacer></v-spacer>
          <v-tooltip bottom>
            <template v-slot:activator="{ on }">
              <v-btn @click="logout" v-on="on" icon>
                <v-icon>mdi-exit-to-app</v-icon>
              </v-btn>
            </template>
            <span>Log Out</span>
          </v-tooltip>
        </v-toolbar>
        <v-navigation-drawer app v-model="drawer" absolute temporary>
          <v-layout justify-end>
            <v-icon @click="close" class="black--text">mdi-close</v-icon>
          </v-layout>
          <v-list dense rounded class="mt-10">
            <v-list-item
              v-for="item in items"
              :key="item.title"
              link
              :to="item.route"
            >
              <v-list-item-icon>
                <v-icon>{{ item.icon }}</v-icon>
              </v-list-item-icon>

              <v-list-item-content>
                <v-list-item-title>{{ item.title }}</v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </v-list>
        </v-navigation-drawer>
      </nav> -->
      <v-card class="mb-5">
        <v-app-bar
          fixed
          color="white"
          class="grey--text"
          scroll-target="#scrolling-techniques-7"
          height="80px"
        >
          <v-layout wrap class="mt-4">
            <v-toolbar-title>
              <span class="font-weight-light text-h5">Madhuraj</span>
              <span> Snaps</span>
            </v-toolbar-title>
            <v-spacer></v-spacer>
            <v-app-bar-nav-icon
              @click.stop="drawer = !drawer"
              class="mt-n3"
            ></v-app-bar-nav-icon>
          </v-layout>
        </v-app-bar>
        <v-navigation-drawer app v-model="drawer" absolute temporary>
          <v-layout justify-end>
            <v-icon @click="drawer = !drawer" class="black--text pr-5 pt-5"
              >mdi-close</v-icon
            >
          </v-layout>
          <!-- <v-list dense rounded class="mt-1">
            <v-list-item
              v-for="item in items"
              :key="item.title"
              link
              :to="item.route"
            >
              <v-list-item-icon>
                <v-icon>{{ item.icon }}</v-icon>
              </v-list-item-icon>

              <v-list-item-content>
                <v-list-item-title>{{ item.title }}</v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </v-list> -->
          <div class="mt-10 ml-5 drawer-list">
            <ul>
              <div v-for="postType in postItems" :key="{ postType }">
                <router-link class="router" :to="postType.route">
                  <li>{{ postType.title }}</li>
                </router-link>
              </div>
            </ul>
          </div>
        </v-navigation-drawer>
        <v-sheet
          id="scrolling-techniques-7"
          class="overflow-y-auto"
          max-height="600"
        >
        </v-sheet>
      </v-card>
    </div>
    <v-navigation-drawer
      width="20vw"
      v-else
      permanent
      app
      class="navbar pa-5 pt-10"
    >
      <div class="fixed-navbar">
        <router-link class="router" to="/">
          <div>
            <span class="font-weight-light text-h5">Madhuraj Snaps</span>
            <span> </span>
            <h3 class="font-weight-light mt-2" style="opacity: 0.6">
              Photographer
            </h3>
          </div>
        </router-link>
        <div class="mt-10 drawer-list">
          <ul>
            <div v-for="postType in postItems" :key="{ postType }">
              <router-link class="router" :to="postType.route">
                <li>{{ postType.title }}</li>
              </router-link>
            </div>
          </ul>
        </div>
      </div>
    </v-navigation-drawer>
  </div>
</template>
<script>
export default {
  data() {
    return {
      drawer: false,
      scrollValue: 0,
      routeName: "",
      postTypes: [],
      galleryPath: [
        "/gallery",
        "/video-gallery",
        "/all-gallery",
        "/published-works",
      ],
      postItems: [
        { title: "Bio", icon: "mdi-home", route: "/about" },
        { title: "Work", icon: "mdi-account", route: "/work" },
        { title: "Stories", icon: "mdi-account", route: "/story" },
        // { title: "Singles", icon: "mdi-account", route: "/singles" },
    
        {
          title: "Projects",
          icon: "mdi-image",
          route: "/gallery",
        },
      ],
    };
  },
  created() {
    console.log("posts");
    this.getPosts();
    window.addEventListener("scroll", this.onScroll);
  },
  beforeDestroy() {
    window.removeEventListener("scroll", this.onScroll);
  },
  watch: {
    // onScroll(newValue) {
    // console.log(newValue);
    // },
    postData(newValue) {
      console.log("newValue");
      console.log(newValue);
      for (let x of newValue) {
        if (x.postType !== "BANNER") {
          this.postTypes.push(x.postType);
        }
      }
    },
  },

  methods: {
    getPosts() {
      console.log("post detailss", this.postData);
    },

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
.router {
  text-decoration: none !important;
  color: black !important;
}
.drawer-list ul {
  list-style: none;
}
.drawer-list ul li {
  margin-bottom: 20px;
  letter-spacing: 4px;
  /* list-style: none; */
}
.navbar {
  position: fixed !important;
  top: 0;
  /* left: 0; */
}
.activeClass {
  color: red;
  background: green;
}
.fixed-navbar{
  /* position: sticky  !important; */
  top: 10px;
}
</style>
