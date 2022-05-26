<template>
  <div class="about pa-10 "> 
    <transition name="about">
    <about-admin class="mt-5 "/>
    </transition>
    
  </div>
</template>
<script>
import aboutAdmin from '../components/Users/about/aboutAdmin.vue'
export default {
  components: { aboutAdmin },
}
</script>
<style >
  .about-enter-from{
    opacity: 0;
  }
  .about-enter-to{
    opacity: 1;
  }
  .about-enter-active{
    transition: all 2s ease ;
  }
</style>