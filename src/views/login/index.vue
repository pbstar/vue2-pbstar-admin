<template>
  <div>
    <div class="fapage">
      <div class="login">
        <img class="logo" src="@/assets/imgs/logo.png" alt="" />
        <h3 class="title">后台管理系统</h3>
        <el-input
          class="username"
          placeholder="请输入账号"
          prefix-icon="el-icon-user"
          v-model="username"
        >
        </el-input>
        <el-input
          class="password"
          placeholder="请输入密码"
          :show-password="true"
          type="password"
          prefix-icon="el-icon-lock"
          v-model="password"
        >
        </el-input>
        <el-button class="btn" type="primary" @click="toLogin">登 录</el-button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "login",
  data() {
    return {
      username: "",
      password: "",
    };
  },
  methods: {
    toLogin() {
      if (!this.username) {
        this.$message({
          message: "请输入账号",
          type: "warning",
        });
        return;
      }
      if (!this.password) {
        this.$message({
          message: "请输入密码",
          type: "warning",
        });
        return;
      }
      this.$unit.setLocalStorage("username", this.username);
      this.$router.push({
        name: "adminHome",
      });
    },
  },
};
</script>
<style lang="scss" scoped>
.fapage {
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #2d3a4b;
  .login {
    width: 400px;
    display: flex;
    flex-direction: column;
    align-items: center;
    color: #fff;
    .logo {
      width: 80px;
      height: 80px;
      margin-bottom: 15px;
    }
    .title {
      margin-bottom: 20px;
      font-size: 26px;
    }
    .username {
      margin-bottom: 10px;
      /deep/ .el-input__inner {
        height: 45px;
        line-height: 45px;
        background-color: #1f2b3a !important;
        border-color: #1f2b3a !important;
        color: #fff !important;
      }
    }
    .password {
      margin-bottom: 15px;
      /deep/ .el-input__inner {
        height: 45px;
        line-height: 45px;
        background-color: #1f2b3a !important;
        border-color: #1f2b3a !important;
        color: #fff !important;
      }
    }
    .btn {
      width: 100%;
      margin-bottom: 50px;
    }
  }
}
</style>
