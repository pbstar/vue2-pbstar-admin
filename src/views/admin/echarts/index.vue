<template>
  <div>
    <div class="box">
      <h3>echarts官网：https://echarts.apache.org/examples/zh/index.html</h3>
      <h3>其他echarts图表网站：https://madeapie.com/</h3>
      <div class="main">
        <div class="boxs">
          <div ref="map1" style="width: 380px; height: 300px"></div>
          <p>折线图</p>
        </div>
        <div class="boxs">
          <div ref="map2" style="width: 380px; height: 300px"></div>
          <p>柱状图</p>
        </div>
        <div class="boxs">
          <div ref="map3" style="width: 380px; height: 300px"></div>
          <p>饼状图</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import * as echarts from "echarts";
export default {
  name: "adminEcharts",
  mounted() {
    this.initMap1();
    this.initMap2();
    this.initMap3();
  },
  methods: {
    initMap1() {
      let option = {
        xAxis: {
          type: "category",
          data: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
        },
        yAxis: {
          type: "value",
        },
        series: [
          {
            data: [150, 230, 224, 218, 135, 147, 260],
            type: "line",
          },
        ],
      };
      var myChart = echarts.init(this.$refs.map1);
      myChart.setOption(option);
    },
    initMap2() {
      let option = {
        xAxis: {
          type: "category",
          data: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
        },
        yAxis: {
          type: "value",
        },
        series: [
          {
            data: [120, 200, 150, 80, 70, 110, 130],
            type: "bar",
          },
        ],
      };
      var myChart = echarts.init(this.$refs.map2);
      myChart.setOption(option);
    },
    initMap3() {
      let option = {
        tooltip: {
          trigger: "item",
        },
        legend: {
          top: "5%",
          left: "center",
        },
        series: [
          {
            name: "Access From",
            type: "pie",
            radius: ["40%", "70%"],
            avoidLabelOverlap: false,
            itemStyle: {
              borderRadius: 10,
              borderColor: "#fff",
              borderWidth: 2,
            },
            label: {
              show: false,
              position: "center",
            },
            emphasis: {
              label: {
                show: true,
                fontSize: 20,
                fontWeight: "bold",
              },
            },
            labelLine: {
              show: false,
            },
            data: [
              { value: 1048, name: "Search Engine" },
              { value: 735, name: "Direct" },
              { value: 580, name: "Email" },
              { value: 484, name: "Union Ads" },
              { value: 300, name: "Video Ads" },
            ],
          },
        ],
      };
      var myChart = echarts.init(this.$refs.map3);
      myChart.setOption(option);
    },
  },
};
// 添加数据
</script>
<style lang="scss" scoped>
.box {
  background-color: #fff;
  margin: 10px;
  padding: 10px;
  min-height: calc(100% - 20px);

  .main {
    display: flex;
  }
  .boxs {
    width: 380px;
    height: 350px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-end;
    margin: 20px;
    p {
      line-height: 50px;
      border-top: 1px solid #eee;
      margin-top: 30px;
      width: 100%;
      text-align: center;
      color: #666;
    }
  }
}
</style>