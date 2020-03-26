<script>
import { Line } from 'vue-chartjs'

export default {
  extends: Line,
  props: {
    chartdata: {
      type: Object,
      default: null
    },
    options: {
      type: Object,
      default: null
    }
  },
  mounted () {
    this.renderChart(this.dataForChart, this.options)
  },
  computed: {
    dataForChart() {
      return this.chartdata;
    }
  }
}
</script>

<style scoped>

</style>