<template>
  <div>
    <!-- <app-bar-on-top>
    </app-bar-on-top> -->
    <v-card flat class="background pa-10">
      <Banner />
    </v-card>
    <Stories />
    <Parallex  class="mb-10" />

    <!-- <v-card class="ma-10 pa-10 topFooter">  -->
    <!-- <v-layout>
      <v-flex sm6>
        <transition name="fade">
          <v-card height="50vh" color="red"></v-card>
        </transition>
      </v-flex>
      <v-flex sm6>
        <v-card height="50vh" color="green"></v-card>
      </v-flex>
    </v-layout>
    <v-card height="200vh" color="blue "></v-card> --> 
    <!-- </v-card> -->
    <Footer />
  </div>
</template>

<script>
// import AppBarOnTop from '../components/AppBarOnTop.vue';
import Banner from "../components/Users/banner.vue";
import Stories from "../components/Users/home/stories.vue";
import Parallex from "../components/Users/home/parallex.vue";
import Footer from "../components/Users/footer.vue";
export default {
  components: {
    Banner,
    Stories,
    Parallex,
    Footer,
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
.topFooter {
  margin-bottom: -240px;
}
</style>
