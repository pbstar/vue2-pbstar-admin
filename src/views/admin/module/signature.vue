<template>
  <div>
    <div class="box">
      <div class="top">
        <div class="signatureBox">
          <signature ref="signature" :width="360" :height="200" />
        </div>
        <el-button type="danger" style="margin-left: 10px" @click="toClear"
          >清除</el-button
        >
        <el-button type="primary" style="margin-left: 10px" @click="toSave"
          >保存</el-button
        >
      </div>
      <div class="mid">
        <div class="imgBox" v-for="(item, index) in list" :key="index">
          <img :src="item" alt="" />
        </div>
        <el-empty
          style="margin: 0 auto"
          v-show="list.length == 0"
          :image-size="100"
          description="暂无保存签名"
        ></el-empty>
      </div>
    </div>
  </div>
</template>

<script>
import signature from "@/components/common/signature";
export default {
  name: "adminModuleSignature",
  components: {
    signature,
  },
  data() {
    return {
      list: [],
    };
  },
  methods: {
    toClear() {
      this.$refs.signature.toClear();
    },
    toSave() {
      this.$refs.signature.toSave().then((res) => {
        if (res != "NotSignned") {
          this.list.push(res.base64);
          this.$refs.signature.toClear();
        } else {
          this.$message.warning("签名内容为空！");
        }
      });
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
    align-items: flex-end;
    .signatureBox {
      width: 360px;
      height: 200px;
      background-color: #ddd;
    }
  }
  .mid {
    margin-top: 10px;
    border-top: 2px solid #eee;
    display: flex;
    flex-wrap: wrap;
    .imgBox {
      margin-top: 10px;
      margin-right: 10px;
      width: 270px;
      height: 150px;
      padding: 5px;
      border: 1px solid #eee;
      img {
        width: 100%;
        height: 100%;
      }
    }
  }
}
</style>