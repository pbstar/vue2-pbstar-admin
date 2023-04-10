<template>
  <div>
    <div class="box">
      <div class="verificationCodeBox">
        <verificationCode />
        <verificationCode
          type="2"
          :contentWidth="120"
          identifyCodes="123456789"
          @changeCode="changeCode2"
        />
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
  // .verificationCodeBox {
  // }
}
</style>