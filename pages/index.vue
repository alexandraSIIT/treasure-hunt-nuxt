<template>
  <v-app id="treasure-hunt" dark>
    <app-logo/>
    <leaderboard/>
  </v-app>
</template>

<script>
import AppLogo from '~/components/AppLogo.vue';
import Leaderboard from '~/components/Leaderboard.vue';

export default {
  components: {
    AppLogo,
    Leaderboard,
  }
}
</script>
