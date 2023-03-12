<template>
  <!-- <div>
    <div>
      <v-img height="200" aspect-ratio="1" :src="post.postUrl" :lazy-src="post.postUrl">
      <template v-slot:placeholder>
        <v-row class="fill-height ma-0" align="center" justify="center">
          <v-progress-circular
            indeterminate
            color="black lighten-3"
          ></v-progress-circular>
        </v-row>
      </template>
    </v-img>
    </div>
  </div> -->
  <v-card
  width="220" 
    :loading="loading"
    class="my-2 mx-2 ashColor cardClass red"
  >
    <v-img height="250" width="220" :src="post.postUrl" :lazy-src="post.postUrl">
      <template v-slot:placeholder>
        <v-row class="fill-height ma-0" align="center" justify="center">
          <v-progress-circular
            indeterminate
            color="black lighten-3"
          ></v-progress-circular>
        </v-row>
      </template>
    </v-img>
    <v-card-title>{{ post.postCaption }}</v-card-title>
    <div v-if="post.workCategoryId">
      <p>{{ getWorkCategoryData(post.workCategoryId) }}</p>
    </div>
    <v-card-text style="overflow-y: auto; height: 50px">
      <div>
        {{ post.postText }}
      </div>
    </v-card-text>
    <v-card-actions>
      <v-layout justify-space-between>
        <EditImage :post="post" @updatePost="updatePost" />
        <DeleteImage :post="post" @updatePost="updatePost" />
      </v-layout>
    </v-card-actions>
  </v-card>
</template>
<script>
// import { getStorage, ref, getDownloadURL } from "firebase/storage";
import { db } from "../../firebase";
import { doc, getDoc } from "firebase/firestore";

import DeleteImage from "./deleteImage.vue";
import EditImage from "./editImage.vue";
export default {
  components: { DeleteImage, EditImage },
  props: {
    post: {
      required: true,
      type: Object,
    },
  },

  data: () => ({
    loading: false,
    selection: 1,
    image: "",
  }),
  // watch: {
  //   post: {
  //     handler(newValue) {
  //       this.getImages(newValue.id);
  //     },
  //     immediate: true,
  //     deep: true,
  //   },
  // },
  computed: {},
  methods: {
    updatePost(type) {
      console.log("root emit updated");
      this.$emit("updatePost",type);
    },
    async getWorkCategoryData(id) {
      // let result = new Array();
      // let data = await getDocs(workCategory);

      const docRef = doc(db, "work-category", id);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        console.log("Document data:", docSnap.data());
        return docSnap.data().category;
      } else {
        // doc.data() will be undefined in this case

        console.log("No such document!");
        return {};
      }
    },
    // async getImages(id) {
    //   this.image = "";
    //   const storage = getStorage();
    //   let data = await getDownloadURL(ref(storage, `albums/${id}.jpg`));
    //   this.image = data;
    // },
    // reserve() {
    //   this.loading = true;

    //   setTimeout(() => (this.loading = false), 2000);
    // },
  },
};
</script>
<style>
.cardClass:hover {
  cursor: pointer;
  transform: scale(1.01);
}
.cardClass {
  /* transition: transform 0.2s; */
  /* max-width: 250px; */
  /* display: flex; */
}
</style>
