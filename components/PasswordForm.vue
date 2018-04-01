<template>
  <v-form id="pin-form" v-bind:class="{'has-error': !valid}">
    <v-select
      label="Select your team color"
      :items="teams"
      v-model="selectedTeam"
      :rules="[v => !!v || 'Please select an option']"
      required
    ></v-select>
    <v-text-field
      label="PIN"
      v-model="providedPassword"
      @keyup="onPinChanged"
      :counter="15"
      required
    ></v-text-field>
    <section v-show="!valid" class="error-message">Incorrect PIN</section>
    <v-btn
      @click="submit"
      :disabled="disableForm"
    >
      submit
    </v-btn>
    <div>
      <v-alert type="success" :value="disableForm">
        Congrats! You made it!
      </v-alert>
      <v-alert type="error" :value="error">
        {{error}}
      </v-alert>
      <label v-if="trials >= 3">
        Hint: "There is no place like 127.0.0.1"
      </label>
    </div>
  </v-form>
</template>
<script>
import axios from "axios";
import teamConfig from '../config/teams';

export default {
  methods: {
    submit() {
      axios
        .post("/api/submit", {
          pin: this.providedPassword,
          team: this.selectedTeam
        })
        .then(resp => {
          this.valid = resp.data.success;
          !resp.data.success ? this.trials++ : (this.trials = 0);
          if (resp.data.success) {
            this.$store.dispatch('addWinner', {
              team: this.selectedTeam,
            });
            this.disableForm = true;
          }
        })
        .catch((err) => {
          this.error = err.response.data.error;
        })
    },
    onPinChanged() {
      this.valid = true;
    }
  },
  computed: {
    teams: () => {
      return Object.keys(teamConfig.teams).map((key) => {
        return {
          text: teamConfig.teamMapper(key),
          value: key,
        };
      });
    }
  },
  data: () => ({
    providedPassword: "",
    disableForm: false,
    error: '',
    valid: true,
    trials: 0,
    // teams: [
    //   { text: "Red", value: "team-1" },
    //   { text: "Yellow", value: "team-2" },
    //   { text: "Green", value: "team-3" },
    //   { text: "Blue", value: "team-4" },
    //   { text: "Pink", value: "team-5" },
    //   { text: "Orange", value: "team-6" }
    // ],
    selectedTeam: null
  })
};
</script>
<style>
#pin-form.has-error .input-group__details:before {
  background-color: red;
}

#pin-form.has-error .error-message {
  color: red;
}
</style>