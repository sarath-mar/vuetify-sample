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
        <div v-for="(story, index) in storyArray" :key="index">
          <v-layout v-if="!isOdd(index + 1)" class="mb-6" wrap justify-center>
            <v-flex x12s sm7 align-self-center>
              <span>
                <v-img
                  @click="clickedForImage(post)"
                  height="600px"
                  :src="story.postUrl"
                  :lazy-src="story.postUrl"
                  aspect-ratio=".5 "
                  class="grey lighten-2 rounded-xl mx-10"
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
                <!-- <v-card class="yellow pa-5 rounded-lg  " flat >  -->
                <span class="stories"> {{ story.postText }}</span>
                <!-- </v-card>  -->
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
            <v-flex align-self-center x12s sm7>
              <span class="">
                <v-img
                  @click="clickedForImage(post)"
                  height="600px"
                  :src="story.postUrl"
                  :lazy-src="story.postUrl"
                  aspect-ratio=".5 "
                  class="grey lighten-2 rounded-xl mx-10"
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
    </v-card>
    </transition> 
  </div>
</template>

<script>
export default {
  data() {
    return {
      // stories: [{ text: "one" }, { text: "two" }],
    };
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
</style>
