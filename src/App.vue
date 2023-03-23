<template>
  <div id="app">
    <router-view />
  </div>
</template>
<script>
export default {
  name: "App",
  watch: {
    $route() {
      this.$http.defaultGet("./config.json").then((res) => {
        if (this.$config.version != res.version) {
          this.$notify({
            title: "提示",
            message: "网页内容已更新，请刷新浏览器或清除浏览器缓存！",
            duration: 0,
            type: "warning",
            position: "bottom-right",
            dangerouslyUseHTMLString: true,
          });
        }
      });
    },
  },
  mounted() {
    let loading = document.getElementById("p_app_loading");
    loading.style.display = "none";
  },
};
</script>