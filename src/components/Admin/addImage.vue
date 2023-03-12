<template>
  <div>
    <v-dialog v-model="dialog" max-width="600px">
      <template v-slot:activator="{ on }">
        <v-btn
          small
          color="ashColor"
          class="black--text text-capitalize"
          v-on="on"
          >Add Image</v-btn
        >
      </template>
      <v-card class="pt-3 pb-6" color="pop_bg">
        <v-layout justify-end>
          <v-icon @click="close" color="black" class="mr-5">mdi-close </v-icon>
        </v-layout>
        <v-card-text class="subtitle-1 text-center pa-0 ma-0"
          ><span> Add Image</span>
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
            <v-layout justify-center>
              <v-flex xs8>
                <v-text-field
                  :rules="postTextRule"
                  label="Caption"
                  placeholder="Write any caption"
                  outlined
                  dense
                  type="number"
                  v-model="postCaption"
                ></v-text-field>
              </v-flex>
            </v-layout>
            <v-layout justify-center>
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
            </v-layout>
            <v-layout v-if="postType === 'STORY'" justify-center>
              <v-flex xs8>
                <v-autocomplete
                  v-model="postWorkCategory"
                  :rules="[
                    () => !!postWorkCategory || 'This field is required',
                  ]"
                  :items="storyCategoryList"
                  item-text="category"
                  item-value="id"
                  label="Story Category Type"
                  placeholder="Select..."
                  required
                  outlined
                  dense
                ></v-autocomplete>
              </v-flex>
            </v-layout>
            <v-layout v-if="postType === 'PROJECT'" justify-center>
              <v-flex xs8>
                <v-autocomplete
                  v-model="postWorkCategory"
                  :rules="[
                    () => !!postWorkCategory || 'This field is required',
                  ]"
                  :items="projectCategoryList"
                  item-text="category"
                  item-value="id"
                  label="Project Category Type"
                  placeholder="Select..."
                  required
                  outlined
                  dense
                ></v-autocomplete>
              </v-flex>
            </v-layout>
            <v-layout justify-center>
              <v-flex xs8>
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
import {
  // postCollection,
  addDoc,
  getDocs,
  bannerCollection,
  singlesCollection,
  storyCategory,
  projectCategory,
  projectCollection,
  storyCollection,
} from "../../firebase";
import { updateDoc, doc } from "@firebase/firestore";
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
          !value ||
          value.size < 200000000 ||
          "Avatar size should be less than 200 MB!",
      ],
      postText: "",
      postImage: "",
      postType: "",
      postCaption: "",
      postTextRule: [(value) => !!value || "Text field is not be empty"],
      storyCategoryList: [],
      projectCategoryList: [],
      postWorkCategory: "",
    };
  },
  watch: {
    postType(newVal) {
      if (newVal === "STORY") {
        this.storyCategoryData();
      }
      if (newVal === "PROJECT") {
        this.projectCategoryData();
      }
    },
  },
  methods: {
    close() {
      this.error = null;
      this.dialog = false;
    },
    async storyCategoryData() {
      let result = new Array();
      let data = await getDocs(storyCategory);
      data.forEach((doc) => {
        let documentData = doc.data();
        documentData.id = doc.id;
        result.push(documentData);
      });
      this.storyCategoryList = result;
    },
    async projectCategoryData() {
      let result = new Array();
      let data = await getDocs(projectCategory);
      data.forEach((doc) => {
        let documentData = doc.data();
        documentData.id = doc.id;
        result.push(documentData);
      });
      this.projectCategoryList = result;
    },
    async addPostTypes(postObject, collection, typeMsg, cb) {
      let data = await addDoc(collection, postObject);
      if (data && this.postImage) {
        let postUrl = "";
        var storageRef = ref(getStorage(), `albums/${data.id}.jpg`);
        uploadBytes(storageRef, this.postImage)
          .then(async (snapshot) => {
            console.log("Uploaded a blob or file!");
            console.log(snapshot);
            postUrl = await getDownloadURL(storageRef);
            if (postUrl) {
              let docRef = doc(collection, data.id);
              await updateDoc(docRef, {
                postUrl,
              })
                .then(() => {
                  cb(true, typeMsg);
                })
                .catch(() => {
                  cb(false, typeMsg);
                });
            }
          })
          .catch(() => {
            cb(false, typeMsg);
          });
      }
    },
    async addPost() {
      this.button_loading = true;
      let postObject = {
        postCaption: JSON.parse(this.postCaption),
        postText: this.postText,
        postType: this.postType,
      };
      let collection;
      let typeMsg;
      if (this.postType === "STORY") {
        postObject.categoryId = this.postWorkCategory;
        collection = storyCollection;
        typeMsg = "story";
      }
      if (this.postType === "SINGLE") {
        collection = singlesCollection;
        typeMsg = "single";
      }
      if (this.postType === "PROJECT") {
        postObject.categoryId = this.postWorkCategory;
        collection = projectCollection;
        typeMsg = "project";
      }
      if (this.postType === "BANNER") {
        collection = bannerCollection;
        typeMsg = "banner";
      }

      if (this.postType) {
        await this.addPostTypes(
          postObject,
          collection,
          typeMsg,
          (succes, typeMsg) => {
            if (succes) {
              this.button_loading = false;
              this.dialog = false;
              console.log(`added ${typeMsg} finally`);
              this.postCaption = "";
              this.postText = "";
              this.postType = "";
              this.postWorkCategory = "";
              this.postImage = "";
              this.$emit("updatePost");
            } else {
              this.button_loading = false;
              this.dialog = false;
              console.log(`error in ${typeMsg} `);
            }
          }
        );
      }
    },
  },
};
</script>
