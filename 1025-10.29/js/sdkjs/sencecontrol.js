/*
  ******  下面是场景分类*******
*/

function setNLPon(){
  // window.JSInterface.enableNLP();
  noticeServerCode("enableNLP");
  // alert("NLP开");
}
function setNLPoff(){
  // window.JSInterface.disableNLP();
  noticeServerCode("disableNLP");
  // alert("NLP关");
}
function EnterSence(_senceNum){
    senceNum = _senceNum;
    var senceNumParam = senceNum;
    // window.JSInterface.setRobotScene(senceNumParam);
    noticeServerCodeAndValue("setRobotScene",senceNumParam);
    //alert("进入场景"+_senceNum);
}
