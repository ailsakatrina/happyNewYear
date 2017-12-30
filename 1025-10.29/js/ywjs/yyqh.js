var clientName ="";//用户名
var idType = "";//证件类型
var idNo = "";//证件号
var phoneNumber = "";//手机号
var queueId=""; //场景ID
var toaPartyNo="";
var toaPrivilegeLevel="";

// var counterNo = "050000001"; //（生产环境）固定柜面号
var counterNo = "110000069"; //（测试环境）固定柜面号
var queueCodes="";
var queueItems="";

var CLIENT_NO = "";//客户号

var weappNo="PARS95511_01";
var expiresec="60";

var IS_SWING_CARD_TIME_OUT = 20000;
var scanCardTimeout;

/**
 * 读卡器读取身份证号后自动填入输入框
 * @param {string} arg 证件号码
 */
function setID(arg){
    $("#zjhm_yyqh").val("");
    $("#zjhm_yyqh").val(arg);
}
function setYyqhDisplay() {
    setJiugonggeNone();
    $("#srxm_yyqh").val("");
    //$("#zjhm_yyqh").val("445221198911052238");
    $("#yuyuequhao").fadeIn();
    noticeServerCode("startReadingIDCard");

    RobotSDK.say({'text':speakContext.yyjh[parseInt(3*Math.random())]});
    // isChangeInput();
    scanCardTimeout = window.setTimeout("isSwingCard()",IS_SWING_CARD_TIME_OUT);
    console.log("start to count");
}
function setBackToYyqh() {
    $("#yuyuequhao_sec").fadeOut(10);
    $("#yuyuequhao").fadeIn(10);
    noticeServerCode("startReadingIDCard");
}
function setYyqhNone() {
    $("#yuyuequhao").fadeOut();
    noticeServerCode("stopReadingIDCard");

    $("#zjhm_yyqh").val("");
    $("#phone_yyqh").val("");
    $("#zjlx_yyqh option:first").prop("selected", 'selected');
    $("#zjhm_yyqh").css("border-color", "#CCCCCC");
    $("#zjhm_yyqh").attr("placeholder", "点击输入证件号");
    $("#phone_yyqh").css("border-color", "#CCCCCC");
    $("#phone_yyqh").attr("placeholder", "点击输入手机号");
}

function setBackToHome() {
    clearScanCardTimeout();//清楚刷卡超时定时器
    quhaoThankNone();
    TakenumberDynamicsFirstview.setTakeNumberFirstViewPageNone();
    $('#yuyuequhao_erweima').fadeOut(10);
    TakenumberDynamicsSecondview.setTakeNumberSecondViewPageNone();
    setYyqhNone();
    setJiugonggeDisplay();
}


//业务取号审核按钮时间
function submitQuhao() {
    clearScanCardTimeout(); //清楚超时不刷卡时间


    if ($("#zjhm_yyqh").val().length == 0) {
        sethyyqhRzxxDisplay();
    } else {
      //判别是否是身份证号码
      var IDCardNo = $("#zjhm_yyqh").val();
      if (false == checkIsIDCard(IDCardNo)) {
        console.log('不是身份证号');
        setYyqhIDconfirmDisplay();
      } else {
        console.log('是身份证号');
        //提交数据到接口distributeCheck4SingleClientNo
        // clientName = $("#srxm_yyqh").val();
        idType = $("#zjlx_yyqh").val();
        idNo = $("#zjhm_yyqh").val();
        phoneNumber = $("#phone_yyqh").val();
        token = TakenumberToken.takenumberTokenValue;
        console.log("clientName:"+clientName);
        console.log("idType:"+idType);
        console.log("idNo:"+idNo);
        console.log("phoneNumber:"+phoneNumber);
        console.log("counterNo:"+counterNo);
        console.log("token:"+token);
        var URL="http://112.74.34.118/interfaceapp/distributeCheck4SingleClientNo/";

        $.ajax({
            type: "POST",
            data: { "clientName":clientName,
                    "idNo":idNo,
                    "idType":idType,
                    "phoneNumber":phoneNumber,
                    "counterNo":counterNo,
                    "token":token},
            url: URL,
            cache: false,
            dataType: "json",
            success: function(data) {
                console.log(result);
                result = data.result;
                console.log(result);
                if (result == "0") {
                    var msg = data.msg;
                    console.log(msg);
                    distributeSingleClient(msg);
                    robotLog.sendInfoMsg(msg);
                }else {
                    console.log("获取服务队列失败!");
                    console.log(result);
                    robotLog.sendErrorMsg(URL+data.msg);
                }
            },
            error:function () {
                console.log("ajax通信失败!");
                robotLog.sendErrorMsg(URL+" ajax通信失败!");
            }
        });
      }

    }

}
/**
  * 解析第一个接口到返回数据，并进行显示
  * @param {object} data 第一个接口返回到数据
*/
function distributeSingleClient(data) {
    data=JSON.parse(data);
    data=data.data;
    console.log("returnCode:" + data.returnCode);
    if(data.returnCode!='life-00001'){
      console.log("数据异常");
      alert('数据异常');
      robotLog.sendErrorMsg(data);
      return false;
    }
    var isPrint = data["isPrintTicket"];
    var msg = data["message"];
    var clientNo = data["clientNo"];
    console.log("isPrint:"+isPrint);
    if ("Y"==isPrint) {
        $("#yuyuequhao").fadeOut(10);
        queueId=data['queueId'];
        CLIENT_NO = '';
        //直接出票，需要判断用户类型，调用收集接口××××××××××××××××××××××
        // "printQueueCode":"A005"
        if(data.hasOwnProperty('printQueueCode')){
          reportStatisticsTakenumber.reportbusinessProcess(['其他活动'])
          reportStatisticsTakenumber.reportTakeNumStatis(data['printQueueCode']);
        }

        console.log('需要提交到微信接口，小票号：'+data['printQueueCode']+", clientNo:"+CLIENT_NO);
        //提交数据到微信接口
        TakenumberQRCode.setTakeNumberQRCodePageDisplay();
        setYyqhNone();
    } else {
        queueItems = data["queueCodeItems"];
        console.log("queueCodeItems:"+queueItems);

        // queueItems=[{'queueName':'办理业务','queueCode':'0001'},{'queueName':'缴纳保费','queueCode':'0002'},{'queueName':'自主打印','queueCode':'0003'}];
        TakenumberDynamicsFirstview.setTakeNumberFirstViewPageDisplay(queueItems);


        setYyqhNone();
    }

}
/**
*提示认证信息需要完整填完显示
**/
function sethyyqhRzxxDisplay() {
    $("#yuyuequhao_rzxx").fadeIn(10);
    // RobotSDK.say({'text':'您好，您的认证信息没有填完整'});
}
/**
*提示认证信息需要完整填完消失
**/
function yyqhRzxxCancelToSeeClick() {
    $("#yuyuequhao_rzxx").fadeOut(10);
    // RobotSDK.say({'text':'您好，身份'});
}

/**
*提示身份证填写不正确（显示）
**/
function setYyqhIDconfirmDisplay(){
  $("#yuyuequhao_IDConfirm").fadeIn(10);
}
/**
*提示身份证填写不正确（消失）
**/
function setYyqhIDconfirmNone(){
  $("#yuyuequhao_IDConfirm").fadeOut(10);
}
//判断input是否发生变化
// function isChangeInput(){
//   $("#zjhm_yyqh").on("input propertychange",function(){
//       // if(#(this).val)
//       // alert("aaa");
//       if($(this).val().length > 3 && $("#srxm_yyqh").val().length != 0){
//         // console.log("aaaaaa");
//         $("#sumbit_xxrz").attr('src','images/yyqh/submit_normal.png')

//       }
//   });
// }



function jnbfFun() {
    TakenumberDynamicsFirstview.setTakeNumberFirstViewPageNone();
    $('#yuyuequhao_erweima').fadeIn();
}

function quhaoThankDisplay() {
    $('#yuyuequhao_erweima').fadeOut();
    $('#yuyuequhao_xqyk').fadeIn();
}

function quhaoThankNone() {
    $('#yuyuequhao_xqyk').fadeOut();
}
// setBackToHome()
//预约取号简答业务
function setBackToYyqhSec() {
    TakenumberDynamicsSecondview.setTakeNumberSecondViewPageNone();
    TakenumberDynamicsFirstview.setTakeNumberFirstViewPageDisplay(queueItems);
}

//展示二维码页面
function erweimaFun() {
    quhaoThankDisplay();
}
//
/**
  * 判断是否是身份证号码
  * @param {string} ywList
*/
function checkIsIDCard(num) {
    num = num.toUpperCase();
    //身份证号码为15位或者18位，15位时全为数字，18位前17位为数字，最后一位是校验位，可能为数字或字符X。
    if (!(/(^\d{15}$)|(^\d{17}([0-9]|X)$)/.test(num))) {
        // alert('输入的身份证号长度不对，或者号码不符合规定！\n15位号码应全为数字，18位号码末位可以为数字或X。');
        return false;
    } else {
        return true;
    }
}

/**
  * 判断是否刷卡，5s钟不刷卡就提醒用户要用身份证刷卡
*/
function isSwingCard(){
  // console.log("speak to count");
  console.log('select ' + $('#zjlx_yyqh').val());
  console.log('input ' + $('#zjhm_yyqh').val());
  if( '1' == $('#zjlx_yyqh').val() && '' == $('#zjhm_yyqh').val()){
    RobotSDK.say({'text':speakContext.yyjh[parseInt(3*Math.random())]});
    clearScanCardTimeout();
    scanCardTimeout = window.setTimeout("isSwingCard()",IS_SWING_CARD_TIME_OUT);
  }else {
    clearScanCardTimeout();
  }

}

/**
  * 清楚5s钟不刷卡就提醒用户要用身份证刷卡
*/
function clearScanCardTimeout(){
  window.clearTimeout(scanCardTimeout);
  console.log('清除不刷二代身份证定时器');
}
