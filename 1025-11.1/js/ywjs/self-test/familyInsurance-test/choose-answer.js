/**
* @file 本js实现点击白色条形框，后面出现对勾图形，将答案记录在相应的FI_RESULT数组当中
        需要判断是单选题还是多选题：若是多选，每个选项点击可以实现toggle的效果；若是单选每道题只能选一题
* @author 许琇婷
* @version v0.1
*/

/**

     * 函数说明：fiWhiteBoard onclick点击事件：后面出现对勾图形，将答案记录在相应的FI_RESULT数组当中
                 需要判断是单选题还是多选题：若是多选，每个选项点击可以实现toggle的效果；
                                             若是单选每道题只能选一题
     * @param  obj 被点击的fiWhiteBoard
     * @param  pageNumber 用于存储当前题目编号
     * @param  optionMethod 用于判断当前题目是单选还是多选
     * @param  currentResult数组用于暂时存储本道题目6个选项的编号
     
     * @param  chooseStage 判断当前选项是“已选择”还是“未选择”
 */
function fiChooseAnswer(obj){
    // var obj = new Object();
    
  /*$('.fiWhiteBoard').click(function(){*/
    var pageNumber = testPageNumber();//获取当前页码
    var optionMethod = FI_TEXT[pageNumber][1];//获取当前是多选题还是单选题

    var currentResult = $(obj).attr("value");//获取当前选项编号
    
    if(optionMethod == 0){ //单选
      //每次触发点击事件前，所有的选项都先清空
          $(".fiRightLogo").attr("src","images/self-test-xxt/unchosenButton.png");
          //点击的选项后面显示‘对号’
          $(obj).find(".fiRightLogo").attr("src","images/self-test-xxt/chosenButton.png"); 
     
          //单选题必须先清空其它选项的答案
          for(var j=0;j<6;j++){
            FI_RESULT[pageNumber][j] = -1;
          }
          FI_RESULT[pageNumber][currentResult] = 0;//将当前答案赋值给相应数组

     }

  
    else{//多选
      var chooseStage = $(obj).find(".fiRightLogo").attr('src');
      /*alert(chooseStage);*/
      if(chooseStage=="images/self-test-xxt/unchosenButton.png"){
        $(obj).find(".fiRightLogo").attr("src","images/self-test-xxt/chosenButton.png");
        FI_RESULT[pageNumber][currentResult] = 0;//将当前答案赋值给相应数组
      }
      else{
         $(obj).find(".fiRightLogo").attr("src","images/self-test-xxt/unchosenButton.png");
         FI_RESULT[pageNumber][currentResult] = -1;//将当前答案赋值给相应数组
      }
    } 


    
    /*var txt = "";
    for(var j=0;j<6;j++){
       //记录相应答案
      txt += FI_RESULT[pageNumber][j]+"<br>";
    }alert(txt);*/


    
  /*});*/
}







    
    /*OPTION_TEMP = $(this).attr("value");
    
  	//判断当前是第几题，把相应的答案记录在每一道题中RESULT[]
  	var index = '';//初始化题目编号
  	
  	var question = document.getElementById('text').innerHTML;//获取当前网页的题目内容，以此来判断是第几题
  	//将当前内容与题库TEXT[]进行比对，判断是第几题
  	for(var i=0; i<TEXT.length; i++){
    	if(question == TEXT[i]){
      	index = i;
    	}
  	}
  	RESULT[index] = $(this).attr("value");//记录相应答案
    */
 

