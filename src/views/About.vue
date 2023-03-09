<template>
  <div class="main-about-page ">
    <!-- <transition name="about"> -->
    <!-- -->
    <!-- <v-menu transition="slide-x-transition">  -->
    <!-- <transition appear name="fade"> -->
    <about-admin /> 
    <!-- </transition>  -->
    <!-- <Test /> -->
    <!-- </v-menu> -->
    <!-- </Transition> -->

    <!--  -->
  </div>
</template>
<script>
import aboutAdmin from "../components/Users/about/aboutAdmin.vue";
// import Test from "../components/Users/components/test.vue";
export default {
  components: {
    aboutAdmin,
    // Test
  },
  methods: {},
  beforeCreate() {
    console.log("beforeCreate");
  },
  created(el) {
    console.log(el);
    console.log("create");
  },
};
</script>
<style>
.main-about-page {
  padding: 30px !important;
    /* padding-right: 30px !important; */

}
@media screen and (max-width: 960px) {
  .main-about-page {
    padding: 15px !important;
    padding-top: 65px !important; 
    /* padding-right: 300px !important; */
  }
}
</style>
