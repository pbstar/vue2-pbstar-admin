<template>
  <div>
    <div class="box">
      <div class="boxs">
        <div class="verificationCodeBox">
          <verificationCode ref="verificationCode1" />
          <el-button type="text" @click="toUpdate1">看不清</el-button>
        </div>
        <p>文字验证码</p>
      </div>
      <div class="boxs">
        <div class="verificationCodeBox">
          <verificationCode
            ref="verificationCode2"
            type="2"
            :contentWidth="120"
            identifyCodes="123456789"
            @changeCode="changeCode2"
          />
          <el-button type="text" @click="toUpdate2">看不清</el-button>
        </div>
        <p>计算验证码</p>
      </div>
    </div>
  </div>
</template>

<script>
import verificationCode from "@/components/common/verificationCode";
export default {
  name: "adminModuleVerificationCode",
  components: {
    verificationCode,
  },
  data() {
    return {
      list: [],
    };
  },
  methods: {
    changeCode2(e) {
      console.log(e);
    },
    toUpdate1() {
      this.$refs.verificationCode1.changeCode();
    },
    toUpdate2() {
      this.$refs.verificationCode2.changeCode();
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
  display: flex;
  .boxs {
    width: 320px;
    height: 160px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-end;
    margin: 20px;
    p {
      line-height: 50px;
      border-top: 1px solid #eee;
      margin-top: 30px;
      width: 100%;
      text-align: center;
      color: #666;
    }
    .verificationCodeBox {
      display: flex;
      align-items: flex-end;
      .el-button {
        margin-left: 5px;
      }
    }
  }
}
</style>