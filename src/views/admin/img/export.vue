<template>
  <div>
    <div class="box">
      <div class="mpbox" ref="dom">
        <img src="http://oss.mcweb.club/utools/20233/touxiang_160.jpg" alt="" />
        <h2>初辰ge</h2>
        <p>tel：XXXXXXXXXXX</p>
      </div>
      <el-button type="primary" @click="download">下载</el-button>
    </div>
  </div>
</template>

<script>
import html2Canvas from "html2canvas";
export default {
  name: "adminImgExport",
  data() {
    return {};
  },
  methods: {
    download() {
      html2Canvas(this.$refs.dom, {
        useCORS: true,
      }).then((canvas) => {
        var dataUrl = canvas.toDataURL("image/png", 1.0);
        var date = new Date();
        var aLink = document.createElement("a"); // 创建一个a标签
        var event = document.createEvent("HTMLEvents");
        let blob = this.base64ToBlob(dataUrl);
        event.initEvent("click", true, true);
        aLink.download = date.getTime() + "." + blob.type.split("/")[1]; // 使用时间戳给文件命名
        aLink.href = URL.createObjectURL(blob);
        aLink.click();
      });
    },
    // base64转Blob对象
    base64ToBlob(code) {
      var parts = code.split(";base64,");
      var contentType = parts[0].split(":")[1];
      var raw = window.atob(parts[1]);
      var rawLength = raw.length;
      var uint8Array = new Uint8Array(rawLength);
      for (var i = 0; i < rawLength; i++) {
        uint8Array[i] = raw.charCodeAt(i);
      }
      return new Blob([uint8Array], { type: contentType });
    },
  },
};
</script>
<style lang="scss" scoped>
.box {
  background-color: #fff;
  margin: 10px;
  padding: 10px;
  min-height: calc(100% - 20px);
  .mpbox {
    width: 200px;
    height: 500px;
    margin: 10px;
    background-color: #b4d8fa;
    display: flex;
    flex-direction: column;
    align-items: center;
    img {
      width: 120px;
      height: 120px;
      margin-top: 40px;
      margin-bottom: 20px;
      border-radius: 50%;
    }
    h2 {
      margin-bottom: 10px;
    }
  }
}
</style>