<template>

  <div class="session">
    <div v-if="graphLoaded">
      <single-response-chart v-if="sessionsList.length == 1" :data="plotData"></single-response-chart>
      <multi-response-chart v-else :data="plotData"></multi-response-chart>
    </div>
  </div>

</template>

<script>
import axios from 'axios'
import SingleResponseChart from '@/components/SingleResponseChart.vue'
import MultiResponseChart from '@/components/MultiResponseChart.vue'

export default {
  name: 'Session',
  components: {
    SingleResponseChart,
    MultiResponseChart
  },
  data: function () {
    return {
      plotData: {},
      graphLoaded: false
    }
  },
  computed: {
    sessionsCsv: function () {
      return this.$route.params.sessionIds
    },
    sessionsList: function () {
      return this.$route.params.sessionIds.split(',')
    }
  },
  methods: {
    viewData () {
      const getParams = { params: { session: this.sessionsCsv } }

      axios.get('/api/v1/response/sessions/', getParams)
        .then(response => {
          this.graphLoaded = false
          console.log(response.data)
          this.plotData = response.data
          this.graphLoaded = true
        })
        .catch(error => console.log(error))
    }
  },
  created () {
    this.viewData()
  }
}
</script>

<style scoped>

</style>
