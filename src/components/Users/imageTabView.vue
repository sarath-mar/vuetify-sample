<template>
  <v-card class="mx-10 background" flat>
    <v-card-title><span class="heading">Gallery</span></v-card-title> 
    <v-tabs class="background " v-model="tab" color="deep-purple accent-4" center> 
      <v-tab class="background " v-for="itemImage in imageData" :key="itemImage.value"
        ><span class="text-capitalize "> {{ itemImage.text }}</span></v-tab
      >

      <v-tabs-items v-model="tab">
        <v-tab-item class="background" v-for="items in imageData" :key="items.value"> 
          <v-container fluid>
            <v-row>
              <v-col
                v-for="item in tabData"
                :key="item.postUrl"
                cols="12"
                md="4"
              >
                <v-hover v-slot="{ hover }">
                  <v-card class="rounded-xl">
                    <v-img
                      height="250px "
                      :src="item.postUrl"
                      :lazy-src="item.postUrl"
                      aspect-ratio="1"
                    >
                      <v-expand-transition>
                        <div
                          v-if="hover"
                          class="d-flex  transition-fast-in-fast-out orange lighten-2 v-card--reveal white--text"
                          style="height: 100%"
                        >
                        <v-layout justify-center > <span class="pa-4">{{ item.postText }}</span></v-layout> 
                       
                          
                        </div>
                      </v-expand-transition>
                    </v-img>

                    <v-card-title class="text-h6 text-center"
                      ><v-layout justify-center>
                        {{ item.postCaption }}</v-layout
                      >
                    </v-card-title>
                    <!-- <v-card-text>
                <div>
                  {{ item.postText }} 
                </div>
              </v-card-text> -->
                  </v-card>
                </v-hover>
              </v-col>
            </v-row>
          </v-container>
        </v-tab-item>
      </v-tabs-items>
    </v-tabs>
  </v-card>
</template>
<script>
export default {
  data() {
    return {
      tabData: [],
      tab: null,
      imageData: [],
    };
  },
  watch: {
    tab: {
      handler(newValue) {
        console.log("hey");
        let value = this.imageData[newValue].value;
        if (value) {
          this.tabData = new Array();
          this.tabData = this.postData.filter((x) => x.postType == value);
        }
      },
      // immediate: true,
      deep: true,
    },
    postData() {
      let value = this.imageData[this.tab].value;
      if (value) {
        this.tabData = new Array();
        this.tabData = this.postData.filter((x) => x.postType == value);
      }
    },
  },
  created() {
    this.imageData = this.imageType.filter((x) => x.value != "BANNER");
    this.tab = 0;
    let value = this.imageData[0].value;
    if (value) {
      this.tabData = new Array();
      this.tabData = this.postData.filter((x) => x.postType == value);
    }
  },
};
</script>
<style >
  .v-slide-group__content{ 
        background-color: #f5f4f0  ;
  }
</style>
