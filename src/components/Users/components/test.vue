<template>
  <div>
    <div class="contact">
      <transition appear   @before-enter="beforeEnter"
        @enter="enter" >
        <h1>hellooooiii</h1>
      </transition>
      <transition-group
        appear
        tag="ul"
        @before-enter="beforeEnter"
        @enter="enter"
      >
        <li v-for="(icon, index) in icons" :key="icon.name" :data-index="index">
          <!-- <span class="material-icons">{{ icon.name }}</span> -->
          <div>{{ icon.text }}</div>
        </li>
      </transition-group>
    </div>
  </div>
</template>

<script>
import gsap from "gsap";

export default {
  //   setup() {
  //     const beforeEnter = (el) => {
  //       console.log("beforeEnter");
  //       console.log(el);
  //     };

  //     const enter = (el, done) => {
  //       console.log("enter");
  //       console.log(el+done)
  //     };

  //     return { beforeEnter, enter };
  //   },
  data() {
    return {
      icons: [
        { name: "alternate_email", text: "by email" },
        { name: "local_phone", text: "by phone" },
        { name: "local_post_office", text: "by post" },
        { name: "local_fire_department", text: "by smoke signal" },
      ],
    };
  },
  methods: {
    beforeEnter(el) {
      el.style.opacity = 0;
      el.style.transform = "translateY(100px)";
    },
    enter(el) {
     gsap.to(el, {
        opacity: 1,
        y: 0,
        duration: 0.8,
        // onComplete: done, 
        delay: el.dataset.index * 0.2,
      });
    },
  },
};
</script>

<style>
.contact ul {
  padding: 0;
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: 20px;
  max-width: 400px;
  margin: 60px auto;
}
.contact li {
  list-style-type: none;
  background: white;
  padding: 30px;
  border-radius: 10px;
  box-shadow: 1px 3px 5px rgba(0, 0, 0, 0.1);
  cursor: pointer;
  line-height: 1.5em;
}
.size {
  height: 100px;
  width: 200px;
  margin: 20px;
}
</style>
