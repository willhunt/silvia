<template>
  <div class="machine-interface">
    <!-- Machine Image -->
    <div class="machine-container">
      <div v-if="displayOption == 'machine'">
        <MachineDisplay :machineOn="machineOn" :temperature="temperature" />
      </div>
      <div v-if="displayOption == 'graph'">
        <div v-if="sessionData == null" style="display: flex; justify-content: center; align-items: center; min-width: 350px">
          <!-- <single-response-chart :data="watchedData"></single-response-chart> -->
          <v-btn color="secondary" @click="viewLastSession">Last Session</v-btn>
        </div>
        <div v-else>
          <single-response-chart :data="sessionData"></single-response-chart>
        </div>
      </div>
      <v-btn v-if="displayOption == 'machine'" id="temp-btn" outlined :color="tempBtnColor" @click="changeDisplay">
        <div v-if="temperature == null">-</div>
        <div v-else>{{ temperature | temperatureDisplayFilter }}&#8451;</div>
      </v-btn>
      <v-btn v-if="machineOn" id="water-btn" fab small outlined :color="waterLevelColor">
          <v-icon>mdi-water</v-icon>
      </v-btn>
      <v-btn v-if="machineBrewing" id="brew-btn" class="" outlined text color="secondary">
        <v-col>
          <v-row class="pb-1" justify="center">{{ m_current | temperatureDisplayFilter }}g</v-row>
          <v-row class="" justify="center">{{ t_elapsed }}s</v-row>
        </v-col>
      </v-btn>
    </div>
    <br>
    <!-- Controls -->
    <v-row align="center">
      <!-- <v-btn color="secondary" @click="toggleOnOff">{{ machineOn ? "On" : "Off" }}</v-btn> -->
      <v-col cols="auto">
        <v-switch color="secondary" :value="machineOn" @change="toggleOnOff" :label="`${machineOn ? 'On' : 'Off'}`"></v-switch>
      </v-col>
      <v-spacer></v-spacer>
      <v-col cols="auto" class="px-1" v-if="machineOn">
        <div v-if="machineBrewing">
          <v-btn color="error" @click="toggleBrew">Cancel</v-btn>
        </div>
        <div v-else>
          <v-btn color="secondary" @click="toggleBrew">Brew</v-btn>
        </div>
      </v-col>
      <v-col cols="auto" class="px-1">
        <v-btn outlined :color="tempBtnColor" @click="changeDisplay" fab small>
          <div v-if="displayOption == 'machine'">
            <v-icon>mdi-chart-line</v-icon>
          </div>
          <div v-else>
            <v-icon>mdi-file-presentation-box</v-icon>
          </div>
        </v-btn>
      </v-col>
      <v-col cols="auto" class="px-1">
         <v-btn outlined color="secondary" @click="tuneMode = !tuneMode" fab small>
          <v-icon>mdi-wrench</v-icon>
        </v-btn>
      </v-col>
    </v-row>

    <div v-if="machineOn">
      <v-row align="center">
        <v-progress-linear :value="brewProgress" color="blue-grey" height="25" rounded>
          <div v-if="m_current == null">
            No scale detected
          </div>
          <div v-else>
            {{ m_current | temperatureDisplayFilter }}g / {{ m_setpoint }}g
          </div>
        </v-progress-linear>
      </v-row>
    </div>

    <div v-if="tuneMode">
      <v-row align="center">
        <v-col cols="auto" class="px-1">
          <v-btn color="secondary" @click="toggleHeater">
            <div v-if="heaterOn">
              Heater Off
            </div>
            <div v-else>
              Heater On
            </div>
          </v-btn>
        </v-col>
        <v-col cols="auto" class="px-1">
          <v-btn color="secondary" @click="autoTune" disabled>
            Autotune
          </v-btn>
        </v-col>
      </v-row>
    </div>

  </div>
</template>

<script>
import MachineDisplay from '@/components/MachineDisplay.vue'
import SingleResponseChart from '@/components/SingleResponseChart.vue'
import apiMixin from '@/mixins/apiMixin'
import { eventBus } from '@/main'
import axios from 'axios'

export default {
  name: 'MachineInterface',
  mixins: [apiMixin],
  components: {
    MachineDisplay,
    SingleResponseChart
  },
  data: function () {
    return {
      temperature: 0,
      // temperatures: [],
      displayOption: 'machine',
      T_setpoint: 60,
      intervalReference: null, // Varibale to hold setInterval for getting temperature,
      t_update: 10,
      m_current: null, // Brewed coffee mass (g)
      m_setpoint: 20,
      n_datapoints: 10,
      low_water: false,
      sessionData: null,
      // watchedData: { watched: [] },
      tuneMode: false,
      heaterOn: false
    }
  },
  props: {
    machineOn: Boolean,
    machineBrewing: Boolean
  },
  computed: {
    tempBtnColor: function () {
      if (Math.abs(this.T_setpoint - this.temperature) < 2) {
        return 'success'
      }
      return 'secondary'
    },
    brewProgress: function () {
      return 100 * this.m_current / this.m_setpoint
    },
    waterLevelColor: function () {
      return this.low_water ? 'error' : 'success'
    },
    t_elapsed: function () {
      return 0
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
    updateResponse () {
      eventBus.$emit('updateOnOff')
      if (this.machineOn) {
        // Get all responses from current session
        const getParams = { params: { session: 'active' } }

        axios.get('/api/v1/response/sessions/', getParams)
          .then(response => {
            console.log(response.data)
            // this.sessionData = response.data
            this.sessionData = Object.assign({}, this.sessionData, response.data)
            const latestSession = response.data[Object.keys(response.data)[0]]
            const lastResponse = latestSession[latestSession.length - 1]
            this.temperature = lastResponse.T_boiler
            this.m_current = lastResponse.m
            this.low_water = lastResponse.low_water
          })
          .catch(error => console.log(error))
      } else { // If machine off just get temperature
        // Get latest response only
        axios.get('/api/v1/response/latest/')
          .then(response => {
            console.log(response.data)
            // Check if temperature is old
            const deltaTime = (new Date() - new Date(response.data.t)) / 1000
            // console.log(deltaTime)
            if (deltaTime > 15) {
              this.temperature = null
            } else {
              this.temperature = response.data.T_boiler
            }
            // this.temperatures.push(response.data.T_boiler)
            // while (this.temperatures.length > this.n_datapoints) {
            //   this.temperatures.shift()
            // }
            // this.watchedData.watched.push(response.data)
            // while (this.watchedData.watched.length > this.n_datapoints) {
            //   this.watchedData.watched.shift()
            // }
            this.m_current = response.data.m
            this.low_water = response.data.low_water
          })
          .catch(error => console.log(error))
        this.sessionData = null
      }
    },
    updateInterval () {
      axios.get('/api/v1/settings/1/')
        .then(response => {
          this.t_update = response.data.t_update
          this.m_setpoint = response.data.m
          this.T_setpoint = response.data.T_set
          this.intervalReference = setInterval(() => {
            this.updateResponse()
          }, 1000 * this.t_update)
        })
        .catch(error => console.log(error))
    },
    viewLastSession () {
      axios.get('/api/v1/session/')
        .then(response => {
          const lastSession = response.data[response.data.length - 1]
          this.$router.push({ name: 'Session', params: { sessionIds: lastSession.id.toString() } })
        })
        .catch(error => console.log(error))
    },
    toggleHeater () {
      const getParams = { params: { heaterOn: !this.heaterOn } }
      axios.get('/api/v1/override/', getParams)
        .then(response => {
          this.heaterOn = !this.heaterOn
        })
        .catch(error => console.log(error))
    },
    autoTune () {
      console.log('Autotune not yet implemented')
    }
  },
  created () {
    this.updateInterval()
    this.updateResponse()
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

.machine-container {
  position: relative;
}

#temp-btn {
  position: absolute;
  top: 25%;
  left: 50%;
  transform: translate(-50%, -50%);
  -ms-transform: translate(-50%, -50%);
  background-color: rgb(236, 236, 236);
}

#water-btn {
  position: absolute;
  /* top: 10%;
  left: 83%; */
  top: 92.1%;
  left: 90%;
  transform: translate(-50%, -50%);
  -ms-transform: translate(-50%, -50%);
  background-color: rgb(236, 236, 236);
}

#brew-btn {
  position: absolute;
  /* top: 10%;
  left: 83%; */
  top: 75%;
  left: 31.5%;
  transform: translate(-50%, -50%);
  -ms-transform: translate(-50%, -50%);
  background-color: rgb(236, 236, 236);
  height: 50px;
  text-transform: none !important;
}
</style>
