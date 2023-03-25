<template>
  <div style="height: 100vh">
    <div class="topbox">
      <img class="logo" src="@/assets/imgs/logo.png" alt="" />
      <transition name="show">
        <h4 v-show="!isCollapse">后台管理系统</h4>
      </transition>
    </div>
    <el-menu
      :default-active="defaultActive"
      class="midbox"
      @open="handleOpen"
      @close="handleClose"
      background-color="#545c64"
      text-color="#fff"
      active-text-color="#409eff"
      :collapse="isCollapse"
      unique-opened
    >
      <el-submenu index="1">
        <template slot="title">
          <i class="el-icon-copy-document"></i>
          <span>综合业务</span>
        </template>
        <el-menu-item
          index="adminBusinessArticleList"
          @click="toPage('adminBusinessArticleList')"
          >文章管理</el-menu-item
        >
      </el-submenu>
      <el-menu-item index="adminEcharts" @click="toPage('adminEcharts')">
        <i class="el-icon-pie-chart"></i>
        <span>ECharts图表</span>
      </el-menu-item>
      <el-submenu index="3">
        <template slot="title">
          <i class="el-icon-notebook-2"></i>
          <span>PDF文件</span>
        </template>
        <el-menu-item index="adminPdfPreview" @click="toPage('adminPdfPreview')"
          >预览</el-menu-item
        >
        <el-menu-item index="adminPdfExport" @click="toPage('adminPdfExport')"
          >导出</el-menu-item
        >
      </el-submenu>
      <el-menu-item index="adminZip" @click="toPage('adminZip')">
        <i class="el-icon-s-cooperation"></i>
        <span>ZIP压缩包</span>
      </el-menu-item>
      <el-menu-item index="adminExcel" @click="toPage('adminExcel')">
        <i class="el-icon-tickets"></i>
        <span>Excel文件</span>
      </el-menu-item>
      <el-submenu index="6">
        <template slot="title">
          <i class="el-icon-video-play"></i>
          <span>视频播放</span>
        </template>
        <el-menu-item
          index="adminVideoXgPlayer"
          @click="toPage('adminVideoXgPlayer')"
          >xgPlayer</el-menu-item
        >
      </el-submenu>
      <el-submenu index="7">
        <template slot="title">
          <i class="el-icon-help"></i>
          <span>功能组件</span>
        </template>
        <el-menu-item
          index="adminModuleSignature"
          @click="toPage('adminModuleSignature')"
          >电子签名</el-menu-item
        >
      </el-submenu>
      <el-menu-item index="adminUpload" @click="toPage('adminUpload')">
        <i class="el-icon-upload"></i>
        <span>文件上传</span>
      </el-menu-item>
      <el-submenu index="9">
        <template slot="title">
          <i class="el-icon-edit-outline"></i>
          <span>富文本编辑器</span>
        </template>
        <el-menu-item
          index="adminEditerWangEditer"
          @click="toPage('adminEditerWangEditer')"
          >wangEditer</el-menu-item
        >
      </el-submenu>
    </el-menu>
  </div>
</template>

<script>
export default {
  name: "adminLeft",
  props: {
    msg: String,
  },
  data() {
    return {
      isCollapse: false,
      defaultActive: "",
    };
  },
  created() {
    this.defaultActive = this.$route.name;
  },
  mounted() {
    this.$bus.$on("toCollapse", () => {
      this.isCollapse = !this.isCollapse;
      this.$bus.$emit("isCollapse", this.isCollapse);
    });
  },
  beforeDestroy() {
    this.$bus.$off("toCollapse");
  },
  methods: {
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    },
    toPage(name) {
      this.$router.push({
        name,
      });
    },
  },
};
</script>
<style lang="scss" scoped>
.topbox {
  background-color: rgb(58, 64, 70);
  height: 60px;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  h4 {
    width: 130px;
    font-size: 17px;
    color: #fff;
    margin-left: 10px;
    letter-spacing: 3px;
    overflow: hidden;
    white-space: nowrap;
  }
  .logo {
    width: 30px;
    height: 30px;
  }
}
.midbox {
  height: calc(100vh - 75px);
  padding-top: 6px;
  padding-bottom: 9px;
  background-color: #545c64;
  border-right-color: #545c64;
  overflow-y: auto;
  /deep/ .el-menu-item {
    height: 45px;
    line-height: 45px;
  }
  /deep/ .el-submenu__title {
    height: 45px;
    line-height: 45px;
  }
  /deep/ .el-menu-item i {
    color: #fff;
  }
  /deep/ .el-submenu__title i {
    color: #fff;
  }
  /deep/ .el-menu-item.is-active i {
    color: #409eff;
  }
  /deep/ .el-submenu__title.is-active i {
    color: #409eff;
  }
}
.midbox::-webkit-scrollbar {
  width: 5px;
}
.midbox::-webkit-scrollbar-thumb {
  border-radius: 5px;
  background: rgba(201, 201, 201, 0.2);
}
.midbox::-webkit-scrollbar-track {
  border-radius: 0;
  background: rgba(201, 201, 201, 0.1);
}
/deep/ .midbox:not(.el-menu--collapse) {
  width: 200px;
}
.show-enter-active {
  animation: move 0.3s alternate;
}
.show-leave-active {
  animation: move2 0.3s alternate;
}
@keyframes move {
  from {
    width: 0;
  }
  to {
    width: 130px;
  }
}
@keyframes move2 {
  from {
    width: 130px;
  }
  to {
    width: 0;
  }
}
</style>
