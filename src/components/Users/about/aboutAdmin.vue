<template>
        <div class="about-details mt-5">
          <div class="admin-img">
            <v-img
           
              aspect-ratio="1"
              class="about-image"
              :src="aboutData.postUrl"
              :lazy-src="aboutData.postUrl"
            >
              <template v-slot:placeholder>
                <v-row class="fill-height ma-0" align="center" justify="center">
                  <v-progress-circular
                    indeterminate
                    color="grey-lighten-5"
                  ></v-progress-circular>
                </v-row> </template
            ></v-img>
          </div>
          <div v-if="aboutData.postText" class="admin-content">
            <h3 class="text-center">Biography</h3>
            <pre class="content">{{ aboutData.postText }}</pre>
            <!-- <h4 class="name text-right mt-10">Madhuraj</h4> -->
          </div>
        </div>
</template>
<script>
import { getDocs } from "@firebase/firestore";
import { aboutCollection } from "../../../firebase";
export default {
  props: {
    updated: {},
  },
  watch: {
    updated() {
      this.getAboutData();
    },
  },
  // google-site-verification=mJDqc_rnghJhfo34t_dLxot-tG1iuqRo28DZdO8gv98
  data: () => ({
    show: false,
    items: {
      color: "#1F7087",
      src: "https://cdn.vuetifyjs.com/images/cards/foster.jpg",
      content:
        "Photography is the art, application, and practice of creating durable images by recording light, either electronically by means of an image sensor, or chemically by means of a light-sensitive material such as photographic film. It is employed in many fields of science, manufacturing (e.g., photolithography), and business, as well as its more direct uses for art, film and video production, recreational purposes, hobby, and mass communication. Typically, a lens is used to focus the light reflected or emitted from objects into a real image on the light-sensitive surface inside a camera during a timed exposure. With an electronic image sensor, this produces an electrical charge at each pixel, which is electronically processed and stored in a digital image file for subsequent display or processing. The result with photographic emulsion is an invisible latent image, which is later chemically developed into a visible image, either negative or positive, depending on the purpose of the photographic material and the method of processing. A negative image on film is traditionally used to photographically create a positive image on a paper base, known as a print, either by using an enlarger or by contact printing.",
      artist: "Madhuraj",
    },
    aboutData: {},
    loader: false,
  }),
  methods: {
    // onBeforeEnter() {
    //   console.log("b ente");
    // },
    // onEnter() {
    //   console.log("ente");
    // },
    // onAfterEnter() {
    //   console.log("a ente");
    // },
    async getAboutData() {
      this.loader = true;
      let result = new Array();
      let data = await getDocs(aboutCollection);
      data.forEach((doc) => {
        let aboutData = doc.data();
        aboutData.id = doc.id;
        result.push(aboutData);
      });
      console.log("result");
      console.log(result);
      if (result.length) {
        this.aboutData = result[0];
        this.$emit("aboutId", this.aboutData.id);
        this.loader = false;
      } else {
        this.loader = false;
      }
    },
    // methods: {

    // },
  },
  created() {
    this.getAboutData();
  },
};
</script>

<style scoped>
.name {
  font-size: 20px;
  opacity: 0.7;
}
.content {
  font-weight: 300;
  font-size: 14px;
  letter-spacing: 1.1px;
  margin-top: 20px;
  text-align: justify;
  white-space: pre-wrap;
  /* font-family: 'Anton', sans-serif; */
  /* font-family: "Courier Prime", monospace; */
  font-family: "Poppins", sans-serif;
}

.admin-content {
  /* flex: 1; */
}

.about-image {
  /* height: 100%; */
  background-size: cover;
  border-radius: 5px;
  min-width: 30vw;
  margin-top: 50px;
  float: left;
  margin-bottom: 20px;
  /* min-height: 70vh; */
}
.about-details {
  /* background-color: red; */
  /* display: flex; */
  align-items: flex-start;
 
  /* align-items: flex-end; */
  /* flex-wrap: wrap; */
  gap: 20px;
}
@media screen and (max-width: 960px) {
  /* .about-details {
    flex-direction: column;
    align-items: normal;
  } */
  .about-image {
    width: 95%;
    margin: auto;
    margin-top: 0px;
  }
}
</style>
