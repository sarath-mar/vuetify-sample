<template>
  <div class="mx-1 mt-5">
    <v-layout justify-end>
      <AddImage @updatePost="updatePost" />
    </v-layout>
    <v-card elevation="0" class="mt-3">
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
            <div v-if="isCategoryList">
                <div v-for="(category, index) in categoryDetails" :key="index">
                  <div class="category-table-card">
                    <p>{{ category.category }}</p>
                    <v-btn
                      @click="showCategoryData(category.id)"
                      class="ml-auto"
                      >Show Details</v-btn
                    >
                  </div>

                  <div
                    v-if="categoryListData.length && categoryId == category.id"
                  >
                    <div
                      v-for="(post, index) in categoryListData"
                      :key="index"
                    >
                      <v-flex>
                        <cardTable :post="post" />
                      </v-flex>
                    </div>
                  </div>
                </div>
          
            </div>
            <div
              v-else
              v-for="(post, index) in postTabData"
              class="admin-table-card"
              :key="index"
            >
              <v-flex>
                <cardTable :post="post" />
              </v-flex>
            </div>
          </v-layout>
        </v-tab-item>
      </v-tabs-items>
    </v-card>
  </div>
</template>

<script>
import { orderBy, query, where } from "@firebase/firestore";
import AddImage from "../components/Admin/addImage.vue";
import CardTable from "../components/Admin/cardTable.vue";
import {
  bannerCollection,
  getDocs,
  projectCategory,
  projectCollection,
  singlesCollection,
  storyCategory,
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
      tab: 3,
      categoryDetails: [],
      cTab: 1,
      isCategoryList: false,
      imagePostType: "",
      categoryListData: [],
      categoryId: "",
    };
  },
  watch: {
    // cTab: {
    //   handler(newValue) {
    //     console.log("Ctab", newValue);
    //   },
    //   // immediate: true,
    //   // deep: true,
    // },
    cTab(newVal) {
      console.log("Ctab", newVal);
    },
    tab: {
      handler(newValue) {
        let value = this.imageType[newValue].value;
        this.categoryListData = [];
        console.log(value);
        this.imagePostType = value;
        if (value) {
          if (value === "PROJECT") {
            this.isCategoryList = true;
            this.postTabData = [];
            this.getProjectCategoryData();
          } else if (value === "STORY") {
            this.isCategoryList = true;
            this.postTabData = [];
            this.getstoryCategoryData();
          } else {
            this.isCategoryList = false;
            this.getCollectionData(value);
          }
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
    showCategoryData(id) {
      // let categoryId = this.categoryDetails[newVal].id;
      this.categoryListData = [];
      this.categoryId = id;
      this.getPostDatafilterCategory(id, this.imagePostType);
    },
    updatePost(type) {
      console.log("updated", type);
      // this.tab = 0;
      // let value = this.imageType[0].value;
      let value = this.imageType.find((x) => x.value === type);
      console.log(value);
      if (value) {
        this.getCollectionData(value.value);
      }
      // if (value) {

      // }
    },
    async getPostDatafilterCategory(id, type) {
      let collection;

      if (type === "STORY") {
        collection = storyCollection;
        // typeMsg = "story";
      }
      if (type === "PROJECT") {
        collection = projectCollection;
        // typeMsg = "project";
      }
      let result = new Array();
      const q = query(
        collection,
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
      this.categoryListData = result;
      console.log(result);
    },
    async getstoryCategoryData() {
      let result = new Array();
      let data = await getDocs(storyCategory);
      data.forEach((doc) => {
        let documentData = doc.data();
        documentData.id = doc.id;
        result.push(documentData);
      });
      this.categoryDetails = result;
      let categoryId = result[this.cTab].id;
      this.getPostDatafilterCategory(categoryId, "STORY");
    },
    async getProjectCategoryData() {
      let result = new Array();
      let data = await getDocs(projectCategory);
      data.forEach((doc) => {
        let documentData = doc.data();
        documentData.id = doc.id;
        result.push(documentData);
      });
      this.categoryDetails = result;
      let categoryId = result[this.cTab].id;
      this.getPostDatafilterCategory(categoryId, "PROJECT");
      console.log(this.categoryDetails);
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
.admin-table-card {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
}
.category-table-card {
  display: flex;
  /* width: 100vw; */
  /* flex-direction: column; */
  /* background: red; */
  /* gap: 20px; */
  margin: 20px;
  padding: 10px;
  width: 96vw;
  /* width: 100vw ; */
  /* display:flex; */
  align-items: center;
  justify-content: space-between;
  box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
}
.test {
  /* width: 120px; */
  /* display: flex ; */
  /* background: green; */
}
.category_tab {
  display: flex;
}
</style>
