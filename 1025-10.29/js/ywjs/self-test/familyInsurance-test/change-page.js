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
    alert('这已经是第一页了！');
  }
  /*如果不是第一题，则从题库中获取上一题的内容并显示在id='#fiQuestiontext'的文本框当中，
  同时显示上一题用户勾选的选项*/
  else{
    //翻到上一题
    $('#fiQuestiontext').html(FI_TEXT[pageNumber-1][0]); 
    $('#fiImage').attr("src",FI_IMAGE[pageNumber-1]);
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
      alert("您还没有选择本题答案哦"); break;
    }
  }
  
  /*在上一题作答完毕的前提下，进入下一题*/
  if(temp!=5){

    $('#fiQuestiontext').html(FI_TEXT[pageNumber+1][0]);//显示下一题题目
    $('#fiImage').attr("src",FI_IMAGE[pageNumber+1]);//显示下一题题目相应图片
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




      
     
    
      // var nextResult = RESULT[index+1];//下一页的选项（选项可能为0,1,2）赋值给nextResult
      // $(".rightLogo").attr("src","images/self-test-xxt/unchosenButton.png");//清空选项
      // if(nextResult>0){//RESULT被初始化为-1,大于零说明用户已勾选
      //   //显示下一题用户勾选的选项
      //   $('.whiteBoard').eq(nextResult).find(".rightLogo").attr("src","images/self-test-xxt/chosenButton.png"); 
      // }
   

	
   		



