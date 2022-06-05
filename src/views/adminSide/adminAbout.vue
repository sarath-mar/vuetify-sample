<template>
  <v-container fluid>
    <v-layout justify-end>
      <add-about v-if="id" :id="id" @updatePost="updatePost"/> 
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
      updated:0
    };
  },
  methods: {
    aboutId(id) {
      this.id = id;
    },
    updatePost(){
      this.updated++
    }
  },
};
</script>

<style scoped></style>
