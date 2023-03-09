<template>
  <div class="mt-5 ml-5">
    <h4 class="text--red">{{ categoryName }}</h4>

    <div class="mt-5" >
      <!-- <template> -->
        <v-row >
          <v-col v-for="data in postData" :key="data.id" class="d-flex child-flex" cols="6" md="4" lg="3">
            <v-img
              :src="data.postUrl"
              :lazy-src="data.postUrl"
              aspect-ratio="1"
              cover
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
          </v-col>
        </v-row>
      <!-- </template> -->
    </div>
  </div>
</template>

<script>
import { getDocs, query, where } from "firebase/firestore";
import { projectCollection } from "../../../firebase";
export default {
  data() {
    return {
      postData: [],
      categoryName: "",
    };
  },
  watch: {
    "$route.query.id": {
      handler() {
        console.log("id change");
        this.postData=[]
        this.getDataOfId();
      },
    },
  },
  methods: {
    async getDataOfId() {
      let id = this.$route.query.id;
      this.categoryName = this.$route.query.category;
      if (id) {
        let result = new Array();
        const q = query(projectCollection, where("categoryId", "==", id));
        let data = await getDocs(q);
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

<style></style>
