<template>
  <div>
    <v-dialog v-model="dialog" max-width="600px">
      <template v-slot:activator="{ on }">
        <v-icon v-on="on" color="green" class="ms-2">mdi-pen</v-icon>
        <!-- <v-btn v-on="on">Add Image</v-btn> -->
      </template>
      <v-card class="pt-3 pb-6" color="pop_bg">
        <v-layout justify-end>
          <v-icon @click="close" color="black" class="mr-5">mdi-close </v-icon>
        </v-layout>
        <v-card-text class="subtitle-1 text-center pa-0 ma-0"
          ><span> Edit Image</span>
        </v-card-text>
        <v-form ref="updatePostForm" @submit="updatePost()" v-model="valid">
          <div>
            <!-- <v-layout>
              <v-img height="150" width="100" :src="image" :lazy-src="image">
                <v-row class="fill-height ma-0" align="center" justify="center">
                  <template v-slot:placeholder>
                    <v-progress-circular
                      indeterminate
                      color="black lighten-3"
                    ></v-progress-circular>
                  </template>
                </v-row>
              </v-img>
            </v-layout> -->
            <v-layout justify-center>
              <v-flex md8 class="mr-2">
                <v-file-input
                  :rules="rules"
                  accept="image/png, image/jpeg, image/bmp"
                  placeholder="Pick an avatar"
                  prepend-icon="mdi-camera"
                  label="Image"
                  v-model="postImage"
                ></v-file-input>
              </v-flex>
            </v-layout>
            <v-layout justify-center>
              <v-flex md8>
                <v-textarea
                  :rules="postTextRule"
                  label="Write any discription about this photo "
                  auto-grow
                  outlined
                  rows="3"
                  row-height="25"
                  shaped
                  v-model="postText"
                ></v-textarea>
              </v-flex>
            </v-layout>
          </div>
          <v-card-actions>
            <v-layout justify-center>
              <v-btn
                :loading="button_loading"
                @click="updatePost"
                :disabled="!valid"
              >
                Add
              </v-btn>
            </v-layout>
          </v-card-actions>
        </v-form>
      </v-card>
    </v-dialog>
    <v-snackbar
      v-model="snackbar"
      timeout="3000"
      right
      top
      :color="snackbarColor"
      >{{ text }}</v-snackbar
    >
  </div>
</template>
<script>
// uploadBytes
// 
// import { getStorage, ref, } from "firebase/storage";
import { getStorage, ref,
 uploadBytes,
 getDownloadURL, } from "firebase/storage";
import { postCollection, addDoc } from "../../firebase";
export default {
  props: {
    post: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      snackbar: false,
      text: "",
      snackbarColor: "",
      image: "",
      //   valid: false ,
      valid: true,
      dialog: false,
      button_loading: false,
      show_alert: false,
      error: null,
      rules: [
        (value) =>
          !value ||
          value.size < 200000000 ||
          "Avatar size should be less than 200 MB!",
      ],
      postText: "",
      postImage: "",
      postTextRule: [(value) => !!value || "Text field is not be empty"],
    };
  },
  methods: {
    async getImages(id) {
      const storage = getStorage();
      let data = await getDownloadURL(ref(storage, `albums/${id}.jpg`));
      this.image = data;
    },
    close() {
      this.error = null;
      this.dialog = false;
    },
    async updatePost() {
      this.button_loading = true;
      let data = await addDoc(postCollection, {
        postText: this.postText,
      });
    //   await setDoc(postCollection, {
    //     name: "Los Angeles",
    //     state: "CA",
    //     country: "USA",
    //   });
      console.log(data)
        if (data && this.postImage) {
          this.dialog = false;
          var storageRef = ref(getStorage(), `albums/${data.id}.jpg`);
          console.log(storageRef);
          uploadBytes(storageRef, this.postImage).then((snapshot) => {
            console.log("Uploaded a blob or file!");
            console.log(snapshot);
          });

          this.$emit("updatePost");
        }
      this.button_loading = false;
    },
  },

  created() {
    this.getImages(this.post.id);
    this.postText = this.post.postText;
  },
};
</script>
