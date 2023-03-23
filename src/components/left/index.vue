<template>
  <div style="height: 100vh">
    <div class="topbox">
      <img class="logo" src="@/assets/imgs/logo.png" alt="" />
      <transition name="show">
        <h4 v-show="!isCollapse">后台管理系统</h4>
      </transition>
    </div>
    <el-menu
      default-active="2"
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
          <i class="el-icon-location"></i>
          <span>导航一</span>
        </template>
        <el-menu-item index="1-1">选项1</el-menu-item>
        <el-menu-item index="1-2">选项2</el-menu-item>
        <el-menu-item index="1-3">选项3</el-menu-item>
      </el-submenu>
      <el-submenu index="2">
        <template slot="title">
          <i class="el-icon-location"></i>
          <span>导航一</span>
        </template>
        <el-menu-item index="1-1">选项1</el-menu-item>
        <el-menu-item index="1-2">选项2</el-menu-item>
        <el-menu-item index="1-3">选项3</el-menu-item>
      </el-submenu>
      <el-menu-item index="adminUserList" @click="toPage('userList')">
        <i class="el-icon-user-solid"></i>
        <span slot="title">用户管理</span>
      </el-menu-item>
      <el-menu-item index="adminClassList" @click="toPage('classList')">
        <i class="el-icon-menu"></i>
        <span slot="title">班级管理</span>
      </el-menu-item>
      <el-menu-item index="7">
        <i class="el-icon-menu"></i>
        <span slot="title">角色管理</span>
      </el-menu-item>
      <el-submenu index="2">
        <template slot="title">
          <i class="el-icon-location"></i>
          <span>导航一</span>
        </template>
        <el-menu-item index="1-1">选项1</el-menu-item>
        <el-menu-item index="1-2">选项2</el-menu-item>
        <el-menu-item index="1-3">选项3</el-menu-item>
      </el-submenu>
      <el-menu-item index="adminUserList" @click="toPage('userList')">
        <i class="el-icon-user-solid"></i>
        <span slot="title">用户管理</span>
      </el-menu-item>
      <el-menu-item index="adminClassList" @click="toPage('classList')">
        <i class="el-icon-menu"></i>
        <span slot="title">班级管理</span>
      </el-menu-item>
      <el-menu-item index="7">
        <i class="el-icon-menu"></i>
        <span slot="title">角色管理</span>
      </el-menu-item>
      <el-submenu index="2">
        <template slot="title">
          <i class="el-icon-location"></i>
          <span>导航一</span>
        </template>
        <el-menu-item index="1-1">选项1</el-menu-item>
        <el-menu-item index="1-2">选项2</el-menu-item>
        <el-menu-item index="1-3">选项3</el-menu-item>
      </el-submenu>
      <el-menu-item index="adminUserList" @click="toPage('userList')">
        <i class="el-icon-user-solid"></i>
        <span slot="title">用户管理</span>
      </el-menu-item>
      <el-menu-item index="adminClassList" @click="toPage('classList')">
        <i class="el-icon-menu"></i>
        <span slot="title">班级管理</span>
      </el-menu-item>
      <el-menu-item index="7">
        <i class="el-icon-menu"></i>
        <span slot="title">角色管理</span>
      </el-menu-item>
      <el-submenu index="2">
        <template slot="title">
          <i class="el-icon-location"></i>
          <span>导航一</span>
        </template>
        <el-menu-item index="1-1">选项1</el-menu-item>
        <el-menu-item index="1-2">选项2</el-menu-item>
        <el-menu-item index="1-3">选项3</el-menu-item>
      </el-submenu>
      <el-menu-item index="adminUserList" @click="toPage('userList')">
        <i class="el-icon-user-solid"></i>
        <span slot="title">用户管理</span>
      </el-menu-item>
      <el-menu-item index="adminClassList" @click="toPage('classList')">
        <i class="el-icon-menu"></i>
        <span slot="title">班级管理</span>
      </el-menu-item>
      <el-menu-item index="7">
        <i class="el-icon-menu"></i>
        <span slot="title">角色管理</span>
      </el-menu-item>
      <el-submenu index="2">
        <template slot="title">
          <i class="el-icon-location"></i>
          <span>导航一</span>
        </template>
        <el-menu-item index="1-1">选项1</el-menu-item>
        <el-menu-item index="1-2">选项2</el-menu-item>
        <el-menu-item index="1-3">选项3</el-menu-item>
      </el-submenu>
      <el-menu-item index="adminUserList" @click="toPage('userList')">
        <i class="el-icon-user-solid"></i>
        <span slot="title">用户管理</span>
      </el-menu-item>
      <el-menu-item index="adminClassList" @click="toPage('classList')">
        <i class="el-icon-menu"></i>
        <span slot="title">班级管理</span>
      </el-menu-item>
      <el-menu-item index="7">
        <i class="el-icon-menu"></i>
        <span slot="title">角色管理</span>
      </el-menu-item>
      <el-submenu index="2">
        <template slot="title">
          <i class="el-icon-location"></i>
          <span>导航一</span>
        </template>
        <el-menu-item index="1-1">选项1</el-menu-item>
        <el-menu-item index="1-2">选项2</el-menu-item>
        <el-menu-item index="1-3">选项3</el-menu-item>
      </el-submenu>
      <el-menu-item index="adminUserList" @click="toPage('userList')">
        <i class="el-icon-user-solid"></i>
        <span slot="title">用户管理</span>
      </el-menu-item>
      <el-menu-item index="adminClassList" @click="toPage('classList')">
        <i class="el-icon-menu"></i>
        <span slot="title">班级管理</span>
      </el-menu-item>
      <el-menu-item index="7">
        <i class="el-icon-menu"></i>
        <span slot="title">角色管理</span>
      </el-menu-item>
      <el-submenu index="2">
        <template slot="title">
          <i class="el-icon-location"></i>
          <span>导航一</span>
        </template>
        <el-menu-item index="1-1">选项1</el-menu-item>
        <el-menu-item index="1-2">选项2</el-menu-item>
        <el-menu-item index="1-3">选项3</el-menu-item>
      </el-submenu>
      <el-menu-item index="adminUserList" @click="toPage('userList')">
        <i class="el-icon-user-solid"></i>
        <span slot="title">用户管理</span>
      </el-menu-item>
      <el-menu-item index="adminClassList" @click="toPage('classList')">
        <i class="el-icon-menu"></i>
        <span slot="title">班级管理</span>
      </el-menu-item>
      <el-menu-item index="7">
        <i class="el-icon-menu"></i>
        <span slot="title">角色管理</span>
      </el-menu-item>
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
    };
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
  animation: move 0.35s alternate;
}
.show-leave-active {
  animation: move2 0.3s alternate;
}
@keyframes move {
  from {
    width: 0;
  }
  to {
    width: 114px;
  }
}
@keyframes move2 {
  from {
    width: 114px;
  }
  to {
    width: 0;
  }
}
</style>
