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
            label="角色名称"
            min-width="130"
          ></el-table-column>
          <el-table-column
            align="center"
            prop="description"
            label="角色描述"
            min-width="130"
          ></el-table-column>
          <el-table-column
            prop="createTime"
            label="创建时间"
            min-width="180"
            align="center"
          >
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
                @click="toAuthorityBox(scope.row)"
                v-show="scope.row.id != 1"
                type="text"
                size="small"
                >设置权限</el-button
              >
              <el-button
                type="text"
                size="small"
                v-show="scope.row.id != 1"
                @click="toDel(scope.row)"
                >删除</el-button
              >
            </template>
          </el-table-column>
        </el-table>
      </div>
      <el-dialog
        title="设置权限"
        :visible.sync="isShowAuthorityBox"
        width="500px"
      >
        <el-tree
          :data="leftNavList"
          ref="rootTree"
          :props="props"
          show-checkbox
          node-key="index"
        >
        </el-tree>
        <span slot="footer" class="dialog-footer">
          <el-button @click="isShowAuthorityBox = false">取 消</el-button>
          <el-button type="primary" @click="getKeys()">确 定</el-button>
        </span>
      </el-dialog>
      <el-dialog
        :title="isEdit ? '编辑角色' : '添加角色'"
        :visible.sync="isShowRoleInfoBox"
        width="500px"
      >
        <el-form label-width="80px">
          <el-form-item label="角色名称" required>
            <el-input
              v-model="roleInfo.name"
              placeholder="请输入角色名称"
            ></el-input>
          </el-form-item>
          <el-form-item label="角色描述" required>
            <el-input
              v-model="roleInfo.description"
              placeholder="请输入角色描述"
            ></el-input>
          </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button @click="isShowRoleInfoBox = false">取 消</el-button>
          <el-button type="primary" @click="toRoleItem()">确 定</el-button>
        </span>
      </el-dialog>
    </div>
  </div>
</template>

<script>
import leftNavList from "@/assets/json/leftNavList.json";
export default {
  name: "adminBusinessArticleList",
  data() {
    return {
      input: "",
      list: [],
      isShowAuthorityBox: false,
      leftNavList: [],
      props: {
        label: "title",
        children: "child",
      },
      rowInfo: null,
      roleInfo: {
        id: 0,
        name: "",
        description: "",
        createTime: "2023-01-01 12:00:00",
        isDelete: 0,
        authority: "adminHome",
      },
      isEdit: false,
      isShowRoleInfoBox: false,
    };
  },
  created() {
    this.getLeftNavList();
    this.getList();
  },
  methods: {
    getLeftNavList() {
      console.log(leftNavList);
      this.leftNavList = [];
      for (let i = 0; i < leftNavList.length; i++) {
        if (leftNavList[i].details) {
          leftNavList[i].title =
            leftNavList[i].title + "(" + leftNavList[i].details + ")";
        }
        if (leftNavList[i].child) {
          for (let a = 0; a < leftNavList[i].child.length; a++) {
            if (leftNavList[i].child[a].details) {
              leftNavList[i].child[a].title =
                leftNavList[i].child[a].title +
                "(" +
                leftNavList[i].child[a].details +
                ")";
            }
          }
        }
        this.leftNavList.push(leftNavList[i]);
      }
    },
    getList() {
      this.$http.post("getRoleList").then((res) => {
        if (res.code == 200) {
          this.list = res.data;
        }
      });
    },
    handleClick(row) {
      this.roleInfo = row;
      this.isEdit = true;
      this.isShowRoleInfoBox = true;
    },
    toAuthorityBox(e) {
      this.rowInfo = e;
      this.isShowAuthorityBox = true;
      this.$nextTick(() => {
        this.$refs.rootTree.setCheckedKeys(e.authority.split(","));
      });
    },
    getKeys() {
      let authority = this.$refs.rootTree.getCheckedKeys().join(",");
      let id = this.rowInfo.id;
      this.$http
        .post("toAuthority", {
          authority,
          id,
        })
        .then((res) => {
          if (res.code == 200) {
            this.getList();
            this.$message({
              message: "设置成功",
              type: "success",
            });
            this.isShowAuthorityBox = false;
          }
        });
    },
    toDel(e) {
      this.$message({
        message: "暂不支持删除",
        type: "warning",
      });
    },
    toAdd() {
      this.roleInfo = {
        id: 0,
        name: "",
        description: "",
        createTime: "2023-01-01 12:00:00",
        isDelete: 0,
        authority: "adminHome",
      };
      this.isEdit = false;
      this.isShowRoleInfoBox = true;
    },
    toRoleItem() {
      if (!this.roleInfo.name) {
        this.$message({
          message: "角色名称不能为空！",
          type: "warning",
        });
        return;
      }
      if (!this.roleInfo.description) {
        this.$message({
          message: "角色描述不能为空！",
          type: "warning",
        });
        return;
      }
      this.$http
        .post("toRoleItem", {
          info: this.roleInfo,
          isEdit: this.isEdit,
        })
        .then((res) => {
          if (res.code == 200) {
            this.getList();
            this.isShowRoleInfoBox = false;
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
}
</style>