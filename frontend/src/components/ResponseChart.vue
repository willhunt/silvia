<script>
import { Scatter } from 'vue-chartjs'

export default {
  name: 'ResponseChart',
  extends: Scatter,
  data: function () {
    return {
      // colors: ['#b2182b', '#d6604d', '#f4a582', '#fddbc7', '#d1e5f0', '#92c5de', '#4393c3', '#2166ac'],
      colors: ['#ff5a5f', '#eabe7c', '#769fb6', '#7fd1b9', '#634b66'],
      chartdataLocal: { datasets: [] },
      maxLines: 5
    }
  },
  props: {
    chartdata: {
      type: Object,
      default: null
    },
    chartOptions: {
      type: Object,
      default: null
    }
  },
  mounted () {
    this.chartdata.datasets.forEach((item, index) => {
      // Maybe make his loop better to not iterate past maxLines
      if (index < this.maxLines) {
        const dataset = item
        dataset.borderColor = this.colors[index]
        this.chartdataLocal.datasets.push(dataset)
      }
    })
    this.renderChart(this.chartdataLocal, this.chartOptions)
  }
}
</script>

<style>
</style>
