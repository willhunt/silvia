<template>

  <div class="settings">
    <v-card class="mx-auto" min-width=350>
      <v-card-text>
        <div>Temperature Control Settings</div>
      </v-card-text>
      <v-text-field class="mx-4" label="Boiler Setpoint" :value="setpointTemperature" suffix="C"></v-text-field>
      <v-text-field class="mx-4" label="Proportional Gain" :value="kp"></v-text-field>
      <v-text-field class="mx-4" label="Integral Gain" :value="ki"></v-text-field>
      <v-text-field class="mx-4" label="Derivative Gain" :value="kd"></v-text-field>

      <v-card-text>
        <div>Update Settings</div>
      </v-card-text>
      <v-text-field class="mx-4" label="Sampling Interval" :value="tSample" suffix="s"></v-text-field>
      <v-text-field class="mx-4" label="Update Interval" :value="tUpdate" suffix="s"></v-text-field>

      <v-card-actions>
        <v-btn class="success" text>Save</v-btn>
        <v-btn class="error" text>Cancel</v-btn>
      </v-card-actions>
    </v-card>
  </div>

</template>

<script>

export default {
  name: 'Settings',
  data: function () {
    return {
      setpointTemperature: 20,
      brewVolume: 20,
      kp: 10,
      ki: 0.05,
      kd: 0.1,
      tSample: 1,
      tUpdate: 2
    }
  }
}

</script>

<style scoped>

</style>
