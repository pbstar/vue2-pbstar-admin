<template>
  <div>
    <div class="box">
      <div class="boxs">
        <div class="uploadBox">
          <uploadDrop :onSuccess="toSuccess" />
        </div>
        <p>拖拽上传</p>
      </div>
      <div class="boxs">
        <upload :onSuccess="toSuccess">
          <el-button type="primary">上传</el-button>
        </upload>
        <p>插槽上传</p>
      </div>
    </div>
  </div>
</template>

<script>
import uploadDrop from "@/components/common/upload/drop.vue";
import upload from "@/components/common/upload";
export default {
  name: "adminUpload",
  components: {
    uploadDrop,
    upload,
  },
  methods: {
    toSuccess(e) {
      console.log(e);
      this.$message.success("上传成功");
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
  .uploadBox {
    width: 300px;
  }
  .boxs {
    width: 360px;
    height: 260px;
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