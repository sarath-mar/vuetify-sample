<template>
  <div class="login">
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
      this.$router.push({ path: "/admin" });
    }
  },
};
</script>

<style>

</style>
