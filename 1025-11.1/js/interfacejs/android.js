/***
  commandCode
  commandValue
  //setCommandInWeb('{"commandCode":"KeyWordsEventCallback","commandValue":"videoToPlayCallback"}');
****/
function setCommandInWeb(msg){
  var jsonObject=JSON.parse(msg);
  if(jsonObject.commandCode=='uploadIDCardInfo'){
    var commandValue=jsonObject.commandValue;
    var number=commandValue.number;
    setID(number);
  }else if (jsonObject.commandCode=='recommendQRcode') {
    var commandValue=jsonObject.commandValue;
    if("commonQRcodeDisplay" == commandValue){
      recommendQRcode.setRecommendQRcodePageDisplay();
    }else if ("interceptQRcodeDisplay" == commandValue) {
      recommendQRcode.setRecommendQRcodePageDisplay(1);
    }
  }else{
    RobotSDK.setCommandInWeb(msg);
  }
  return false;
}
function testVideo(){
  eval('video591eb02fcbb6630489f5447b')();
}
function doCommandInAndroid(msg){
  var message = msg.toString();
  try {
    window.JSInterface.doCommandInAndroid(message);
  } catch (e) {
    // console.error(e.name+":"+e.message);
  }

}

function noticeServerCode(commandCode){
  var sendMsg = '{"commandCode":"'+commandCode+'"}';
  // alert(sendMsg);
  console.log(sendMsg);
  doCommandInAndroid(sendMsg);
}
function noticeServerCodeAndValue(commandCode,commandValue){
  var sendMsg = '{"commandCode":"'+commandCode+'","commandValue":"'+commandValue+'"}';
  // alert(sendMsg);
  console.log(sendMsg);
  doCommandInAndroid(sendMsg);
}
/*
  ******  下面是提供安卓调用*******
*/
var senceNum = 1; //场景编号
function setSceneVal(_senceNum){
    senceNum = parseInt(_senceNum);
    if(senceNum == 4){
      setIndexNone();
      tuijianDetailPageDisplay('bank1');
      var msg = "open"
      // window.JSInterface.showPPT(msg);
      noticeServerCodeAndValue("showPPT",msg);
      // window.JSInterface.playVoice("请看大屏幕，你可以通过点击我的屏幕按钮进行翻页！平安金管家，致力成为值得亿万用户托付的金融生活管理专家。");
      noticeServerCodeAndValue("playVoice","请看大屏幕，你可以通过点击我的屏幕按钮进行翻页！平安银行口袋银行。");
    }
}
//关键词触发推荐
function keywordTuijian(){
  countdown_fun(10);
  $("#tuijian").fadeIn(1000);
  // window.JSInterface.playVoice("您好，根据我屏幕上的引导可以前往参观相关的业务哦");
  noticeServerCodeAndValue("playVoice","您好，根据我屏幕上的引导可以前往参观相关的业务哦");
}
//音乐播放
function setMusic(duration,singer,music){
  Player.setMusic(duration,singer,music);
}
function setDuration(s) {
  Player.setDuration(s);
}
function setCurrent(s){
  Player.setCurrent(s);
}
function getCurrentSenceVal(){
  return senceNum;
}
function playVoiceInterface(tts){
  var _tts = tts.toString();
  window.JSInterface.playVoice(_tts);
  noticeServerCodeAndValue("playVoice",_tts);
}
//
// function receiveAndroidCommand(msg){
//   var obj = msg.parseJSON();
//   if(obj.hasOwnProperty("RobotEvent")){
//     RobotEventobj = obj.RobotEvent
//     if(RobotEventobj[0].hasOwnProperty("EventType")){
//       EventType = RobotEventobj[0].EventType
//     }
//   }
// }
