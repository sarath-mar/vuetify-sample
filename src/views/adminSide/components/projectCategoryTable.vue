<template>
  <div class="">
    <div
      style="padding: 5px"
      class="pa-5 my-5 card-class"
      v-for="item in documentData"
      :key="item.id"
    >
      <div class="div-card">
        <div class="ml-5">
          <h3>{{ item.category }}</h3>
          <h5>{{ item.categoryText }}</h5>
        </div>
        <div>
          <v-icon color="red" @click="openDialog(item.id)">mdi-delete</v-icon>
        </div>
      </div>
      <div>
        <v-dialog v-model="dialog" max-width="300px">
          <v-card class="pt-1 pb-5" color="ashColor">
            <v-card-text class="subtitle-1 mb-0 mt-6 text-center red--text"
              >Delete this Category
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
                    deleteMethod();
                  "
                  >Yes</v-btn
                >
              </v-row>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </div>
    </div>
  </div>
</template>
<script>
// , getDocs
import { deleteDoc, doc } from "@firebase/firestore";
import { projectCategory } from "../../../firebase";
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
      deleteId: "",
      headers: [
        {
          text: "Category",
          align: "start",
          sortable: false,
          value: "category",
        },
        { text: "Category Description", value: "categoryText" },
        { text: "Action", value: "action", width: "150px" },
        { text: "Action", value: "test", width: "150px" },
        // { text: "Download Pdf", value: "postUrl", width: "150px" },
        // { text: "Action", value: "action" },
      ],
      //   documentData: [],
    };
  },
  methods: {
    openDialog(id) {
      this.deleteId = id;
      this.dialog = true;
    },
    deleteMethod() {
      const docRef = doc(projectCategory, this.deleteId);
      deleteDoc(docRef)
        .then(() => {
          console.log("deleted post");
          (this.snackbar = true),
            (this.snackbarColor = "green"),
            (this.text = "Deleted Sucessfully"),
            console.log("deleted image");
          this.dialog = false;
          this.button_loading = false;
          this.$emit("updateProjectCategory");
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
};
</script>

<style>
.card-class {
  box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
}
.div-card {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
</style>
