function queryScreenDevice(robotId){
  return true;
}
function ywSureToSeeClick(obj){
  var title = $(obj).attr("title");
  var _senceNum = getCurrentSenceVal();
  if(_senceNum == 1){
    setTuiJianNone();
    setJiugonggeNone();
    stoppresentClick();
    daojishiFlag = 0;
    $("#indexImg").fadeIn(10);
    setNLPoff();
    EnterSence(2);
  }else if(_senceNum == 3) {
    setTuiJianNone();
    setJiugonggeNone();
    stoppresentClick();
    daojishiFlag = 0;
    $("#indexImg").fadeIn(10);
    var isHasScreenDevice = queryScreenDevice('PingAnRobot004');
    if(isHasScreenDevice){
      setNLPoff();
      EnterSence(2);
      noticeServerCodeAndValue("playVoice","请跟我来！");
    }else {
      setIndexNone();
      fanyeDisplay();
      var msg = "open"
      noticeServerCodeAndValue("showPPT",msg);
      noticeServerCodeAndValue("playVoice","已在我的屏幕显示，你可以通过点击我的屏幕按钮进行翻页！平安银行口袋银行。");
    }
  }
}
function ywCancelToSeeClick(){
  var _senceNum = getCurrentSenceVal();
  if(_senceNum == 1){
    setTuiJianNone();
    stoppresentClick();
    daojishiFlag = 0;
    setJiugonggeDisplay();
    setNLPon();
    EnterSence(3);
    code = "addKeyWordsEvent";
    value = QAConfigDict['jiugonggePage'];
    addKeyWords(code,value);
  }else if (_senceNum == 3) {
    setTuiJianNone();
    stoppresentClick();
    daojishiFlag = 0;
    code = "addKeyWordsEvent";
    value = QAConfigDict['jiugonggePage'];
    addKeyWords(code,value);
  }
}
