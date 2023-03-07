<template>
  <div class="banner">
    <v-carousel
      cycle
      class="mt-1 rounded-sm"
      height="80vh"
      hide-delimiter-background
      show-arrows-on-hover
    >
      <v-carousel-item
        v-for="(item, i) in imageArray"
        :key="i"
        :src="item.src"
        reverse-transition="fade-transition"
        transition="fade-transition"
        elevation="12"
      >
      </v-carousel-item>
    </v-carousel>
  </div>
</template>

<script>
export default {
  data() {
    return {
      imageArray: [],
      items: [
        {
          src: "https://cdn.vuetifyjs.com/images/carousel/squirrel.jpg",
        },
        {
          src: "https://cdn.vuetifyjs.com/images/carousel/sky.jpg",
        },
        {
          src: "https://cdn.vuetifyjs.com/images/carousel/bird.jpg",
        },
        {
          src: "https://cdn.vuetifyjs.com/images/carousel/planet.jpg",
        },
      ],
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

<style scoped>
.banner {
  padding: 60px 300px 5px 5px;
}
@media screen and (max-width: 960px) {
  .banner {
  padding: 10px;
  padding-top: 65px;
}
}
</style>
