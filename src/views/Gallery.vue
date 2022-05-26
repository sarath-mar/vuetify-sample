<template>
  <div class="pt-10 mt-10">
    <ImageTabViews />
    <v-layout justify-center >
        <router-link :to="'/all-gallery'"> 
          <v-btn small>See More..</v-btn>
        </router-link>
    </v-layout>
  </div>
</template>

<script>
import ImageTabViews from "../components/Users/imageTabView.vue";
export default {
  components: { ImageTabViews },
};
</script>

<style></style>
