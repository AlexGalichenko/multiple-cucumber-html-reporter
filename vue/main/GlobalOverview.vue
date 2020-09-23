<template>
  <div :class="`col-md-${width} col-lg-${width} col-xs-12`">
    <div class="x_panel">
      <div class="x_title">
        <h2>Features</h2>
        <ul class="nav navbar-right panel_toolbox">
          <li>
            <a class="collapse-link" @click="isVisible = !isVisible">
              <i :class="`fa fa-chevron-${isVisible ? 'up' : 'down'}`" />
            </a>
          </li>
        </ul>
        <div class="clearfix"></div>
      </div>
      <div v-show="isVisible" class="x_content container">
        <BarChart :data="chartData" :options="options" :height="300"/>
      </div>
    </div>
  </div>
</template>

<script>
import BarChart from "../global/BarChart.vue";

export default {
  name: "GlobalOverview",
  props: {
    suite: Object,
    width: Number,
  },
  data() {
    return {
      isVisible: true,
      chartData: {
        datasets: [
          {
            data: this.suite.features.map((f) => f.scenarios.passed),
            label: "passed",
            borderColor: "black",
            borderWidth: 0.1,
            barPercentage: 1,
            categoryPercentage: 0.5,
            backgroundColor: "#26B99A",
          },
          {
            data: this.suite.features.map((f) => f.scenarios.failed),
            label: "failed",
            borderColor: "black",
            borderWidth: 0.1,
            barPercentage: 1,
            categoryPercentage: 0.5,
            backgroundColor: "#E74C3C",
          },
          {
            data: this.suite.features.map((f) => f.scenarios.ambiguous),
            label: "ambiguous",
            borderColor: "black",
            borderWidth: 0.1,
            barPercentage: 1,
            categoryPercentage: 0.5,
            backgroundColor: "#3498DB",
          },
          {
            data: this.suite.features.map((f) => f.scenarios.skipped),
            label: "skipped",
            borderColor: "black",
            borderWidth: 0.1,
            barPercentage: 1,
            categoryPercentage: 0.5,
            backgroundColor: "#b73122",
          },
        ],
        labels: this.suite.features.map(f => f.name),
      },
      options: {
        maintainAspectRatio: false,
        responsive: true,
        legend: false,
        scales: {
          xAxes: [
            {
              stacked: true
            },
          ],
          yAxes: [
            {
              stacked: true
            },
          ],
        },
      },
    };
  },
  components: {
    BarChart,
  },
};
</script>

<style scoped>
.x_content.container {
    width: 100%;
    display: contents;
}
</style>
