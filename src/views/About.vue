<template>
  <div class="about pa-10">
    <!-- <transition name="about"> -->
    <!-- -->
    <!-- <v-menu transition="slide-x-transition">  -->
    <transition appear name="fade">
      <about-admin class="mt-5" />
    </transition> 
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
  components: { aboutAdmin, 
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
<style></style>
