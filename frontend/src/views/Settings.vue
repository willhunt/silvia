<template>

  <div class="settings">
    <v-card class="mx-auto" min-width=350 max-width=500>
      <v-card-text>
        <div>Temperature Control Settings</div>
      </v-card-text>
      <v-form>
      <v-text-field class="mx-4" label="Boiler Setpoint" type="number" v-model="settings.T_set" suffix="C"></v-text-field>

      <v-row class="mx-1">
        <v-col>
          <v-text-field class="" label="P Gain" type="number" v-model="settings.k_p"></v-text-field>
        </v-col>
        <v-col>
          <v-text-field class="" label="I Gain" type="number" v-model="settings.k_i"></v-text-field>
        </v-col>
        <v-col>
          <v-text-field class="" label="D Gain" type="number" v-model="settings.k_d"></v-text-field>
        </v-col>
      </v-row>

      <v-card-text>
        <div>Update Settings</div>
      </v-card-text>
      <v-text-field class="mx-4" label="Sampling Interval" type="number" v-model="settings.t_sample" suffix="s"></v-text-field>
      <v-text-field class="mx-4" label="Update Interval" type="number" v-model="settings.t_update" suffix="s"></v-text-field>

      <v-card-actions>
        <v-btn class="success" text @click="saveSettings">Save</v-btn>
        <v-spacer></v-spacer>
        <v-btn class="error" text @click="cancelSettings">Cancel</v-btn>
      </v-card-actions>
      </v-form>
    </v-card>
  </div>

</template>

<script>
import axios from 'axios'

export default {
  name: 'Settings',
  data: function () {
    return {
      settings: {},
      settingsServer: {}
    }
  },
  methods: {
    cancelSettings () {
      this.settings = Object.assign({}, this.settingsServer)
    },
    saveSettings () {
      // Make sure all inputs are numbers
      const settings = {}
      for (const [key, value] of this.settings) {
        settings[key] = Number(value)
      }

      const axiosConfig = {
        headers: {
          'Content-Type': 'application/json'
        }
      }

      axios.put('/api/v1/settings/1/', settings, axiosConfig)
        .then(function (response) {
          console.log(response)
        })
        .catch(function (error) {
          console.log(error)
        })
    }
  },
  created () {
    axios.get('/api/v1/settings/1/')
      .then(response => {
        console.log(response.data)
        this.settingsServer = Object.assign({}, response.data)
        this.settings = Object.assign({}, response.data)
      })
      .catch(error => console.log(error))
  }
}
</script>

<style scoped>

</style>
