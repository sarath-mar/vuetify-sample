<template>
  <div>
    <transition appear name="fade">
      <div v-if="loader" class="my-10 loader">
        <v-progress-circular
          :size="100"
          :width="4"
          color="black"
          class="mx-auto"
          indeterminate
        ></v-progress-circular>
      </div>
      <div v-else>
        <v-card v-if="singlesArray.length" flat elevation="0 " class="">
          <v-card-title><span class="heading">Singles</span></v-card-title>
          <div></div>
          <v-card-text>
           <!-- {{ imageIndex }} -->
            <div v-for="(story, index) in singlesArray" :key="index">
              <v-layout class="mb-6" wrap justify-center>
                <v-flex x12 sm7 align-self-center>
                  <div class="single-img">
                    <v-img
                      :height="
                        $vuetify.breakpoint.mdAndUp?
                         400
                        // : $vuetify.breakpoint.xs
                        // ? 200
                        : 300
                      "
                      aspect-ratio="16/9"
                      :src="story.postUrl"
                      :lazy-src="story.postUrl"
                      class="grey lighten-2 rounded-sm text-center single-image"
                      :class="!$vuetify.breakpoint.xs && 'mx-10'"
                      @click="imageIndex = index"
                    >
                      <template v-slot:placeholder>
                        <v-row
                          class="fill-height ma-0"
                          align="center"
                          justify="center"
                        >
                          <v-progress-circular
                            indeterminate
                            color="black lighten-3"
                          ></v-progress-circular>
                        </v-row>
                      </template>
                    </v-img>
                  </div>
                </v-flex>
                <v-flex xs12 sm5 align-self-center>
                  <span class="mb-5">
                    <p class="stories text-justify mt-2 mr-5">
                      {{ story.postText }}
                    </p>
                  </span>
                </v-flex>
              </v-layout>
            </div>
            
          </v-card-text>
        </v-card>
      </div>
    </transition>
    <light-house-gallery
            :postData="singlesArray"
            :imageIndex="imageIndex"
            :hideGallery="true"
          ></light-house-gallery>
  </div>
</template>

<script>
import { getDocs } from "firebase/firestore";
import { singlesCollection } from "../../../firebase";
import lightHouseGallery from "./lightHouseGallery.vue";
export default {
  name: "singles",
  components: { lightHouseGallery },
  data() {
    return {
      // stories: [{ text: "one" }, { text: "two" }],
      singlesArray: [],
      limitedStory: [],
      btnTitle: "See Moore..",
      btnMode: true,
      imageIndex: "",
      loader: false,
    };
  },
  watch: {
    // singlesArray: {
    //   handler(newValue) {
    //     if (newValue) {
    //       if (newValue.length > 1) {
    //         this.limitedStory = newValue.filter((x, i) => {
    //           if (i < 2) return x;
    //         });
    //       } else {
    //         this.limitedStory = newValue;
    //       }
    //     }
    //   },
    // },
  },
  methods: {
    async getSinglesData() {
      this.loader = true;
      let result = new Array();

      let data = await getDocs(singlesCollection);
      data.forEach((doc) => {
        let documentData = doc.data();
        documentData.id = doc.id;
        result.push(documentData);
      });
      console.log("result single data", result);
      if (!result.length) {
        this.loader = false;
        return;
      }
      this.singlesArray = result;
      this.loader = false;
    },
  },
  created() {
    console.log("created");
  },
  mounted() {
    console.log("mounted");
    this.getSinglesData();
  },
};
</script>

<style>

.single-img .single-image {
  cursor: pointer;
  transition: 0.5s all;
}
.single-image:hover {
  transform: scale(1.02);
}
.postBackground {
  padding: 10px;
  background: red;
  color: green;
}
.list-enter-from {
  opacity: 0;
  transform: scale(0.6);
}
.list-enter-active {
  transition: all 0.4s ease;
}
.list-leave-to {
  opacity: 0;
  transform: scale(0.6);
}
.list-leave-active {
  transition: all 0.4s ease;
  position: absolute; /* for move transition after item leaves */
}
.list-move {
  transition: all 0.3s ease;
}
</style>
