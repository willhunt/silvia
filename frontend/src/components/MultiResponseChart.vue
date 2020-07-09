<template>
  <div>
    <v-card max-height="450" class="pa-6">
      <response-chart v-if="graphLoaded" :chartdata="graphDataT" :chartOptions="graphOptionsT" class="">
      </response-chart>
    </v-card>
    <v-card max-height="450" class="pa-6">
      <response-chart v-if="graphLoaded" :chartdata="graphDataD" :chartOptions="graphOptionsD" class="">
      </response-chart>
    </v-card>
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
  props: {
    data: {}
  },
  computed: {
    graphDataT: function () {
      this.generateGraphData('T_boiler')
    },
    graphDataD: function () {
      this.generateGraphData('duty')
    }
  },
  methods: {
    generateGraphData(responseField) {
      const graphData = {}
      graphData.datasets = []
      Object.keys(this.data).forEach((sessionKey, sessionIndex) => {
        const dataset = {
          label: 'Session ' + sessionKey,
          showLine: true,
          data: [],
          fill: false
        }
        // Loop through responses and add data
        this.data[sessionKey].forEach((responseItem, responseIndex) => {
          const xPoint = (new Date(responseItem.t) - new Date(response.data[sessionKey][0].t)) / 1000
          dataset.data.push({
            x: xPoint,
            y: responseItem[responseField]
          })
        })
        graphData.datasets.push(dataset)
      })
      return graphData
    }
  },
  created () {
    this.loadSessions()
  }
}
</script>

<style scoped>

</style>
