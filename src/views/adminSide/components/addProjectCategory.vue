<template>
  <div>
    <v-dialog v-model="dialog" max-width="600px">
      <template v-slot:activator="{ on }">
        <v-btn
          small
          color="ashColor"
          class="black--text text-capitalize"
          v-on="on"
          >Add Project Category</v-btn
        >
      </template>
      <v-card class="pt-3 pb-6" color="pop_bg">
        <v-layout justify-end>
          <v-icon @click="close" color="black" class="mr-5">mdi-close </v-icon>
        </v-layout>
        <v-card-text class="subtitle-1 text-center pa-0 ma-0 mb-5"
          ><span> Add Category</span>
        </v-card-text>
        <v-form ref="addPostForm" @submit="addPost()" v-model="valid">
          <div>
            <v-layout justify-center>
              <v-flex xs8>
                <v-text-field
                  :rules="postTextRule"
                  label="Project Category"
                  placeholder="Write any caption"
                  outlined
                  dense
                  v-model="postCaption"
                ></v-text-field>
              </v-flex>
            </v-layout>
            <v-layout justify-center>
              <v-flex xs8>
                <v-textarea
                  :rules="postTextRule"
                  label="Write any discription about this project category"
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
import { addDoc, projectCategory } from "../../../firebase";
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
      await addDoc(projectCategory, {
        category: this.postCaption,
        categoryText: this.postText,
      })
        .then(() => {
          this.dialog = false;
          this.button_loading = false;
          console.log("added finally");
          this.postCaption=''
          this.postText='' 
        // this.$refs.addPostForm.clear() 
          this.$emit("updateProjectCategory");
        })
        .catch(() => {
          this.button_loading = false;
        });
    },
  },
};
</script>
