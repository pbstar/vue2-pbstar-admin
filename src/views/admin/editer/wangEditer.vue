<template>
  <div>
    <div class="box">
      <h3>wangediter官网：https://www.wangeditor.com/</h3>
      <div class="editerBox">
        <div ref="editorTopElem"></div>
        <div ref="editorMidElem" class="editorMidElem"></div>
      </div>
      <el-button type="primary" style="margin-top: 10px" @click="post = html"
        >保存</el-button
      >
      <div class="post" v-html="post ? post : '暂无保存内容'"></div>
    </div>
  </div>
</template>
<script>
import Editer from "wangeditor";
export default {
  name: "adminEditerWangEditer",
  data() {
    return {
      editor: null,
      html: "",
      post: "",
    };
  },
  created() {},
  mounted() {
    this.editor = new Editer(
      this.$refs.editorTopElem,
      this.$refs.editorMidElem
    );
    this.editor.config.uploadImgShowBase64 = true;
    this.editor.create();
    this.editor.config.onchange = (e) => {
      this.html = e;
      console.log(e);
    };
    this.editor.config.uploadImgMaxLength = 1;
    this.editor.config.uploadImgMaxSize = 1 * 1024 * 1024;
    this.editor.config.uploadImgAccept = ["jpg", "jpeg", "png", "gif"];
    this.editor.config.customUploadImg = function (resultFiles, insertImgFn) {
      console.log(resultFiles);
      insertImgFn("http://oss.mcweb.club/utools/20233/touxiang.jpg");
    };
  },
  methods: {},
};
</script>
<style lang="scss" scoped>
.box {
  background-color: #fff;
  margin: 10px;
  padding: 10px;
  min-height: calc(100% - 20px);
  .editerBox {
    border: 1px solid #ddd;
    margin-top: 10px;
    .editorMidElem {
      height: 360px;
      border-top: 1px solid #eee;
    }
  }
  .post {
    border: 1px solid #ddd;
    margin-top: 10px;
    padding: 10px;
    width: 100%;
  }
}
</style>