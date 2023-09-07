<template>
  <v-container fluid>
    <v-layout justify-end>
      <add-about  :id="id" @updatePost="updatePost" />
    </v-layout>
    <!-- {{id}}  -->
    <v-layout>
      <about-admin @aboutId="aboutId" :updated="updated" />
    </v-layout>
  </v-container>
</template>

<script>
import AboutAdmin from "../../components/Users/about/aboutAdmin.vue";
import addAbout from "./components/addAbout.vue";
export default {
  components: { addAbout, AboutAdmin },
  name: "Admin-About",
  data() {
    return {
      id: "",
      updated: 0,
    };
  },
  methods: {
    aboutId(id) {
      this.id = id;
    },
    updatePost() {
      this.updated++;
    },
  },
  created() {
    let isAdmin = this.isAdmin();
    if (!isAdmin) {
      this.$router.push({ path: "/login" });
    }
  },
};
</script>

<style scoped></style>
