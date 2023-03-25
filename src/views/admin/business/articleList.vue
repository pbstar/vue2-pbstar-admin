<template>
  <div>
    <div class="box">
      <div class="top">
        <div class="tLeft">
          <span class="label">发布日期：</span>
          <el-date-picker
            style="margin-left: 10px; width: 260px"
            v-model="dateTime"
            type="datetimerange"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="截至日期"
          >
          </el-date-picker>
          <span class="label" style="margin-left: 30px">发布状态：</span>
          <el-select
            v-model="value"
            placeholder="请选择发布状态"
            style="margin-left: 10px; width: 200px"
          >
            <el-option label="全部" value="0"> </el-option>
            <el-option label="已发布" value="1"> </el-option>
            <el-option label="未发布" value="2"> </el-option>
          </el-select>
          <el-input
            v-model="input"
            style="margin-left: 30px; width: 200px"
            placeholder="请输入内容"
          ></el-input>
          <el-button type="primary" style="margin-left: 10px">搜索</el-button>
        </div>
        <div class="tRight">
          <el-button type="primary">添加</el-button>
        </div>
      </div>
      <div class="table">
        <el-table :data="list" border style="width: 100%">
          <el-table-column prop="date" label="序号" width="80">
            <template slot-scope="scope">
              <span>{{ (currentPage - 1) * pageSize + scope.$index + 1 }}</span>
            </template>
          </el-table-column>
          <el-table-column prop="title" label="文章标题" min-width="400">
          </el-table-column>
          <el-table-column prop="author" label="作者" width="120">
          </el-table-column>
          <el-table-column prop="source" label="文章来源" width="200">
          </el-table-column>
          <el-table-column prop="releaseDate" label="发布日期" width="200">
          </el-table-column>
          <el-table-column prop="isRelease" label="发布状态" width="120">
            <template slot-scope="scope">
              <el-switch v-model="scope.row.isRelease"> </el-switch>
            </template>
          </el-table-column>
          <el-table-column fixed="right" label="操作" width="100">
            <template slot-scope="scope">
              <el-button
                @click="handleClick(scope.row)"
                type="text"
                size="small"
                >编辑</el-button
              >
              <el-button type="text" size="small">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
        <el-pagination
          class="pagination"
          background
          layout="prev, pager, next,jumper,sizes,total"
          :current-page="currentPage"
          :total="total"
          :page-size="pageSize"
          :page-sizes="[10, 20, 50, 100]"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
        >
        </el-pagination>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "adminBusinessArticleList",
  data() {
    return {
      input: "",
      dateTime: "",
      list: [],
      currentPage: 1,
      pageSize: 10,
      total: 190,
      value: "",
    };
  },
  created() {
    this.getList();
  },
  methods: {
    getList() {
      console.log(this.pageSize);
      this.list = [];
      for (let i = 0; i < this.pageSize; i++) {
        this.list.push({
          title: "睡前吃水果真的可以减肥吗？",
          author: "张明",
          source: "前端新闻网",
          releaseDate: "2023-03-25 12:23:34",
          isRelease: 0,
        });
      }
    },
    handleClick(row) {
      console.log(row);
    },
    handleSizeChange(val) {
      this.pageSize = val;
      this.getList();
    },
    handleCurrentChange(val) {
      this.currentPage = val;
      this.getList();
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