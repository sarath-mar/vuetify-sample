<template>
  <div class="mx-10 mt-5">
    <v-layout justify-end>
      <AddImage @updatePost="updatePost" />
    </v-layout>
    <v-card elevation="0" class="mt-3 background"> 
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
        <v-tab-item class="background " v-for="item in imageType" :key="item.value">
          <!-- <v-card color="basil" flat>
            <v-card-text>{{ text }}</v-card-text>
          </v-card> -->
          <v-layout wrap>
            <span v-for="(post, index) in postTabData" :key="index">
              <v-flex>
                <cardTable :post="post" @updatePost="updatePost" />
              </v-flex>
            </span>
          </v-layout>
        </v-tab-item>
      </v-tabs-items>
    </v-card>

    <!-- <v-layout wrap>
      <span v-for="(post, index) in postTabData" :key="index">
        <v-flex>
          <cardTable :post="post" @updatePost="updatePost" />
        </v-flex>
      </span>
    </v-layout> -->
  </div>
</template>

<script>
// import { doc, getDoc } from '@firebase/firestore';[0]
// import { getDocs } from '@firebase/firestore';
import AddImage from "../components/Admin/addImage.vue";
import CardTable from "../components/Admin/cardTable.vue";
// import { postCollection, getDocs } from "../firebase";
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
        if (value) {
          this.postTabData = new Array();
          this.postTabData = this.postData.filter((x) => x.postType == value);
        }
      },
      immediate: true,
      deep: true,
    },
    postData: {
      handler() {
        this.getPost();
      },
      immediate: true,
      deep: true,
    },
  },
  methods: {
    updatePost() {
      console.log("updated");
      this.getPost();
    },
    async getPost() {
      this.tab = 0;
      let value = this.imageType[0].value;
      this.postTabData = this.postData.filter((x) => x.postType == value);
    },
  },
  beforeCreate() {},
  created() {
    let isAdmin = this.isAdmin();
    if (!isAdmin) {
      this.$router.push({ path: "/login" });
      // this.$router.push({ path: "/error-404" });
    }
    this.getPost();
  },
};
</script>
