<template>
  <div>
    <transition appear name="fade">
      <v-card
        v-if="storyArray.length"
        flat
        elevation="0 "
        class="background mx-10"
      >
        <v-card-title><span class="heading">Stories</span></v-card-title>
        <v-card-text>
          <div v-for="(story, index) in limitedStory" :key="index">
            <v-layout v-if="isOdd(index + 1)" class="mb-6" wrap justify-center>
              <v-flex x12 sm7 align-self-center>
                <span>
                  <v-img
                    @click="clickedForImage(post)"
                    height="400px"
                    :src="story.postUrl"
                    :lazy-src="story.postUrl"
                    aspect-ratio=".7 "
                    class="grey lighten-2 rounded-xl"
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
                  <span class="stories"> {{ story.postText }}</span>
                </span>
              </v-flex>
            </v-layout>

            <v-layout v-else wrap justify-center class="mb-6">
              <v-flex xs12 sm5 align-self-center v-if="!$vuetify.breakpoint.xs">
                <span>
                  <div class="sub-title font-weight-bold text-center mx-3 mb-3">
                    {{ story.postCaption }}
                  </div>
                  <span class="stories mx-3"> {{ story.postText }}</span>
                </span>
              </v-flex>
              <v-flex align-self-center x12 sm7>
                <span class="">
                  <v-img
                    @click="clickedForImage(post)"
                    height="400px"
                    :src="story.postUrl"
                    :lazy-src="story.postUrl"
                    aspect-ratio=".7"
                    class="grey lighten-2 rounded-xl"
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
                  <span class="stories"> {{ story.postText }}</span>
                </span>
              </v-flex>
            </v-layout>
          </div>
        </v-card-text>
        <div v-if="storyArray.length > 1" class="text-center">
          <v-btn @click="seeMore" small>{{ btnTitle }}</v-btn>
        </div>
      </v-card>
    </transition>
  </div>
</template>

<script>
export default {
  data() {
    return {
      // stories: [{ text: "one" }, { text: "two" }],
      limitedStory: [],
      btnTitle: "See Moore..",
      btnMode: true,
    };
  },
  watch: {
    storyArray: {
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
        this.limitedStory = this.storyArray;
        this.btnMode = false;
        this.btnTitle = "See Less..";
      } else {
        this.limitedStory = this.storyArray.filter((x, i) => {
          if (i < 2) return x;
        });
        this.btnMode = true;
        this.btnTitle = "See Moore..";
      }
    },
  },
  created() {
    // console.log("created ")
    // console.log(this.postData)
    // this.stories=this.postData.filter(x=>x.postType=="STORY")
    // console.log(this.stories)
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
