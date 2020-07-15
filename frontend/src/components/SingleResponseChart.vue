<template>
  <div>
    <v-card max-height="450" class="pa-6 mb-4" min-width=750 max-width=1600 >
      <response-chart :chartdata="graphData" :chartOptions="graphOptions">
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
      graphOptions: {
        scales: {
          xAxes: [{
            id: 'time-axis',
            position: 'bottom',
            display: true,
            scaleLabel: {
              display: true,
              labelString: 'Time [s]'
            }
          }],
          yAxes: [
            {
              id: 'temperature-axis',
              position: 'left',
              display: true,
              scaleLabel: {
                display: true,
                labelString: 'Boiler Temperature [C]'
              }
            },
            {
              id: 'duty-axis',
              position: 'right',
              reverse: true,
              display: true,
              scaleLabel: {
                display: true,
                labelString: 'Duty [%]'
              }
            },
            {
              id: 'mass-axis',
              position: 'right',
              display: true,
              scaleLabel: {
                display: true,
                labelString: 'Mass (g)'
              },
              ticks: {
                suggestedMin: 0
              }
            }
          ]
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
    graphData: function () {
      const graphData = {}
      graphData.datasets = []
      const session = Object.keys(this.data)[0]
      const datasetT = {
        label: 'Temperature',
        xAxisID: 'time-axis',
        yAxisID: 'temperature-axis',
        showLine: true,
        data: [],
        fill: false
      }
      const datasetD = {
        label: 'Duty',
        xAxisID: 'time-axis',
        yAxisID: 'duty-axis',
        showLine: true,
        data: [],
        fill: false
      }
      const datasetS = {
        label: 'Setpoint',
        xAxisID: 'time-axis',
        yAxisID: 'temperature-axis',
        showLine: true,
        data: [],
        fill: false
      }
      const datasetM = {
        label: 'Extraction',
        xAxisID: 'time-axis',
        yAxisID: 'mass-axis',
        showLine: true,
        data: [],
        fill: false
      }

      // Loop through responses and add data
      this.data[session].forEach((responseItem, responseIndex) => {
        const xPoint = (new Date(responseItem.t) - new Date(this.data[session][0].t)) / 1000
        datasetT.data.push({
          x: xPoint,
          y: responseItem.T_boiler
        })
        datasetD.data.push({
          x: xPoint,
          y: responseItem.duty
        })
        datasetS.data.push({
          x: xPoint,
          y: responseItem.T_setpoint
        })
        datasetM.data.push({
          x: xPoint,
          y: responseItem.m
        })
      })
      graphData.datasets.push(datasetT)
      graphData.datasets.push(datasetD)
      graphData.datasets.push(datasetS)
      graphData.datasets.push(datasetM)
      return graphData
    }
  }
}
</script>

<style scoped>

</style>
