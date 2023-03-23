import JSZip from "jszip";
import axios from "axios";
async function downloadZip(objInfo) {
  let obj = {
    zipName: '文件名',
    folderList: [{
      folderName: '文件夹1',
      fileList: [{
        fileName: '文件1',
        fileUrl: 'https://tscd.oss-cn-beijing.aliyuncs.com/onlineEducationTangshan/courseCategoryImage/1664170570607.jpeg'
      }, {
        fileName: '文件2',
        fileUrl: 'https://tscd.oss-cn-beijing.aliyuncs.com/onlineEducationTangshan/courseCategoryImage/1664170570607.jpeg'
      }]
    }, {
      folderName: '文件夹2',
      fileList: [{
        fileName: '文件1',
        fileUrl: 'https://tscd.oss-cn-beijing.aliyuncs.com/onlineEducationTangshan/courseCategoryImage/1664170570607.jpeg'
      }, {
        fileName: '文件2',
        fileUrl: 'https://tscd.oss-cn-beijing.aliyuncs.com/onlineEducationTangshan/courseCategoryImage/1664170570607.jpeg'
      }]
    }]
  }
  if (objInfo) obj = objInfo
  let zip = new JSZip();
  for (let i = 0; i < obj.folderList.length; i++) {
    let sObj = obj.folderList[i]
    let folder = zip.folder(sObj.folderName);
    for (let j = 0; j < sObj.fileList.length; j++) {
      let fObj = sObj.fileList[j]
      let { data } = await axios({
        method: "get",
        url: fObj.fileUrl,
        responseType: "blob",
      });
      folder.file(fObj.fileName + fObj.fileUrl.substring(fObj.fileUrl.lastIndexOf(".")), data);
    }
  }
  return new Promise((resolve, reject) => {
    zip.generateAsync({ type: "blob" }).then((content) => {
      let url = window.URL.createObjectURL(content);
      let a = document.createElement("a");
      a.href = url;
      a.download = obj.zipName;
      a.click();
      resolve(1);
    }).catch((err) => {
      reject(err);
    });
  });
}
export default {
  downloadZip
};
