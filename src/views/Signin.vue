<template>
  <div class="login">
     <h1>s</h1>
    <h1>s</h1>
    <h1>s</h1>
    <h1>s</h1>
    <h1>s</h1>
    <h1>s</h1>
    <h1>s</h1>
    <h1>s</h1>
    <Test />  
    <SigninPage />
      
  </div>
</template>

<script>
import SigninPage from "../components/Admin/signinPage.vue";
import Test from './Test.vue'; 

export default {
  components: { SigninPage, Test },
  created() {
    let data = this.isAdmin();
    if (data) {
      this.$router.replace({ path: "/" });
    }
  },
};
</script>

<style scoped></style>
