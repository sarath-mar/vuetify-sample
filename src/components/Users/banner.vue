<template>
  <div class="pt-10" >
    <v-carousel
      cycle
      hide-delimiter-background
      show-arrows-on-hover
      height="80vh"  
      class="rounded-xl mt-5 "
    >
      <v-carousel-item
        v-for="(item, i) in imageArray"
        :key="i"
        :src="item.src"
        reverse-transition="fade-transition"
        transition="fade-transition"
      ></v-carousel-item>
    </v-carousel>
  </div>
</template>

<script>
export default {
  data() {
    return {
      imageArray: [],
    };
  },
  watch: {
    urlBannerArray: {
      handler() {
        this.getImage();
      },
      immediate: true,
      deep: true,
    },
  },
  methods: {
    getImage() {
      this.imageArray = this.urlBannerArray;  
    },
  },
};
</script>

<style scoped></style>
