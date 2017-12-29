/**
* @file 本js实现点击白色条形框，后面出现对勾图形，并将结果记入每一页的RESULT当中，同时录入全局变量用于统计答案个数
* @author 许琇婷
* @version v0.1
*/

/**

     * 函数说明：用户勾选答案，用RESULT记录每一题的选项，同时将选项计入全局变量OPTION_TEMP用于统计答案
     * @param  {全局变量}  OPTION_TEMP  OPTION_TEMP记录当前选项，在进入下一页之前录入OPTION数组相应选项
     * @param  index 用于存储当前题目编号
     * @param  question 用于存储当前题目内容，只后与题库进行比对
     * @param  i 第一题到第18题的索引
 */
function chooseAnswer(obj){
  /*$('.whiteBoard').click(function(){*/
  	//每次触发点击事件前，所有的选项都先清空
    $(".rightLogo").attr("src","images/self-test-xxt/unchosenButton.png");
    //点击的选项后面显示‘对号’
    $(obj).find(".rightLogo").attr("src","images/self-test-xxt/chosenButton.png");

    
    OPTION_TEMP = $(obj).attr("value");
    
  	//判断当前是第几题，把相应的答案记录在每一道题中RESULT[]
  	var index = ocdTestPageNumber();
  	
  	
  	RESULT[index] = $(obj).attr("value");//记录相应答案
    
 /* });*/
}

