<template>
  <div>
    <!-- <app-bar-on-top>
    </app-bar-on-top> -->
    <v-card  class="pa-10  ">  
    <Banner />
    </v-card>
    <Footer/>
    <div>
     
  </div>
  </div>
</template>

<script>
// import AppBarOnTop from '../components/AppBarOnTop.vue';
import Banner from "../components/Users/banner.vue";
import Footer from '../components/Users/footer.vue';
export default {
  components: { Banner,
    Footer, 
  // AppBarOnTop
   },
  data() {
    return {
      // postData: [],
      // urlArray: [],
    };
  },
}
</script>

<style scoped></style>
