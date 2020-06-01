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
        <v-switch color="secondary" :value="machineOn" @change="toggleOnOff" :label="`${machineOn ? 'On' : 'Off'}`"></v-switch>
      </v-col>
      <v-spacer></v-spacer>
      <div v-if="machineOn">
        <div v-if="machineBrewing">
          <v-btn color="secondary" @click="toggleBrew">Brew</v-btn>
        </div>
        <div v-else>
          <v-btn color="error" @click="toggleBrew">Cancel</v-btn>
        </div>
      </div>
      <v-col cols="auto">
        <v-btn outlined :color="tempBtnColor" @click="changeDisplay">
          <div v-if="displayOption == 'machine'">
            <v-icon class="mr-2">mdi-chart-line</v-icon>
          </div>
          {{ temperature | temperatureDisplayFilter }}&#8451;
        </v-btn>
      </v-col>
    </v-row>

    <div v-if="machineOn"><v-row align="center">
        <!-- <v-progress-linear value="15"></v-progress-linear> -->
        <v-progress-linear :value="brewProgress" color="blue-grey" height="25" rounded>
         {{ m_current | temperatureDisplayFilter }}g
        </v-progress-linear>
    </v-row></div>

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
      t_update: 10,
      m_current: 5, // Brewed coffee mass (g)
      m_setpoint: 20
    }
  },
  props: {
    machineOn: Boolean,
    machineBrewing: Boolean
  },
  computed: {
    tempBtnColor: function () {
      if (Math.abs(this.setpoint - this.temperature) < 2) {
        return 'success'
      }
      return 'secondary'
    },
    brewProgress: function () {
      return 100 * this.m_current / this.m_setpoint
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
    toggleBrew () {
      eventBus.$emit('toggleBrew')
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
