<template>
  <v-container>
    <!-- <v-img
      :src="require('../../assets/logo-sign.jpg')"
      width="240px"
      class="mx-auto mt-16"
      contain
    /> -->
    <v-card
      rounded="lg"
      outlined
      max-height="400px"
      max-width="500px"
      class="mx-auto my-16 pa-10 pa-sm-14"
      color="white"
      elevation="4"
    >
      <v-layout justify-center>
        <h1>SIGN IN</h1>
      </v-layout>
      <v-form ref="form" v-model="valid">
        <v-layout class="mt-10">
          <v-flex>
            <v-text-field
              :rules="userNameRule"
              v-model="phone"
              label="Email"
              required
            ></v-text-field>
          </v-flex>
        </v-layout>
        <v-layout>
          <v-flex>
            <v-text-field
              :rules="[passwordRule]"
              v-model="password"
              label="Password"
              required
            ></v-text-field>
          </v-flex>
        </v-layout>
        <v-layout>
          <v-flex>
            <!-- @update:error="checkPassword" -->
            <v-text-field
              :rules="[confirmPasswordRule, checkPassword]"
              v-model="confirmPassword"
              label="Confirm Password"
              required
              @click:append="show1 = !show1"
              dense
              :append-icon="
                show1 ? 'mdi-eye black--text' : 'mdi-eye-off black--text'
              "
              :type="show1 ? 'text' : 'password'"
            ></v-text-field>
          </v-flex>
        </v-layout>

        <v-layout justify-center class="ms-n3">
          <v-btn
            depressed
            color="ashColor"
            class="white--text ml-3 font-weight-light"
            :min-width="$vuetify.breakpoint.xs ? 150 : 385"
            @click="onSubmit"
            :loading="btn_loading"
            :disabled="!valid"
            >Sign In</v-btn
          >
        </v-layout>
        <p v-if="errorFromPassword" class="red--text text-center">
          {{ errorFromPassword }}
        </p>
      </v-form>
      <!-- </ValidationObserver> -->
    </v-card>
    <p v-if="errorFromApi" class="red--text text-center mt-6">
      {{ errorFromApi }}
    </p>
  </v-container>
</template>

<script>
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
export default {
  components: {},
  // password:'',
  data() {
    return {
      phone: "",
      password: "",
      confirmPassword: "",
      btn_loading: false,
      valid: true,
      show1: false,
      errorFromApi: null,
      errorFromPassword: null,
      style: {
        borderStyle: { border: "0px solid black !important" },
      },
      userNameRule: [(v) => !!v || "Username should not be empty"],
      passwordRule: [(v) => !!v || "Password should not be empty"],
      confirmPasswordRule: [
        (v) => !!v || "Confirm password should not be empty",
      ],
    };
  },
  methods: {
    checkPassword() {
      this.errorFromPassword = null;
      this.errorFromApi = null; 
      if (this.password && this.confirmPassword) {
        if (this.password === this.confirmPassword) {
          return true;
        } else {
          this.errorFromPassword = "Password is not match";
          return false;
        }
      }
      return false;
    },
    onSubmit() {
      console.log(this.phone + this.password);
      let validate = this.checkPassword();
      if (!validate) {
        return;
      }
      this.btn_loading = true;
      const auth = getAuth();
      console.log(auth);
      let email = this.phone;
      let password = this.password;
      createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          const user = userCredential.user;
          console.log(user);
          this.btn_loading=false
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          console.log(errorCode);
          console.log(errorMessage);
          this.errorFromApi=errorMessage
          this.btn_loading=false
          // ..
        });
      //   userSignIn(this.phone, this.password).then(data => {
      //     if (data) {
      //       // console.log(data);
      //       if (data === true) {
      //         this.btn_loading = false;
      //         if (isDietitian()) {
      //           this.$router.replace({ path: "appointments" });
      //         } else {
      //           this.$router.replace({ path: "dashboard" });
      //         }
      //       } else if (data.includes("NOT_FOUND")) {
      //         this.errorFromApi = this.$t("user.signIn.invalidLogin");
      //         this.btn_loading = false;
      //       }
      //     }
      //   });
      // }
    },
  },
};
</script>

<style>
.inputPhone input[type="number"] {
  -moz-appearance: textfield;
}
.inputPhone input::-webkit-outer-spin-button,
.inputPhone input::-webkit-inner-spin-button {
  -webkit-appearance: none;
}
</style>
