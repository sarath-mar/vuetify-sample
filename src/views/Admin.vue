<template>
  <div class="mx-1 mt-5">
    <v-layout justify-end>
      <AddImage @updatePost="updatePost" />
    </v-layout>
    <v-card elevation="0" class="mt-3">
      <!-- <v-card-title class="text-center justify-center py-6">
        <h1 class="font-weight-bold text-h2 basil--text">Heading</h1>
      </v-card-title> -->

      <v-tabs
        :color="tab == 0 ? 'yellow' : tab == 1 ? 'green' : 'red'"
        v-model="tab"
        background-color="transparent"
        grow
      >
        <v-tab v-for="item in imageType" :key="item.value">
          {{ item.text }}
        </v-tab>
      </v-tabs>

      <v-tabs-items v-model="tab">
        <v-tab-item class="" v-for="item in imageType" :key="item.value">
          <v-layout wrap justify-center justify-sm-start>
            <div v-for="(post, index) in postTabData" class="admin-table-card" :key="index">
              <v-flex>
                <cardTable :post="post" />
                <!-- @updatePost="updatePost" -->
              </v-flex> 
            </div>
          </v-layout>
        </v-tab-item>
      </v-tabs-items>
    </v-card>
  </div>
</template>

<script>
import AddImage from "../components/Admin/addImage.vue";
import CardTable from "../components/Admin/cardTable.vue";
import {
  bannerCollection,
  getDocs,
  projectCollection,
  singlesCollection,
  storyCollection,
} from "../firebase";
export default {
  name: "Admin",

  components: {
    AddImage,
    CardTable,
  },
  data: () => {
    return {
      loop: 8,
      // postData: new Array(),
      postTabData: new Array(),
      tab: 0,
    };
  },
  watch: {
    tab: {
      handler(newValue) {
        let value = this.imageType[newValue].value;
        console.log(value);
        if (value) {
          this.getCollectionData(value);
          // this.postTabData = new Array();
          // this.postTabData = this.postData.filter((x) => x.postType == value);
        }
      },
      immediate: true,
      deep: true,
    },
    // postData: {
    //   handler() {
    //     this.getPost();
    //   },
    //   immediate: true,
    //   deep: true,
    // },
  },
  methods: {
    updatePost() {
      console.log("updated");
      this.tab = 0;
      let value = this.imageType[0].value;
      if (value) {
        this.getCollectionData(value);
      }
    },
    async getPost() {},
    async getCollectionData(type) {
      this.postTabData = [];
      let collection;
      let typeMsg;
      if (type === "STORY") {
        collection = storyCollection;
        typeMsg = "story";
      }
      if (type === "SINGLE") {
        collection = singlesCollection;
        typeMsg = "single";
      }
      if (type === "PROJECT") {
        collection = projectCollection;
        typeMsg = "project";
      }
      if (type === "BANNER") {
        collection = bannerCollection;
        typeMsg = "banner";
      }

      if (type) {
        let result = new Array();
        let data = await getDocs(collection);
        data.forEach((doc) => {
          let documentData = doc.data();
          documentData.id = doc.id;
          result.push(documentData);
        });
        this.postTabData = result;
      }
      console.log(typeMsg);
    },
  },
  beforeCreate() {},
  created() {
    let isAdmin = this.isAdmin();
    if (!isAdmin) {
      this.$router.push({ path: "/login" });
    }
    this.getPost();
  },
};
</script>
<style>
.admin-table-card{
}
</style>