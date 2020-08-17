<template>
  <div>
    <v-card max-height="450" class="graphContainer pa-6 mb-4" min-width=350 max-width=1600>
      <response-chart :chartData="graphDataT" :chartOptions="graphOptionsT" >
      </response-chart>
    </v-card>
    <v-card max-height="450" class="graphContainer pa-6 mb-4" min-width=350 max-width=1600>
      <response-chart :chartData="graphDataD" :chartOptions="graphOptionsD" >
      </response-chart>
    </v-card>
  </div>
</template>

<script>
import ResponseChart from '@/components/ResponseChart.vue'

export default {
  name: 'Sessions',
  components: {
    ResponseChart
  },
  data: function () {
    return {
      colors: ['#ff5a5f', '#eabe7c', '#769fb6', '#7fd1b9', '#634b66'],
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
        maintainAspectRatio: false,
        responsive: true
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
        maintainAspectRatio: false,
        responsive: true
      }
    }
  },
  props: {
    data: {}
  },
  computed: {
    graphDataT: function () {
      return this.generateGraphData('T_boiler')
    },
    graphDataD: function () {
      return this.generateGraphData('duty')
    }
  },
  methods: {
    generateGraphData (responseField) {
      const graphData = {}
      graphData.datasets = []
      Object.keys(this.data).forEach((sessionKey, sessionIndex) => {
        const dataset = {
          label: 'Session ' + sessionKey,
          showLine: true,
          data: [],
          fill: false,
          borderColor: this.colors[sessionIndex]
        }
        // Loop through responses and add data
        this.data[sessionKey].forEach((responseItem, responseIndex) => {
          const xPoint = (new Date(responseItem.t) - new Date(this.data[sessionKey][0].t)) / 1000
          dataset.data.push({
            x: xPoint,
            y: responseItem[responseField]
          })
        })
        graphData.datasets.push(dataset)
      })
      return graphData
    }
  }
}
</script>

<style scoped>
.graphContainer {
  position: 'relative'
}
</style>
