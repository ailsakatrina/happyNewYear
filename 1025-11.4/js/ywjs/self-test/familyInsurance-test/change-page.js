/**
* @file 本js控制家庭保障测试页面的翻页
* @author 许琇婷
* @version v0.1
*/


/**

     * 函数说明：显示前一题（判断当前题目编号并跳转到前一题，同时要显示上一道题目用户勾选的的选项）
     * @param  pageNumber 用于存储当前题目编号
     * @param  preResult数组用于暂时存储上一道题目6个选项的答案
     * @param  i 第1题到第8题的索引
 */
var fiShowPrePage = function(){

  var pageNumber = testPageNumber();//获取当前题目编号

  //如果是第一题，则无法上翻到上一页，并弹出提示
  if(pageNumber==0){
    fiReturnSelfTest();
  }
  /*如果不是第一题，则从题库中获取上一题的内容并显示在id='#fiQuestiontext'的文本框当中，
  同时显示上一题用户勾选的选项*/
  else{
    //改变两个按钮的名称
    if(pageNumber==1){
      $('#fiBtn1').attr('src',"images/self-test-xxt/last_nor.png");
    }
    else if(pageNumber==FI_TEXT.length-1){
      $('#fiBtn2').attr('src',"images/self-test-xxt/nextQuestion.png");
    }
    //翻到上一题
    $('#fiQuestiontext').html(FI_TEXT[pageNumber-1][0]); 
    $('#fiImage').attr("src",FI_IMAGE[pageNumber-1]);
    $('#fiChoice').html(FI_CHOICE[pageNumber-1]);
    showOptions();
    
    //判断上一题记录的答案并显示
      //清空选项
    $(".fiRightLogo").attr("src","images/self-test-xxt/unchosenButton.png");//清空选项
    var preResult= new Array(6);
    /*var txt = "";
    for(var j=0;j<6;j++){
       //记录相应答案
      txt += FI_RESULT[pageNumber-1][j]+"<br>";
    }*/
    for(var i=0;i<6;i++){
        preResult[i] = FI_RESULT[pageNumber-1][i];
        if(preResult[i]==0){
          $('.fiWhiteBoard').eq(i).find(".fiRightLogo").attr("src","images/self-test-xxt/chosenButton.png"); 
        }    
    }
  }    
}
/**

     * 函数说明：在点击第一题的返回之后，回到自我测试界面
     * @param selfTestHomeDisplay 显示自我测试界面
     * @param fiTestNone 隐藏家庭保障测试界面
 */      
function fiReturnSelfTest(){
  selfTestHomeDisplay();
  fiTestNone();

}  
/**

     * 函数说明：显示下一题（统计本题答案并赋值给全局变量，判断当前题目并显示下一题，若当前题目未选择，提示用户）
     * @param  temp 在进入下一页之前，temp用来判断用户是否进行了作答，以及是否可以进入下一题
     * @param  pageNumber 用于存储当前题目编号
     * @param  i 每道题六个选项
     * @param  nextResult nextResult数组用于暂时存储下一道题目6个选项的答案
 */
var fiShowNextPage = function(){

  var pageNumber = testPageNumber();//获取当前页码

  /*对当前选项答案进行遍历，temp记录选项编号*/
  var temp="";
  for(var i=0;i<6;i++){
    /*若有题目被选择，则跳出循环*/
    if(FI_RESULT[pageNumber][i]==0) break;
    /*若六个选项均未被选择，则跳出提示，并无法进入下一题*/
    if(i==5){
      temp = i;
      $('#fiAlertHint').show(); break;
    }
  }
  
  /*在上一题作答完毕的前提下，进入下一题*/
  if(temp!=5){
    if(pageNumber==FI_TEXT.length-1){
      showHintMsg();
      
      /*document.getElementById('fiQuestionPart').style.display = 'none';
      document.getElementById('productProPage').style.display  = 'block';*/
      //productPromotion();
       /*var clickTime = Math.floor(Math.random()*4 + 1);
      for(i=0,i<3;i++){
        $("#gallerybaliyw .dg-next").trigger('click'); 
      } */

    }
    else{
      if(pageNumber==FI_TEXT.length-2){
        $('#fiBtn2').attr('src',"images/self-test-xxt/next_nor.png");
      }
      $('#fiQuestiontext').html(FI_TEXT[pageNumber+1][0]);//显示下一题题目
      $('#fiImage').attr("src",FI_IMAGE[pageNumber+1]);//显示下一题题目相应图片
      $('#fiChoice').html(FI_CHOICE[pageNumber+1]);
      $('#fiBtn1').attr('src',"images/self-test-xxt/lastQuestion.png");
      $('#fiAlertHint').hide();

      $(".fiRightLogo").attr("src","images/self-test-xxt/unchosenButton.png");//所有选项初始化为“未选择”
      showOptions();//显示下一题题目的选项

      //若下一题已经被选择过，则显示相应记录
      var nextResult= new Array(6);
      for(var i=0;i<6;i++){
        nextResult[i] = FI_RESULT[pageNumber+1][i];
        if(nextResult[i]==0){
          $('.fiWhiteBoard').eq(i).find(".fiRightLogo").attr("src","images/self-test-xxt/chosenButton.png"); 
        }   
      }
    }
  }
}


/**

     * 函数说明：完成家庭保障测试之后，跳转到提示界面
     * @param  fiTestQuestionNone 隐藏家庭保障测试问题界面
     * @param  fiTestProDisplay 显示家庭保障测试推荐跳转界面
     * @param  countDown.timedCount 开启倒计时
 */
function showHintMsg(){
  fiTestQuestionNone();
  fiTestProDisplay();
  //$("#gallerybaliyw .dg-next").trigger('click'); 
  countDown.timedCount();
}


/**

     * 函数说明：倒计时，3秒后自动为用户推荐产品
     * @param  COUNT 倒计时时间的初始值
     * @param  time 每隔一秒调用倒计时函数
     * @param  timedCount 倒计时递归函数
     * @param  productPromotion 跳入产品推荐界面，并随机推荐一款产品
 */
var countDown = {
  COUNT:3,
  time:Object,
  timedCount :function(){
    document.getElementById('clockCounter').innerHTML= this.COUNT+'秒';
    this.COUNT--;
    this.time=setTimeout("countDown.timedCount()",1000);
    if(this.COUNT==0){
      clearTimeout(this.time);
      productPromotion();
    }
  },
}



/**

     * 函数说明：完成家庭保障测试之后，3秒倒计时后，跳入产品推荐界面，并随机推荐一款产品
     * @param  selfTestHomeNone 在进入下一页之前，temp用来判断用户是否进行了作答，以及是否可以进入下一题
     * @param  fiTestNone 隐藏家庭保障测试界面
     * @param  ywtjDisplay 显示产品推荐界面
 */
function productPromotion(){

  selfTestHomeNone();
  fiTestNone();
  ywtjDisplay();
  //$("#gallerybaliyw .dg-next").trigger('click'); 
  ProductRecommen.skipPage(Math.random()*4);
}

/**
 * 产品推荐跳转
 * @namespace
 * @example
 * ProductRecommen.skipPage(2);
 */
var ProductRecommen = {
  SKIP_TIMES:0,
  intervalObj:Object,
  WAIT_TIME_OUT:600,

  /**
   * 产品跳转多页
   * @param {int} skipTimes 产品推荐需要跳转的页数
   * @example
   * ProductRecommen.skipPage(2);
   */
  skipPage:function(skipTimes){
    this.SKIP_TIMES = skipTimes;
    this.intervalObj  = window.setInterval(function(){
      ProductRecommen.skipOnePage();
    }, this.WAIT_TIME_OUT);
  },

  /**
   * 产品跳转单页
   * @example
   * ProductRecommen.skipOnePage(2);
   */
  skipOnePage:function(){
    $(".dg-next").click();
    this.SKIP_TIMES = this.SKIP_TIMES - 1;
    if(this.SKIP_TIMES <= 0){
      window.clearInterval(this.intervalObj);
    }
  },
}
     
    
     
   

	
   		



