<template>
  <div class="login"> 
    <SigninPage />
  </div>
</template>

<script>
import SigninPage from "../components/Admin/signinPage.vue";

export default {
  components: { SigninPage },
  created() {
    let data = this.isAdmin();
    if (data) {
      this.$router.replace({ path: "/" });
    }
  },
};
</script>

<style scoped></style>
