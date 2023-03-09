<template>
  <div>
    <div v-if="!$vuetify.breakpoint.mdAndUp">
      <v-card class="mb-5" flat>
        <v-app-bar
          fixed
          color="white"
          class="grey--text"
          scroll-target="#scrolling-techniques-7"
          height="80px"
        >
          <v-layout wrap class="mt-4">
            <v-toolbar-title>
              <span class="font-weight-light text-h5">Madhuraj Snaps</span>
              <span> </span>
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
          <div class="ml-4">
            <router-link class="router" to="/">
              <div>
                <span class="font-weight-light text-h5">Madhuraj Snaps</span>
                <span> </span>
                <h3 class="font-weight-light mt-2" style="opacity: 0.6">
                  Photographer
                </h3>
              </div>
            </router-link>
          </div>
          <div class="mt-10 ml-5 drawer-list">
            <!-- <ul>
              <div v-for="postType in postItems" :key="{ postType }">
                <router-link class="router" :to="postType.route">
                  <li>{{ postType.title }}</li>
                </router-link>
              </div>
            </ul> -->
            <v-list dense class="mt-10">
              <div v-for="(item, index) in postItems" :key="{ index }">
                <div class="mt-5">
                  <v-list-group
                    v-if="['Stories', 'Projects'].includes(item.title)"
                  >
                    <template v-slot:activator>
                      <v-list-item-content>
                        <v-list-item-title class="red--text listStyle">{{
                          item.title
                        }}</v-list-item-title>
                      </v-list-item-content>
                    </template>
                    <!--  :to="obj.route" -->
                    <v-list-item
                      v-for="(obj, i) in getSubData(item.title)"
                      :key="i"
                      dense
                      color="red ml-6"
                    >
                      <!-- path: '/project', -->
                      <router-link
                        v-if="item.title === 'Stories'"
                        :to="{
                          path: '/story',
                          params: { id: obj.id, category: obj.category },
                          query: { id: obj.id, category: obj.category },
                        }"
                        style="text-decoration: none"
                      >
                        <v-list-item-title
                          class="red--text font-weight-bold ml-8"
                          v-bind:class="{
                            'black--text': $route.path === obj.route,
                          }"
                          >{{ obj.category }}
                        </v-list-item-title>
                      </router-link>
                      <router-link
                        v-if="item.title === 'Projects'"
                        :to="{
                          path: '/project',
                          params: { id: obj.id, category: obj.category },
                          query: { id: obj.id, category: obj.category },
                        }"
                        style="text-decoration: none"
                      >
                        <v-list-item-title
                          class="red--text font-weight-bold ml-8"
                          v-bind:class="{
                            'black--text': $route.path === obj.route,
                          }"
                          >{{ obj.category }}
                        </v-list-item-title>
                      </router-link>
                    </v-list-item>
                  </v-list-group>
                  <v-list-item
                    v-else
                    link
                    :to="item.route"
                    :class="{
                      'black--text': $route.path === item.route,
                    }"
                  >
                    <v-list-item-content>
                      <v-list-item-title class="red--text listStyle">{{
                        item.title
                      }}</v-list-item-title>
                    </v-list-item-content>
                  </v-list-item>
                </div>
              </div>
            </v-list>
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
        <v-list dense class="mt-10">
          <div v-for="(item, index) in postItems" :key="{ index }">
            <div class="mt-5">
              <v-list-group v-if="['Stories', 'Projects'].includes(item.title)">
                <template v-slot:activator>
                  <v-list-item-content>
                    <v-list-item-title class="red--text listStyle">{{
                      item.title
                    }}</v-list-item-title>
                  </v-list-item-content>
                </template>
                <!--  :to="obj.route" -->
                <v-list-item
                  v-for="(obj, i) in getSubData(item.title)"
                  :key="i"
                  dense
                  color="red ml-6"
                >
                  <router-link
                    v-if="item.title === 'Stories'"
                    :to="{
                      path: '/story',
                      params: { id: obj.id, category: obj.category },
                      query: { id: obj.id, category: obj.category },
                    }"
                    style="text-decoration: none"
                  >
                    <v-list-item-title
                      class="red--text font-weight-bold ml-8"
                      v-bind:class="{
                        'black--text': $route.path === obj.route,
                      }"
                      >{{ obj.category }}
                    </v-list-item-title>
                  </router-link>
                  <router-link
                    v-if="item.title === 'Projects'"
                    :to="{
                      path: '/project',
                      params: { id: obj.id, category: obj.category },
                      query: { id: obj.id, category: obj.category },
                    }"
                    style="text-decoration: none"
                  >
                    <v-list-item-title
                      class="red--text font-weight-bold ml-8"
                      v-bind:class="{
                        'black--text': $route.path === obj.route,
                      }"
                      >{{ obj.category }}
                    </v-list-item-title>
                  </router-link>
                </v-list-item>
                <!-- <template v-slot:activator="{ props }">
                <v-list-item v-bind="props" title="Actions"></v-list-item>
              </template>

              <v-list-item
                v-for="([title, icon], i) in cruds"
                :key="i"
                :value="title"
                :title="title"
                :prepend-icon="icon"
              ></v-list-item> -->
              </v-list-group>
              <v-list-item
                v-else
                link
                :to="item.route"
                :class="{
                  'black--text': $route.path === item.route,
                }"
              >
                <v-list-item-content>
                  <v-list-item-title class="red--text listStyle">{{
                    item.title
                  }}</v-list-item-title>
                </v-list-item-content>
              </v-list-item>
            </div>
          </div>
        </v-list>
      </div>
    </v-navigation-drawer>
  </div>
</template>
<script>
import { getDocs } from "firebase/firestore";
import { projectCategory, storyCategory } from "../firebase";
export default {
  data() {
    return {
      drawer: false,
      scrollValue: 0,
      routeName: "",
      postTypes: [],
      // galleryPath: [
      //   "/gallery",
      //   "/video-gallery",
      //   "/all-gallery",
      //   "/published-works",
      // ],
      postItems: [
        { title: "Bio", icon: "mdi-home", route: "/about" },
        { title: "Singles", icon: "mdi-account", route: "/singles" },
        { title: "Stories", icon: "mdi-account", route: "/story" },
        // { title: "Singles", icon: "mdi-account", route: "/singles" },

        {
          title: "Projects",
          icon: "mdi-image",
          route: "/gallery",
        },
      ],
      storyCategory: [],
      projectCategory: [],
    };
  },
  created() {
    this.getStoryCategoryData();
    this.getProjectCategoryData();
    // console.log("posts");
    // this.getPosts();
    // window.addEventListener("scroll", this.onScroll);
  },
  beforeDestroy() {
    // window.removeEventListener("scroll", this.onScroll);
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
    getSubData(type) {
      let result = [];
      if (type == "Stories") {
        result = this.storyCategory;
      } else if (type == "Projects") {
        result = this.projectCategory;
      }
      return result;
    },
    async getStoryCategoryData() {
      let result = new Array();

      let data = await getDocs(storyCategory);
      data.forEach((doc) => {
        let documentData = doc.data();
        documentData.id = doc.id;
        result.push(documentData);
      });
      this.storyCategory = result;
    },
    async getProjectCategoryData() {
      let result = new Array();
      let data = await getDocs(projectCategory);
      data.forEach((doc) => {
        let documentData = doc.data();
        documentData.id = doc.id;
        result.push(documentData);
      });
      this.projectCategory = result;
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
.listStyle {
  /* margin-bottom: 20px; */
  letter-spacing: 4px;
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
.fixed-navbar {
  /* position: sticky  !important; */
  top: 10px;
}
</style>
