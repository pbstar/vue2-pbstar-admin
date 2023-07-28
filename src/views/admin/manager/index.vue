<template>
  <div>
    <div class="box">
      <div class="top">
        <div class="tLeft">
          <el-input
            v-model="input"
            style="width: 200px"
            placeholder="请输入内容"
          ></el-input>
          <el-button type="primary" style="margin-left: 10px" @click="getList"
            >搜索</el-button
          >
        </div>
        <div class="tRight">
          <el-button type="primary" @click="toAdd">添加</el-button>
        </div>
      </div>
      <div class="table">
        <el-table :data="list" style="width: 100%">
          <el-table-column prop="date" label="序号" align="center">
            <template slot-scope="scope">
              <span>{{ scope.$index + 1 }}</span>
            </template>
          </el-table-column>
          <el-table-column
            align="center"
            prop="name"
            label="姓名"
            min-width="100"
          ></el-table-column>
          <el-table-column
            align="center"
            prop="account"
            label="账号"
            min-width="100"
          ></el-table-column>
          <el-table-column
            align="center"
            prop="role"
            label="角色"
            min-width="80"
          >
            <template slot-scope="scope">
              <span>{{ getRole(scope.row.role) }}</span>
            </template>
          </el-table-column>
          <el-table-column
            prop="createTime"
            label="创建时间"
            min-width="180"
            align="center"
          >
          </el-table-column>
          <el-table-column
            prop="isActive"
            label="状态"
            width="100"
            align="center"
          >
            <template slot-scope="scope">
              <el-switch
                v-model="scope.row.isActive"
                @change="toUserActive(scope.row)"
              >
              </el-switch>
            </template>
          </el-table-column>
          <el-table-column
            fixed="right"
            label="操作"
            align="center"
            min-width="180"
          >
            <template slot-scope="scope">
              <el-button
                @click="handleClick(scope.row)"
                type="text"
                size="small"
                >编辑</el-button
              >
              <el-button
                @click="toRoleBox(scope.row)"
                type="text"
                size="small"
                v-show="scope.row.account != 'admin'"
                >设置角色</el-button
              >
              <el-button
                type="text"
                size="small"
                v-show="scope.row.account != 'admin'"
                @click="toDel(scope.row)"
                >删除</el-button
              >
            </template>
          </el-table-column>
        </el-table>
      </div>
      <el-dialog title="设置角色" :visible.sync="isShowRoleBox" width="500px">
        <el-radio-group v-model="radio">
          <el-radio
            v-for="(item, index) in roleList"
            :key="index"
            :label="item.id"
            >{{ item.name }}</el-radio
          >
        </el-radio-group>
        <span slot="footer" class="dialog-footer">
          <el-button @click="isShowRoleBox = false">取 消</el-button>
          <el-button type="primary" @click="toRole()">确 定</el-button>
        </span>
      </el-dialog>
      <el-dialog
        :title="isEdit ? '编辑管理员' : '添加管理员'"
        :visible.sync="isShowUserInfoBox"
        width="500px"
      >
        <el-form label-width="52px">
          <el-form-item label="姓名" required>
            <el-input
              v-model="userInfo.name"
              placeholder="请输入姓名"
            ></el-input>
          </el-form-item>
          <el-form-item label="账号" required>
            <el-input
              v-model="userInfo.account"
              :readonly="isEdit"
              placeholder="请输入账号"
            ></el-input>
          </el-form-item>
          <el-form-item label="密码" required>
            <el-input
              v-model="userInfo.password"
              placeholder="请输入密码"
            ></el-input>
          </el-form-item>
          <el-form-item label="角色" required>
            <el-select v-model="userInfo.role" placeholder="请选择角色">
              <el-option
                v-for="(item, index) in roleList"
                :key="index"
                :label="item.name"
                :value="item.id"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="状态" required>
            <el-switch v-model="userInfo.isActive"> </el-switch>
          </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button @click="isShowUserInfoBox = false">取 消</el-button>
          <el-button type="primary" @click="toUser()">确 定</el-button>
        </span>
      </el-dialog>
    </div>
  </div>
</template>

<script>
export default {
  name: "adminBusinessArticleList",
  data() {
    return {
      input: "",
      list: [],
      roleList: [],
      isShowRoleBox: false,
      props: {
        label: "title",
        children: "child",
      },
      radio: 0,
      rowInfo: "",
      userInfo: {
        name: "",
        account: "",
        password: "",
        role: 1,
        createTime: "2023-01-01 12:00:00",
        isActive: 0,
        isDelete: 0,
      },
      isEdit: false,
      isShowUserInfoBox: false,
    };
  },
  created() {
    this.getList();
    this.getRoleList();
  },
  methods: {
    getList() {
      this.$http.post("getUserList").then((res) => {
        if (res.code == 200) {
          for (let i = 0; i < res.data.length; i++) {
            res.data[i].isActive = res.data[i].isActive == 0;
          }
          this.list = res.data;
        }
      });
    },
    getRoleList() {
      this.$http.post("getRoleList").then((res) => {
        if (res.code == 200) {
          this.roleList = res.data;
        }
      });
    },
    getRole(role) {
      let text = "";
      for (let i = 0; i < this.roleList.length; i++) {
        if (this.roleList[i].id == role) {
          text = this.roleList[i].name;
        }
      }
      return text;
    },
    toRoleBox(e) {
      this.rowInfo = e;
      this.radio = e.role;
      this.isShowRoleBox = true;
    },
    toRole() {
      this.$http
        .post("toRole", {
          account: this.rowInfo.account,
          role: this.radio,
        })
        .then((res) => {
          if (res.code == 200) {
            this.getList();
            this.$message({
              message: "设置成功",
              type: "success",
            });
            this.isShowRoleBox = false;
          }
        });
    },
    toUserActive(e) {
      this.$http
        .post("toUserActive", {
          account: e.account,
          isActive: e.isActive ? 0 : 1,
        })
        .then((res) => {
          if (res.code == 200) {
            this.$message({
              message: "修改状态成功",
              type: "success",
            });
          }
        });
    },
    handleClick(row) {
      this.userInfo = row;
      this.isEdit = true;
      this.isShowUserInfoBox = true;
    },
    toDel(e) {
      this.$message({
        message: "暂不支持删除",
        type: "warning",
      });
    },
    toAdd() {
      this.userInfo = {
        name: "",
        account: "",
        password: "",
        role: 1,
        createTime: "2023-01-01 12:00:00",
        isActive: true,
        isDelete: 0,
      };
      this.isEdit = false;
      this.isShowUserInfoBox = true;
    },
    toUser() {
      if (!this.userInfo.name) {
        this.$message({
          message: "姓名不能为空！",
          type: "warning",
        });
        return;
      }
      if (!this.userInfo.account) {
        this.$message({
          message: "账号不能为空！",
          type: "warning",
        });
        return;
      }
      if (!this.userInfo.password) {
        this.$message({
          message: "密码不能为空！",
          type: "warning",
        });
        return;
      }
      this.userInfo.isActive = this.userInfo.isActive ? 0 : 1;
      console.log({
        info: this.userInfo,
        isEdit: this.isEdit,
      });
      this.$http
        .post("toUser", {
          info: this.userInfo,
          isEdit: this.isEdit,
        })
        .then((res) => {
          if (res.code == 200) {
            this.getList();
            this.isShowUserInfoBox = false;
            this.$message({
              message: this.isEdit ? "修改成功" : "添加成功",
              type: "success",
            });
          }
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
  .top {
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
    border-bottom: 2px solid #efefef;
    padding-bottom: 10px;
    padding-top: 5px;
    .tLeft {
      display: flex;
      align-items: center;
      .label {
        white-space: nowrap;
        color: #666;
      }
    }
  }
  .table {
    margin-top: 10px;
    .pagination {
      margin-top: 10px;
      margin-bottom: 5px;
      display: flex;
      justify-content: center;
    }
  }
  /deep/ .el-radio {
    margin-bottom: 10px;
  }
}
</style>