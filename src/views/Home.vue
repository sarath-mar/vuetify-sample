<template>
  <div>
     <Banner />
  </div>
</template>

<script>
// import AppBarOnTop from '../components/AppBarOnTop.vue';
import Banner from "../components/Users/banner.vue";
// import Stories from "../components/Users/home/stories.vue";
// import Parallex from "../components/Users/home/parallex.vue";
// import Singles from '../components/Users/home/singles.vue';
export default {
  components: {
    Banner,
    // Stories,
    // Parallex,
    // Singles,
    // AppBarOnTop
  },
  data() {
    return {
      // postData: [],
      // urlArray: [],
    };
  },
};
</script>

<style>
/* .topFooter {
  margin-bottom: -240px;
} */
</style>
