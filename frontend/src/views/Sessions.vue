<template>

  <div class="sessions">
    <v-card class="mx-auto mb-4" min-width=350 max-width=1200>
      <v-row align="center" class="ml-0 mr-4">
        <v-col cols="auto">
          <v-card-title>Sessions</v-card-title>
        </v-col>
        <v-spacer></v-spacer>
        <v-col cols="auto">
          <v-btn icon @click="showTable = !showTable" >
            <v-icon>{{ showTable ? 'mdi-chevron-up' : 'mdi-chevron-down' }}</v-icon>
          </v-btn>
        </v-col>
      </v-row>

      <v-expand-transition>
        <div v-show="showTable">
          <v-data-table class="mx-4"
            :headers="headers"
            :items="sessions"
            v-model="selected"
            :sort-by="['start_date', 'start_time']"
            :sort-desc="[true, true]"
            show-select>
          </v-data-table>

          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn class="accent lighten-1" @click="viewData">Graph</v-btn>
            <v-btn class="error" @click="deleteSessions">Delete</v-btn>
            <v-btn class="secondary" @click="loadSessions">Reload</v-btn>
          </v-card-actions>
        </div>
      </v-expand-transition>
    </v-card>

    <div v-if="showGraph">
      <v-card max-height="450" class="pa-6">
        <response-chart v-if="graphLoaded" :chartdata="graphDataT" :chartOptions="graphOptionsT" class="">
        </response-chart>
      </v-card>
      <v-card max-height="450" class="pa-6">
        <response-chart v-if="graphLoaded" :chartdata="graphDataD" :chartOptions="graphOptionsD" class="">
        </response-chart>
      </v-card>
    </div>
  </div>

</template>

<script>
import axios from 'axios'
import ResponseChart from '@/components/ResponseChart.vue'

export default {
  name: 'Sessions',
  components: {
    ResponseChart
  },
  data: function () {
    return {
      sessions: [],
      selected: [],
      headers: [
        { text: 'Id', value: 'id' },
        { text: 'Date', value: 'start_date' },
        { text: 'Time', value: 'start_time' },
        { text: 'Duration', value: 'duration' },
        { text: 'Active', value: 'active' }
      ],
      showTable: true,
      showGraph: false,
      graphLoaded: false,
      graphDataT: null,
      graphDataD: null,
      graphOptionsT: {
        scales: {
          xAxes: [{
            display: true,
            scaleLabel: {
              display: true,
              labelString: 'Time [s]'
            }
          }],
          yAxes: [{
            display: true,
            scaleLabel: {
              display: true,
              labelString: 'Boiler Temperature [C]'
            }
          }]
        },
        showLines: true,
        maintainAspectRatio: false
      },
      graphOptionsD: {
        scales: {
          xAxes: [{
            display: true,
            scaleLabel: {
              display: true,
              labelString: 'Time [s]'
            }
          }],
          yAxes: [{
            display: true,
            scaleLabel: {
              display: true,
              labelString: 'Duty [%]'
            }
          }]
        },
        showLines: true,
        maintainAspectRatio: false
      }
    }
  },
  methods: {
    loadSessions () {
      axios.get('/api/v1/session/')
        .then(response => {
          console.log(response.data)
          this.sessions = response.data
          // Calculate duration for each session
          this.sessions.forEach((item, index) => {
            const startDateTime = new Date(item.t_start)
            let endDateTime = new Date(item.t_end)
            if (item.t_end == null) {
              endDateTime = Date.now()
            }
            const deltaMinutes = Math.ceil((endDateTime - startDateTime) / (1000 * 60))
            const minutes = deltaMinutes % 60
            const hours = (deltaMinutes - minutes) / 60
            item.duration = hours.toString() + ':' + (minutes < 10 ? '0' : '') + minutes.toString()
          })
        })
        .catch(error => console.log(error))
    },
    deleteSessions () {
      this.selected.forEach((item, index) => {
        // Delete from databse
        axios.delete('/api/v1/session/' + item.id + '/')
          .then(response => {
            console.log(response.data)
          })
          .catch(error => console.log(error))
        // Remove from list on webpage
        this.loadSessions()
      })
    },
    viewData () {
      // Get session id's
      const sessionIds = []
      this.selected.forEach((item, index) => {
        sessionIds.push(item.id)
      })

      const getParams = { params: { session: sessionIds.join(',') } }

      axios.get('/api/v1/response/sessions/', getParams)
        .then(response => {
          this.graphLoaded = false
          console.log(response.data)
          this.graphDataT = {
            datasets: []
          } // Reset
          this.graphDataD = {
            datasets: []
          } // Reset

          // Loop through sessions
          Object.keys(response.data).forEach((sessionKey, sessionIndex) => {
            const dataSetT = {
              label: 'Session ' + sessionKey,
              showLine: true,
              data: [],
              fill: false
            }
            const dataSetD = {
              label: 'Session ' + sessionKey,
              showLine: true,
              data: [],
              fill: false
            }
            // Loop through responses
            response.data[sessionKey].forEach((responseItem, responseIndex) => {
              const xPoint = (new Date(responseItem.t) - new Date(response.data[sessionKey][0].t)) / 1000
              dataSetT.data.push({
                x: xPoint,
                y: responseItem.T_boiler
              })
              dataSetD.data.push({
                x: xPoint,
                y: responseItem.duty
              })
            })
            this.graphDataT.datasets.push(dataSetT)
            this.graphDataD.datasets.push(dataSetD)
          })
          this.graphLoaded = true
          this.showGraph = true
          this.showTable = false
        })
        .catch(error => console.log(error))
    }
  },
  created () {
    this.loadSessions()
  }
}
</script>

<style scoped>

</style>
