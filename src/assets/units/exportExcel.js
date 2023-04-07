function exportExcel(objInfo) {
  let obj = {
    fileName: '文件名',
    FootName: 'sheet1',
    theadList: [
      [{ text: '序号' }, { text: '姓名' }]
    ],
    tbodyList: [
      [{ text: '1' }, { text: '张三' }],
      [{ text: '2' }, { text: '李四' }]
    ]
  }
  if (objInfo) obj = objInfo
  let excel = '<table style="font-size:15px;font-family:Microsoft YaHei;vnd.ms-excel.numberformat:@">';
  for (let i = 0; i < obj.theadList.length; i++) {
    excel += "<tr align='center'>"
    let th = obj.theadList[i]
    for (let h = 0; h < th.length; h++) {
      excel += "<th colspan=" + th[h].colspan + " rowspan=" + th[h].rowspan + " style=" + th[h].style + ">" + th[h].text + "</th>"
    }
    excel += "</tr>";
  }
  for (let i = 0; i < obj.tbodyList.length; i++) {
    excel += "<tr align='center'>"
    let td = obj.tbodyList[i]
    for (let d = 0; d < td.length; d++) {
      excel += "<td colspan=" + td[d].colspan + " rowspan=" + td[d].rowspan + " style=" + td[d].style + ">" + td[d].text + "</td>"
    }
    excel += "</tr>";
  }
  excel += "</table>";
  var excelFile = "<html xmlns:o='urn:schemas-microsoft-com:office:office' xmlns:x='urn:schemas-microsoft-com:office:excel' xmlns='http://www.w3.org/TR/REC-html40'>";
  excelFile += '<meta http-equiv="content-type" content="application/vnd.ms-excel; charset=UTF-8">';
  excelFile += '<meta http-equiv="content-type" content="application/vnd.ms-excel';
  excelFile += '; charset=UTF-8">';
  excelFile += "<head>";
  excelFile += "<!--[if gte mso 9]>";
  excelFile += "<xml>";
  excelFile += "<x:ExcelWorkbook>";
  excelFile += "<x:ExcelWorksheets>";
  excelFile += "<x:ExcelWorksheet>";
  excelFile += "<x:Name>";
  excelFile += obj.FootName;
  excelFile += "</x:Name>";
  excelFile += "<x:WorksheetOptions>";
  excelFile += "<x:DisplayGridlines/>";
  excelFile += "</x:WorksheetOptions>";
  excelFile += "</x:ExcelWorksheet>";
  excelFile += "</x:ExcelWorksheets>";
  excelFile += "</x:ExcelWorkbook>";
  excelFile += "</xml>";
  excelFile += "<![endif]-->";
  excelFile += "</head>";
  excelFile += "<body>";
  excelFile += excel;
  excelFile += "</body>";
  excelFile += "</html>";
  var url = 'data:application/vnd.ms-excel;charset=utf-8,' + encodeURIComponent(excelFile);
  var link = document.createElement("a");
  link.href = url;
  link.style = "visibility:hidden";
  link.download = obj.fileName + ".xlsx";
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}
export default {
  exportExcel
};