function setMusicDisplay(){
  $("#indexMusic").fadeIn(10);
}
function setMusicNone(){
  $("#indexMusic").fadeOut(10);
  setNLPon();
}
function musicClick(){
  setMusicNone();
  noticeServerCode("stopVoice");
}
