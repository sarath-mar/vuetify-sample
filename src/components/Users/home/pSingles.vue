<template>
  <div>
    <transition appear name="fade">
      <v-card flat elevation="0 " class="">
        <v-card-title
          ><span class="heading">{{ heading }}</span></v-card-title
        >
        <div></div>
        <v-card-text>
          <div v-for="(story, index) in singlesArray" :key="index">
            <v-layout class="mb-6" wrap justify-center>
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
                    :class="$vuetify.breakpoint.xs ? '' : 'mx-10'"
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
    </transition>
  </div>
</template>

<script>
import { getDocs, orderBy, query, where } from "firebase/firestore";
import { portraitCollection } from "../../../firebase";
export default {
  data() {
    return {
      // stories: [{ text: "one" }, { text: "two" }],
      singlesArray: [],
      limitedStory: [],
      btnTitle: "See Moore..",
      btnMode: true,
      heading: "",
    };
  },
  watch: {
    "$route.query.type": {
      handler(newValue) {
        if (newValue === "Singles") {
          this.heading = "Portrait Singles";
        } else {
          this.heading = "Portrait Stories";
        }
        this.getSinglesData(newValue);
      },
    },
  },
  methods: {
    async getSinglesData(type) {
      let result = new Array();
      const q = query(
        portraitCollection,
        orderBy("postCaption", "asc"),
        where("categoryId", "==", type)
      );
      let data = await getDocs(q);
      data.forEach((doc) => {
        let documentData = doc.data();
        documentData.id = doc.id;
        result.push(documentData);
      });
      this.singlesArray = result;
      console.log("result",result);
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
    console.log(this.$route.name);
    if (this.$route.query.type === "Singles") {
      //   type = "Singles";
      this.heading = "Portrait Singles";
    } else {
      //   type = "Stories";
      this.heading = "Portrait Stories";
    }
    this.getSinglesData(this.$route.query.type);
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
