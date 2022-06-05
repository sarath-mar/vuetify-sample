<template>
  <div>
    <v-dialog v-model="dialog" max-width="600px">
      <template v-slot:activator="{ on }">
        <v-btn small color="ashColor" class="black--text text-capitalize" v-on="on"
          >Add Video Url</v-btn
        >
      </template>
      <v-card class="pt-3 pb-6" color="pop_bg">
        <v-layout justify-end>
          <v-icon @click="close" color="black" class="mr-5">mdi-close </v-icon>
        </v-layout>
        <v-card-text class="subtitle-1 text-center pa-0 ma-0"
          ><span> Add Video</span>
        </v-card-text>
        <v-form ref="addPostForm" @submit="addPost()" v-model="valid">
          <div>
            <v-layout justify-center>
              <v-flex xs8>
                <v-text-field
                  :rules="postTextRule"
                  label="youtube url"
                  placeholder="Copy any youtube url"
                  outlined
                  dense
                  @change="loadURL()"
                  v-model="postUrl"
                ></v-text-field>
                <!-- @keypress.native.enter="loadURL()" -->
              </v-flex>
            </v-layout>
            <v-layout justify-center v-if="result">
              <v-flex xs8>
                <span>
                  <iframe
                    width="100%"
                    height="150"
                    :src="result"
                    frameborder="0"
                    allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                    allowfullscreen
                  ></iframe>
                </span>
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
            <v-layout justify-center>
              <v-flex xs8>
                <v-textarea
                  :rules="postTextRule"
                  label="Write any discription about this video "
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
import { videoCollection, addDoc } from "../../../firebase";
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
      result: "",
      youtubeURL: "",
      postUrl: "",
      youtubeQueUrl: "",
      validUrl: true,
    };
  },
  methods: {
    loadURL() {
      this.result = "";
      this.validUrl = true;
      this.youtubeURL = this.postUrl;
      const youtubeEmbedTemplate = "https://www.youtube.com/embed/";
      const url = this.youtubeURL.split(
        /(vi\/|v%3D|v=|\/v\/|youtu\.be\/|\/embed\/)/
      );
      console.log("url", url);
      const YId =
        undefined !== url[2] ? url[2].split(/[^0-9a-z_/\\-]/i)[0] : url[0];
      console.log("YId", YId);
      if (YId === url[0]) {
        this.validUrl = false;
        console.log("not a youtube link");
      } else {
        console.log("it's  a youtube video");
      }
      const topOfQueue = youtubeEmbedTemplate.concat(YId);
      console.log("topOfQueue", topOfQueue);
      this.result = topOfQueue;
      this.youtubeQueUrl = topOfQueue;
      this.youtubeURL = "";
    },
    close() {
      this.error = null;
      this.dialog = false;
    },
    async addPost() {
      if (!this.validUrl) {
        this.snackbarColor = "red";
        this.text = "Youtube video url is not valid";
        this.snackbar = true;
      }
      this.button_loading = true;

      let data = await addDoc(videoCollection, {
        postCaption: this.postCaption,
        postText: this.postText,
        postUrl: this.postUrl,
        youtubeQueUrl: this.youtubeQueUrl,
      });
      if (data) {
        this.button_loading = false;
        this.snackbarColor = "green";
        this.text = "Youtube video url is added";
        this.snackbar = true;
        this.dialog = false;
        this.$emit("updatePost");
        this.$refs.form.reset();
        this.postCaption =
          this.postText =
          this.postUrl =
          this.youtubeQueUrl =
            "";
      }
      this.button_loading = false;
    },
  },
};
</script>
