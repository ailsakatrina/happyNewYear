/**
 * @file reportQRCode.js
 * @author yanhairui
 * @version v1.0
 */
 /**
  * 产品二维码扫描推荐报表统计---发送post到报表接口
  * @namespace
  */
  var ReportQRCode = {
    /**
     * 取号报表数据收集
     * @param {string} item 收集对象
     * @param {object} obj 控件对象
     */
    reportQRChange: function(obj,item,paraType=''){
      var itemID = item + "QR";
      if(reportItem.hasOwnProperty(itemID)){
        this.displayQRCode(obj);
        if('' == paraType){
          var _QRurl = 'http://www.finroboticist.com/interfaceapp/urlRedirect?&robotID=' + RobotSDK.robotId + '&redirectUrl=' + item;
        }else {
          var _QRurl = 'http://www.finroboticist.com/interfaceapp/urlRedirect?&robotID=' + RobotSDK.robotId + '&redirectUrl=' + item + '&paraType=' + paraType;
        }
        // _QRurl = reportItem[item][0]
        obj.setQRContent(_QRurl);
        console.log("_QRurl: " + _QRurl);
      }else {
        this.blockQRCode(obj);
        console.log('无二维码！');
      }
    },

    /**
     * 显示二维码
     * @param {object} obj 控件对象
     */
    displayQRCode: function(obj){
      var id = "#" + obj.id;
      $(id).css('display','block');
    },
    /**
     * 隐藏二维码
     * @param {object} obj 控件对象
     */
    blockQRCode: function(obj){
      var id = "#" + obj.id;
      $(id).css('display','none');
    }
  }
