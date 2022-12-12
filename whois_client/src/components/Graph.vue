<template>
  <div class="canvas">
    <svg class="chart" viewBox="0 0 50 50">
      <circle
        v-for="(statistic, key) in Statistics"
        :key="key"
        class="unit"
        r="15.9"
        cx="50%"
        cy="50%"
        :style="{
          'stroke-dasharray': `${statistic.percent} 100`,
          'stroke-dashoffset': `-${statistic.indent}`,
        }"
      ></circle>
    </svg>
    <div class="legend">
      <p class="title">{{ $t(`graph.${StatisticMod}`) }}</p>
      <div class="caption-list">
        <div
          v-for="(statistic, key) in Statistics"
          :key="key"
          class="caption-item"
        >
          <span class="StaticItem">{{ statistic.element }}</span>
          <span class="StaticItem"> {{ Math.floor(statistic.percent) }} %</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import WhoisDataService from "@/services/WhoisDataService";

export default {
  name: "GraphComponent",
  data() {
    return {
      Statistics: [],
      Count: 0,
    };
  },
  props: {
    StatisticMod: {
      type: String,
      default: "",
    },
  },
  created() {
    this.SetStatisticMod();
  },
  methods: {
    CalcPercent() {
      let ident = 0;
      let otherPercent = 0;
      this.Statistics.forEach((element) => {
        element.percent = Math.floor((100 * element.count) / this.Count);
        otherPercent += element.percent;
        element.indent = ident;
        ident += element.percent;
      });
      this.Statistics[5].percent += 100 - otherPercent;
    },
    SetStatisticMod() {
      WhoisDataService.GetCountStatistic({ mod: this.StatisticMod }).then(
        (stat) => {
          this.Count = stat.data[0].count;

          WhoisDataService.GetStatistic({ mod: this.StatisticMod }).then(
            (stat) => {
              if (this.StatisticMod === "Age") {
                this.Statistics = [
                  { element: "0 .. 4", count: stat.data._0to4 },
                  { element: "4 .. 8", count: stat.data._4to8 },
                  { element: "8 .. 12", count: stat.data._8to12 },
                  { element: "12 .. 16", count: stat.data._12to16 },
                  { element: "16 .. 20", count: stat.data._16to20 },
                  { element: "20 .. * ", count: stat.data._20more },
                ];
              } else {
                this.Statistics = [
                  { element: stat.data[0].value, count: stat.data[0].count },
                  { element: stat.data[1].value, count: stat.data[1].count },
                  { element: stat.data[2].value, count: stat.data[2].count },
                  { element: stat.data[3].value, count: stat.data[3].count },
                  { element: stat.data[4].value, count: stat.data[4].count },
                  { element: this.$t("graph.Other"), count: 0 },
                ];
                this.Statistics[5].count =
                  this.Count -
                  stat.data[0].count -
                  stat.data[1].count -
                  stat.data[2].count -
                  stat.data[3].count -
                  stat.data[4].count;
              }
              this.CalcPercent();
            }
          );
        }
      );
    },
  },
};
</script>

<style scoped>
.canvas {
  display: flex;
  align-items: center;
  width: 30vw;
  height: 20vw;
  background-color: var(--bg);
  border: 2px solid #000;
  border-radius: 20px;
  margin: 10px;
  opacity: 0.9;
}

.chart {
  width: 22vw;
  height: 22vw;
}

.unit {
  fill: none;
  stroke-width: 10;
  animation-name: render;
  transition-property: all;
  animation-duration: 1.5s;
}

.unit:hover {
  opacity: 0.9;
  stroke-width: 12;
}

.legend {
}

.title {
  font-size: calc(0.3em + 1.5vw);
  /*line-height: 21px;*/
  margin-bottom: 0;
  color: var(--color-dark-font);
}

.caption-list {
  margin: 0;
  padding: 0;
  list-style: none;
}

.caption-item {
  position: relative;
  margin: 1vw 1vw 1vw 0;
  padding-left: 3vw;
  font-size: calc(0.2em + 1vw);
  color: var(--color-dark-font);
  cursor: pointer;
  width: 15vw;
  display: flex;
  justify-content: space-between;
}

.caption-item:hover {
  opacity: 0.8;
}

.caption-item::before {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  width: 20px;
  height: 20px;
  border-radius: 8px;
}

.caption-item:nth-child(1) {
  border-bottom: solid #99cccc;
}

.caption-item:nth-child(2) {
  border-bottom: solid #ccffcc;
}

.caption-item:nth-child(3) {
  border-bottom: solid #ffcccc;
}

.caption-item:nth-child(4) {
  border-bottom: solid #cc99ff;
}

.caption-item:nth-child(5) {
  border-bottom: solid #ccff66;
}

.caption-item:nth-child(6) {
  border-bottom: solid #ffcc66;
}

.caption-item:nth-child(1)::before {
  background-color: #99cccc;
}

.caption-item:nth-child(2)::before {
  background-color: #ccffcc;
}

.caption-item:nth-child(3)::before {
  background-color: #ffcccc;
}

.caption-item:nth-child(4)::before {
  background-color: #cc99ff;
}

.caption-item:nth-child(5)::before {
  background-color: #ccff66;
}

.caption-item:nth-child(6)::before {
  background-color: #ffcc66;
}

.unit:nth-child(1) {
  stroke: #99cccc;
}

.unit:nth-child(2) {
  stroke: #ccffcc;
}

.unit:nth-child(3) {
  stroke: #ffcccc;
}

.unit:nth-child(4) {
  stroke: #cc99ff;
}

.unit:nth-child(5) {
  stroke: #ccff66;
}

.unit:nth-child(6) {
  stroke: #ffcc66;
}

@keyframes render {
  0% {
    stroke-dasharray: 0 100;
  }
}

@media only screen and (max-width: 1300px) {
  .canvas {
    width: auto;
  }
  .caption-list {
    display: flex;
    width: 70vw;
    justify-content: space-between;
    flex-flow: row wrap;
  }
  .caption-item {
    font-size: calc(0.2em + 1.5vw);
    width: 25vw;
  }
  .caption-item::before {
    width: 1.5vw;
    height: 1.5vw;
  }
}
</style>
