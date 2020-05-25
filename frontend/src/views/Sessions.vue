<template>

  <div class="sessions">
    <v-card class="mx-auto mb-4" min-width=350 max-width=900>
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
            <v-btn class="secondary" @click="loadSessions">Reload</v-btn>
          </v-card-actions>
        </div>
      </v-expand-transition>
    </v-card>

    <div v-if="showGraph">
      <v-card max-height="450" class="pa-6">
        <response-chart v-if="graphLoaded" :chartdata="graphData" :options="graphOptions" class="">
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
      graphData: null,
      graphOptions: {
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
            const endDateTime = new Date(item.t_end)
            const deltaMinutes = Math.ceil((endDateTime - startDateTime) / (1000 * 60))
            item.duration = deltaMinutes
          })
        })
        .catch(error => console.log(error))
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
          this.graphData = {
            datasets: []
          } // Reset

          // Loop through sessions
          Object.keys(response.data).forEach((sessionKey, sessionIndex) => {
            // const timeData = []
            // const tempData = []
            const dataSet = {
              label: 'Session ' + sessionKey,
              showLine: true,
              data: []
            }
            // Loop through responses
            response.data[sessionKey].forEach((responseItem, responseIndex) => {
              // timeData.push((new Date(responseItem.t) - new Date(response.data[sessionKey][0].t)) / 1000) // Time in seconds since start
              // tempData.push(responseItem.T_boiler)
              dataSet.data.push({
                x: (new Date(responseItem.t) - new Date(response.data[sessionKey][0].t)) / 1000,
                y: responseItem.T_boiler
              })
            })
            // this.graphData.push({
            //   id: sessionKey,
            //   time: timeData,
            //   temp: tempData
            // })
            this.graphData.datasets.push(dataSet)
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
