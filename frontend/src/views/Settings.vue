<template>

  <div class="settings">
    <v-card class="mx-2" min-width=250 max-width=500>
      <v-card-title>Settings</v-card-title>
      <v-form>
      <v-card-subtitle>Temperature Control</v-card-subtitle>
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
      <v-select class="mx-4" label="Proportional Gain Action" :items="kp_types" v-model="settings.k_p_mode"></v-select>

      <v-card-subtitle>Extraction Control</v-card-subtitle>
      <v-text-field class="mx-4" label="Extraction Mass" type="number" v-model="settings.m" suffix="g"></v-text-field>

      <v-card-subtitle>Update</v-card-subtitle>
      <v-row class="mx-1">
        <v-col>
          <v-text-field label="Sampling Interval" type="number" v-model="settings.t_sample" suffix="s"></v-text-field>
        </v-col>
        <v-col>
          <v-text-field label="Update Interval" type="number" v-model="settings.t_update" suffix="s"></v-text-field>
        </v-col>
      </v-row>

      <v-card-subtitle>Cleaning</v-card-subtitle>
      <v-row class="mx-1">
        <v-col>
          <v-text-field label="Cycles" type="number" v-model="settings.n_clean_cycles"></v-text-field>
        </v-col>
        <v-col>
          <v-text-field label="Pump on duration" type="number" v-model="settings.t_clean_on" suffix="s"></v-text-field>
        </v-col>
        <v-col>
          <v-text-field label="Pump off duration" type="number" v-model="settings.t_clean_off" suffix="s"></v-text-field>
        </v-col>
      </v-row>

      <v-card-actions>
        <v-btn class="success" text @click="saveSettings">Save</v-btn>
        <div v-if="saveUpToDate" class="mx-2">
          <v-icon>mdi-check</v-icon>
        </div>
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
      settingsServer: {},
      saveUpToDate: false,
      kp_types: [
        { text: 'On error', value: 1 },
        { text: 'On measurement', value: 0 }
      ]
    }
  },
  watch: {
    settings: {
      handler (val) {
        console.log('settings changed')
        this.saveUpToDate = false
      },
      deep: true // Required for object
    }
  },
  methods: {
    cancelSettings () {
      this.settings = Object.assign({}, this.settingsServer)
    },
    saveSettings () {
      // Make sure all inputs are numbers
      const settings = {}
      Object.keys(this.settings).forEach((key, index) => {
        settings[key] = this.settings[key]
      })

      axios.put('/api/v1/settings/1/', settings)
        .then(response => {
          this.saveUpToDate = true
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
        this.saveUpToDate = true
      })
      .catch(error => console.log(error))
  }
}
</script>

<style scoped>

</style>
