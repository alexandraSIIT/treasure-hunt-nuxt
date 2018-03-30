<template>
  <v-parallax class="paralax-main" src="treasure-hunt.jpg" height="500">
    <v-layout column align-center justify-center>
      <h1 class="white--text">Welcome to Treasure Hunt</h1>
      <h4 class="white--text">A BringIT Team Event</h4>
      <password-form/>
    </v-layout>
  </v-parallax>
</template>

<script>
  import PasswordForm from '~/components/PasswordForm.vue'
  export default {
    components: {
      PasswordForm,
    },
    data: () => ({
      drawer: true
    }),
    props: {
      source: String
    }
  }
</script>
<style>
.paralax-main {
  margin-top: 200px;
}
</style>