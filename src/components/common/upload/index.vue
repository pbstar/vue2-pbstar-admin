<template>
  <div>
    <input
      ref="uploadBox"
      class="uploadBox"
      type="file"
      @change="handleClick"
    />
    <div @click="handleUpload">
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: "upload",
  props: {
    beforeUpload: Function, // eslint-disable-line
    onSuccess: Function, // eslint-disable-line
  },
  methods: {
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
</style>
