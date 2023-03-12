<template>
  <div>
    <v-dialog v-model="dialog" max-width="300px">
      <template v-slot:activator="{ on }">
        <v-icon v-on="on" color="red" class="ms-2">mdi-delete</v-icon>
      </template>
      <v-card class="pt-1 pb-5" color="ashColor">
        <v-card-text class="subtitle-1 mb-0 mt-6 text-center red--text"
          >Delete this post :
          <span font-weight-bold> {{ post.postText }} </span> ?</v-card-text
        >

        <v-card-text v-if="error" class="error--text font-weight-bold">{{
          error
        }}</v-card-text>
        <v-card-actions justify="center">
          <v-row justify="center">
            <v-btn small color=" mx-2 error" depressed @click="close">No</v-btn>
            <v-btn
              small
              color=" mx-2 success"
              depressed
              :loading="button_loading"
              @click="
                button_loading = true;
                deleteMethod(post);
              "
              >Yes</v-btn
            >
          </v-row>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-snackbar
      v-model="snackbar"
      timeout="3000"
      right
      top
      :color="snackbarColor"
    >
      {{ text }}
    </v-snackbar>
  </div>
</template>

<script>
import { getStorage, ref, deleteObject } from "firebase/storage";
import { deleteDoc, doc } from "@firebase/firestore";
import {
  bannerCollection,
  projectCollection,
  singlesCollection,
  storyCollection,
} from "../../firebase";
export default {
  props: {
    post: {
      required: true,
    },
  },
  data() {
    return {
      valid: true,
      dialog: false,
      button_loading: false,
      show_alert: false,
      error: null,
      snackbar: false,
      snackbarColor: "",
      text: "",
    };
  },
  methods: {
    deleteMethod(post) {
      console.log(post);
      let id = post.id ? post.id : "";
      let postType = post.postType ? post.postType : "";

      let collection;
      let typeMsg;
      if (postType === "STORY") {
        collection = storyCollection;
        typeMsg = "story";
      }
      if (postType === "SINGLE") {
        collection = singlesCollection;
        typeMsg = "single";
      }
      if (postType === "PROJECT") {
        collection = projectCollection;
        typeMsg = "project";
      }
      if (postType === "BANNER") {
        collection = bannerCollection;
        typeMsg = "banner";
      }
      console.log(typeMsg);
      if (collection && id) {
        const docRef = doc(collection, id);
        deleteDoc(docRef)
          .then(() => {
            console.log("deleted post");
            const storage = getStorage();
            const desertRef = ref(storage, `albums/${id}.jpg`);
            deleteObject(desertRef)
              .then(() => {
                (this.snackbar = true),
                  (this.snackbarColor = "green"),
                  (this.text = "Deleted Sucessfully"),
                  console.log("deleted image");
                this.dialog = false;

                this.$emit("updatePost");
              })
              .catch((error) => {
                console.log(error);
              });
          })
          .catch((e) => {
            console.log(e);
          });
      }
    },
    close() {
      this.error = null;
      this.dialog = false;
    },
  },
};
</script>
