/**
 * 翻页逻辑
 */
 var pageInfo = {
                  "one":{"src" : "images/customerActivity/one/1.png","type":"img"},
                  "two":{"src" : "images/customerActivity/two/1.png","type":"img"},
                  "three":{"src" : "http://192.168.5.140:8080/video/customerActivity/three/temperature1.mp4","type":"video"},
                  "four":{"src" : "http://192.168.5.140:8080/video/customerActivity/four/value1.mp4","type":"video"}
                };
function kehuhuodongDetailPageDisplay(activityNum){
  ReportQRCode.reportQRChange(scanQRActivityCode,activityNum);
  console.log("activityNum:"+activityNum);
  $("#productInfo_khhd").attr("src","images/customerActivity/"+activityNum+"/productInfo.png");
//setIndexNone();
  $("#gallery_khhd").fadeOut(10);
  $("#kehuhuodongDetailPage").fadeIn(10);
  if("img" == pageInfo[activityNum].type ){
    $("#pptVideo_khhd").css("display", "none");
    $("#pptImg_khhd").css("display","block");
    $("#pptImg_khhd").attr("src", pageInfo[activityNum].src);
  }else if("video" == pageInfo[activityNum].type) {
    console.log("##################ready to play#################");
    // $("#pptVideo_khhd").attr("src", pageInfo[activityNum].src);
    kehuhuodongPlayVideo(pageInfo[activityNum].src);
    // $("#pptVideo_khhd").css("display", "block");
    $("#pptImg_khhd").css("display","none");
  }
}
function kehuhuodongDetailPageNone(){
  $("#kehuhuodongDetailPage").fadeOut(10);
}
function kehuhuodongBackforward(){
  kehuhuodongDetailPageNone()
  khhdDisplay();
  // $('#pptVideo_khhd').trigger('pause');
  kehuhuodongStopVideo();
}

function kehuhuodongExitToHome() {
  kehuhuodongDetailPageNone();
  khhdNone();
  setJiugonggeDisplay();
  kehuhuodongStopVideo();
}

/**
 * 活动视频停止播放
 */
function kehuhuodongStopVideo(){
  noticeServerCode("stopVLC");
  noticeServerCode("hideVLC");
  // $('#pptVideo_khhd').trigger('pause');
  // $("#pptImg_khhd").attr("src", "");
  // var myVid=document.getElementById("pptVideo_khhd");
  // myVid.pause();
  // myVid.currentTime = 0;
  // console.log(myVid.currentTime);
}

/**
 * 活动视频开始播放
 */
 function kehuhuodongPlayVideo(src)
 {
  //  noticeServerCodeAndValue("showVLC","24.86.636.398");
   noticeServerCodeAndValue("showVLC","24.86.636.398");
   noticeServerCodeAndValue("playVLC",src);
  //  var myVid=document.getElementById("pptVideo_khhd");
  //  myVid.load();
  //  myVid.play();
   noticeServerCodeAndValue("releaseSystem","");
 }
