<template>
  <v-sheet class="mx-auto background" >
    <!-- <v-slide-group v-model="model" show-arrows>
      <v-slide-item
        v-for="single in singlesArray"
        :key="single"
        v-slot="{ active, toggle }"
      >
        <v-card
          :color="active ? 'primary' : 'grey lighten-1'"
          class="ma-4 rounded-xl"
          height="400"
          width="300"
          @click="toggle"
        >
          <v-row class="fill-height" align="center" justify="center">
            <v-scale-transition>
              <v-card rounded="xl">
                <v-img height="420" width="300" :src="single.postUrl"></v-img>
              </v-card>
            </v-scale-transition>
          </v-row>
        </v-card>
      </v-slide-item>
    </v-slide-group>

    <v-expand-transition >
      <v-sheet v-if="model != null" min-height="60" tile class="background">  
        <v-layout justify-center class="mt-6 mx-5">
          <h3 class="text-h6 font-weight-light">{{ displayContent(model).postCaption }}</h3>
        </v-layout>
        <v-layout justify-center class="mt-2 mx-5 " > 
          <p class="font-weight-light grey--text  text-justify">{{ displayContent(model).postText }}</p>   
        </v-layout>
      </v-sheet>
    </v-expand-transition> -->
  </v-sheet>
</template>
<script>
export default {
  data: () => ({
    model: null,
  }),
  methods: {
    displayContent(index) {
      if (index >= 0) {
        let data = this.singlesArray[index];
        let postCaption = data.postCaption;
        let postText = data.postText;
        return { postCaption, postText };
      }
    },
  },
};
</script>
