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
    }],
  }]
}</code>
    </pre>
      <el-button type="primary" style="margin-top: 10px" @click="toExport"
        >导出</el-button
      >
    </div>
  </div>
</template>

<script>
import downloadZip from "@/assets/units/downloadZip";
export default {
  name: "adminZip",
  methods: {
    toExport() {
      downloadZip.downloadZip({
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