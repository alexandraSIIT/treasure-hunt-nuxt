<template>
  <v-form id="pin-form" v-bind:class="{'has-error': !serverValidation}" v-model="valid" lazy-validatio>
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
      :rules="[v => !!v || 'Please enter PIN']"
      :counter="15"
      required
    ></v-text-field>
    <section v-show="!serverValidation" class="error-message">Incorrect PIN</section>
    <v-btn
      @click="submit"
      :disabled="!valid || gameOver"
    >
      submit
    </v-btn>
    <div>
      <v-alert type="success" :value="gameOver">
        Congrats! You made it!
      </v-alert>
      <v-alert type="error" :value="error">
        {{error}}
      </v-alert>
      <label v-if="trials > 3 && trials < 10">
        Hint: "_ o _ _ _ _ _ L_ _ _ _ o _ e"
      </label>
      <label v-if="trials >= 10">
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
            this.serverValidation = resp.data.success;
            !resp.data.success ? this.trials++ : (this.trials = 0);
            if (resp.data.success) {
              this.$store.dispatch('addWinner', {
                team: this.selectedTeam,
              });
              this.gameOver = true;
            }
          })
          .catch((err) => {
            this.error = err.response.data.error;
          })
    },
    onPinChanged(ev) {
      if (this.selectedTeam && ev.target.value) {
        this.valid = true;
        this.serverValidation = true;
      }
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
    gameOver: false,
    serverValidation: true,
    error: '',
    valid: true,
    trials: 0,
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