<template>
  <v-container fluid>
    <v-layout justify-end class="mt-5" wrap>
      <span :class="{ 'mt-10': $route.name == 'Video-Gallery' }" class="heading"
        >Videos</span
      >
      <v-spacer> </v-spacer>
      <add-video-url v-if="$route.name !== 'Video-Gallery'" />
    </v-layout>
    <v-layout wrap>
      <span v-for="(post, index) in videoData" :key="index">
        <v-flex>
          <video-card :post="post" @updatePost="updatePost" />
        </v-flex>
      </span>
    </v-layout>
  </v-container>
</template>

<script>
import { getDocs } from "@firebase/firestore";
import addVideoUrl from "./components/addVideoUrl.vue";
import { videoCollection } from "../../firebase";
import VideoCard from "./components/videoCard.vue";
export default {
  components: { addVideoUrl, VideoCard },
  data() {
    return {
      videoData: [],
    };
  },
  methods: {
    async getvideoData() {
      let result = new Array();
      let data = await getDocs(videoCollection);
      data.forEach((doc) => {
        let videoData = doc.data();
        videoData.id = doc.id;
        result.push(videoData);
      });
      this.videoData = result;
    },
    updatePost() {
      this.getvideoData();
    },
  },
  created() {
    this.getvideoData();
    // let isAdmin = this.isAdmin();
    // if (!isAdmin) {
    //   this.$router.push({ path: "/login" });
    // }
  },
};
</script>

<style scoped></style>
