<template>
  <div class="machine-interface">
    <div v-if="displayOption == 'machine'">
      <MachineDisplay :machineOn="machineOn" :temperature="temperature" />
    </div>
    <div v-if="displayOption == 'graph'">
      <GraphDisplay :temperatures="temperatures" />
    </div>
    <br>
    <v-row align="center">
      <!-- <v-btn color="secondary" @click="toggleOnOff">{{ machineOn ? "On" : "Off" }}</v-btn> -->
      <v-col cols="auto">
        <v-switch color="secondary" :value="machineOn" @change="toggleOnOff" :label="`Machine ${machineOn ? 'on' : 'off'}`"></v-switch>
      </v-col>
      <v-spacer></v-spacer>
      <v-col>
        <v-btn outlined :color="tempBtnColor" @click="changeDisplay">
          <div v-if="displayOption == 'machine'">
            <v-icon class="mr-2">mdi-chart-line</v-icon>
          </div>
          {{ temperature | temperatureDisplayFilter }}&#8451;
        </v-btn>
      </v-col>
    <!-- </div> -->
    </v-row>
  </div>
</template>

<script>
import MachineDisplay from '@/components/MachineDisplay.vue'
import GraphDisplay from '@/components/GraphDisplay.vue'
import { eventBus } from '@/main'
import axios from 'axios'

export default {
  name: 'MachineInterface',
  components: {
    MachineDisplay,
    GraphDisplay
  },
  data: function () {
    return {
      temperature: 0,
      temperatures: [20, 30, 40, 45, 49, 53, 56, 58, 59, 60, 60, 61, 60, 59, 60],
      displayOption: 'machine',
      setpoint: 60,
      intervalReference: null, // Varibale to hold setInterval for getting temperature,
      t_update: 10
    }
  },
  props: {
    machineOn: Boolean
  },
  computed: {
    tempBtnColor: function () {
      if (Math.abs(this.setpoint - this.temperature) < 2) {
        return 'success'
      }
      return 'secondary'
    }
  },
  methods: {
    changeDisplay: function () {
      if (this.displayOption === 'machine') {
        this.displayOption = 'graph'
      } else {
        this.displayOption = 'machine'
      }
    },
    toggleOnOff () {
      eventBus.$emit('toggleOnOff')
    },
    updateTemperature () {
      axios.get('/api/v1/response/latest/')
        .then(response => {
          console.log(response.data)
          this.temperature = response.data.T_boiler
        })
        .catch(error => console.log(error))
    },
    updateInterval () {
      axios.get('/api/v1/settings/1/')
        .then(response => {
          this.t_update = response.data.t_update
          this.intervalReference = setInterval(() => {
            this.updateTemperature()
          }, 1000 * this.t_update)
        })
        .catch(error => console.log(error))
    }
  },
  created () {
    this.updateInterval()
    this.updateTemperature()
    // Fire event to check on/off status
    eventBus.$emit('updateOnOff')
  },
  destroyed () {
    console.log('Cancel temperature update')
    clearInterval(this.intervalReference)
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.machine-interface {
  margin: auto;
}
</style>
