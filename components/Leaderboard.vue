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
        <td class="text-xs-left">{{ teamMapper(props.item.team) }}</td>
        <td class="text-xs-right">{{ new Date(props.item.timestamp) }}</td>
        </template>
    </v-data-table>
    </section>
</template>
<script>
import axios from "axios";
import teamConfig from '../config/teams';
export default {
  data: () => ({
    headers: [
      { text: "Team", sortable: false, value: "team" },
      { text: "Timestamp", sortable: false, value: "timestamp" }
    ]
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
        })
        .catch(err => console.log(err));
    }
  }
};
</script>
<style>
    .leaderboard-section {
        margin:0 15px;
    }
</style>