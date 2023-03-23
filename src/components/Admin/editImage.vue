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
            <!-- <v-layout justify-center>
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
            </v-layout> -->
            <v-layout class="mt-5" justify-center>
              <v-flex xs8>
                <v-text-field
                  :rules="postTextRule"
                  label="Caption"
                  placeholder="Write any caption"
                  outlined
                  dense
                  v-model="postCaption"
                  type="number"
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
                  disabled
                ></v-autocomplete>
              </v-flex>
            </v-layout>
            <!-- <v-layout v-if="postType === 'STORY'" justify-center>
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
            </v-layout> -->
            <v-layout v-if="subDataNeeded.includes(postType)" justify-center>
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
            <!-- <v-layout v-if="postType === 'PORTRAIT'" justify-center>
              <v-flex xs8>
                <v-autocomplete
                  v-model="postWorkCategory"
                  :rules="[
                    () => !!postWorkCategory || 'This field is required',
                  ]"
                  :items="projectCategoryList"
                  item-text="category"
                  item-value="id"
                  label="Portrait Category Type"
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
                Update
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
import { getStorage, ref, getDownloadURL } from "firebase/storage";
import {
  bannerCollection,
  portraitCollection,
  postCollection,
  projectCategory,
  projectCollection,
  singlesCollection,
  storyCategory,
  storyCollection,
} from "../../firebase";
import { updateDoc, doc, getDocs } from "@firebase/firestore";
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
      storyCategoryList: [],
      projectCategoryList: [],
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
      postWorkCategory: "",
      counter: 0,
      subDataNeeded: ["STORY", "PROJECT", "PORTRAIT"],
    };
  },
  methods: {
    async storyCategoryData() {
      let result = new Array();
      let data = await getDocs(storyCategory);
      data.forEach((doc) => {
        let documentData = doc.data();
        documentData.id = doc.id;
        result.push(documentData);
      });
      this.projectCategoryList = result;
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
    async potraitCategoryData() {
      
      this.projectCategoryList = [{category:"Singles",id:"Singles"},{category:"Stories",id:"Stories"}];
    },
    async getImages(id) {
      const storage = getStorage();
      let data = await getDownloadURL(ref(storage, `albums/${id}.jpg`));
      this.image = data;
    },
    close() {
      this.error = null;
      this.dialog = false;
    },
    async updatePostOldFlow() {
      this.button_loading = true;
      let docRef = doc(postCollection, this.post.id);
      updateDoc(docRef, {
        postText: this.postText,
        postCaption: this.postCaption,
        postType: this.postType,
      })
        .then((data) => {
          console.log(data);
          console.log("updated");
          this.$emit("updatePost");
          this.button_loading = false;
          this.dialog = false;
        })
        .catch((error) => {
          this.button_loading = false;
          this.dialog = false;
          console.log(error);
        });
    },
    async addPostTypes(postObject, collection, typeMsg, cb) {
      let docRef = doc(collection, this.post.id);
      updateDoc(docRef, postObject)
        .then((data) => {
          console.log(data);
          cb(true, typeMsg);
        })
        .catch((error) => {
          cb(false, typeMsg);

          console.log(error);
        });
    },
    async updatePost() {
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
        // typeMsg = "story";
      }
      if (this.postType === "SINGLE") {
        collection = singlesCollection;
        // typeMsg = "single";
      }
      if (this.postType === "PROJECT") {
        postObject.categoryId = this.postWorkCategory;
        collection = projectCollection;
        // typeMsg = "project";
      }
      if (this.postType === "PORTRAIT") {
        postObject.categoryId = this.postWorkCategory;
        collection = portraitCollection;
        // typeMsg = "portrait";
      }
      if (this.postType === "BANNER") {
        collection = bannerCollection;
        // typeMsg = "banner";
      }

      typeMsg = this.postType;
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
              this.$emit("updatePost", typeMsg);
            } else {
              this.button_loading = false;
              this.dialog = false;
              console.log(`error in ${typeMsg} `);
            }
          }
        );
      }
    },
    setValues() {
      this.postType = this.post.postType;
      if (this.post.categoryId) {
        this.postWorkCategory = this.post.categoryId;
      }
      this.postText = this.post.postText;
      this.postCaption = this.post.postCaption;
    },
  },
  watch: {
    dialog(newval) {
      if (newval) {
        console.log("new dialog");
        this.setValues();
      }
    },
    postType(newVal) {
      this.counter == 0 ? "" : (this.postWorkCategory = "");
      this.counter++;
      if (newVal === "STORY") {
        this.storyCategoryData();
      }
      if (newVal === "PROJECT") {
        this.projectCategoryData();
      }
      if (newVal === "PORTRAIT") {
        this.potraitCategoryData();
      }
    },
  },
};
</script>
