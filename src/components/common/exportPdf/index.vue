<template>
  <div>
    <div class="box" ref="pdfBox">
      <slot></slot>
    </div>
  </div>
</template>

<script>
import html2Canvas from "html2canvas";
import JsPDF from "jspdf";

export default {
  name: "exportPdf",
  props: {
    name: {
      type: String,
      default: "Pdf文件",
    },
    isDownLoad: {
      type: Boolean,
      default: true,
    },
  },
  data() {
    return {};
  },
  methods: {
    toPdf() {
      return new Promise((resolve, reject) => {
        html2Canvas(this.$refs.pdfBox, {
          useCORS: true,
        })
          .then((canvas) => {
            let contentWidth = canvas.width;
            let contentHeight = canvas.height;
            let pageHeight = (contentWidth / 592.28) * 841.89;
            let leftHeight = contentHeight;
            let position = 0;
            let imgWidth = 595.28;
            let imgHeight = (592.28 / contentWidth) * contentHeight;
            let pageData = canvas.toDataURL("image/jpeg", 1.0);
            let PDF = new JsPDF("", "pt", "a4");
            while (leftHeight > 0) {
              PDF.addImage(pageData, "JPEG", 0, position, imgWidth, imgHeight);
              leftHeight -= pageHeight;
              position -= 841.89;
              if (leftHeight > 0) {
                PDF.addPage();
              }
            }
            if (this.isDownLoad) {
              PDF.save(this.name + ".pdf");
            }

            let pdfDataBase64 = PDF.output("datauristring"); //获取base64Pdf
            let pdfDateFile = this.dataURLtoFile(
              pdfDataBase64,
              this.name + ".pdf"
            );
            resolve({
              code: 200,
              base64: pdfDataBase64,
              file: pdfDateFile,
            });
          })
          .catch((e) => {
            reject(e);
          });
      });
    },
    dataURLtoFile(dataurl, filename) {
      var arr = dataurl.split(","),
        mime = arr[0].match(/:(.*?);/)[1],
        bstr = atob(arr[1]),
        n = bstr.length,
        u8arr = new Uint8Array(n);
      while (n--) {
        u8arr[n] = bstr.charCodeAt(n);
      }
      return new File([u8arr], filename, { type: mime });
    },
  },
};
</script>

<style lang="scss" scoped>
.box {
  background-color: #fff;
  display: inline-block;
}
</style>
