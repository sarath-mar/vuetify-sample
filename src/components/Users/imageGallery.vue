<template>
  <div class="pt-5 mt-10 ma-5">
    <v-layout class="mt-10" wrap justify-center>
      <span v-for="n in 9" :key="n">
        <v-flex sm12 md12 class="ma-5">
          <v-img
            width="400px "
            :src="`https://picsum.photos/500/300?image=${n * 5 + 10}`"
            :lazy-src="`https://picsum.photos/500/300?image=${n * 5 + 10}`"
            aspect-ratio="1"
            class="grey lighten-2 red"
          >
            <template v-slot:placeholder>
              <v-row class="fill-height ma-0" align="center" justify="center">
                <v-progress-circular
                  indeterminate
                  color="black lighten-3"
                ></v-progress-circular>
              </v-row>
            </template>
          </v-img>
        </v-flex>
      </span>
    </v-layout>
  </div>
</template>

<script>
export default {};
</script>
