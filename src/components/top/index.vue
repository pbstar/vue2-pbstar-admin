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
      <el-dropdown trigger="click" @command="handleCommand">
        <span class="el-dropdown-link">
          <i class="el-icon-user"></i>
          <span style="margin-left: 7px">{{ username }}</span>
          <i
            class="el-icon-arrow-down el-icon--right"
            style="font-size: 14px"
          ></i>
        </span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item command="a">退出登录</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
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
      username: "",
    };
  },
  created() {
    if (this.$unit.getLocalStorage("username")) {
      this.username = this.$unit.getLocalStorage("username");
    }
  },
  mounted() {},
  beforeDestroy() {},
  methods: {
    handleCommand(command) {
      if (command == "a") {
        this.toExit();
      }
    },
    toExit() {
      this.$confirm("确认退出登录吗？").then(() => {
        this.$unit.removeLocalStorage("username");
        this.$router.push({
          name: "login",
        });
      });
    },
    toCollapse() {
      this.isCollapse = !this.isCollapse;
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

    .el-dropdown-link {
      cursor: pointer;
      display: flex;
      align-items: center;
    }
  }
}
</style>
