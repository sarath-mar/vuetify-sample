<template>
  <div class="mt-5 ml-5">
    <h4 class="text--red">{{ categoryName }}</h4>
    <h5 class="my-3 mr-sm-10 categroy-details">{{ categoryDetails }}</h5>

    <div class="mt-5">
      <!-- <template> -->
      <!-- <v-row> -->
        <div class="text-center pa-10 "  v-if="!postData.length">
          <v-progress-circular
            :size="100"
            :width="8"
            color="red"
            class="m-auto "
            indeterminate
          ></v-progress-circular>
        </div>
      <!-- </v-row> -->
      <v-row>
        <v-col
          v-for="data in postData"
          :key="data.id"
          class="child-flex"
          cols="12"
          sm="6"
          md="4"
          lg="3"
        >
          <v-img
            :src="data.postUrl"
            :lazy-src="data.postUrl"
            aspect-ratio="1"
            class="bg-grey-lighten-2"
          >
            <template v-slot:placeholder>
              <v-row class="fill-height ma-0" align="center" justify="center">
                <v-progress-circular
                  indeterminate
                  color="grey-lighten-5"
                ></v-progress-circular>
              </v-row>
            </template>
          </v-img>
          <div>
            <p class="mt-2">{{ data.postText }}</p>
          </div>
        </v-col>
      </v-row>
      <!-- </template> -->
    </div>
  </div>
</template>

<script>
import { getDocs, orderBy, query, where } from "firebase/firestore";
import { projectCollection } from "../../../firebase";
export default {
  data() {
    return {
      postData: [],
      categoryName: "",
      categoryDetails: "",
    };
  },
  watch: {
    "$route.query.id": {
      handler() {
        console.log("id change");
        this.postData = [];
        this.getDataOfId();
      },
    },
  },
  methods: {
    async getDataOfId() {
      let routeData = this.$route.query;
      let id = routeData.id;
      this.categoryName = routeData.category;
      this.categoryDetails = routeData.text;
      if (id) {
        let result = new Array();
        const q = query(
          projectCollection,
          orderBy("postCaption", "asc"),
          where("categoryId", "==", id)
        );
        let data = await getDocs(q);
        console.log("data", data);
        data.forEach((doc) => {
          let documentData = doc.data();
          documentData.id = doc.id;
          result.push(documentData);
        });
        this.postData = result;
        console.log(result);
      }
    },
  },
  created() {
    this.getDataOfId();
    // console.log('created');
    // console.log(this.$route.query)
    // if (id) this.getDataOfId(id);
  },
  updated() {
    console.log("updated");
  },
  mounted() {
    console.log("mounted");
  },
};
</script>

<style>
.categroy-details {
  font-weight: 300;
  font-size: 14px;
  letter-spacing: 1.1px;
  /* inline-size: 1px; */
}

</style>
