/**
* @file 本js控制自我测试首页界面的翻页
* @author 许琇婷
* @version v0.1
*/


/**

     * 函数说明：在点击强迫症测试之后，由自我测试界面跳转到强迫症测试界面
     * @param selfTestHomeNone 隐藏自我测试界面
     * @param ocdTestDisplay 显示强迫症测试界面
 */
function ocdTest(){
    selfTestHomeNone();
    ocdTestDisplay();
}

/**

     * 函数说明：显示自我测试界面
     * @param  #selfTestFirstPage 自我测试界面的id
 */
function selfTestHomeDisplay(){
	$("#selfTestFirstPage").fadeIn(500);
}

/**

     * 函数说明：隐藏自我测试界面
     * @param  #selfTestFirstPage 自我测试界面的id
 */
function selfTestHomeNone(){
	$("#selfTestFirstPage").fadeOut(2);
	RobotSDK.clearUserKeyWords();
}

/**

     * 函数说明：显示强迫症测试界面
     * @param  #ocdTestPage 强迫症测试界面的id
     * @param  initial 初始化所有记录答案的数组为-1，将所有对号显示为“未选择”,显示第一题，且显示测试部分，隐藏答案部分
 */
function ocdTestDisplay(){
	$("#ocdTestPage").fadeIn(500);
  initial();
}

/**

     * 函数说明：隐藏强迫症测试界面
     * @param  #ocdTestPage 强迫症测试界面的id
 */
function ocdTestNone(){
	$("#ocdTestPage").fadeOut(10);
	RobotSDK.clearUserKeyWords();
}


/**

     * 函数说明：在点击家庭保障测试之后，由自我测试界面跳转到家庭保障测试界面
     * @param selfTestHomeNone 隐藏自我测试界面
     * @param fiTestDisplay 显示家庭保障测试界面
 */
function familyInsuranceTest(){
  selfTestHomeNone();
  fiTestDisplay();
}

/**

     * 函数说明：显示家庭保障测试界面
     * @param  #fiTestPage 家庭保障测试界面的id
     * @param  fiInitial 页面初始化，将所有的答案数组清空为-1，所有的题目及相应的图片清空，所有选项设置为“未选择”
     * @param  showOptions 检测当前为第几页之后，导入相应题目的选项
 */
function fiTestDisplay(){
  $("#fiTestPage").fadeIn(500);
  fiInitial();
  showOptions();
}

/**

     * 函数说明：隐藏家庭保障测试界面
     * @param  #fiTestPage 家庭保障测试界面的id
 */
function fiTestNone(){
  $("#fiTestPage").fadeOut(10);
  RobotSDK.clearUserKeyWords();
}






/**

     * 函数说明：由自我测试界面/强迫症测试界面/家庭保障测试界面返回主界面
     * @param  selfTestNone 隐藏自我测试界面
     * @param  setJiugonggeDisplay 显示九宫格的首页
 */
function selfTestReturn(){
  selfTestNone();
  setJiugonggeDisplay();
}

/**

     * 函数说明：显示自我测试界面
     * @param  setJiugonggeNone 隐藏九宫格首页
     * @param  #selfTestPage 自我测试界面的id
     * @param  selfTestHomeDisplay 显示自我测试界面
     * @param  ocdTestNone 先隐藏强迫症测试界面
     * @param  fiTestNone 先隐藏家庭保障测试界面
 */
function selfTestDisplay(){
	setJiugonggeNone();
  $("#selfTestPage").fadeIn(500);
	selfTestHomeDisplay();
  ocdTestNone();
  fiTestNone();
}

/**
     * 函数说明：隐藏自我测试界面
     * @param  #selfTestPage 自我测试界面的id
 */
function selfTestNone(){
  	$("#selfTestPage").fadeOut(10);
  	RobotSDK.clearUserKeyWords();

}












