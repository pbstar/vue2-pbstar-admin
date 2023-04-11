<template>
  <div>
    <input
      ref="uploadBox"
      class="uploadBox"
      type="file"
      @change="handleClick"
    />
    <div
      class="drop"
      @drop="handleDrop"
      @dragover="handleDragover"
      @dragenter="handleDragover"
      @click="handleUpload"
    >
      <i class="el-icon-upload"></i>
      <div class="el-upload__text">将文件拖到此处，或<span>点击上传</span></div>
    </div>
  </div>
</template>

<script>
export default {
  name: "uploadDrop",
  props: {
    beforeUpload: Function, // eslint-disable-line
    onSuccess: Function, // eslint-disable-line
  },
  data() {
    return {
      loading: false,
    };
  },
  methods: {
    handleDrop(e) {
      e.stopPropagation();
      e.preventDefault();
      if (this.loading) return;
      const files = e.dataTransfer.files;
      if (files.length !== 1) {
        this.$message.error("Only support uploading one file!");
        return;
      }
      const rawFile = files[0]; // only use files[0]
      this.upload(rawFile);
      e.stopPropagation();
      e.preventDefault();
    },
    handleDragover(e) {
      e.stopPropagation();
      e.preventDefault();
      e.dataTransfer.dropEffect = "copy";
    },
    handleUpload() {
      this.$refs["uploadBox"].click();
    },
    handleClick(e) {
      const files = e.target.files;
      const rawFile = files[0]; // only use files[0]
      if (!rawFile) return;
      this.upload(rawFile);
    },
    upload(rawFile) {
      this.$refs["uploadBox"].value = null; // fix can't select the same excel

      if (!this.beforeUpload) {
        this.onSuccess(rawFile);
        return;
      }
      const before = this.beforeUpload(rawFile);
      if (before) {
        this.onSuccess(rawFile);
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.uploadBox {
  display: none;
  z-index: -9999;
}
.drop {
  border: 2px dashed #bbb;
  width: 100%;
  height: 160px;
  padding: 30px 0;
  font-size: 14px;
  border-radius: 5px;
  text-align: center;
  color: #888;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
  .el-icon-upload {
    font-size: 40px;
  }
  span {
    color: #409eff;
  }
}
</style>
