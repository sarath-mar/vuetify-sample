<template>
  <div class="mt-10 ">
    <transition appear name="fade">
      <v-card
        v-if="categoryDetails.length"
        flat
        elevation="0 "
        class="background mx-10"
      >
        <v-card-title
          ><span class="heading text-lowercase mt-5">{{ type }}</span></v-card-title
        >
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
                    class="grey lighten-2 rounded-xl text-center"
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
import { getDocs } from "@firebase/firestore";
import { postCollection } from "../../../firebase";
export default {
  data() {
    return {
      limitedStory: [],
      categoryDetails: [],
      type: "",
      btnMode: true,
      btnTitle: "See More",
    };
  },
  async created() {
    this.type = this.$route.query.imageCategory;
    let data = await getDocs(postCollection);
    data.forEach((doc) => {
      let postData = doc.data();
      postData.id = doc.id;
      if (postData.postType == this.type) this.categoryDetails.push(postData);
    });
    if (this.categoryDetails.length ) {
      this.limitedStory = this.categoryDetails.filter((x, i) => {
        if (i < 2) return x;
      });
    } else {
      this.limitedStory = this.categoryDetails;
    }
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
        this.limitedStory = this.categoryDetails;
        this.btnMode = false;
        this.btnTitle = "See Less..";
      } else {
        this.limitedStory = this.categoryDetails.filter((x, i) => {
          if (i < 2) return x;
        });
        this.btnMode = true;
        this.btnTitle = "See Moore..";
      }
    },
  },
};
</script>
