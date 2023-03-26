<template>
  <div>
    <div class="box">
      <h2 style="margin-top: 10px">## 开始</h2>
      <pre>
      <code>
# Clone the project
git clone https://github.com/pbstar/vue2-pbstar-admin.git
# Enter the project
directory cd vue2-pbstar-admin
# Install dependency
npm install
# Compiles and hot-reloads for development
npm run serve
# Compiles and minifies for production
npm run build</code>
    </pre>
      <h2>## 目录结构</h2>
      <pre>
      <code>
├── public               # 静态资源 
│ │── favicon.ico       # 网页图标 
│ │── config.json       # 全局配置文件 
│ └── index.html        # html模板 
├── src                  # 源代码 
│ ├── assets            # 静态资源 
│ │ │── css            # 公共css文件 
│ │ │── js             # 公共js文件 
│ │ │── units          # 功能js方法文件 
│ │ └── imgs           # 图片文件 
│ ├── components        # 组件 
│ ├── router            # 路由 
│ ├── views             # 所有页面 
│ ├── App.vue           # 根页面 
│ └── main.js           # 入口文件 
├── .gitignore           # git配置文件 
├── vue.config.js        # vue-cli配置 
└── package.json         # package.json</code>
    </pre>
    </div>
  </div>
</template>

<script>
export default {
  name: "adminHome",
};
</script>
<style lang="scss" scoped>
.box {
  background-color: #fff;
  margin: 10px;
  padding: 10px;
  min-height: calc(100% - 20px);
  h2 {
    margin-top: 20px;
  }
  pre {
    background-color: #eee;
    font-size: 14px;
    line-height: 20px;
    border-radius: 6px;
    margin: 10px 0;
    padding: 0 16px;
    font-family: ui-monospace, SFMono-Regular, SF Mono, Menlo, Consolas,
      Liberation Mono, monospace;
    display: block;
    white-space: pre;
    margin: 10px 0px 0;
    code {
      display: inline;
      padding: 0;
      margin: 0;
      overflow: visible;
      line-height: inherit;
      background-color: transparent;
      border: 0;
      word-break: normal;
      white-space: pre;
      background: transparent;
    }
  }
}
</style>


