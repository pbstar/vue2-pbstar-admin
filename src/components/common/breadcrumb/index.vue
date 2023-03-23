<template>
  <div>
    <div class="fbox">
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item
          v-for="(item, index) in list"
          :key="index"
          :to="{ path: item.path }"
          >{{ item.title }}</el-breadcrumb-item
        >
      </el-breadcrumb>
    </div>
  </div>
</template>

<script>
export default {
  name: "breadcrumb",
  data() {
    return {
      list: [],
    };
  },
  watch: {
    $route(to, from) {
      console.log(to);
      if (to && to.matched && to.matched.length > 0) {
        let arr = to.matched;
        this.list = [];
        for (let i = 0; i < arr.length; i++) {
          if (arr[i].path) {
            this.list.push({
              title: arr[i].meta.title
                ? arr[i].meta.title
                : "router中未定义页面title",
              path: arr[i].path,
            });
          }
        }
      }
    },
  },
};
</script>
<style lang="scss" scoped>
</style>
