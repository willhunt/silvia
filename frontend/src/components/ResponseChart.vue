<script>
import { Scatter, mixins } from 'vue-chartjs'
const { reactiveProp } = mixins

export default {
  name: 'ResponseChart',
  extends: Scatter,
  mixins: [reactiveProp],
  data: function () {
    return {
      chartDataLocal: { datasets: [] },
      maxLines: 5
    }
  },
  props: {
    // this.chartData is created in the mixin.
    chartOptions: {
      type: Object,
      default: null
    }
  },
  mounted () {
    this.renderChart(this.chartData, this.chartOptions)
  }
}
</script>

<style>
</style>
