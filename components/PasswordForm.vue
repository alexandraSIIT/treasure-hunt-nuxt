<template>
  <v-form id="pin-form" v-bind:class="{'has-error': !valid}">
    <v-text-field
      label="PIN"
      v-model="providedPassword"
      @keyup="onPinChanged"
      :counter="10"
      required
    ></v-text-field>
    <section v-show="!valid" class="error-message">Incorrect PIN</section>
    <v-btn
      @click="submit"
    >
      submit
    </v-btn>
    <div>
      <label v-if="trials >= 3">
        Hint: "There is no place like 127.0.0.1"
      </label>
    </div>
  </v-form>
</template>
<script>
import axios from 'axios';
export default {
    methods: {
        submit () {
            axios.post('/api/submit', {
                pin: this.providedPassword
            }).then((resp) => {
              this.valid = resp.data.success
              !resp.data.success ? this.trials++ : this.trials = 0;
            });
        },
        onPinChanged() {
          this.valid = true;
          console.log(this.valid);
        }
    },
    data: () => ({
        providedPassword: '',
        valid: true,
        trials: 0
    })
}
</script>
<style>
  #pin-form.has-error .input-group__details:before {
    background-color: red;
  }

  #pin-form.has-error .error-message {
    color: red;
  }
</style>