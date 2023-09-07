<template>
  <div class="main-banner">
    <Banner />
    <div>
      <p class="quote">
         Photography to me is a look into
        myself,<br />
        a self-realization. <br />
        Here the camera becomes just a tool 
      </p>
    </div>
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
.main-banner {
  /* background: red; */
}
.quote {
  font-style: italic;
  color: rgb(62, 59, 59);
  margin-top: 20px;
  margin-left: 10px;
  font-size: 15px;
  font-weight: 100;
  /* text-align: right; */
  /* font-family: 'Anton', sans-serif; */
  font-family: "Courier Prime", monospace;
  /* font-family: 'Poppins', sans-serif; */
}
@media screen and (max-width: 600px) {
  .quote {
    position: absolute;
    bottom: 70px; 
    left: 10px;
    /* margin-top: 90px; */
    font-size: 12px;
  }
}
</style>
