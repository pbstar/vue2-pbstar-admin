import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    redirect: '/login'
  },
  {
    path: '/admin',
    name: 'admin',
    redirect: '/admin/home',
    component: resolve => (require(["@/views/admin"], resolve)),
    children: [
      {
        path: "home",
        name: "adminHome",
        meta: { title: "首页" },
        component: resolve => (require(["@/views/admin/home"], resolve)),
      }, {
        path: "businessArticleList",
        name: "adminBusinessArticleList",
        meta: { title: "文章管理" },
        component: resolve => (require(["@/views/admin/business/articleList"], resolve)),
      }, {
        path: "echarts",
        name: "adminEcharts",
        meta: { title: "Echarts图表" },
        component: resolve => (require(["@/views/admin/echarts"], resolve)),
      }, {
        path: "editerWangEditer",
        name: "adminEditerWangEditer",
        meta: { title: "WangEditer编辑器" },
        component: resolve => (require(["@/views/admin/editer/wangEditer"], resolve)),
      }, {
        path: "excel",
        name: "adminExcel",
        meta: { title: "Excel文件" },
        component: resolve => (require(["@/views/admin/excel"], resolve)),
      }, {
        path: "moduleSignature",
        name: "adminModuleSignature",
        meta: { title: "电子签名" },
        component: resolve => (require(["@/views/admin/module/signature"], resolve)),
      }, {
        path: "pdfExport",
        name: "adminPdfExport",
        meta: { title: "Pdf导出" },
        component: resolve => (require(["@/views/admin/pdf/export"], resolve)),
      }, {
        path: "pdfPreview",
        name: "adminPdfPreview",
        meta: { title: "Pdf预览" },
        component: resolve => (require(["@/views/admin/pdf/preview"], resolve)),
      }, {
        path: "upload",
        name: "adminUpload",
        meta: { title: "文件上传" },
        component: resolve => (require(["@/views/admin/upload"], resolve)),
      }, {
        path: "videoXgPlayer",
        name: "adminVideoXgPlayer",
        meta: { title: "西瓜播放器" },
        component: resolve => (require(["@/views/admin/video/xgPlayer"], resolve)),
      }, {
        path: "zip",
        name: "adminZip",
        meta: { title: "Zip压缩文件" },
        component: resolve => (require(["@/views/admin/zip"], resolve)),
      }, {
        path: "imgExport",
        name: "adminImgExport",
        meta: { title: "图片导出" },
        component: resolve => (require(["@/views/admin/img/export"], resolve)),
      }, {
        path: "imgPreview",
        name: "adminImgPreview",
        meta: { title: "图片预览" },
        component: resolve => (require(["@/views/admin/img/preview"], resolve)),
      }, {
        path: "imgShear",
        name: "adminImgShear",
        meta: { title: "图片裁剪" },
        component: resolve => (require(["@/views/admin/img/shear"], resolve)),
      }, {
        path: "*",
        name: "admin404",
        component: resolve => (require(["@/views/404"], resolve)),
        meta: { title: "没找到页面" },
      }
    ]
  },
  {
    path: "/login",
    name: "login",
    meta: { title: "登录" },
    component: resolve => (require(["@/views/login"], resolve)),
  },
  {
    path: "*",
    name: "404",
    component: resolve => (require(["@/views/404"], resolve)),
    meta: { title: "没找到页面" },
  }
]

const router = new VueRouter({
  mode: 'hash',
  base: process.env.BASE_URL,
  routes
})
router.afterEach((to, from) => {
  if (to.meta.title) {
    document.title = to.meta.title
  } else {
    if (to.matched[0] && to.matched[0].meta.title) {
      document.title = to.matched[0].meta.title
    } else {
      document.title = '后台管理系统'
    }
  }
})
// 解决vue-router在3.0版本以上重复点报错问题
let originPush = VueRouter.prototype.push;
let originReplace = VueRouter.prototype.replace;
VueRouter.prototype.push = function (location, resolve, reject) {
  if (resolve && reject) {
    originPush.call(this, location, resolve, reject);
  } else {
    originPush.call(this, location, () => { }, () => { });
  }
}
VueRouter.prototype.replace = function (location, resolve, reject) {
  if (resolve && reject) {
    originReplace.call(this, location, resolve, reject);
  } else {
    originReplace.call(this, location, () => { }, () => { });
  }
}
export default router
