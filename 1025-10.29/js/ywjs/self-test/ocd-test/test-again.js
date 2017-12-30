/**
* @file 本js实现重新做题
* @author 许琇婷
* @version v0.1
*/


/**
     * 函数说明：答案部分用户点击重新测试，则重新刷新页面即可
     * @param  answerNone 隐藏强迫症测试的答案部分
     * @param  questionDisplay 显示强迫症测试的题目部分
     * @param  initial 初始化所有记录答案的数组为-1，将所有对号显示为“未选择”,显示第一题，且显示测试部分，隐藏答案部分
 */
function testAgain(){
	answerNone();
	questionDisplay();
	initial();
	$(".rightLogo").attr("src","images/self-test-xxt/unchosenButton.png");
  	
	
}

/**
     * 函数说明：显示强迫症测试的答案部分
 */
function answerDisplay(){
	$('#answerPage').fadeIn(1000);
}

/**
     * 函数说明：隐藏强迫症测试的答案部分
 */
function answerNone(){
	$('#answerPage').fadeOut(10);
}

/**
     * 函数说明：显示强迫症测试的题目部分
 */
function questionDisplay(){
	$('#questionPage').fadeIn(1000);
}

/**
     * 函数说明：隐藏强迫症测试的题目部分
 */
function questionNone(){
	$('#questionPage').fadeOut(10);
}

