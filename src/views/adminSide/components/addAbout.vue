<template>
  <div>
    <v-dialog v-model="dialog" max-width="600px">
      <template v-slot:activator="{ on }">
        <v-btn
          small
          color="ashColor"
          class="black--text text-capitalize"
          v-on="on"
          >Update About</v-btn
        >
      </template>
      <v-card class="pt-3 pb-6" color="pop_bg">
        <v-layout justify-end>
          <v-icon @click="close" color="black" class="mr-5">mdi-close </v-icon>
        </v-layout>
        <v-card-text class="subtitle-1 text-center pa-0 ma-0"
          ><span> Update About</span>
        </v-card-text>
        <v-form ref="addPostForm" @submit="addPost()" v-model="valid">
          <div>
            <v-layout justify-center>
              <v-flex xs8 class="mr-2">
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
            <!-- <v-layout justify-center>
              <v-flex xs8 >
                <v-text-field
                  :rules="postTextRule"
                  label="Caption"
                  placeholder="Write any caption"
                  outlined
                  dense
                  v-model="postCaption"
                ></v-text-field>
              </v-flex>
            </v-layout> -->
            <!-- <v-layout justify-center>
              <v-flex xs8 >
                <v-autocomplete
                  v-model="postType"
                  :rules="[() => !!postType || 'This field is required']"
                  :items="imageType"
                  label="Image Type"
                  placeholder="Select..."
                  required
                  outlined
                  dense
                ></v-autocomplete>
              </v-flex>
            </v-layout> -->
            <v-layout justify-center>
              <v-flex xs8>
                <v-textarea
                  :rules="postTextRule"
                  label="Write any discription about this document"
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
                @click="addPost"
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
import {
  deleteObject,
  getDownloadURL,
  getStorage,
  ref,
  uploadBytes,
} from "firebase/storage";
import { updateDoc, doc, deleteDoc } from "@firebase/firestore";
import { aboutCollection, addDoc } from "../../../firebase";
export default {
  props: {
    id: {
      required: true,
    },
  },
  data() {
    return {
      snackbar: false,
      text: "",
      snackbarColor: "",
      //   valid: false ,
      valid: true,
      dialog: false,
      button_loading: false,
      show_alert: false,
      error: null,
      rules: [
        (value) =>
          !!value ||
          value.size < 50000000 ||
          "Document size should be less than 50 MB!",
      ],
      postText: "",
      postImage: "",
      postType: "",
      postCaption: "",
      postTextRule: [(value) => !!value || "Text field is not be empty"],
    };
  },
  methods: {
    deleteMethod(id) {
      const docRef = doc(aboutCollection, id);
      deleteDoc(docRef)
        .then(() => {
          console.log("deleted post");
          const storage = getStorage();
          const desertRef = ref(storage, `about/${id}.jpg`);
          deleteObject(desertRef)
            .then(() => {
              (this.snackbar = true),
                (this.snackbarColor = "green"),
                (this.text = "Deleted Sucessfully"),
                console.log("deleted image");
              this.dialog = false;
            })
            .catch((error) => {
              console.log(error);
            });
        })
        .catch((e) => {
          console.log(e);
        });
    },
    close() {
      this.error = null;
      this.dialog = false;
    },
    async addPost() {
      this.button_loading = true;
      if (this.id) {
        this.deleteMethod(this.id);
      }
    //   await aboutCollection.delete(); 
      let data = await addDoc(aboutCollection, {
        // postCaption: this.postCaption,
        postText: this.postText,
      });
      if (data && this.postImage) {
        let postUrl = "";
        var storageRef = ref(getStorage(), `about/${data.id}.jpg`);
        // const metadata = {
        //   contentType: "application/pdf",
        // };
        uploadBytes(storageRef, this.postImage)
          .then(async (snapshot) => {
            console.log("Uploaded a jpg document or file!");
            console.log(snapshot);
            postUrl = await getDownloadURL(storageRef);
            if (postUrl) {
              let docRef = doc(aboutCollection, data.id);
              await updateDoc(docRef, {
                postUrl,
              })
                .then(() => {
                  this.dialog = false;
                  this.button_loading = false;
                  console.log("added finally");
                  this.$emit("updatePost");
                })
                .catch(() => {
                  this.button_loading = false;
                });
            }
          })
          .catch(() => {
            this.button_loading = false;
          });
      }
    },
  },
};
</script>
