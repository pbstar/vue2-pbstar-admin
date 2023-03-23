<template>
  <div class="box">
    <div class="tlbox">
      <i
        :class="isCollapse ? 'el-icon-s-unfold' : 'el-icon-s-fold'"
        @click="toCollapse"
      ></i>
      <breadcrumb class="tlbreadcrumb" />
    </div>
    <div class="trbox">
      <i class="el-icon-switch-button" @click="toExit"></i>
    </div>
  </div>
</template>

<script>
import breadcrumb from "@/components/common/breadcrumb";
export default {
  name: "admintop",
  components: {
    breadcrumb,
  },
  data() {
    return {
      isCollapse: false,
    };
  },
  mounted() {
    this.$bus.$on("isCollapse", (e) => {
      this.isCollapse = e;
    });
  },
  beforeDestroy() {
    this.$bus.$off("isCollapse");
  },
  methods: {
    toExit() {
      this.$confirm("确认退出登录吗？").then(() => {
        this.$unit.removeLocalStorage("username");
        this.$router.push({
          name: "home",
        });
      });
    },
    toCollapse() {
      this.$bus.$emit("toCollapse");
    },
  },
};
</script>
<style lang="scss" scoped>
.box {
  line-height: 60px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  // color: #fff;
  height: 60px;
  // background-color: #08457e;
  padding: 0 25px;
  border-bottom: 1px solid #eee;
  i {
    font-size: 22px;
    cursor: pointer;
  }
  .tlbox {
    display: flex;
    align-items: center;
    .tlbreadcrumb {
      margin-left: 20px;
    }
  }
  .trbox {
    display: flex;
    align-items: center;
  }
}
</style>
