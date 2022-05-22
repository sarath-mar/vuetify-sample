<template>
  <v-card width="250"  :loading="loading" class="my-4 mx-4 green">
    <v-img
      height="250"
      src="https://cdn.vuetifyjs.com/images/cards/cooking.png"
    ></v-img>

    <v-card-title>{{ post.postText }}</v-card-title>

    <v-card-text>
      <div>
        Small plates, salads & sandwiches - an intimate setting with 12 indoor
        seats plus patio seating.
      </div>
    </v-card-text>
  </v-card>
</template>
<script>
export default {
  props: {
    post: {
      required: true,
      type: Object,
    },
  },
  data: () => ({
    loading: false,
    selection: 1,
  }),

  methods: {
    reserve() {
      this.loading = true;

      setTimeout(() => (this.loading = false), 2000);
    },
  },
};
</script>
