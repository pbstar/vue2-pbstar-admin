<template>
  <div id="app">
    <router-view />
  </div>
</template>
<script>
export default {
  name: "App",
  watch: {
    $route: {
      handler(to, from) {
        if (to.matched.length > 0 && to.matched[0].name == "admin") {
          if (!this.$unit.getLocalStorage("userName")) {
            this.$notify({
              title: "提示",
              message: "登录失效，请重新登陆！",
              duration: 3000,
              type: "warning",
              position: "bottom-right",
              dangerouslyUseHTMLString: true,
            });
            this.$router.push({
              name: "login",
            });
          }
          // let userAuthority = this.$unit.getLocalStorage("userAuthority");
          // let userAuthorityArr = userAuthority ? userAuthority.split(",") : [];
          // if (!userAuthorityArr.includes(to.name)) {
          //   this.$router.push({
          //     name: "403",
          //   });
          // }
        }

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
      immediate: true,
    },
  },
  mounted() {
    let loading = document.getElementById("p_app_loading_mask");
    loading.style.display = "none";
  },
};
</script>