<template>
  <v-hover v-slot="{ hover }" open-delay="200">
    <v-card
      width="220"
      :elevation="hover ? 25 : 2"
      :class="{ 'on-hover': hover }"
      :loading="loading"
      class="my-4 mx-4 ashColor  cardClass"
    >
      <iframe
        width="100%"
        height="150"
        :src="post.youtubeQueUrl"
        frameborder="0"
        allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
        allowfullscreen
      ></iframe>
      <v-card-title > <span >{{ post.postCaption }}</span></v-card-title>  

      <v-card-text style="overflow-y: auto; height: 40px">  
        <div class="grey--text "> 
          {{ post.postText }}
        </div>
      </v-card-text>
      <v-card-actions>
        <v-layout v-if="$route.name!=='Video-Gallery'" justify-center >
          <delete-vidoe :post="post" @updatePost="updatePost"/>
          <!-- <DeleteImage  />  -->
        </v-layout>
      </v-card-actions>
    </v-card>
  </v-hover>
</template>
<script>
import deleteVidoe from './deleteVidoe.vue';
export default {
  components: { deleteVidoe },
  props: {
    post: {
      required: true,
      type: Object,
    },
  },

  data: () => ({
    loading: false,
    selection: 1,
    image: "",
  }),
  methods: {
    updatePost() {
      console.log("root emit updated");
      this.$emit("updatePost");
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
