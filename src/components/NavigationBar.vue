<template>
  <nav >
    <v-toolbar>
      <v-toolbar-title class="text-uppercase grey--text">
        <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
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
  </nav>
</template>

<script>
export default {
  name: "HelloWorld",

  data: () => ({
    drawer: false,
    items: [
      { title: "About", icon: "mdi-home", route: "/admin" },  
      { title: "Post", icon: "mdi-home", route: "/admin-post" },
      // { title: "Videos", icon: "mdi-video", route: "/admin-video" },
      { title: "Categories", icon: "mdi-file", route: "/admin-work" },
    ],
  }),
  methods: {
    close() {
      this.drawer = false;
    },
    logout() {
      localStorage.removeItem("ROLE_OF_USER");
      this.$router.replace({ path: "/login" });
    },
  },
};
</script>
