<template>
  <div class="main-about-page">
    <about-admin />
  </div>
</template>
<script>
import aboutAdmin from "../components/Users/about/aboutAdmin.vue";
export default {
  components: {
    aboutAdmin,
  },
  methods: {},
};
</script>
<style>
.main-about-page {
  padding: 30px !important;
  /* padding-right: 30px !important; */
}
@media screen and (max-width: 960px) {
  .main-about-page {
    /* padding: 30px !important; */
    padding-top: 65px !important;
    /* padding-right: 300px !important; */
  }
}
</style>
