function setIndexNone(){
  $("#indexImg").fadeOut(10);
  $("#indexMusic").fadeOut(10);
  var _senceNum = getCurrentSenceVal();
  if(_senceNum == 1){
    $("#jiugongge").fadeIn(10);
    setNLPon();
    EnterSence(3);
    code = "addKeyWordsEvent";
    value = QAConfigDict['jiugonggePage'];
    addKeyWords(code,value);
  }else if (_senceNum == 2) {
    $("#jiugongge").fadeIn(10);
    setNLPon();
    EnterSence(3);
    code = "addKeyWordsEvent";
    value = QAConfigDict['jiugonggePage'];
    addKeyWords(code,value);
  }else{
    $("#jiugongge").fadeIn(10);
    setNLPon();
    EnterSence(3);
    code = "addKeyWordsEvent";
    value = QAConfigDict['jiugonggePage'];
    addKeyWords(code,value);
  }
}
function setIndexDisplay(){
  $("#indexImg").fadeIn(10);
  $("#jiugongge").fadeOut(10);
  $("#mainDiv").fadeOut(10);
  $("#tuijianDetailPage").fadeOut(10);
  $("#gallerybaliyw").fadeOut(10);
  $("#bankmainDiv").fadeOut(10);
  setUINone();
  setNLPoff();
}
