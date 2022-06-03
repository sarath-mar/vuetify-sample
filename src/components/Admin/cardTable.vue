<template>
  <v-hover v-slot="{ hover }" open-delay="200">
    <v-card
      width="220"
      :elevation="hover ? 25 : 2"
      :class="{ 'on-hover': hover }"
      :loading="loading"
      class="my-4 mx-4 ashColor cardClass"
    >
      <v-img height="250" :src="post.postUrl" :lazy-src="post.postUrl">
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
  </v-hover>
</template>
<script>
// import { getStorage, ref, getDownloadURL } from "firebase/storage";
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
  methods: {
    updatePost() {
      console.log("root emit updated");
      this.$emit("updatePost");
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
  transform: scale(1.05);
}
.cardClass {
  transition: transform 0.2s;
}
</style>
