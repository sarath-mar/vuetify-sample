<template>
  <div>
    <v-dialog v-model="dialog" max-width="600px">
      <template v-slot:activator="{ on }">
        <v-btn small color="ashColor" class="black--text text-capitalize " v-on="on" 
          >Add Document</v-btn
        >
      </template>
      <v-card class="pt-3 pb-6" color="pop_bg">
        <v-layout justify-end>
          <v-icon @click="close" color="black" class="mr-5">mdi-close </v-icon>
        </v-layout>
        <v-card-text class="subtitle-1 text-center pa-0 ma-0"
          ><span> Add Document</span>
        </v-card-text>
        <v-form ref="addPostForm" @submit="addPost()" v-model="valid">
          <div>
            <v-layout justify-center>
              <v-flex xs8 class="mr-2">
                <v-file-input
                  :rules="rules"
                  show-size
                  counter
                  accept="application/pdf"
                  placeholder="Drop an pdf"
                  label="Document"
                  v-model="postDocument"
                ></v-file-input>
              </v-flex>
            </v-layout>
            <v-layout justify-center>
              <v-flex xs8>
                <v-text-field
                  :rules="postTextRule"
                  label="Caption"
                  placeholder="Write any caption"
                  outlined
                  dense
                  v-model="postCaption"
                ></v-text-field>
              </v-flex>
            </v-layout>
            <!-- <v-layout justify-center>
              <v-flex xs8>
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
import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";
import { updateDoc, doc } from "@firebase/firestore";
import { documentCollection, addDoc } from "../../../firebase";
export default {
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
          value.size < 5000000 ||
          "Document size should be less than 5 MB!",
      ],
      postText: "",
      postDocument: "",
      postType: "",
      postCaption: "",
      postTextRule: [(value) => !!value || "Text field is not be empty"],
    };
  },
  methods: {
    close() {
      this.error = null;
      this.dialog = false;
    },
    async addPost() {
      this.button_loading = true;
      let data = await addDoc(documentCollection, {
        postCaption: this.postCaption,
        postText: this.postText,
      });
      if (data && this.postDocument) {
        let postUrl = "";
        var storageRef = ref(getStorage(), `documents/${data.id}.pdf`);
        // const metadata = {
        //   contentType: "application/pdf",
        // }; 
        uploadBytes(storageRef, this.postDocument)
          .then(async (snapshot) => {
            console.log("Uploaded a pdf document or file!");
            console.log(snapshot);
            postUrl = await getDownloadURL(storageRef);
            if (postUrl) {
              let docRef = doc(documentCollection, data.id);
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
