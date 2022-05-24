<template>
  <v-card width="220" :loading="loading" class="my-4 mx-4 primary">
    <v-img height="250" :src="image" :lazy-src="image">
      <template v-slot:placeholder>
        <v-row class="fill-height ma-0" align="center" justify="center">
          <v-progress-circular
            indeterminate
            color="black lighten-3"
          ></v-progress-circular>
        </v-row>
      </template>
    </v-img>
    <v-card-title>{{ post.postText }}</v-card-title>

    <v-card-text>
      <div>
        Small plates, salads & sandwiches - an intimate setting with 12 indoor
        seats plus patio seating.
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
import { getStorage, ref, getDownloadURL } from "firebase/storage";
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

  methods: {
    updatePost() {
      console.log("root emit updated");
      this.$emit("updatePost"); 
    },
    async getImages(id) {
      const storage = getStorage();
      let data = await getDownloadURL(ref(storage, `albums/${id}.jpg`));
      this.image = data;
    },
    reserve() {
      this.loading = true;

      setTimeout(() => (this.loading = false), 2000);
    },
  },
  created() {
    this.getImages(this.post.id);
  },
};
</script>
