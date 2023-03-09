<template>
  <div class="main-story-page mr-5 ">
    <!-- <stories/> -->
    <h3>Projects</h3>
    <Projects />
  </div>
</template>
<script>
//   import Stories from '../components/Users/home/stories.vue';

import Projects from "../components/Users/home/projects.vue";

// import Test from "../components/Users/components/test.vue";
export default {
  components: { Projects },
  methods: {},
};
</script>
<style>
.main-story-page {
  padding: 30px 15px !important;
}
@media screen and (max-width: 960px) {
  .main-story-page {
    padding: 15px !important;
    padding-top: 65px !important;
  }
}
</style>
