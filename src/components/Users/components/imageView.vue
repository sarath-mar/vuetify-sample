<template>
  <v-container>
    <v-dialog v-model="dialog" width="700px">
      <v-img
        :src="imageData.postUrl"
        height="70vh"
        :aspect-ratio="1.7"
        class="grey darken-4"
      ></v-img>
      <v-card>
        <v-card-title class="text-h6"
          >{{ imageData.postCaption }}
        </v-card-title>
        <v-card-text>
          <div>
            {{ imageData.postText }}
          </div>
        </v-card-text>
      </v-card>
    </v-dialog>
  </v-container>
</template>
<script>
export default {
  props: {
    imageView: {},
    imageData: {},
  },
  data() {
    return {
      dialog: false,
    };
  },
  watch: {
    imageView: {
      handler() {
        this.dialog = true;
      },
    },
  },
};
</script>
