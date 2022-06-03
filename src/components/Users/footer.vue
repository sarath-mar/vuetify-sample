<template>
  <div>
    <v-layout justify-center>
      <v-card width="70%" color="#d5cfb8" class="topCard mt-10">   
        <!-- <v-card-title> -->
        <v-layout justify-center class="mt-5">
          <span>GET IN TOUCH</span>
        </v-layout>
        <v-layout justify-center>
          <h2>Contact Us</h2>
        </v-layout>
        <v-form>
          <v-layout justify-center class="mt-8" wrap>
            <v-flex xs11 >  
              <v-text-field
                label="Full Name"
                placeholder="Full Name" 
                solo
              ></v-text-field>
            </v-flex>
          
          </v-layout>
          <v-layout justify-center>
            <v-flex xs11>
              <v-text-field
                label="Phone Number"
                placeholder="Phone Number"
                solo
              ></v-text-field>
            </v-flex>
          </v-layout>
          <v-layout justify-center>
            <v-flex xs11>
              <v-text-field
                label="E Mail"
                placeholder="E Mail"
                solo
              ></v-text-field>
            </v-flex>
          </v-layout>
          <v-layout justify-center>
            <v-flex xs11>
              <v-textarea
                solo
                name="input-7-4"
                label="Message"
              ></v-textarea>
            </v-flex>
          </v-layout>
          <v-layout justify-center class="mb-5 ">
            <v-btn>Submit</v-btn> 
          </v-layout>
        </v-form>

        <!-- </v-card-title> -->
      </v-card>
    </v-layout>
    <v-footer dark padless>
      <v-card width="100%" flat tile class="white--text text-center footer">
        <v-card-text class="footerCard">
          <v-btn
            v-for="icon in icons"
            :key="icon"
            class="mx-4 white--text"
            icon
          >
            <v-icon size="24px">
              {{ icon }}
            </v-icon>
          </v-btn>
        </v-card-text>

        <v-card-text class="white--text pt-0">
          The world without photography will be meaningless to us if there is no
          light and color, which opens up our minds and expresses passion.
        </v-card-text>

        <v-divider></v-divider>

        <v-card-text class="white--text">
          {{ new Date().getFullYear() }} — <strong>Sher Creations</strong>
        </v-card-text>
      </v-card>
    </v-footer>
  </div>
</template>
<script>
export default {
  data: () => ({
    icons: ["mdi-facebook", "mdi-twitter", "mdi-linkedin", "mdi-instagram"],
  }),
};
</script>
<style>
.footerCard {
  margin-top: 20vh;
}
.footer {
  margin-top: -15vh;
}
.topCard {
  z-index: 1;
  margin-top: 10px;
 
}
/* .colorForCard{
  color: red;
} */
</style>
