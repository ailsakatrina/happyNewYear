

/**
 * 翻页逻辑
 */
 var YWTJ_page_profile = new Array();
 var YWTJ_pageInfo = {'shaoerpinganfu':["少儿平安福是一款创新型少儿保险产品计划，该计包含109种疾病、意外、豁免等保障,并实现轻度重疾、恶性肿瘤的多次赔付，还可附加赔偿父母陪护期间的误工损失。",
                          "扫描二维码了解更多",
                          "images/fanye/shaoerpinganfu/"],
                  'pinganfu':["平安福保险产品涵盖重大疾病、特定轻度重疾、意外医疗、保费豁免等多项责任，是中高端人士全面保障计划的上上之选。",
                          "扫描二维码了解更多",
                          "images/fanye/pinganfu/"],
                  'anxinbao':["安鑫保保险产品计划不仅在保险期间内可以为您提供全面保障，更关键的是保险期满平安无事，给付主险和附加重疾所交保费之和，一份保单即可解决健康、养老两大问题",
                        "扫描界面二维码了解更多",
                        "images/fanye/anxinbao/"],
                   'zhinengxing':["智能星灵活可调的产品特征可以更好地契合孩子教育储蓄、创业资金与保险保障的需求、帮助孩子安稳享受人生",
                        "扫描界面二维码了解更多",
                        "images/fanye/zhinengxing/"],
                      };
 // var iTime = 20;
//定义当前的第几页，默认第一页
var currentPage = 1;
var timeSeconds = 10;

function tuijianDetailPageDisplay(type){

  ReportQRCode.reportQRChange(sanQRProductCode,type);
  console.log("setTuiJianDisplay");
  if(type != ''){
    console.log("type:"+type);
    YWTJ_page_profile = YWTJ_pageInfo[type];
  }
  noticeServerCodeAndValue("playVoice",YWTJ_page_profile[0]);
  console.log(YWTJ_page_profile);
  $("#productInfo").attr("src","images/fanye/"+type+"/productInfo.png")
  // setIndexNone();
  $("#gallerybaliyw").fadeOut(10);
  $("#tuijianDetailPage").fadeIn(10);
  $("#pptImg").attr("src",YWTJ_page_profile[YWTJ_page_profile.length-1]+"1.png");
  $("#nextpage").fadeIn(10);
  $("#prepage").fadeOut(10);
  currentPage = 1;
  iTime = 20;
  clearNextPageTimer();
  clearBackToHomePageTimer();
  setTimerFun();
  $("#pptImg").swipe( {
      //Generic swipe handler for all directions
      swipe:function(event, direction, distance, duration, fingerCount, fingerData) {
        if(direction == "left"){
          //alert("You swiped " + direction );
          nextpageClick();
        }
        else if (direction == "right") {
          // alert("You swiped " + direction );
          prepageClick();
        }
      },
      //Default is 75px, set to 0 for demo so any distance triggers swipe
       threshold:20
    });
}


function prepageClick() {
  //弹出窗口
  if(currentPage>1){
    // alert("上一页");
    var msg = "pre";
    noticeServerCodeAndValue("showPPT",msg);
    prepage();
    node = window.clearInterval(node);//结束
    // $("#nextpage").text("下一页");
    iTime = 15;
    clearNextPageTimer();
    clearBackToHomePageTimer();
    setTimerFun();
    currentPage = currentPage - 1;
    if(currentPage == 1){
      noticeServerCodeAndValue("playVoice",YWTJ_page_profile[currentPage-1]);
    }
    else{
      noticeServerCodeAndValue("playVoice",YWTJ_page_profile[currentPage-1]);
    }
    if(currentPage == 1){
      // $("#prepage").attr('disabled',"true");
      $("#prepage").fadeOut(10);
    // }else {
    //   if($("#prepage").attr('disabled') == "true"){
    //     $("#prepage").removeAttr("disabled");
    //   }
    }
    if(currentPage == YWTJ_page_profile.length-2){
      nodeLock = window.clearInterval(nodeLock);//结束
      // $("#nextpage").removeAttr("disabled");
      $("#nextpage").fadeIn(10);
    }
  }

}
function nextpageClick(){
  if(currentPage<YWTJ_page_profile.length-1){
    // alert("下一页");
    var msg = "next";
    noticeServerCodeAndValue("showPPT",msg);
    nextpage();
    currentPage = currentPage + 1;
    if(currentPage == YWTJ_page_profile.length-1){
      noticeServerCodeAndValue("playVoice",YWTJ_page_profile[currentPage-1]);
      iTimeLock = 10;
      setTimerLock();
    }
    else{
      noticeServerCodeAndValue("playVoice",YWTJ_page_profile[currentPage-1]);
    }
    if(currentPage == 2){
      $("#prepage").fadeIn(10);
      node = window.clearInterval(node);//结束
      // $("#nextpage").text("下一页");
      if(currentPage == YWTJ_page_profile.length-1){
        $("#nextpage").fadeOut(10);
      }
      else{
        iTime = 15;
        clearNextPageTimer();
        clearBackToHomePageTimer();
        setTimerFun();
      }

    }
    else if(currentPage == YWTJ_page_profile.length-1){

       $("#nextpage").fadeOut(10);
       alert("nextpageFadeout");
       node = window.clearInterval(node);//结束
      //  $("#nextpage").text("下一页");
    }else if(currentPage < YWTJ_page_profile.length-1){
      node = window.clearInterval(node);//结束
      // $("#nextpage").text("下一页");
      iTime = 15;
      clearNextPageTimer();
      clearBackToHomePageTimer();
      setTimerFun();
    }else{
      node = window.clearInterval(node);//结束
    }
  }

}

function tuijianDetailPageNone(){
  $("#tuijianDetailPage").fadeOut(10);
}
function tuijianDetailBackforward(){
  node = window.clearInterval(node);//结束翻页倒计时
  nodeLock = window.clearInterval(nodeLock);//结束ppt播放倒计时
  tuijianDetailPageNone();
  setNLPon();
  //EnterSence(3);
  var msg = "close"
  noticeServerCodeAndValue("showPPT",msg);
  currentPage = 1;
    // stoppresentClick();
  ywtjDisplay();
}
function stoppresentClick(){
  // alert("停止");
  node = window.clearInterval(node);//结束翻页倒计时
  nodeLock = window.clearInterval(nodeLock);//结束ppt播放倒计时
  tuijianDetailPageNone();
  setJiugonggeDisplay();
  setNLPon();
  //EnterSence(3);
  var msg = "close"
  noticeServerCodeAndValue("showPPT",msg);
  currentPage = 1;
}

var node;
function setTimerFun(){
  node = self.setInterval("coundDownFun()", 1000);
}
var iTime = 15;
function coundDownFun(){
  // $("#nextpage").text("下一页"+"("+iTime+")");
  iTime --;
  if(iTime <= 0)
  {
    node = window.clearInterval(node)//结束
    // $("#nextpage").text("下一页");
    nextpageClick();

  }
}
/**
 *  清除翻页定时器
 */
　function clearNextPageTimer(){
  node = window.clearInterval(node)//结束
}

/***锁屏计时器**/

var nodeLock;
function setTimerLock(){
  nodeLock = self.setInterval("coundDownLock()", 1000);
}
var iTimeLock = 30;
function coundDownLock(){
  iTimeLock --;
  if(iTimeLock <= 0)
  {
    nodeLock = window.clearInterval(nodeLock)//结束
    //alert("正常聊天")；
    stoppresentClick();

  }
}
/**
 *  清除回到首页定时器
 */
　function clearBackToHomePageTimer(){
  nodeLock = window.clearInterval(nodeLock)//结束
}

function nextpage(){
  var _curpage = parseInt(currentPage);
  // alert(_curpage);
  _nextpage = _curpage+1;
  $("#pptImg").attr("src",YWTJ_page_profile[YWTJ_page_profile.length-1]+_nextpage+".png");
}
function prepage(){
  var _curpage = parseInt(currentPage);
  // alert(_curpage);
  _prepage = _curpage-1;
  $("#pptImg").attr("src",YWTJ_page_profile[YWTJ_page_profile.length-1]+_prepage+".png");
}
function exitToHome() {
  stoppresentClick();
  ywtjNone();
  setJiugonggeDisplay();
}
