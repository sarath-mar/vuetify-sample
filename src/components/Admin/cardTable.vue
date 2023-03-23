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
  <div>
    <!-- <v-card
      v-if="post"
      width="220"
      :loading="loading"
      class="my-2 mx-2 ashColor red"
    >
      <v-img
        height="250"
        width="220"
        :src="post.postUrl"
        :lazy-src="post.postUrl"
      >
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
    </v-card> -->
    <v-row v-if="postData" class="pa-5 ma-4">
      <v-col
        v-for="post in postData"
        :key="post.id"
        class="child-flex"
        cols="6"
        sm="6"
        md="3"
        lg="2"
      >
        <div class="card-style">
          <v-img
            :src="post.postUrl"
            :lazy-src="post.postUrl"
            aspect-ratio="1"
            width="300"
            class="bg-grey-lighten-2"
          >
            <template v-slot:placeholder>
              <v-row class="fill-height ma-0" align="center" justify="center">
                <v-progress-circular
                  indeterminate
                  color="grey-lighten-5"
                ></v-progress-circular>
              </v-row>
            </template>
          </v-img>
          <div>
            <h3>{{ post.postCaption }}</h3>
            <div v-if="post.workCategoryId">
              <p>{{ getWorkCategoryData(post.workCategoryId) }}</p>
            </div>
            <div style="overflow-y: auto; height: 70px"> 
              {{ post.postText }}
            </div>
            <v-layout justify-space-between class="mt-3 ">
              <EditImage :post="post" @updatePost="updatePost" />
              <DeleteImage :post="post" @updatePost="updatePost" />
            </v-layout>
          </div>
        </div>
      </v-col>
    </v-row>
  </div>
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
    // post: {
    //   required: true,
    //   type: Object,
    // },
    postData: {
      type: Array,
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
      this.$emit("updatePost", type);
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
.card-style{
padding: 5px;
box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;

}
</style>
