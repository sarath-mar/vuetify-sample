<template>
  <v-card width="90% " class="mx-auto mt-10" outlined color="background">
    <v-container>
      <v-row dense>
        <v-col v-for="(item, i) in items" :key="i" cols="12">
          <!-- <v-card :color="item.color" dark> -->
          <div class="d-flex flex-no-wrap justify-space-between">
            <div>
              <v-card-title class="text-h3" v-text="item.artist"></v-card-title>

              <v-card-subtitle
                class="mt-5 ml-10"
                v-text="item.content"
              ></v-card-subtitle>
              <v-card-actions>
                <v-btn
                  @click="show = !show"
                  class="ml-2 mt-5"
                  outlined
                  rounded
                  small
                >
                  START PROJECT
                </v-btn>
              </v-card-actions>
              <transition name="fade">
                <div v-if="show">
                  <h1>Its Me Saraath</h1>
                </div>
              </transition>
            </div>

            <v-avatar class="ma-3" size="125" tile>
              <v-img :src="item.src"></v-img>
            </v-avatar>
          </div>
          <!-- </v-card> -->
        </v-col>
      </v-row>
    </v-container>
  </v-card>
</template>
<script>
export default {
  data: () => ({
    show: false,
    items: [
      {
        color: "#1F7087",
        src: "https://cdn.vuetifyjs.com/images/cards/foster.jpg",
        content:
          "Photography is the art, application, and practice of creating durable images by recording light, either electronically by means of an image sensor, or chemically by means of a light-sensitive material such as photographic film. It is employed in many fields of science, manufacturing (e.g., photolithography), and business, as well as its more direct uses for art, film and video production, recreational purposes, hobby, and mass communication. Typically, a lens is used to focus the light reflected or emitted from objects into a real image on the light-sensitive surface inside a camera during a timed exposure. With an electronic image sensor, this produces an electrical charge at each pixel, which is electronically processed and stored in a digital image file for subsequent display or processing. The result with photographic emulsion is an invisible latent image, which is later chemically developed into a visible image, either negative or positive, depending on the purpose of the photographic material and the method of processing. A negative image on film is traditionally used to photographically create a positive image on a paper base, known as a print, either by using an enlarger or by contact printing.",
        artist: "Madhuraj",
      },
    ],
  }),
  methods: {
    onBeforeEnter() {
      console.log("b ente");
    },
    onEnter() {
      console.log("ente");
    },
    onAfterEnter() {
      console.log("a ente");
    },
  },
};
</script>

<style scoped>
.font {
  font-size: 120px;
}
/* .fade-enter-active, .fade-leave-active{ 
  transition: opacity 2.5s ease-out; 
}
.fade-enter , .fade-leave-to{  
  opacity:0 ;  
} */
/* .fade-enter-active {
  transition: all 0.3s ease-out;
} */

.fade-leave-active,
.fade-enter-active {
  transition: all 0.8s cubic-bezier(1, 0.5, 0.8, 1);
}

.fade-enter,
.fade-leave-to {
  transform: translateX(20px);
  opacity: 0;
}
</style>
