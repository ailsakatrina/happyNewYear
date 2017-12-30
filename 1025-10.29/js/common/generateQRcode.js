/**
 * @file generateQRcode.js
 * @author yanhairui
 * @version 0.1
 */
/**
 * 生成二维码
 * @namespace
 * @example
 * GenerateQRcode.init('qrcodeDiv');
 */

 // var GenerateQRcode = {
 //   option: Object,
 //   /**
 //    * 二维码初始化函数
 //    * @param {string} id 二维码绑定到div标签id
 //    * @example
 //    * GenerateQRcode.initQRCode('qrcodeDiv','152','152')；
 //    */
 //   initQRCode: function(id, width = '152', height = '152') {
 //       this.option = new QRCode(document.getElementById(id), {
 //           text: '0000',
 //           width: width,
 //           height: height,
 //           colorDark: '#000000',
 //           colorLight: '#ffffff',
 //           correctLevel: QRCode.CorrectLevel.M
 //       });
 //   },
 //   /**
 //    * 设置二维码显示内容
 //    * @param {string} content 二维码显示内容
 //    * @example
 //    * GenerateQRcode.setQRContent('http://www.baidu.com')；
 //    */
 //   setQRContent: function(content) {
 //       this.option.makeCode(content);
 //   },
 // }
function GenerateQRcode() {}
GenerateQRcode.prototype = {
  constructor: GenerateQRcode,
  option: Object,
  id:'',
  /**
   * 二维码初始化函数
   * @param {string} id 二维码绑定到div标签id
   * @example
   * GenerateQRcode.initQRCode('qrcodeDiv','152','152')；
   */
  initQRCode: function(id, width = '152', height = '152') {
      this.option = new QRCode(document.getElementById(id), {
          text: '0000',
          width: width,
          height: height,
          colorDark: '#000000',
          colorLight: '#ffffff',
          correctLevel: QRCode.CorrectLevel.M
      });
      this.id = id;
  },
  /**
   * 设置二维码显示内容
   * @param {string} content 二维码显示内容
   * @example
   * GenerateQRcode.setQRContent('http://www.baidu.com')；
   */
  setQRContent: function(content) {
      this.option.makeCode(content);
  },

};
