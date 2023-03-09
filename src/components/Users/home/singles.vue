<template>
  <div>
    <transition appear name="fade">
      <v-card v-if="singlesArray.length" flat elevation="0 " class="">
        <v-card-title><span class="heading">Singles</span></v-card-title>
        <div></div>
        <v-card-text>
          <div v-for="(story, index) in limitedStory" :key="index">
            <v-layout v-if="isOdd(index + 1)" class="mb-6" wrap justify-center>
              <v-flex x12 sm7 align-self-center>
                <span>
                  <v-img
                    :height="
                      $vuetify.breakpoint.mdAndUp
                        ? 400
                        : $vuetify.breakpoint.xs
                        ? 200
                        : 300
                    "
                    aspect-ratio="16/9"
                    :src="story.postUrl"
                    :lazy-src="story.postUrl"
                    class="grey lighten-2 rounded-sm text-center"
                    :class="$vuetify.breakpoint.xs ? 'mx-1' : 'mx-10'"
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
                </span>
              </v-flex>
              <v-flex xs12 sm5 align-self-center>
                <span class="mx-5 mt-xs-0">
                  <div class="sub-title font-weight-bold text-center mb-3">
                    {{ story.postCaption }}
                  </div>
                  <p class="stories text-justify">{{ story.postText }}</p>
                </span>
              </v-flex>
            </v-layout>

            <v-layout v-else wrap justify-center class="mb-6">
              <v-flex xs12 sm5 align-self-center v-if="!$vuetify.breakpoint.xs">
                <span>
                  <div class="sub-title font-weight-bold text-center mx-3 mb-3">
                    {{ story.postCaption }}
                  </div>
                  <p class="stories mx-3 text-justify">{{ story.postText }}</p>
                </span>
              </v-flex>
              <v-flex align-self-center x12 sm7>
                <span class="">
                  <v-img
                    :height="
                      $vuetify.breakpoint.mdAndUp
                        ? 400
                        : $vuetify.breakpoint.xs
                        ? 200
                        : 300
                    "
                    aspect-ratio="16/9"
                    :src="story.postUrl"
                    :lazy-src="story.postUrl"
                    cover
                    class="grey lighten-2 rounded-sm"
                    :class="$vuetify.breakpoint.xs ? 'mx-1' : 'mx-10'"
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
                </span>
              </v-flex>
              <v-flex xs12 sm5 align-self-center v-if="$vuetify.breakpoint.xs">
                <span>
                  <div class="sub-title font-weight-bold text-center my-3">
                    {{ story.postCaption }}
                  </div>
                  <p class="stories text-justify">{{ story.postText }}</p>
                </span>
              </v-flex>
            </v-layout>
          </div>
        </v-card-text>
        <div v-if="singlesArray.length > 1" class="text-center">
          <v-btn @click="seeMore" small>{{ btnTitle }}</v-btn>
        </div>
      </v-card>
    </transition>
  </div>
</template>

<script>
import { getDocs } from "firebase/firestore";
import { singlesCollection } from "../../../firebase";
export default {
  data() {
    return {
      // stories: [{ text: "one" }, { text: "two" }],
      singlesArray: [],
      limitedStory: [],
      btnTitle: "See Moore..",
      btnMode: true,
    };
  },
  watch: {
    singlesArray: {
      handler(newValue) {
        if (newValue) {
          if (newValue.length > 1) {
            this.limitedStory = newValue.filter((x, i) => {
              if (i < 2) return x;
            });
          } else {
            this.limitedStory = newValue;
          }
        }
      },
    },
  },
  methods: {
    async getSinglesData() {
      let result = new Array();

      let data = await getDocs(singlesCollection);
      data.forEach((doc) => {
        let documentData = doc.data();
        documentData.id = doc.id;
        result.push(documentData);
      });
      this.singlesArray = result;
      console.log(result);
    },
    isOdd(index) {
      if (index) {
        console.log(index + " index");
        let data = index % 2;
        console.log(data + " data ");
        if (data == 0) return true;
        return false;
      }
    },
    seeMore() {
      if (this.btnMode) {
        this.limitedStory = this.singlesArray;
        this.btnMode = false;
        this.btnTitle = "See Less..";
      } else {
        this.limitedStory = this.singlesArray.filter((x, i) => {
          if (i < 2) return x;
        });
        this.btnMode = true;
        this.btnTitle = "See Moore..";
      }
    },
  },
  created() {
    this.getSinglesData();
  },
};
</script>

<style>
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
