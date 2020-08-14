<template>
  <div>
    <v-card max-height="450" class="pa-6 mb-4" min-width=750 max-width=1600 >
      <response-chart :chartData="graphData" :chartOptions="graphOptions">
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
            },
            ticks: {
              beginAtZero: true
            }
          }],
          yAxes: [{
            id: 'temperature-axis',
            position: 'left',
            display: true,
            scaleLabel: {
              display: true,
              labelString: ['Temperature [C]', 'Duty [%]']
            },
            ticks: {
              beginAtZero: true,
              suggestedMin: 0,
              suggestedMax: 110
            }
          },
          // {
          //   id: 'duty-axis',
          //   position: 'right',
          //   reverse: true,
          //   display: true,
          //   scaleLabel: {
          //     display: true,
          //     labelString: 'Duty [%]'
          //   },
          //   ticks: {
          //     suggestedMin: 0,
          //     suggestedMax: 100
          //   }
          // },
          {
            id: 'mass-axis',
            position: 'right',
            display: true,
            scaleLabel: {
              display: true,
              labelString: 'Mass (g)'
            },
            ticks: {
              suggestedMin: 0,
              suggestedMax: 30
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
    data: {},
    brewing: Boolean
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
        fill: false,
        borderColor: '#ff5a5f'
      }
      const datasetD = {
        label: 'Duty',
        xAxisID: 'time-axis',
        yAxisID: 'temperature-axis',
        showLine: true,
        data: [],
        fill: false,
        borderColor: '#eabe7c'
      }
      const datasetS = {
        label: 'Setpoint',
        xAxisID: 'time-axis',
        yAxisID: 'temperature-axis',
        showLine: true,
        data: [],
        fill: false,
        borderColor: '#769fb6'
      }
      const datasetM = {
        label: 'Extraction',
        xAxisID: 'time-axis',
        yAxisID: 'mass-axis',
        showLine: true,
        data: [],
        fill: false,
        borderColor: '#7fd1b9'
      }

      // Loop through responses and add data
      const xPoint0 = new Date(this.data[session][0].t)
      this.data[session].forEach((responseItem, responseIndex) => {
        const xPoint = (new Date(responseItem.t) - xPoint0) / 1000
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
