<template>
  <v-container fluid>
    <v-layout justify-end class="mt-5" wrap>
      <span
        :class="{ 'mt-10': $route.name == 'Published-Works' }"
        class="heading"
        >Categories</span
      >

      <v-spacer> </v-spacer>
    </v-layout>
    <div>
      <v-tabs
        :color="tab == 0 ? 'yellow' : tab == 1 ? 'green' : 'red'"
        v-model="tab"
        background-color="transparent"
        grow
      >
        <v-tab v-for="item in categoryType" :key="item.value">
          {{ item.text }}
        </v-tab>
      </v-tabs>

      <v-tabs-items v-model="tab">
        <v-tab-item class="" v-for="item in categoryType" :key="item.value">
          <!-- <v-layout wrap> -->
            <div v-if="item.value === 0">
              <div class="my-3 ml-auto">
                <add-document @updatePost="updatePost" />
              </div>
              <div class="pa-2">
                <document-table
                  class="mt-5"
                  :documentData="documentData"
                  @updatePost="updatePost"
                />
              </div>
            </div>
            <div v-if="item.value === 1">
              <div class="my-3 ml-auto">
                <!-- <add-project-category
                  @updateProjectCategory="updateProjectCategory"
                /> -->
                <add-project-category  @updateProjectCategory="updateProjectCategory"/>
              </div>
              <div class="pa-2">
                <project-category-table
                  @updateProjectCategory="updateProjectCategory"
                  :documentData="projectDocumentData"
                />
              </div>
            </div>
          <!-- </v-layout> -->
        </v-tab-item>
      </v-tabs-items>
    </div>
    <!-- <v-layout> -->

    <!-- </v-layout> -->
  </v-container>
</template>

<script>
import { getDocs } from "@firebase/firestore";
import addDocument from "./components/addDocument.vue";
import DocumentTable from "./components/documentTable.vue";
import { projectCategory, storyCategory } from "../../firebase";
import ProjectCategoryTable from "./components/projectCategoryTable.vue";
import AddProjectCategory from './components/addProjectCategory.vue';
export default {
  components: { addDocument, DocumentTable, ProjectCategoryTable, AddProjectCategory },
  data() {
    return {
      documentData: [],
      projectDocumentData: [],
      tab: "",
      categoryType: [
        { text: "Story Category", value: 0 },
        { text: "Project Category", value: 1 },
      ],
    };
  },
  methods: {
    async getDocumentData() {
      let result = new Array();
      let data = await getDocs(storyCategory);
      data.forEach((doc) => {
        let documentData = doc.data();
        documentData.id = doc.id;
        result.push(documentData);
      });
      this.documentData = result;
    },
    async getProjectDocumentData() {
      let result = new Array();
      let data = await getDocs(projectCategory);
      data.forEach((doc) => {
        let documentData = doc.data();
        documentData.id = doc.id;
        result.push(documentData);
      });
      this.projectDocumentData = result;
    },
    updatePost() {
      this.getDocumentData();
    },
    updateProjectCategory() {
      this.getProjectDocumentData();
    },
  },
  created() {
    this.getDocumentData();
    this.getProjectDocumentData();
  },
};
</script>

<style scoped></style>
