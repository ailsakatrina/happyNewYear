/**
* @file 本js实现从自我测试界面进入家庭保障测试界面后的一系列操作函数
* @author 许琇婷
* @version v0.1
*/

/**

     * 函数说明：检测当前为第几页
     * @param  index 暂时存储当前题目编号
     * @param  question 暂时存储当前题目内容，之后与题库进行比对

 */
function testPageNumber(){
  var index = '';//初始化题目编号

  //获取当前网页的题目内容，以此来判断是第几题
  var question = document.getElementById('fiQuestiontext').innerHTML;

  //与题库FI_TEXT[]进行比对，判断是第几题
  for(var i=0;i<8;i++){
      if(question == FI_TEXT[i][0]){
        index = i; 
    } 
  }
  return index;//返回当前题目是第几题
}



/**

     * 函数说明：检测当前为第几页之后，导入相应题目的选项
     * @param  pageNumber 用于存储当前题目编号
 */

function showOptions(){
  var pageNumber = testPageNumber();
  for(var i=0;i<6;i++){
      $('.fiWhiteBoard').eq(i).show();
  }
  //在相应的fiWhiteBoard显示相应的选项
  for(var i=0;i<FI_OPTION[pageNumber].length;i++){
    $('.fiWhiteBoard').eq(i).find("span").html("");
      $('.fiWhiteBoard').eq(i).find("span").html(FI_OPTION[pageNumber][i]);
  }
  //把多余的whiteboard隐藏掉
  for(var i=FI_OPTION[pageNumber].length;i<6;i++){
    $('.fiWhiteBoard').eq(i).hide();
  }


  //显示所有分割线
  for(var i=0;i<5;i++){
      $('.fiLine').eq(i).show();
  }
  //把多余的分割线隐藏掉
  for(var i=FI_OPTION[pageNumber].length-1;i<5;i++){
    $('.fiLine').eq(i).hide();
  }
}

/**

     * 函数说明：页面初始化，将所有的答案数组清空为-1，所有的题目及相应的图片清空，所有选项设置为“未选择”
     * @param  pageNumber 用于存储当前题目编号
     * @param  i 遍历题目
     * @param  j 遍历题目当中的六个选项
 */
function fiInitial(){
  for(var i=0;i<8;i++){
    for(var j=0;j<6;j++){
      FI_RESULT[i][j] = -1; 
    }
  } 
  fiTestProNone();
  $(".fiRightLogo").attr("src","images/self-test-xxt/unchosenButton.png");
  $('#fiQuestiontext').html('');
  $('#fiQuestiontext').html(FI_TEXT[0][0]);
  $('#fiImage').attr("src",FI_IMAGE[0]);
  $('#fiChoice').html(FI_CHOICE[0]);
  $('#fiBtn1').attr('src',"images/self-test-xxt/last_nor.png");
  countDown.COUNT = 3;
}



