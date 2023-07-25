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
          <el-button type="primary">添加</el-button>
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
              <el-switch v-model="scope.row.isRelease"> </el-switch>
            </template>
          </el-table-column>
          <el-table-column fixed="right" label="操作" align="center">
            <template slot-scope="scope">
              <el-button
                @click="handleClick(scope.row)"
                type="text"
                size="small"
                >编辑</el-button
              >
              <el-button
                @click="isShowAuthorityBox = true"
                type="text"
                size="small"
                >设置权限</el-button
              >
              <el-button type="text" size="small">删除</el-button>
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
    };
  },
  created() {
    this.leftNavList = leftNavList;
    this.getList();
  },
  methods: {
    getList() {
      this.$http.post("getRoleList").then((res) => {
        if (res.code == 200) {
          this.list = res.data;
        }
      });
    },
    handleClick(row) {
      console.log(row);
    },
    getKeys() {
      console.log(this.$refs.rootTree.getCheckedKeys());
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