<template>
    <section class="leaderboard-section">
        <h1>Leaderboard</h1>
        <v-data-table
        :headers="headers"
        :items="$store.state.winnersList"
        hide-actions
        class="elevation-1"
    >
        <template slot="items" slot-scope="props">
        <td class="text-xs-left">{{ props.item.index }}</td>
        <td class="text-xs-left">{{ teamMapper(props.item.team) }}</td>
        <td class="text-xs-right">{{ new Date(props.item.timestamp) }}</td>
        </template>
    </v-data-table>
    <thank-you :open="gameOver"/>
    </section>
</template>
<script>
import axios from "axios";

import teamConfig from '../config/teams';
import ThankYou from './ThankYou.vue';
export default {
  data: () => ({
    headers: [
      { text: '#', sortable:false, value:'place'},
      { text: "Team", sortable: false, value: "team" },
      { text: "Timestamp", sortable: false, value: "timestamp" }
    ],
    gameOver: false,
  }),
  mounted() {
    this.getLeaderboard();
    this.interval = setInterval(this.getLeaderboard, 2000);
  },
  beforeDestroy() {
    clearInterval(this.interval);
  },
  methods: {
    teamMapper: teamConfig.teamMapper,
    getLeaderboard() {
      axios
        .get("/api/leaderboard")
        .then(resp => {
          this.$store.dispatch("updateLeaderboard", resp.data);
          if (resp.data.items.length === 6) {
            this.gameOver = true;
            clearInterval(this.interval);
          }
        })
        .catch(err => console.log(err));
    }
  },
  components: {
    ThankYou,
  }
};
</script>
<style>
    .leaderboard-section {
        margin:0 15px;
    }
</style>