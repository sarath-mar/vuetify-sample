<template>
  <div class="banner">
    <v-carousel
      cycle
      class="mt-1 rounded-sm"
      :height="
        $vuetify.breakpoint.mdAndUp
          ? '80vh'
          : $vuetify.breakpoint.xs
          ? 300
          : 500
      "
      hide-delimiter-background
      show-arrows-on-hover
    >
      <v-carousel-item
        v-for="(item, i) in imageArray"
        :key="i"
        :src="item.postUrl"
        reverse-transition="fade-transition"
        transition="fade-transition"
        elevation="12"
      >
      </v-carousel-item>
    </v-carousel>
  </div>
</template>

<script>
import { getDocs } from "firebase/firestore";
import { bannerCollection } from "../../firebase";
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
  created() {
    this.getBannerData();
  },
  methods: {
    async getBannerData() {
      let result = new Array();
      let data = await getDocs(bannerCollection);
      data.forEach((doc) => {
        let documentData = doc.data();
        documentData.id = doc.id;
        result.push(documentData);
      });
      this.imageArray = result;
    },
  },
};
</script>

<style scoped>
.banner {
  padding: 80px 300px 5px 5px;
  /* padding: 60px 300px 5px 5px; */
}
@media screen and (max-width: 960px) {
  .banner {
    padding: 10px;
    padding-top: 12vh;
  }
}
@media screen and (max-width: 600px) {
  .banner {
    padding: 10px;
    padding-top: 25vh;
  }
}
</style>
