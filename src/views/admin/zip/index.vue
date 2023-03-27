<template>
  <div>
    <div class="box">
      <pre>
<code>
{
  zipName: "压缩包",
  folderList: [{
    folderName: "文件夹1",
    fileList: [{
      fileName: "文件1",
      fileUrl: "http://oss.mcweb.club/utools/20233/touxiang_160.jpg",
    },{
      fileName: "文件2",
      fileUrl: "http://oss.mcweb.club/utools/20233/touxiang_160.jpg",
    }],
  },{
    folderName: "文件夹2",
    fileList: [{
      fileName: "文件1",
      fileUrl: "http://oss.mcweb.club/utools/20233/touxiang_160.jpg",
    },{
      fileName: "文件2",
      fileUrl: "http://oss.mcweb.club/utools/20233/touxiang_160.jpg",
    }]
  }]
}</code>
    </pre>
      <el-button
        type="primary"
        :loading="isloading"
        style="margin-top: 10px"
        @click="toExport"
        >导出</el-button
      >
    </div>
  </div>
</template>

<script>
import downloadZip from "@/assets/units/downloadZip";
export default {
  name: "adminZip",
  data() {
    return {
      isloading: false,
    };
  },
  methods: {
    toExport() {
      let obj = {
        zipName: "压缩包",
        folderList: [
          {
            folderName: "文件夹1",
            fileList: [
              {
                fileName: "文件1",
                fileUrl: "http://oss.mcweb.club/utools/20233/touxiang_160.jpg",
              },
              {
                fileName: "文件2",
                fileUrl: "http://oss.mcweb.club/utools/20233/touxiang_160.jpg",
              },
            ],
          },
          {
            folderName: "文件夹2",
            fileList: [
              {
                fileName: "文件1",
                fileUrl: "http://oss.mcweb.club/utools/20233/touxiang_160.jpg",
              },
              {
                fileName: "文件2",
                fileUrl: "http://oss.mcweb.club/utools/20233/touxiang_160.jpg",
              },
            ],
          },
        ],
      };
      this.isloading = true;
      downloadZip
        .downloadZip(obj)
        .then((e) => {
          this.isloading = false;
          if (e == 1) this.$message.success("导出成功");
          else this.$message.error("导出失败");
        })
        .catch((e) => {
          this.isloading = false;
          this.$message.error(e);
        });
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
}
</style>