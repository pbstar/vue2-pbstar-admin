<template>
  <div>
    <div class="fapage">
      <adminLeft class="adminLeft" />
      <main>
        <adminTop />
        <router-view :class="isCollapse ? 'sonpageCollapse' : 'sonpage'" />
      </main>
    </div>
  </div>
</template>

<script>
import adminTop from "@/components/top";
import adminLeft from "@/components/left";
export default {
  name: "admin",
  components: {
    adminTop,
    adminLeft,
  },
  data() {
    return {
      isCollapse: false,
    };
  },
  mounted() {
    this.$bus.$on("isCollapse", (e) => {
      if (e) {
        this.isCollapse = e;
      } else {
        var timer = setTimeout(() => {
          this.isCollapse = e;
          clearTimeout(timer);
        }, 300);
      }
    });
  },
  beforeDestroy() {
    this.$bus.$off("isCollapse");
  },
};
</script>
<style lang="scss" scoped>
.fapage {
  height: 100vh;
  display: flex;

  main {
    flex: 1;
    height: 100vh;
    display: flex;
    flex-direction: column;
    overflow-x: hidden;

    .adminLeft {
      width: 200px;
      min-height: 100%;
      background-color: rgb(84, 92, 100);

      /deep/ .el-menu {
        border-right: none;
      }
    }

    .sonpage {
      flex: 1;
      width: calc(100vw - 201px);
      background-color: #efefef;
      overflow: auto;
    }
    .sonpageCollapse {
      flex: 1;
      width: calc(100vw - 65px);
      background-color: #efefef;
      overflow: auto;
    }
  }
}
</style>
