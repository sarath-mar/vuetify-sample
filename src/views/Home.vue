<template>
  <v-container>
    <v-layout justify-end>
      <AddImage @updatePost="updatePost" />
    </v-layout>
    <v-layout wrap justify-center  >
      <span v-for="(post,index) in postData" :key="index"> 
        <v-flex>
          <cardTable :post="post"/>
        </v-flex>
      </span>
    </v-layout>
    <!-- <v-card color="#385F73" dark>
      <v-card-title class="text-h5"> Unlimited music now </v-card-title>

      <v-card-subtitle
        >Listen to your favorite artists and albums whenever and wherever,
        online and offline.</v-card-subtitle
      >

      <v-card-actions>
        <v-btn text> Listen Now </v-btn>
      </v-card-actions>
    </v-card> -->
  </v-container>
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
          console.log(`${doc.id} => ${doc.data()}`);
          console.log(doc.data());
          result.push(doc.data());
        });
      this.loop = result.length;
      this.postData = result;
    },
  },
  created() {
    this.getPost();
  },
};
</script>
