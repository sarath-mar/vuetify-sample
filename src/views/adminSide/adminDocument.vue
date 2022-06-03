<template>
  <v-container fluid>
    <v-layout justify-end class="mt-5" wrap>
      <span
        :class="{ 'mt-10': $route.name == 'Published-Works' }"
        class="heading"
        >Documents</span
      >
      <v-spacer> </v-spacer>
      <span class="mt-3">
        <add-document
          @updatePost="updatePost"
          v-if="$route.name !== 'Published-Works'"
        />
      </span>
    </v-layout>
    <!-- <v-layout> -->
    <document-table :documentData="documentData" @updatePost="updatePost" />
    <!-- </v-layout> -->
  </v-container>
</template>

<script>
import { getDocs } from "@firebase/firestore";
import addDocument from "./components/addDocument.vue";
import DocumentTable from "./components/documentTable.vue";
import { documentCollection } from "../../firebase";
export default {
  components: { addDocument, DocumentTable },
  data() {
    return {
      documentData: [],
    };
  },
  methods: {
    async getDocumentData() {
      let result = new Array();
      let data = await getDocs(documentCollection);
      data.forEach((doc) => {
        let documentData = doc.data();
        documentData.id = doc.id;
        result.push(documentData);
      });
      this.documentData = result;
    },
    updatePost() {
      this.getDocumentData();
    },
  },
  created() {
    this.getDocumentData();
  },
};
</script>

<style scoped></style>
