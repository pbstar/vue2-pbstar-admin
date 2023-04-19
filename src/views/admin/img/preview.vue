<template>
  <div>
    <div class="box">
      <div id="index" ref="imgView">
        <ul class="imgUrl">
          <li v-for="(item, index) of imgArr" :key="index">
            <img :src="item" alt="图片描述" />
          </li>
        </ul>
      </div>
      <h3>配置项</h3>
      <table>
        <thead>
          <tr>
            <th><p>参数名称</p></th>
            <th><p>参数类型</p></th>
            <th><p>默认值</p></th>
            <th><p>说明</p></th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><p>initialViewIndex</p></td>
            <td><p>Number</p></td>
            <td><p>0</p></td>
            <td><p>定义用于查看的图像的初始索引</p></td>
          </tr>
          <tr>
            <td><p>inline</p></td>
            <td><p>Boolean</p></td>
            <td><p>false</p></td>
            <td><p>支持 inline mode</p></td>
          </tr>
          <tr>
            <td><p>button</p></td>
            <td><p>Boolean</p></td>
            <td><p>true</p></td>
            <td><p>是否显示查看图片时右上角的关闭按钮</p></td>
          </tr>
          <tr>
            <td><p>navbar</p></td>
            <td><p>Boolean / Number</p></td>
            <td><p>true</p></td>
            <td>
              <p>
                是否显示底部导航栏 0 或者 false :不显示 1 或者 true :显示 2
                :当屏幕宽度大于768px时显示 3 :当屏幕宽度大于992px时显示 4
                :当屏幕宽度大于1200px时显示
              </p>
            </td>
          </tr>
          <tr>
            <td><p>title</p></td>
            <td><p>Boolean / Number / Function / Array</p></td>
            <td><p>true</p></td>
            <td>
              <p>
                0 或者 false 时不显示1或者true或者function或者array时显示2
                :当屏幕宽度大于768px时显示 3 :当屏幕宽度大于992px时显示 4
                :当屏幕宽度大于1200px时显示function 在函数体内返回标题array
                第一个参数表示可见性(0-4) 第二个参数就是标题
              </p>
            </td>
          </tr>
          <tr>
            <td><p>toolbar</p></td>
            <td><p>Boolean / Number / Object</p></td>
            <td><p>true</p></td>
            <td>
              <p>
                标题栏是否显示和布局 0 或者 false 时不显示1或者true或者时显示 2
                :当屏幕宽度大于768px时显示 3 :当屏幕宽度大于992px时显示 4
                :当屏幕宽度大于1200px时显示 Object : Object类型详解
              </p>
            </td>
          </tr>
          <tr>
            <td><p>tooltip</p></td>
            <td><p>Boolean</p></td>
            <td><p>true</p></td>
            <td>
              <p>
                放大或缩小时显示的百分比的文字提示true : 显示 false : 不显示
              </p>
            </td>
          </tr>
          <tr>
            <td><p>movable</p></td>
            <td><p>Boolean</p></td>
            <td><p>true</p></td>
            <td><p>是否可以拖动图片</p></td>
          </tr>
          <tr>
            <td><p>zoomable</p></td>
            <td><p>Boolean</p></td>
            <td><p>true</p></td>
            <td><p>是否可以缩放图片</p></td>
          </tr>
          <tr>
            <td><p>rotatable</p></td>
            <td><p>Boolean</p></td>
            <td><p>true</p></td>
            <td><p>是否可以旋转图片</p></td>
          </tr>
          <tr>
            <td><p>scalable</p></td>
            <td><p>Boolean</p></td>
            <td><p>true</p></td>
            <td><p>是否可以缩放图片</p></td>
          </tr>
          <tr>
            <td><p>transition</p></td>
            <td><p>Boolean</p></td>
            <td><p>true</p></td>
            <td><p>为一些特殊元素启用CSS3转换。</p></td>
          </tr>
          <tr>
            <td><p>fullscreen</p></td>
            <td><p>Boolean</p></td>
            <td><p>true</p></td>
            <td><p>允许全屏播放</p></td>
          </tr>
          <tr>
            <td><p>keyboard</p></td>
            <td><p>Boolean</p></td>
            <td><p>true</p></td>
            <td><p>启用键盘支持</p></td>
          </tr>
          <tr>
            <td><p>backdrop</p></td>
            <td><p>Boolean / String</p></td>
            <td><p>true</p></td>
            <td><p>启用 modal 为false的时候不支持点击背景关闭</p></td>
          </tr>
          <tr>
            <td><p>loading</p></td>
            <td><p>Boolean</p></td>
            <td><p>true</p></td>
            <td><p>加载图片的时候的loading图标</p></td>
          </tr>
          <tr>
            <td><p>loop</p></td>
            <td><p>Boolean</p></td>
            <td><p>true</p></td>
            <td><p>是否可以循环查看图片</p></td>
          </tr>
          <tr>
            <td><p>interval</p></td>
            <td><p>Number</p></td>
            <td><p>5000</p></td>
            <td><p>定义图片查看器的最小的宽度</p></td>
          </tr>
          <tr>
            <td><p>minWidth</p></td>
            <td><p>Number</p></td>
            <td><p>200</p></td>
            <td><p>定义图片查看器的最小的高度</p></td>
          </tr>
          <tr>
            <td><p>minHeight</p></td>
            <td><p>Number</p></td>
            <td><p>100</p></td>
            <td><p>播放图片时 距离下一张图片的间隔时间</p></td>
          </tr>
          <tr>
            <td><p>zoomRatio</p></td>
            <td><p>Number</p></td>
            <td><p>0.1</p></td>
            <td><p>利用鼠标滚轮缩放图片时的比例</p></td>
          </tr>
          <tr>
            <td><p>minZoomRatio</p></td>
            <td><p>Number</p></td>
            <td><p>0.01</p></td>
            <td><p>缩小图片的最小比例</p></td>
          </tr>
          <tr>
            <td><p>maxZoomRatio</p></td>
            <td><p>Number</p></td>
            <td><p>100</p></td>
            <td><p>放大图片的放大比例</p></td>
          </tr>
          <tr>
            <td><p>zIndex</p></td>
            <td><p>Number</p></td>
            <td><p>2015</p></td>
            <td><p>定义查看器的CSS z-index值 modal 模式下</p></td>
          </tr>
          <tr>
            <td><p>zIndexInline</p></td>
            <td><p>Number</p></td>
            <td><p>0</p></td>
            <td><p>定义查看器的CSS z-index值 inline 模式下</p></td>
          </tr>
          <tr>
            <td><p>url</p></td>
            <td><p>String / Function</p></td>
            <td><p>src</p></td>
            <td>
              <p>
                原始图像URL如果是一个字符串，应该图像元素的属性之一如果是一个函数，应该返回一个有效的图像URL
              </p>
            </td>
          </tr>
          <tr>
            <td><p>container</p></td>
            <td><p>Element / String</p></td>
            <td><p>body</p></td>
            <td>
              <p>
                将查看器置于modal模式的容器 只有在 inline为
                false的时候才可以使用
              </p>
            </td>
          </tr>
          <tr>
            <td><p>filter</p></td>
            <td><p>Function</p></td>
            <td><p>null</p></td>
            <td><p>过滤图像以便查看(如果图像是可见的，应该返回true)</p></td>
          </tr>
          <tr>
            <td><p>toggleOnDblclick</p></td>
            <td><p>Boolean</p></td>
            <td><p>true</p></td>
            <td><p>当你放大或者缩小图片时 双击还原</p></td>
          </tr>
          <tr>
            <td><p>ready</p></td>
            <td><p>Function</p></td>
            <td><p>null</p></td>
            <td><p>当查看图片时被触发的函数 只会触发一次</p></td>
          </tr>
          <tr>
            <td><p>show</p></td>
            <td><p>Function</p></td>
            <td><p>null</p></td>
            <td><p>当查看图片时被触发的函数 每次查看都会触发</p></td>
          </tr>
          <tr>
            <td><p>shown</p></td>
            <td><p>Function</p></td>
            <td><p>null</p></td>
            <td><p>当查看图片时被触发的函数 每次查看都会触发 在show之后</p></td>
          </tr>
          <tr>
            <td><p>hide</p></td>
            <td><p>Function</p></td>
            <td><p>null</p></td>
            <td><p>当关闭图片查看器时被触发的函数 每次关闭都会触发</p></td>
          </tr>
          <tr>
            <td><p>hidden</p></td>
            <td><p>Function</p></td>
            <td><p>null</p></td>
            <td>
              <p>当关闭图片查看器时被触发的函数 每次关闭都会触发 在hide之后</p>
            </td>
          </tr>
          <tr>
            <td><p>view</p></td>
            <td><p>Function</p></td>
            <td><p>null</p></td>
            <td>
              <p>当查看图片时被触发的函数 每次查看都会触发 在shown之后</p>
            </td>
          </tr>
          <tr>
            <td><p>viewed</p></td>
            <td><p>Function</p></td>
            <td><p>null</p></td>
            <td><p>当查看图片时被触发的函数 每次查看都会触发 在view之后</p></td>
          </tr>
          <tr>
            <td><p>zoom</p></td>
            <td><p>Function</p></td>
            <td><p>null</p></td>
            <td><p>在图片缩放时触发</p></td>
          </tr>
          <tr>
            <td><p>zoomed</p></td>
            <td><p>Function</p></td>
            <td><p>null</p></td>
            <td><p>在图片缩放时触发 在 zoom之后</p></td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import Viewer from "viewerjs";
import "viewerjs/dist/viewer.css";

export default {
  name: "adminImgPreview",
  data() {
    return {
      imgArr: [
        "http://oss.mcweb.club/utools/20233/touxiang_160.jpg",
        "http://oss.mcweb.club/utools/20233/touxiang_160.jpg",
        "http://oss.mcweb.club/utools/20233/touxiang_160.jpg",
      ],
    };
  },
  mounted() {
    const ViewerDom = this.$refs.imgView;
    new Viewer(ViewerDom, {
      // 相关配置项,详情见下面
      // https://github.com/fengyuanchen/viewerjs/blob/main/README.md
    });
  },
  methods: {},
};
</script>
<style lang="scss" scoped>
.box {
  background-color: #fff;
  margin: 10px;
  padding: 10px;
  min-height: calc(100% - 20px);
  .imgUrl {
    display: flex;
  }
}
</style>