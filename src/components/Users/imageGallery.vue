<template>
  <div class="pt-5 mt-10 ma-5">
  
    <image-view :imageView="imageView" :imageData="imageData" />
    <!-- <v-layout class="mt-10" wrap justify-center>
      <span v-for="( post,index ) in postData" :key="index">  
        <v-flex sm12 md12 class="ma-5"> -->
          <v-container fluid>
            <v-row>
              <v-col
                v-for="( post,index ) in postData" :key="index" 
                cols="12"
                md="4"
              >
          <v-img
            @click="clickedForImage(post)"
           height="300px"   
            :src="post.postUrl"
            :lazy-src="post.postUrl"
            aspect-ratio="1"
            class="grey lighten-2 red cardClass rounded-xl"
          >
            <template v-slot:placeholder>
              <v-row class="fill-height ma-0" align="center" justify="center">
                <v-progress-circular
                  indeterminate
                  color="black lighten-3"
                ></v-progress-circular>
              </v-row>
            </template>
          </v-img>
              </v-col>
            </v-row>
          </v-container>
        
        <!-- </v-flex>
      </span>
    </v-layout> -->
       
  </div>
</template>

<script>
import imageView from "./components/imageView.vue";
export default {
  components: { imageView },
  data() {
    return {
      imageView: false,
      imageData: {},
    };
  },
  methods: {
    clickedForImage(data) {
      console.log("clicked");
      this.imageView = !this.imageView; 
      console.log(data);
      this.imageData = data;
    },
  },
};
</script>
<style>
.cardClass:hover {
  cursor: pointer;
  transform: scale(1.05);
}
.cardClass {
  transition: transform 0.2s;
}
</style>
