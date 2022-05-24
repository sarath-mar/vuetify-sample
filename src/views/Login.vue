<template>
  <div>
    <loginPage />
  </div>
</template>

<script>
import loginPage from "../components/Admin/loginPage.vue";

export default {
  components: { loginPage },
  created() {
    let data = this.isAdmin();
    if (data) {
      this.$router.push({ path: "/" });
    }
  },
};
</script>

<style scoped></style>
