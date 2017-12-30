function preywtj(){
  var galleryObj;
  $(function() {
    galleryObj = $('#dg-container').gallery();
  });
  $(".touchSwipetest").swipe( {
      //Generic swipe handler for all directions
      swipe:function(event, direction, distance, duration, fingerCount, fingerData) {
        if(direction == "left"){
          // alert("left");
          $("#gallerybaliyw .dg-next").trigger('click');
        }
        else if (direction == "right") {
          // alert("right");
          $("#gallerybaliyw .dg-prev").trigger('click');
        }
      },
      //Default is 75px, set to 0 for demo so any distance triggers swipe
       threshold:20
    });
}

function ywtjDisplay(){
  // setIndexNone();
  $("#gallerybaliyw").fadeIn(1000);
  preywtj();
  RobotSDK.say({'text':speakContext.hdtj[parseInt(3*Math.random())]});
  RobotSDK.addUserKeyWords({
        'keyword': "少儿平安福|讲解|介绍&少儿平安福",
        'successCallback': function() {
            tuijianDetailPageDisplay('shaoerpinganfu');
            ywtjNone();
        }
    });
    RobotSDK.addUserKeyWords({
        'keyword': "平安福|讲解|介绍&平安福",
        'successCallback': function() {
            tuijianDetailPageDisplay('pinganfu');
            ywtjNone();
        }
    });
    RobotSDK.addUserKeyWords({
        'keyword': "安鑫宝|安鑫保|安心保|安心宝|安心吧|讲解|介绍&安鑫宝|安鑫保|安心保|安心宝|安心吧",
        'successCallback': function() {
            tuijianDetailPageDisplay('anxinbao');
            ywtjNone();
        }
    });
    RobotSDK.addUserKeyWords({
        'keyword': "智能星|讲解|介绍&智能星",
        'successCallback': function() {
            tuijianDetailPageDisplay('zhinengxing');
            ywtjNone();
        }
    });
    RobotSDK.addUserKeyWords({
        'keyword': "介绍|推荐&产品",
        'successCallback': function() {
             RobotSDK.say({
               'text': '给你推荐个产品',
               'successCallback': function(){
                    tuijianDetailPageDisplay(suggestProductRandom());
                    ywtjNone();
                   }
             });
        }
    });
    RobotSDK.addUserKeyWords({
        'keyword': "介绍|哪些&活动",
        'successCallback': function() {
             RobotSDK.say({
               'text': '我们有这个活动',
               'successCallback': function(){
                    kehuhuodongDetailPageDisplay(suggestActivityRandom());
                    ywtjNone();
                   }
             });
        }
    });
    RobotSDK.addUserKeyWords({
        'keyword': "取号|叫号",
        'successCallback': function() {
            setYyqhDisplay();
        }
    });
    RobotSDK.addUserKeyWords({
        'keyword': "客户&活动",
        'successCallback': function() {
          khhdDisplay();
          ywtjNone();
        }
    });
}
function ywtjNone(){
  $("#gallerybaliyw").fadeOut(1000);
  RobotSDK.clearUserKeyWords();
  // setJiugonggeDisplay();

}
function ywtjBackToHome(){
  ywtjNone();
  setJiugonggeDisplay();
}
function enterYewutuijian(obj){
  // alert($(obj).attr('id'));
  var id = $(obj).attr('id');
  reportStatistics.post2ReportStatistics(id); //产品推荐报表
  tuijianDetailPageDisplay(id);
  return false;
}


function prekhhd(){
  var galleryObj;
  $(function() {
    galleryObj = $('#dg-container_khhd').gallery();
  });
  $(".touchSwipe_khhd").swipe( {
      //Generic swipe handler for all directions
      swipe:function(event, direction, distance, duration, fingerCount, fingerData) {
        if(direction == "left"){
          // alert('khhd_left');
          $("#gallery_khhd .dg-next").trigger('click');
        }
        else if (direction == "right") {
          // alert("khhd_right");
          $("#gallery_khhd .dg-prev").trigger('click');
        }
      },
      //Default is 75px, set to 0 for demo so any distance triggers swipe
       threshold:20
    });
}

function khhdDisplay(){
  $("#gallery_khhd").fadeIn(1000);
  prekhhd();
  RobotSDK.say({'text':speakContext.khhd[parseInt(3*Math.random())]});
  // RobotSDK.say({'text':speakContext.hdtj[0]});
      RobotSDK.addUserKeyWords({
        'keyword': "少儿平安福|讲解|介绍&少儿平安福",
        'successCallback': function() {
            tuijianDetailPageDisplay('shaoerpinganfu');
            console.log("sss");
            khhdNone();
        }
    });
    RobotSDK.addUserKeyWords({
        'keyword': "平安福|讲解|介绍&平安福",
        'successCallback': function() {
            tuijianDetailPageDisplay('pinganfu');
            khhdNone();
        }
    });
    RobotSDK.addUserKeyWords({
        'keyword': "安鑫宝|安鑫保|安心保|安心宝|安心吧|讲解|介绍&安鑫宝|安鑫保|安心保|安心宝|安心吧",
        'successCallback': function() {
            tuijianDetailPageDisplay('anxinbao');
            khhdNone();
        }
    });
    RobotSDK.addUserKeyWords({
        'keyword': "智能星|讲解|介绍&智能星",
        'successCallback': function() {
            tuijianDetailPageDisplay('zhinengxing');
            khhdNone();
        }
    });
    RobotSDK.addUserKeyWords({
        'keyword': "介绍|推荐&产品",
        'successCallback': function() {
             RobotSDK.say({
               'text': '给你推荐个产品',
               'successCallback': function(){
                    tuijianDetailPageDisplay(suggestProductRandom());
                    khhdNone();
                   }
             });
        }
    });
    RobotSDK.addUserKeyWords({
        'keyword': "介绍|哪些&活动",
        'successCallback': function() {
             RobotSDK.say({
               'text': '我们有这个活动',
               'successCallback': function(){
                    kehuhuodongDetailPageDisplay(suggestActivityRandom());
                    khhdNone();
                   }
             });
        }
    });
    RobotSDK.addUserKeyWords({
        'keyword': "取号|叫号",
        'successCallback': function() {
            setYyqhDisplay();
        }
    });
}
function khhdNone(){
  $("#gallery_khhd").fadeOut(1000);
  RobotSDK.clearUserKeyWords();
  // setJiugonggeDisplay();

}
function khhdBackToHome(){
  khhdNone();
  setJiugonggeDisplay();
}
function enterKeHuHuoDong(obj){
  // alert($(obj).attr('id'));
  var id = $(obj).attr('id');
  reportStatistics.post2ReportStatistics(id); //产品推荐报表
  kehuhuodongDetailPageDisplay(id);
  return false;
}
function DetailPageDisplay(obj){
  var _id=obj.id;
  var type=_id.split("_")[0];
  var page=_id.split("_")[1];
  if('p'==type){
     tuijianDetailPageDisplay(page);
     setJiugonggeNone();
  }if('a'==type){
     kehuhuodongDetailPageDisplay(page);
     setJiugonggeNone();
  }
}
