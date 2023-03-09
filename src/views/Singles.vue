<template>
    <div class="main-story-page">
      <singles/>
    </div>
  </template>
  <script>
import Singles from '../components/Users/home/singles.vue';
  export default {
    components: {Singles},
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
  