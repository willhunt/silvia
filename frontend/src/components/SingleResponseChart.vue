<template>
  <div>
    <v-card class="mb-4" min-width=750 max-width=1600>
      <response-chart class="px-6 pt-6 pb-1" :chartData="graphData" :chartOptions="graphOptions"></response-chart>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="info" @click="dataHidden=!dataHidden">data</v-btn>
      </v-card-actions>
    </v-card>

    <v-card v-if="!dataHidden" class="mx-auto mb-4" min-width=750 max-width=1600>
      <v-data-table class="mx-4"
        :headers="headers"
        :items="tableData"
        dense>
      </v-data-table>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="secondary" @click="exportData">export</v-btn>
      </v-card-actions>
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
      },
      dataHidden: true,
      headers: [
        { text: 'Time Stamp', value: 'ts' },
        { text: 'Time', value: 't' },
        { text: 'Duty', value: 'duty' },
        { text: 'Temperature', value: 'T_boiler' }
      ]
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
    },
    tableData: function () {
      const session = Object.keys(this.data)[0]
      const tableData = []
      const t0 = new Date(this.data[session][0].t)
      this.data[session].forEach((responseItem, responseIndex) => {
        tableData.push({
          ts: responseItem.t,
          t: (new Date(responseItem.t) - t0) / 1000,
          duty: responseItem.duty,
          T_boiler: responseItem.T_boiler
        })
      })
      return tableData
    }
  },
  methods: {
    showData: function () {
      this.hideData = false
    },
    exportData: function () {
      // window.localStorage.setItem('data', JSON.stringify(this.tableData))
      const data = JSON.stringify(this.tableData)
      const blob = new Blob([data], { type: 'text/plain' })
      const e = document.createEvent('MouseEvents')
      const a = document.createElement('a')
      a.download = 'data.json'
      a.href = window.URL.createObjectURL(blob)
      a.dataset.downloadurl = ['text/json', a.download, a.href].join(':')
      e.initEvent('click', true, false, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null)
      a.dispatchEvent(e)
    }
  }
}
</script>

<style scoped>

</style>
