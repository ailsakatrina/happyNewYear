function enterOneYeWu(obj) {
    var objId = $(obj).attr("id");
    enterAction(objId);
}

function enterAction(objId) {
    if (objId == "hjdtjl") {
        sethjdtjlDisplay();
    } else if (objId == "ywjj") {
        ywtjDisplay();
        setJiugonggeNone();
    } else if (objId == "yyqh_home") {
        setYyqhDisplay();
    } else if (objId == "khhd_home") {
        setJiugonggeNone();
        khhdDisplay();       
    } else if (objId == "cptj_home") {
        setJiugonggeNone();
        ywtjDisplay();  
    } else if (objId == "stop") {
        noticeServerCode("stopMotion");
    } else if (objId == "ywtj_stop") {
        noticeServerCode("stopMotion");
    } else if (objId == "ywtj_rgfw") {
        sethjdtjlDisplay();
    }
}

function suggestProductRandom() {
    var products = ['pinganfu', 'shaoerpinganfu', 'anxinbao', 'zhinengxing'];
    var num = Math.floor(Math.random() * 4);
    return products[num];
}
function suggestActivityRandom(){
    var activities=["one","two","three","four"];
    var num = Math.floor(Math.random() * 4);
    return activities[num];
}
function setTuiJianDisplay(ywType) {

    if (ywType == "ywjj") {
        $("#ywtubiao").attr("src", "images/jiugongge/ywjj.png");
        $("#ywqr").attr("src", "images/tuijian/qr_payh.png");
    }
    $("#ywsure").attr("title", ywType);
    countdown_fun(20);
    $("#xiangqingDiv").fadeOut(1);
    $("#tuijian").fadeIn(10);
    // window.JSInterface.playVoice("您好，根据我屏幕上的引导可以前往参观相关的业务哦");
    noticeServerCodeAndValue("playVoice", "您可以跟着我去了解，或者手机扫描二维码浏览");
}

function suggestProductRandom() {
    var products = ['pinganfu', 'shaoerpinganfu', 'anxinbao', 'zhinengxing'];
    var num = Math.floor(Math.random() * 4);
    return products[num];
}
function suggestActivityRandom(){
    var activities=["one","two","three","four"];
    var num = Math.floor(Math.random() * 4);
    return activities[num];
}
function setJiugonggeDisplay() {
    console.log("setJiugonggeDisplay");
    // alert("setJiugonggeDisplay");
    $("#jiugongge").fadeIn(10);
      $("#lunbo_home").swipe( {
      //Generic swipe handler for all directions
      swipe:function(event, direction, distance, duration, fingerCount, fingerData) {
        if(direction == "left"){
          //alert("You swiped " + direction );
          next();
        }
        else if (direction == "right") {
          // alert("You swiped " + direction );
          pre();
        }
      },
      //Default is 75px, set to 0 for demo so any distance triggers swipe
       threshold:20
    });
    RobotSDK.addUserKeyWords({
        'keyword': "少儿平安福|讲解|介绍&少儿平安福",
        'successCallback': function() {
            tuijianDetailPageDisplay('shaoerpinganfu');
            setJiugonggeNone();
        }
    });
    RobotSDK.addUserKeyWords({
        'keyword': "平安福|讲解|介绍&平安福",
        'successCallback': function() {
            tuijianDetailPageDisplay('pinganfu');
            setJiugonggeNone();
        }
    });
    RobotSDK.addUserKeyWords({
        'keyword': "安鑫宝|安鑫保|安心保|安心宝|安心吧|讲解|介绍&安鑫宝|安鑫保|安心保|安心宝|安心吧",
        'successCallback': function() {
            tuijianDetailPageDisplay('anxinbao');
            setJiugonggeNone();
        }
    });
    RobotSDK.addUserKeyWords({
        'keyword': "智能星|讲解|介绍&智能星",
        'successCallback': function() {
            tuijianDetailPageDisplay('zhinengxing');
            setJiugonggeNone();
        }
    });
    RobotSDK.addUserKeyWords({
        'keyword': "介绍|推荐&产品",
        'successCallback': function() {
             RobotSDK.say({
               'text': '给你推荐个产品',
               'successCallback': function(){
                    tuijianDetailPageDisplay(suggestProductRandom());
                    setJiugonggeNone();
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
                    setJiugonggeNone();
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
          setJiugonggeNone();
        }
    });
}

function setJiugonggeNone() {
    console.log("setJiugonggeNone");
    // alert("setJiugonggeNone");
    RobotSDK.clearUserKeyWords();
    $("#jiugongge").fadeOut(10);
}


//初始化slider
var length,
    currentIndex = 0,
    interval,
    hasStarted = false, //是否已经开始轮播
    t = 3000; //轮播时间间隔
function initSlider() {
    length = $('.slider-panel').length;
    //将除了第一张图片隐藏
    $('.slider-panel:not(:first)').hide();
    //将第一个slider-item设为激活状态
    $('.slider-item:first').addClass('slider-item-selected');
    //隐藏向前、向后翻按钮
    $('.slider-page').hide();
    //鼠标上悬时显示向前、向后翻按钮,停止滑动，鼠标离开时隐藏向前、向后翻按钮，开始滑动
    // $('.slider-panel, .slider-pre, .slider-next').hover(function() {
    //     stop();
    //     $('.slider-page').show();
    // }, function() {
    //     $('.slider-page').hide();
    //     start();
    // });
    $('.slider-item').hover(function(e) {
        stop();
        var preIndex = $(".slider-item").filter(".slider-item-selected").index();
        currentIndex = $(this).index();
        play(preIndex, currentIndex);
    }, function() {
        start();
    });
    $('.slider-pre').unbind('click');
    $('.slider-pre').bind('click', function() {
        pre();
    });
    $('.slider-next').unbind('click');
    $('.slider-next').bind('click', function() {
        next();
    });
}

/**
 * 向前翻页
 */
function pre() {
    var preIndex = currentIndex;
    currentIndex = (--currentIndex + length) % length;
    play(preIndex, currentIndex);
}
/**
 * 向后翻页
 */
function next() {
    var preIndex = currentIndex;
    currentIndex = ++currentIndex % length;
    play(preIndex, currentIndex);
}
/**
 * 从preIndex页翻到currentIndex页
 * preIndex 整数，翻页的起始页
 * currentIndex 整数，翻到的那页
 */
function play(preIndex, currentIndex) {
    $('.slider-panel').eq(preIndex).fadeOut(500)
        .parent().children().eq(currentIndex).fadeIn(10);
    $('.slider-item').removeClass('slider-item-selected');
    $('.slider-item').eq(currentIndex).addClass('slider-item-selected');
}
/**
 * 开始轮播
 */
function start() {
    if (!hasStarted) {
        hasStarted = true;
        interval = setInterval(next, t);
    }
}
/**
 * 停止轮播
 */
function stop() {
    clearInterval(interval);
    hasStarted = false;
}


var timer = ['1'];

function chuxian() {
    clearInterval(timer);
    timer = setInterval(
        function() {
            if (document.getElementById("cebianlan").offsetLeft == 45) { clearInterval(timer) } //判断要计算,所以不能带'px',用offsetLeft
            else {
                document.getElementById("cebianlan").style.left = document.getElementById("cebianlan").offsetLeft + 5 + 'px';
            }
        }, 3);
}

function xiaoshi() {
    $("#waittogo").css({ "display": "none" });
    clearInterval(timer);
    timer = setInterval(
        function() {
            if (document.getElementById("cebianlan").offsetLeft == -385) { clearInterval(timer); } else {
                document.getElementById("cebianlan").style.left = document.getElementById("cebianlan").offsetLeft - 5 + 'px';
            }
        }, 3);
}

var mainDownSlidetimer = ['1'];

function mainDownSlidechuxian() {
    clearInterval(mainDownSlidetimer);
    mainDownSlidetimer = setInterval(
        function() {

            if (document.getElementById("mainDownSlide").offsetTop == 0) { clearInterval(mainDownSlidetimer) } //判断要计算,所以不能带'px',用offsetLeft
            else {
                document.getElementById("mainDownSlide").style.top = document.getElementById("mainDownSlide").offsetTop - 5 + 'px';
            }
        }, 12);
}

function mainDownSlidexiaoshi() {
    clearInterval(mainDownSlidetimer);
    mainDownSlidetimer = setInterval(
        function() {
            if (document.getElementById("mainDownSlide").offsetTop == 145) {
                clearInterval(mainDownSlidetimer);
            } else {
                document.getElementById("mainDownSlide").style.top = document.getElementById("mainDownSlide").offsetTop + 5 + 'px';
            }
        }, 12);
}
var secondDownSlidetimer = ['1'];

function secondDownSlidechuxian() {
    clearInterval(secondDownSlidetimer);
    secondDownSlidetimer = setInterval(
        function() {

            if (document.getElementById("secondDownSlide").offsetTop == 0) { clearInterval(secondDownSlidetimer) } //判断要计算,所以不能带'px',用offsetLeft
            else {
                document.getElementById("secondDownSlide").style.top = document.getElementById("secondDownSlide").offsetTop - 5 + 'px';
            }
        }, 12);
}

function secondDownSlidexiaoshi() {
    clearInterval(secondDownSlidetimer);
    secondDownSlidetimer = setInterval(
        function() {
            if (document.getElementById("secondDownSlide").offsetTop == 155) {
                clearInterval(secondDownSlidetimer);
            } else {
                document.getElementById("secondDownSlide").style.top = document.getElementById("secondDownSlide").offsetTop + 5 + 'px';
            }
        }, 12);
}
