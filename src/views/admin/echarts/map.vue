<template>
  <div>
    <div class="box">
      <div style="width: 800px; height: 600px" v-loading="isloading">
        <div ref="map" style="width: 800px; height: 600px"></div>
      </div>
      <div ref="proMap" style="width: 480px; height: 600px"></div>
    </div>
  </div>
</template>

<script>
import * as echarts from "echarts";
export default {
  name: "adminEchartsMap",
  data() {
    return {
      isloading: false,
    };
  },
  mounted() {
    // 初始化地图
    this.isloading = true;
    this.registerMap("中华人民共和国");
  },
  methods: {
    initMap() {
      var myChart = echarts.init(this.$refs.map);
      var data = [
        { name: "北京市", value: 17, child: [{ name: "西城区", value: 7 }] },
        { name: "天津市", value: 8 },
        { name: "河北省", value: 7 },
        { name: "山西省", value: 2 },
        { name: "吉林省", value: 5 },
        { name: "黑龙江省", value: 1 },
        { name: "江苏省", value: 14 },
        { name: "湖南省", value: 4 },
        { name: "广东省", value: 27 },
        { name: "广西壮族自治区", value: 15 },
        { name: "海南省", value: 3 },
        { name: "重庆市", value: 4 },
        { name: "四川省", value: 14 },
        { name: "新疆维吾尔自治区", value: 2 },
      ];
      var mapmax = 0;
      for (let i = 0; i < data.length; i++) {
        if (data[i].value > mapmax) {
          mapmax = data[i].value;
        }
      }
      let option = {
        trigger: "item",
        visualMap: {
          show: true,
          min: 0,
          max: mapmax,
          left: "30",
          bottom: "25",
          //   text: ['高', '低'], // 文本，默认为数值文本
          calculable: true,
          inRange: {
            color: ["#04387b", "#467bc0"], // 蓝绿
          },
        },
        tooltip: {
          trigger: "item",
          formatter: function (params) {
            if (params.name) {
              if (params.seriesType == "map") {
                return (
                  params.name + " : " + (params.value ? params.value : 0) + "个"
                );
              }
            }
          },
        },
        geo: {
          show: true,
          map: "中华人民共和国",
          label: {
            normal: {
              show: false,
            },
            emphasis: {
              show: false,
            },
          },
          top: 170,
          zoom: 1.6,
          // roam: false,
          roam: true,
          select: {
            itemStyle: {
              areaColor: "#71b8e8",
            },
          },
          itemStyle: {
            normal: {
              areaColor: "#023677",
              borderColor: "#1180c7",
            },
            emphasis: {
              areaColor: "#71b8e8",
            },
          },
        },
        series: [
          {
            type: "map",
            geoIndex: 0,
            data: data,
          },
        ],
      };
      myChart.setOption(option);
      this.isloading = false;
      myChart.on("click", (params) => {
        if (params.data && params.data.child) {
          this.registerMap(params.name, params.data.child);
        } else {
          this.registerMap(params.name, []);
        }
      });
    },
    async registerMap(name, data) {
      await this.$http
        .defaultGet("./static/json/echarts/" + name + ".json")
        .then((res) => {
          console.log(res);
          echarts.registerMap(name, res);
          if (name == "中华人民共和国") {
            this.initMap();
          } else {
            this.initProMap(name, data);
          }
        });
    },
    initProMap(name, data) {
      var myChart = echarts.init(this.$refs.proMap);
      var mapmax = 0;
      for (let i = 0; i < data.length; i++) {
        if (data[i].value > mapmax) {
          mapmax = data[i].value;
        }
      }
      let option = {
        trigger: "item",
        visualMap: {
          show: false,
          min: 0,
          max: mapmax,
          left: "30",
          bottom: "25",
          //   text: ['高', '低'], // 文本，默认为数值文本
          calculable: true,
          inRange: {
            color: ["#04387b", "#467bc0"], // 蓝绿
          },
        },
        tooltip: {
          trigger: "item",
          formatter: function (params) {
            if (params.name) {
              if (params.seriesType == "map") {
                return (
                  params.name + " : " + (params.value ? params.value : 0) + "个"
                );
              }
            }
          },
        },
        geo: {
          show: true,
          map: name,
          label: {
            normal: {
              show: false,
            },
            emphasis: {
              show: false,
            },
          },
          // top: 170,
          zoom: 1.2,
          roam: false,
          select: {
            itemStyle: {
              areaColor: "#71b8e8",
            },
          },
          itemStyle: {
            normal: {
              areaColor: "#023677",
              borderColor: "#1180c7",
            },
            emphasis: {
              areaColor: "#71b8e8",
            },
          },
        },
        series: [
          {
            type: "map",
            geoIndex: 0,
            data: data,
          },
        ],
      };
      myChart.setOption(option);
      myChart.on("click", (params) => {
        console.log(params);
      });
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
  display: flex;
  flex-wrap: wrap;
}
</style>