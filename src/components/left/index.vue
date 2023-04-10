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
      background-color="#545c64"
      text-color="#fff"
      active-text-color="#409eff"
      :collapse="isCollapse"
      unique-opened
    >
      <div v-for="(item, index) in list" :key="index">
        <el-submenu :index="item.index" v-if="item.child">
          <template slot="title">
            <i :class="item.icon"></i>
            <span v-show="!isCollapse">{{ item.title }}</span>
          </template>
          <el-menu-item
            v-for="(items, indexs) in item.child"
            :key="indexs + 's'"
            :index="items.index"
            @click="toPage(items.index)"
            >{{ items.title }}</el-menu-item
          >
        </el-submenu>
        <el-menu-item v-else :index="item.index" @click="toPage(item.index)">
          <i :class="item.icon"></i>
          <span v-show="!isCollapse">{{ item.title }}</span>
        </el-menu-item>
      </div>
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
      list: [
        {
          index: "adminBusiness",
          icon: "el-icon-copy-document",
          title: "综合业务",
          child: [
            {
              index: "adminBusinessArticleList",
              title: "文章管理",
            },
          ],
        },
        {
          index: "adminEcharts",
          icon: "el-icon-pie-chart",
          title: "ECharts图表",
        },
        {
          index: "adminImg",
          icon: "el-icon-picture-outline",
          title: "图片文件",
          child: [
            {
              index: "adminImgPreview",
              title: "预览",
            },
            {
              index: "adminImgShear",
              title: "裁剪",
            },
            {
              index: "adminImgExport",
              title: "导出",
            },
          ],
        },
        {
          index: "adminPdf",
          icon: "el-icon-notebook-2",
          title: "PDF文件",
          child: [
            {
              index: "adminPdfPreview",
              title: "预览",
            },
            {
              index: "adminPdfExport",
              title: "导出",
            },
          ],
        },
        {
          index: "adminZip",
          icon: "el-icon-s-cooperation",
          title: "ZIP压缩包",
        },
        {
          index: "adminExcel",
          icon: "el-icon-tickets",
          title: "Excel文件",
        },
        {
          index: "adminVideo",
          icon: "el-icon-video-play",
          title: "视频播放",
          child: [
            {
              index: "adminVideoXgPlayer",
              title: "xgPlayer",
            },
          ],
        },
        {
          index: "adminModule",
          icon: "el-icon-help",
          title: "功能组件",
          child: [
            {
              index: "adminModuleSignature",
              title: "电子签名",
            },
            {
              index: "adminModuleVerificationCode",
              title: "验证码",
            },
          ],
        },
        {
          index: "adminUpload",
          icon: "el-icon-upload",
          title: "文件上传",
        },
        {
          index: "adminEditer",
          icon: "el-icon-edit-outline",
          title: "富文本编辑器",
          child: [
            {
              index: "adminEditerWangEditer",
              title: "wangEditer",
            },
          ],
        },
      ],
    };
  },
  watch: {
    $route: {
      handler(to, from) {
        this.defaultActive = to.name;
      },
      immediate: true, //第一次就执行
    },
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
