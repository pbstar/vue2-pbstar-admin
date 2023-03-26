<template>
  <div>
    <vueEsign
      ref="esign"
      :width="width"
      :height="height"
      :lineWidth="lineWidth"
      :lineColor="lineColor"
      class="box"
      :bgColor="bgColor"
    >
    </vueEsign>
  </div>
</template>

<script>
import vueEsign from "vue-esign";
export default {
  name: "signature",
  props: {
    width: {
      type: Number,
      default: 300,
    },
    height: {
      type: Number,
      default: 120,
    },
    lineWidth: {
      type: Number,
      default: 3,
    },
    lineColor: {
      type: String,
      default: "#000000",
    },
    bgColor: {
      type: String,
      default: "",
    },
  },
  components: {
    vueEsign,
  },
  methods: {
    toClear() {
      this.$refs.esign.reset();
    },
    toSave() {
      function base64toFile(dataurl) {
        let arr = dataurl.split(",");
        let mime = arr[0].match(/:(.*?);/)[1];
        let bstr = atob(arr[1]);
        let n = bstr.length;
        let u8arr = new Uint8Array(n);
        while (n--) {
          u8arr[n] = bstr.charCodeAt(n);
        }
        return new File([u8arr], "signature.png", {
          type: mime,
        });
      }
      return this.$refs.esign
        .generate()
        .then((res) => {
          let data = {
            base64: res,
            file: base64toFile(res),
          };
          return Promise.resolve(data);
        })
        .catch((err) => {
          return Promise.resolve("NotSignned");
        });
    },
  },
};
</script>
<style lang="scss" scoped>
.box {
  display: inline-block;
}
</style>
