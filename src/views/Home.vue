<template>
  <div class="ma-10 ">
    <v-layout justify-end>
      <AddImage @updatePost="updatePost" />
    </v-layout>
    <v-layout wrap>
      <span v-for="(post, index) in postData" :key="index">
        <v-flex>
          <cardTable :post="post"  @updatePost="updatePost" /> 
        </v-flex>
      </span>
    </v-layout>
  </div>
</template>

<script>
// import { doc, getDoc } from '@firebase/firestore';[0]
// import { getDocs } from '@firebase/firestore';
import AddImage from "../components/Admin/addImage.vue";
import CardTable from "../components/Admin/cardTable.vue";
import { postCollection, getDocs } from "../firebase";
export default {
  name: "Home",

  components: {
    AddImage,
    CardTable,
  },
  data: () => {
    return {
      loop: 8,
      postData: new Array(),
    };
  },
  methods: {
    updatePost() {
      console.log("updated");
      this.getPost();
    },
    async getPost() {
      let result = new Array();
      let data = await getDocs(postCollection);
      // if (data.length)
      data.forEach((doc) => {
        // console.log(`${doc.id} => ${doc.data()}`);
        // console.log(doc.data());
        let postData=doc.data()
        postData.id=doc.id
        console.log(postData)
        result.push(postData); 
      });
      this.loop = result.length;
      this.postData = result;
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
    // this.getImages();
  },
};
</script>
