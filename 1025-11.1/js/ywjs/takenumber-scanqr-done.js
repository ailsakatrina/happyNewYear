/**
  * @file takenumber-scanqr-done.js
  * @author zhoutaotao
  * @version v1.0
*/

/**
  * 取号二维码扫描完成页面
  * @namespace
*/
var TakenumberQRCodeDone = {
  scanDoneWelcomeTimeout:Object,
  SCAN_DONE_WELCOME_WAIT_TIME:20000,

  /**
    * 取号二维码扫描完成页面显示
  */
  setTakeNumberQRCodeDonePageDisplay:function(printCode='',pinCode='',msg=''){
    // var _printCodeandPinCode='';
    // var _msg = '';
    // if(printCode!=''){
    //   _printCodeandPinCode = _printCodeandPinCode + "小票号:"+printCode;
    // }
    // if(pinCode!=''){
    //   _printCodeandPinCode = _printCodeandPinCode + "解锁码:"+pinCode;
    // }
    // if(msg!=''){
    //   _msg = msg;
    // }
    // if(_printCodeandPinCode!=''){
    //   $("#printCodeandPinCode").html(_printCodeandPinCode);
    // }
    // if(_msg!=''){
    //   $("#msgInfo").html(_msg);
    // }
    // if(_printCodeandPinCode!='' | _msg!=''){
    //   $("#printCodeInfoDiv").css("display","block");
    // }

    $("#yuyuequhao_xqyk").css("display","block");
    this.scanDoneWelcomeTimeout = window.setTimeout("TakenumberQRCodeDone.exitToHome()",TakenumberQRCodeDone.SCAN_DONE_WELCOME_WAIT_TIME);
  },
  /**
    * 取号二维码扫描完成页面吟唱
  */
  setTakeNumberQRCodeDonePageNone:function(){
    $("#yuyuequhao_xqyk").css("display","none");
    $("#printCodeInfoDiv").css("display","none");
    $("#printCodeandPinCode").html('');
    $("#msgInfo").html('');
  },
  /**
    * 返回到首页
  */
  exitToHome:function(){
    this.setTakeNumberQRCodeDonePageNone();
    window.clearTimeout(this.scanDoneWelcomeTimeout);
    setJiugonggeDisplay();
  }
};
