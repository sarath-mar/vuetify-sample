<template>
  <div class="pt-10"> 
    <span class="bannerHeading"> <h1>
      Photography is the Beauty of Life Captured 
      </h1></span>
    <v-carousel
      elevation="12"
      cycle
      hide-delimiter-background
      show-arrows-on-hover
      height="80vh"
      class="rounded-xl mt-5"
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
.bannerHeading {
  /* height: 100vh ; */
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 1;
   font: 2em "Allison";  
   color: white ;
}
.mainHead {
  position: fixed;
  margin-top: 38vh;
  font: 3em "julee";
  color: wheat;
  margin-left: 60px;
  margin-right: 60px;
}
</style>
