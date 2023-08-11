<template>
  <div style="height: 100vh">
    <div class="topbox">
      <img class="logo" src="@/assets/imgs/logo.png" alt="" />
      <transition name="show">
        <h4 v-show="!isCollapse">后台管理系统</h4>
      </transition>
    </div>
    <el-menu
      :default-active="defaultActive"
      class="midbox"
      background-color="#545c64"
      text-color="#fff"
      active-text-color="#409eff"
      :collapse="isCollapse"
      unique-opened
    >
      <div v-for="(item, index) in list" :key="index">
        <el-submenu :index="item.index" v-if="item.child">
          <template slot="title">
            <i :class="item.icon"></i>
            <span v-show="!isCollapse">{{ item.title }}</span>
          </template>
          <el-menu-item
            v-for="(items, indexs) in item.child"
            :key="indexs + 's'"
            :index="items.index"
            @click="toPage(items.index)"
            >{{ items.title }}</el-menu-item
          >
        </el-submenu>
        <el-menu-item v-else :index="item.index" @click="toPage(item.index)">
          <i :class="item.icon"></i>
          <span v-show="!isCollapse">{{ item.title }}</span>
        </el-menu-item>
      </div>
    </el-menu>
  </div>
</template>

<script>
import leftNavList from "@/assets/json/leftNavList.json";
export default {
  name: "adminLeft",
  props: {
    msg: String,
  },
  data() {
    return {
      isCollapse: false,
      defaultActive: "",
      list: [],
    };
  },
  watch: {
    $route: {
      handler(to, from) {
        this.defaultActive = to.name;
      },
      immediate: true, //第一次就执行
    },
  },
  created() {
    this.getList();
  },
  mounted() {
    this.$bus.$on("toCollapse", () => {
      this.isCollapse = !this.isCollapse;
    });
  },
  beforeDestroy() {
    this.$bus.$off("toCollapse");
  },
  methods: {
    getList() {
      let userAuthority = this.$unit.getLocalStorage("userAuthority");
      let userAuthorityArr = userAuthority ? userAuthority.split(",") : [];
      let item = "";
      for (let i = 0; i < leftNavList.length; i++) {
        if (userAuthorityArr.includes(leftNavList[i].index)) {
          this.list.push(leftNavList[i]);
        } else {
          if (leftNavList[i].child) {
            for (let j = 0; j < leftNavList[i].child.length; j++) {
              if (userAuthorityArr.includes(leftNavList[i].child[j].index)) {
                if (item) {
                  item.child.push(leftNavList[i].child[j]);
                } else {
                  item = {
                    index: leftNavList[i].index,
                    icon: leftNavList[i].icon,
                    title: leftNavList[i].title,
                    child: [leftNavList[i].child[j]],
                  };
                }
              }
            }
            if (item) {
              this.list.push(item);
              item = "";
            }
          }
        }
      }
    },
    toPage(name) {
      this.$router.push({
        name,
      });
    },
  },
};
</script>
<style lang="scss" scoped>
.topbox {
  background-color: rgb(58, 64, 70);
  height: 60px;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  h4 {
    width: 130px;
    font-size: 17px;
    color: #fff;
    margin-left: 10px;
    letter-spacing: 3px;
    overflow: hidden;
    white-space: nowrap;
  }
  .logo {
    width: 30px;
    height: 30px;
  }
}
.midbox {
  height: calc(100vh - 75px);
  padding-top: 6px;
  padding-bottom: 9px;
  background-color: #545c64;
  border-right-color: #545c64;
  overflow-y: auto;
  overflow-x: hidden;
  /deep/ .el-menu-item {
    height: 45px;
    line-height: 45px;
    display: flex;
    align-items: center;
  }
  /deep/ .el-submenu__title {
    height: 45px;
    line-height: 45px;
  }
  /deep/ .el-menu-item i {
    color: #fff;
  }
  /deep/ .el-submenu__title i {
    color: #fff;
  }
  /deep/ .el-menu-item.is-active i {
    color: #409eff;
  }
  /deep/ .el-submenu__title.is-active i {
    color: #409eff;
  }
  /deep/ .el-menu-item span {
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
  }
}
/deep/ .el-menu--collapse .el-menu-item [class^="el-icon-"] {
  margin: 0 !important;
  vertical-align: middle;
  width: 24px;
  text-align: center;
}
.midbox::-webkit-scrollbar {
  width: 5px;
}
.midbox::-webkit-scrollbar-thumb {
  border-radius: 5px;
  background: rgba(201, 201, 201, 0.2);
}
.midbox::-webkit-scrollbar-track {
  border-radius: 0;
  background: rgba(201, 201, 201, 0.1);
}
/deep/ .midbox:not(.el-menu--collapse) {
  width: 200px;
}
.show-enter-active {
  animation: move 0.3s alternate;
}
.show-leave-active {
  animation: move2 0.3s alternate;
}
@keyframes move {
  from {
    width: 0;
  }
  to {
    width: 130px;
  }
}
@keyframes move2 {
  from {
    width: 130px;
  }
  to {
    width: 0;
  }
}
</style>
