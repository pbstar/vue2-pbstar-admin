<template>
  <div>
    <div class="box">
      <div ref="map" style="width: 800px; height: 600px"></div>
    </div>
  </div>
</template>

<script>
import * as echarts from "echarts";
import "@/assets/js/echarts_china";
export default {
  name: "adminEcharts",
  mounted() {
    // 初始化地图
    this.initMap();
  },
  methods: {
    initMap() {
      var myChart = echarts.init(this.$refs.map);
      var geoCoordMap = {
        北京: [116.46, 39.92],
        天津: [117.4219, 39.4189],
        河北: [114.4995, 38.1006],
        山西: [112.3352, 37.9413],
        内蒙古: [110.3467, 41.4899],
        辽宁: [123.1238, 42.1216],
        吉林: [125.8154, 44.2584],
        黑龙江: [127.9688, 45.368],
        上海: [121.4648, 31.2891],
        江苏: [118.8062, 31.9208],
        浙江: [119.5313, 29.8773],
        安徽: [117.29, 32.0581],
        福建: [119.4543, 25.9222],
        江西: [116.0046, 28.6633],
        山东: [117.1582, 36.8701],
        河南: [113.4668, 34.6234],
        湖北: [114.3896, 30.6628],
        湖南: [113.0823, 28.2568],
        广东: [113.12244, 23.009505],
        广西: [108.479, 23.1152],
        海南: [110.3893, 19.8516],
        重庆: [108.384366, 30.439702],
        四川: [103.9526, 30.7617],
        贵州: [106.6992, 26.7682],
        云南: [102.9199, 25.4663],
        西藏: [91.1423, 29.6552],
        陕西: [109.1162, 34.2004],
        甘肃: [103.5901, 36.3043],
        青海: [101.4038, 36.8207],
        宁夏: [106.3586, 38.1775],
        新疆: [87.6335, 43.7992],
        香港: [114.173355, 22.320048],
      };
      var data = [
        { name: "北京", value: 17 },
        { name: "天津", value: 8 },
        { name: "河北", value: 7 },
        { name: "山西", value: 2 },
        { name: "内蒙古", value: 9 },
        { name: "辽宁", value: 5 },
        { name: "吉林", value: 5 },
        { name: "黑龙江", value: 1 },
        { name: "上海", value: 59 },
        { name: "江苏", value: 14 },
        { name: "浙江", value: 15 },
        { name: "安徽", value: 9 },
        { name: "福建", value: 5 },
        { name: "江西", value: 2 },
        { name: "山东", value: 8 },
        { name: "河南", value: 8 },
        { name: "湖北", value: 9 },
        { name: "湖南", value: 4 },
        { name: "广东", value: 27 },
        { name: "广西", value: 15 },
        { name: "海南", value: 3 },
        { name: "重庆", value: 4 },
        { name: "四川", value: 14 },
        { name: "贵州", value: 1 },
        { name: "云南", value: 6 },
        { name: "陕西", value: 4 },
        { name: "甘肃", value: 3 },
        { name: "青海", value: 1 },
        { name: "宁夏", value: 3 },
        { name: "新疆", value: 2 },
      ];
      var mapmax = 0;
      var convertData = function (data) {
        var res = [];
        for (var i = 0; i < data.length; i++) {
          if (data[i].value > mapmax) mapmax = data[i].value;
          var geoCoord = geoCoordMap[data[i].name];
          if (geoCoord) {
            res.push({
              name: data[i].name,
              value: geoCoord.concat(data[i].value),
            });
          }
        }
        return res;
      };

      let option = {
        trigger: "item",
        visualMap: {
          show: true,
          min: 0,
          max: mapmax,
          left: "left",
          top: "bottom",
          //   text: ['高', '低'], // 文本，默认为数值文本
          calculable: true,
          seriesIndex: [1],
          inRange: {
            color: ["#04387b", "#467bc0"], // 蓝绿
          },
        },
        tooltip: {
          padding: 0,
          transitionDuration: 1,
          textStyle: {
            color: "#000",
            decoration: "none",
          },
          borderColor: "rgba(7,166,255,0.7)",
          trigger: "item",
          formatter: function (params) {
            if (typeof params.value[2] == "undefined") {
              var toolTiphtml = "";
              for (var i = 0; i < data.length; i++) {
                if (params.name == data[i].name) {
                  toolTiphtml =
                    '<div style="width:200px;height:100px;background:rgba(22,80,158,0.8);border:1px solid rgba(7,166,255,0.7)!important">' +
                    '<div style="width:80%;height:40px;line-height:40px;border-bottom:2px solid rgba(7,166,255,0.7);padding:0 20px;">' +
                    '<i style="display:inline-block;width:8px;height:8px;background:#16d6ff;border-radius:40px;">' +
                    "</i>" +
                    '<span style="margin-left:10px;color:#fff;font-size:16px;">' +
                    data[i].name +
                    "</span>" +
                    "</div>" +
                    '<div style="padding:20px">' +
                    '<p style="color:#fff;font-size:12px;">' +
                    '<i style="display:inline-block;width:10px;height:10px;background:#16d6ff;border-radius:40px;margin:0 8px">' +
                    "</i>" +
                    "单位总数：" +
                    '<span style="color:#11ee7d;margin:0 6px;">' +
                    data[i].value +
                    "</span>" +
                    "个" +
                    "</p>" +
                    "</div>" +
                    "</div>";
                }
              }
              return toolTiphtml;
            } else {
              var toolTiphtml = "";
              for (var i = 0; i < data.length; i++) {
                if (params.name == data[i].name) {
                  toolTiphtml =
                    '<div style="width:200px;height:100px;background:rgba(22,80,158,0.8);border:1px solid rgba(7,166,255,0.7)!important">' +
                    '<div style="width:80%;height:40px;line-height:40px;border-bottom:2px solid rgba(7,166,255,0.7);padding:0 20px;">' +
                    '<i style="display:inline-block;width:8px;height:8px;background:#16d6ff;border-radius:40px;">' +
                    "</i>" +
                    '<span style="margin-left:10px;color:#fff;font-size:16px;">' +
                    data[i].name +
                    "</span>" +
                    "</div>" +
                    '<div style="padding:20px">' +
                    '<p style="color:#fff;font-size:12px;">' +
                    '<i style="display:inline-block;width:10px;height:10px;background:#16d6ff;border-radius:40px;margin:0 8px">' +
                    "</i>" +
                    "单位总数：" +
                    '<span style="color:#11ee7d;margin:0 6px;">' +
                    data[i].value +
                    "</span>" +
                    "个" +
                    "</p>" +
                    "</div>" +
                    "</div>";
                }
              }
              return toolTiphtml;
            }
          },
        },
        geo: {
          show: true,
          map: "china",
          label: {
            normal: {
              show: false,
            },
            emphasis: {
              show: false,
            },
          },
          zoom: 1.2,
          roam: false,
          itemStyle: {
            normal: {
              areaColor: "#023677",
              borderColor: "#1180c7",
            },
            emphasis: {
              areaColor: "#4499d0",
            },
          },
        },
        series: [
          {
            name: "散点",
            type: "scatter",
            coordinateSystem: "geo",
            data: convertData(data),
            symbolSize: function (val) {
              return (val[2] / mapmax) * 15;
            },
            label: {
              normal: {
                formatter: "{b}",
                position: "right",
                show: true,
              },
              emphasis: {
                show: true,
              },
            },
            itemStyle: {
              normal: {
                color: "#05C3F9",
              },
            },
          },
          {
            map: "china",
            type: "map",
            geoIndex: 0,
            aspectScale: 0.75, //长宽比
            showLegendSymbol: false, // 存在legend时显示
            label: {
              normal: {
                show: true,
              },
              emphasis: {
                show: false,
                textStyle: {
                  color: "#fff",
                },
              },
            },
            roam: true,
            itemStyle: {
              normal: {
                areaColor: "#031525",
                borderColor: "#3B5077",
              },
              emphasis: {
                areaColor: "#2B91B7",
              },
            },
            animation: false,
            data: data,
          },
          {
            name: "Top 5",
            type: "effectScatter",
            coordinateSystem: "geo",
            data: convertData(
              data
                .sort(function (a, b) {
                  return b.value - a.value;
                })
                .slice(0, 5)
            ),
            symbolSize: function (val) {
              return (val[2] / mapmax) * 15;
            },
            showEffectOn: "render",
            rippleEffect: {
              brushType: "stroke",
            },
            hoverAnimation: true,
            label: {
              normal: {
                formatter: "{b}",
                position: "right",
                show: true,
              },
            },
            itemStyle: {
              normal: {
                color: "yellow",
                shadowBlur: 10,
                shadowColor: "yellow",
              },
            },
            zlevel: 1,
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
}
</style>