<template>
  <div class="main-story-page mr-5 ">
    <h3>Stories</h3>
    <stories/>
  </div>
</template>
<script>
import Stories from '../components/Users/home/stories.vue';
// import Test from "../components/Users/components/test.vue";
export default {
  components: {Stories},
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
