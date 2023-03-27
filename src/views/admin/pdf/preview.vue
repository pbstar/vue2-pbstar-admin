<template>
  <div>
    <div class="box">
      <pdf
        ref="pdf"
        class="pdf"
        :src="url"
        :page="pageNum"
        :rotate="pageRotate"
        @progress="loadedRatio = $event"
        @page-loaded="pageLoaded($event)"
        @num-pages="pageTotalNum = $event"
      >
      </pdf>
      <div class="pdf_footer">
        <div class="info">
          <div>当前页数/总页数：{{ pageNum }}/{{ pageTotalNum }}</div>
          <div>进度：{{ loadedRatio }}</div>
          <div>页面加载成功: {{ curPageNum }}</div>
        </div>
        <div class="operate">
          <el-button type="primary" style="margin-left: 10px" @click="clock"
            >顺时针</el-button
          >
          <el-button
            type="primary"
            style="margin-left: 10px"
            @click="counterClock"
            >逆时针</el-button
          >
          <el-button type="primary" style="margin-left: 10px" @click="prePage"
            >上一页</el-button
          >
          <el-button type="primary" style="margin-left: 10px" @click="nextPage"
            >下一页</el-button
          >
          <el-button type="primary" style="margin-left: 10px" @click="scaleD"
            >放大</el-button
          >
          <el-button type="primary" style="margin-left: 10px" @click="scaleX"
            >缩小</el-button
          >
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import pdf from "vue-pdf";
export default {
  name: "adminPdfPreview",
  components: {
    pdf,
  },
  data() {
    return {
      url: "http://oss.mcweb.club/utools/20233/post_pdf.pdf",
      pageTotalNum: 1, // 总页数
      pageNum: 1, // 当前页数
      loadedRatio: 0, // 加载进度
      curPageNum: 0, // 页面加载完成
      scale: 100, // 放大系数 默认百分百
      pageRotate: 0, // 旋转角度 ‘90’的倍数才有效
      width: 500,
    };
  },
  methods: {
    scaleD() {
      this.scale += 5;
      this.width += 100;
      this.$refs.pdf.$el.style.width = this.width + "px";
    },

    //缩小
    scaleX() {
      if (this.width < 100) {
        this.$message.warning("已经最小了");
        return;
      }
      this.scale += -5;
      this.width += -100;
      this.$refs.pdf.$el.style.width = this.width + "px";
    },
    // 切换上一页
    prePage() {
      var p = this.pageNum;
      p = p > 1 ? p - 1 : this.pageTotalNum;
      this.pageNum = p;
    },
    // 切换下一页
    nextPage() {
      var p = this.pageNum;
      p = p < this.pageTotalNum ? p + 1 : 1;
      this.pageNum = p;
    },
    // 顺时针选中角度
    clock() {
      this.pageRotate += 90;
    },
    // 逆时针旋转角度
    counterClock() {
      this.pageRotate -= 90;
    },
    // 页面加载成功  当前页数
    pageLoaded(e) {
      this.curPageNum = e;
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
  display: flex;
  .pdf {
    width: 500px;
  }
  .info {
    margin-left: 10px;
  }
  .el-button {
    margin-top: 10px;
  }
}
</style>