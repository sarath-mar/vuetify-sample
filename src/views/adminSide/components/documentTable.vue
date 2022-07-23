<template>
  <v-card class="mx-6">
    <v-card-title>
      PDF files
      <v-spacer></v-spacer>
      <v-text-field
        v-model="search"
        append-icon="mdi-magnify"
        label="Search"
        single-line
        hide-details
      ></v-text-field>
    </v-card-title>
    <v-data-table :headers="headers" :items="documentData" :search="search">
      <template v-slot:[`item.postUrl`]="{ item }">
        <a :href="item.postUrl"><v-icon>mdi-download</v-icon> </a>
      </template>
      <template v-slot:[`item.action`]="{ item }">
        <v-icon color="red" @click="openDialog">mdi-delete</v-icon>
        <v-dialog v-model="dialog" max-width="300px">
          <v-card class="pt-1 pb-5" color="ashColor">
            <v-card-text class="subtitle-1 mb-0 mt-6 text-center red--text"
              >Delete this video
              <span font-weight-bold> </span>
              ?</v-card-text
            >

            <v-card-text v-if="error" class="error--text font-weight-bold">{{
              error
            }}</v-card-text>
            <v-card-actions justify="center">
              <v-row justify="center">
                <v-btn small color=" mx-2 error" depressed @click="close"
                  >No</v-btn
                >
                <v-btn
                  small
                  color=" mx-2 success"
                  depressed
                  :loading="button_loading"
                  @click="
                    button_loading = true;
                    deleteMethod(item.id);
                  "
                  >Yes</v-btn
                >
              </v-row>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </template>
    </v-data-table>
    <v-snackbar
      v-model="snackbar"
      timeout="3000"
      right
      top
      :color="snackbarColor"
    >
      {{ text }}
    </v-snackbar>
  </v-card>
</template>
<script>
// , getDocs
import { deleteDoc, doc } from "@firebase/firestore";
import { getStorage, ref, deleteObject } from "firebase/storage";
import { documentCollection } from "../../../firebase";
export default {
  props: {
    documentData: {
      required: true,
    },
  },
  data() {
    return {
      search: "",
      dialog: false,
      button_loading: false,
      error: null,
      text: "",
      snackbarColor: "",
      snackbar: "",
      headers: [
        {
          text: "Caption",
          align: "start",
          sortable: false,
          value: "postCaption",
        },
        { text: "Document Text", value: "postText" },
        { text: "Download Pdf", value: "postUrl",width:'150px' },    
        // { text: "Action", value: "action" },
      ],
      //   documentData: [],
    };
  },
  methods: {
    // async getDocumentData() {
    //   let result = new Array();
    //   let data = await getDocs(documentCollection);
    //   data.forEach((doc) => {
    //     let documentData = doc.data();
    //     documentData.id = doc.id;
    //     result.push(documentData);
    //   });
    //   this.documentData = result;
    // },
    openDialog() {
      this.dialog = true;
    },
    deleteMethod(id) {
      const docRef = doc(documentCollection, id);
      deleteDoc(docRef)
        .then(() => {
          console.log("deleted post");
          const storage = getStorage();
          const desertRef = ref(storage, `documents/${id}.pdf`);
          deleteObject(desertRef)
            .then(() => {
              (this.snackbar = true),
                (this.snackbarColor = "green"),
                (this.text = "Deleted Sucessfully"),
                console.log("deleted image");
              this.dialog = false;
              this.button_loading = false;
              this.$emit("updatePost");
              //   this.getDocumentData();
            })
            .catch((error) => {
              this.dialog = false;
              this.button_loading = false;
              console.log(error);
              (this.snackbar = true),
                (this.snackbarColor = "red"),
                (this.text = "Error Cause");
            });
        })
        .catch((e) => {
          this.dialog = false;
          this.button_loading = false;
          console.log(e);
          (this.snackbar = true),
            (this.snackbarColor = "red"),
            (this.text = "Error Cause");
        });
    },
    close() {
      this.dialog = false;
    },
  },
  created() {
    if (this.$route.name !== "Published-Works") {
      this.headers.push({ text: "Action", value: "action" ,width:'150px'}); 
    }
    this.getDocumentData();
  },
};
</script>
