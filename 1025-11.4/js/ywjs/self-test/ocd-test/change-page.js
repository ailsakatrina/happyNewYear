/**
* @file 本js控制强迫症测试页面的翻页
* @author 许琇婷
* @version v0.1
*/

/**

     * 函数说明：检测当前为第几页
     * @param  index 暂时存储当前题目编号
     * @param  question 暂时存储当前题目内容，之后与题库进行比对

 */
function ocdTestPageNumber(){
  var index = '';//初始化题目编号

  //获取当前网页的题目内容，以此来判断是第几题
  var question = document.getElementById('qNumber').innerHTML;

  //与题库FI_TEXT[]进行比对，判断是第几题
  for(var i=0;i<Q_Number.length;i++){
      if(question == Q_Number[i]){
        index = i; 
    } 
  }
  return index;//返回当前题目是第几题
}


/**

     * 函数说明：显示前一题（判断当前题目编号并跳转到前一题，同时要显示上一道题目用户勾选的的选项）
     * @param  index 用于存储当前题目编号
     * @param  question 用于存储当前题目内容，只后与题库进行比对
     * @param  i 第一题到第18题的索引
     * @param  preResult 暂存上一页用户的选项编号
 */
var showPrePage = function(){

  var index = ocdTestPageNumber();

  //如果是第一题，则无法上翻到上一页，并弹出提示
  if(index==0){
    returnSelfTest();
  }

  //如果不是第一题，则从题库中获取上一题的内容并显示在id='text'的文本框当中，同时显示上一题用户勾选的选项
  else{
    //翻到上一题
    if(index==1){
      $('#ocdBtn1').attr('src',"images/self-test-xxt/last_nor.png");
    }
    else if(index==TEXT.length-1){
      $('#ocdBtn2').attr('src',"images/self-test-xxt/nextQuestion.png");
    }
    $('#text').html(TEXT[index-1]) ;
    $('#qNumber').html(Q_Number[index-1]);

    var preResult = RESULT[index-1];//上一页的选项（选项可能为0,1,2）赋值给preResult
    $(".rightLogo").attr("src","images/self-test-xxt/unchosenButton.png");//清空选项

    if(preResult>=0){
       //显示上一题用户勾选的选项
    
    $('.whiteBoard').eq(preResult).find(".rightLogo").attr("src","images/self-test-xxt/chosenButton.png");
    }
    
   
    
  }
}

/**
     * 函数说明：在点击第一题的返回之后，回到自我测试界面
     * @param selfTestHomeDisplay 显示自我测试界面
     * @param ocdTestNone 隐藏强迫症测试界面
 */
function returnSelfTest(){
  selfTestHomeDisplay();
  ocdTestNone();

}  

/**

     * 函数说明：显示下一题（统计本题答案并赋值给全局变量，判断当前题目并显示下一题，若当前题目未选择，提示用户）
     * @param  {全局变量}  OPTION_TEMP  在进入下一页之前，OPTION_TEMP将用户选择时记录下来的选项值录入相应的OPTION数组
     * @param  index 用于存储当前题目编号
     * @param  question 用于存储当前题目内容，只后与题库进行比对
     * @param  i 第一题到第18题的索引
     * @param  response 记录用户confirm函数的选择
     * @param  nextResult 暂存下一页用户的选项编号
     * @param  currentResult 暂存當前用户的选项编号
 */
var showNextPage = function(){
//在显示下一题之前先统计本题答案

  if(OPTION_TEMP==0){
    OPTION[0]++;
  }
  else if(OPTION_TEMP==1){
    OPTION[1]++;
  }
  else{
    OPTION[2]++;
  }
		


  //识别当前题目为第几题
  var index = ocdTestPageNumber();
  
   var currentResult = RESULT[index];
   if(currentResult<0){
      $('#alertHint').show();
    }
    
    //如果是最后一题，提示用户是否确认提交
   else if(index==TEXT.length-1){
      
      /*	回答大于等于12个“是2”选项为 “高度怀疑您有强迫症”
  				回答有 低于12个“是2”，大于6个“有时会1”选项为 “你可能有点强迫症”
  				其余为 “不用担心，你没有强迫症”*/
        document.getElementById('questionPage').style.display = 'none';
        document.getElementById('answerPage').style.display  = 'block';
        if(OPTION[2]>12){				
          document.getElementById('answer1').style.display = 'none';
          document.getElementById('answer2').style.display = 'none';
        }
        else if((OPTION[2]<12)&&(OPTION[1]>6)){
          document.getElementById('answer1').style.display = 'none';
          document.getElementById('answer3').style.display = 'none';
        }
        else{
          document.getElementById('answer2').style.display = 'none';
          document.getElementById('answer3').style.display = 'none';
        }
      
  }
  else{
      if(index==TEXT.length-2){
        $('#ocdBtn2').attr('src',"images/self-test-xxt/next_nor.png");

      }
      $('#text').html(TEXT[index+1]);
      $('#qNumber').html(Q_Number[index+1]);
      //将返回按钮改为上一题
      $('#ocdBtn1').attr('src',"images/self-test-xxt/lastQuestion.png");

      $('#alertHint').hide();
      var nextResult = RESULT[index+1];//下一页的选项（选项可能为0,1,2）赋值给nextResult
      $(".rightLogo").attr("src","images/self-test-xxt/unchosenButton.png");//清空选项
      if(nextResult>0){//RESULT被初始化为-1,大于零说明用户已勾选
        //显示下一题用户勾选的选项
        $('.whiteBoard').eq(nextResult).find(".rightLogo").attr("src","images/self-test-xxt/chosenButton.png"); 
      }
   }

	/*var txt='';
	for(i=0;i<3;i++){
		txt = option[0]+"<br>"+option[1]+"<br>"+option[2];
	}
	alert(txt);*/
}      		



