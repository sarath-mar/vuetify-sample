<template>
    <div class="main-story-page">
      <p-singles/>
    </div>
  </template>
  <script>
import PSingles from '../components/Users/home/pSingles.vue';
// import Singles from '../components/Users/home/singles.vue';
  export default {
    components: {PSingles},
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
  