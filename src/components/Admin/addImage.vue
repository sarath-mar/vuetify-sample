<template>
  <div>
    <v-dialog v-model="dialog" max-width="600px">
      <template v-slot:activator="{ on }">
        <!-- <v-icon  color="red" class="ms-2">mdi-delete</v-icon> -->
        <v-btn v-on="on">Add Image</v-btn>
      </template>
      <v-card class="pt-3 pb-6" color="pop_bg">
        <v-layout justify-end>
          <v-icon @click="close" color="black" class="mr-5">mdi-close </v-icon>
        </v-layout>
        <v-card-text class="subtitle-1 text-center pa-0 ma-0"
          ><span> Add Image</span>
        </v-card-text>
        <div>
          <v-layout justify-center>
            <v-flex md8 class="mr-2 ">
              <v-file-input
                :rules="rules"
                accept="image/png, image/jpeg, image/bmp"
                placeholder="Pick an avatar"
                prepend-icon="mdi-camera"
                label="Image"
              ></v-file-input>
            </v-flex>
          </v-layout>
          <v-layout justify-center>
            <v-flex md8>
              <v-textarea
                label="Write any discription about this photo "
                auto-grow
                outlined
                rows="3"
                row-height="25"
                shaped
              ></v-textarea>
            </v-flex>
          </v-layout>
        </div>
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
export default {
  data() {
    return {
      snackbar: false,
      text: "",
      snackbarColor: "",
      valid: true,
      dialog: false,
      button_loading: false,
      show_alert: false,
      error: null,
      rules: [
        (value) =>
          !value ||
          value.size < 2000000 ||
          "Avatar size should be less than 2 MB!",
      ],
    };
  },
  methods: {
    close() {
      this.error = null;
      this.dialog = false;
    },
  },
};
</script>
