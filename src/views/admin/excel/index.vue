<template>
  <div>
    <div class="box">
      <div class="top">
        <div class="tLeft">
          <el-button type="primary" @click="toTemplate">导入模板下载</el-button>
          <el-button type="primary" @click="toImport">导入</el-button>
          <el-button type="primary" @click="toExport">导出</el-button>
          <el-dialog
            title="导入Excel"
            :visible.sync="isImportExcelBox"
            width="300px"
          >
            <importExcel :onSuccess="toImportSuccess" />
          </el-dialog>
        </div>
        <div class="tRight"></div>
      </div>
      <div class="table">
        <el-table :data="list" border style="width: 100%">
          <el-table-column prop="date" label="序号" width="80">
            <template slot-scope="scope">
              <span>{{ scope.$index + 1 }}</span>
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
              <span>{{ scope.row.isRelease == 1 ? "已发布" : "未发布" }}</span>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </div>
  </div>
</template>

<script>
import exportExcel from "@/assets/units/exportExcel";
import importExcel from "@/components/common/importExcel";
export default {
  name: "adminExcel",
  components: {
    importExcel,
  },
  data() {
    return {
      list: [],
      isImportExcelBox: false,
    };
  },
  created() {
    this.getList();
  },
  methods: {
    getList() {
      this.list = [];
      for (let i = 0; i < 6; i++) {
        this.list.push({
          title: "睡前吃水果真的可以减肥吗？",
          author: "张明",
          source: "前端新闻网",
          releaseDate: "2023-03-25 12:23:34",
          isRelease: 0,
        });
      }
    },
    toTemplate() {
      let obj = {
        fileName: "文章列表导入模板",
        FootName: "sheet1",
        theadList: [
          [
            { text: "文章标题" },
            { text: "作者" },
            { text: "文章来源" },
            { text: "发布日期" },
            { text: "发布状态" },
          ],
        ],
        tbodyList: [
          [
            { text: "睡前吃水果真的可以减肥吗？" },
            { text: "张明" },
            { text: "前端新闻网" },
            { text: "2023-03-25 12:23:34" },
            { text: "已发布" },
          ],
        ],
      };
      exportExcel.exportExcel(obj);
    },
    toImport() {
      this.isImportExcelBox = true;
    },
    toImportSuccess(e) {
      if (e && e.results) {
        const relations = {
          文章标题: "title",
          作者: "author",
          文章来源: "source",
          发布日期: "releaseDate",
          发布状态: "isRelease",
        };

        const arr = [];
        e.results.forEach((item, index) => {
          const info = {};
          item.hasOwnProperty("文章标题") == true
            ? ""
            : (item["文章标题"] = "");
          item.hasOwnProperty("作者") == true ? "" : (item["作者"] = "");
          item.hasOwnProperty("文章来源") == true
            ? ""
            : (item["文章来源"] = "");
          item.hasOwnProperty("发布日期") == true
            ? ""
            : (item["发布日期"] = "");
          item.hasOwnProperty("发布状态") == true
            ? ""
            : (item["发布状态"] = "");
          if (typeof item["发布日期"] == "object") {
            item["发布日期"] = this.$unit.formatDate(item["发布日期"]);
          }

          if (item["发布状态"] == "已发布") item["发布状态"] = 1;
          else item["发布状态"] = 0;
          Object.keys(item).forEach((key) => {
            if (relations[key] == undefined) {
              return this.$message.error(
                "当前Excel表的表头格式不符，建议下载模板使用"
              );
            }
            info[relations[key]] = item[key].toString();
          });
          arr.push(info);
        });
        if (arr.length == 0) {
          this.$message.error(
            "当前Excel表中没有数据或表头格式不符，建议下载模板使用"
          );
        } else {
          this.list = this.list.concat(arr);
          this.$message.success("导入成功");
        }
        console.log(arr, e);
        this.isImportExcelBox = false;
      } else {
        this.$message.error("导入失败");
      }
    },
    toExport() {
      let arr = [];
      for (let i = 0; i < this.list.length; i++) {
        arr.push([
          { text: i + 1 },
          { text: this.list[i].title },
          { text: this.list[i].author },
          { text: this.list[i].source },
          { text: this.list[i].releaseDate },
          { text: this.list[i].isRelease == 1 ? "已发布" : "未发布" },
        ]);
      }
      let obj = {
        fileName: "文章列表",
        FootName: "sheet1",
        theadList: [
          [
            { text: "序号" },
            { text: "文章标题" },
            { text: "作者" },
            { text: "文章来源" },
            { text: "发布日期" },
            { text: "发布状态" },
          ],
        ],
        tbodyList: arr,
      };
      exportExcel.exportExcel(obj);
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