<template>
  <div>
    <div class="my-5">
      <v-carousel
        cycle 
        height="300"
        hide-delimiter-background
        hide-delimiters
        show-arrows="false "
        @change="onChange"
      >
        <!-- <template v-slot:prev="{ on, attrs }">
        <v-btn color="success" icon v-bind="attrs" v-on="on">Previous slide</v-btn>
      </template>
      <template v-slot:next="{ on, attrs }">
        <v-btn color="info" v-bind="attrs" v-on="on">Next slide</v-btn>
      </template> -->
        <v-carousel-item v-for="n in noOfRotation" :key="n">
          <v-row>
            <v-col
              v-for="(slide, i) in urlArray"
              :key="i"
              cols="6"
              xs="2"
              sm="4"
              md="3"
            >
              <v-img
                class="rounded-lg"
                height="280"
                :src="slide.postUrl"
                gradient="to top right, rgba(100,115,201,.33), rgba(25,32,72,.7)"
              ></v-img>
            </v-col>
          </v-row>
        </v-carousel-item>
      </v-carousel>

      <!-- src="https://cdn.vuetifyjs.com/images/parallax/material2.jpg" -->
    </div>
    <v-parallax
      height="300"
      src="https://images3.alphacoders.com/823/82317.jpg"
    >
    </v-parallax>
  </div>
</template>
<script>
export default {
  watch: {
    urlWithOutBannerArray: {
      handler(newValue) {
        this.urlArrayData = newValue;
        let x = newValue.length;
        this.noOfRotation = Math.round(x / 4);
        for (let [index, url] of newValue.entries()) {
          console.log(index);
          if (index < 4) {
            this.urlArray.push(url);
          } else {
            return;
          }
        }
      },
    },
  },
  data() {
    return {
      urlArray: [],
      urlArrayData: [],
      noOfRotation: 1,
    };
  },
  methods: {
    onChange(value) {
      let noOfData = value * 4;
      console.log(noOfData);
      this.urlArray = new Array();
      for (let [index, url] of this.urlArrayData.entries()) {
        if (index >= noOfData && index < noOfData + 4) {
          this.urlArray.push(url);
        }
      }
    },
  },
};
</script>
