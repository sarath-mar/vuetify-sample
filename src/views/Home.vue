<template>
  <v-container >
    <v-layout justify-end >
      <AddImage/>
    </v-layout>
    <!-- <v-card color="#385F73" dark>
      <v-card-title class="text-h5"> Unlimited music now </v-card-title>

      <v-card-subtitle
        >Listen to your favorite artists and albums whenever and wherever,
        online and offline.</v-card-subtitle
      >

      <v-card-actions>
        <v-btn text> Listen Now </v-btn>
      </v-card-actions>
    </v-card> -->
   
  </v-container>
</template>

<script>
import AddImage from "../components/Admin/addImage.vue"
export default {
  name: "Home",

  components: {
    AddImage
  },
};
</script>
