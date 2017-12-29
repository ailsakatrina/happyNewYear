/**
* @file 本js控制业务办理界面的翻页
* @author 许琇婷
* @version v0.1
*/

/**

     * 函数说明：由九宫格跳转到用户登录界面
     * @param  setJiugonggeDisplay 显示九宫格的首页
     * @param  businessHandling 业务办理页面的id
     * @param  usrLogInDisplay 显示用户登录界面
     * @param  selfTestNone 隐藏自我测试界面
 */
function businessHandlingDisplay(){
	setJiugonggeNone();
  	$("#businessHandling").fadeIn(500);
	usrLogInDisplay()
	selfTestNone();
}

/**

     * 函数说明：显示用户登录界面
     * @param  #usrLoginPage 用户登录界面的id
 */
 function usrLogInDisplay(){
	$("#usrLoginPage").fadeIn(500);
}

/**

     * 函数说明：隐藏用户登录界面
     * @param  #usrLoginPage 用户登录界面的id
 */
function usrLogInNone(){
	$("#usrLoginPage").fadeOut(10);
}






/**

     * 函数说明：由用户登录界面跳转到业务办理界面
     * @param  usrLogInNone 隐藏用户登录界面
     * @param  busiHandleDisplay 显示业务办理界面
 */
function BHDisplay(){
	usrLogInNone();
    busiHandleDisplay();
    infoModifyNone();
}



/**
     * 函数说明：显示业务办理界面
     * @param  BHPage 业务办理界面的id
 */
function busiHandleDisplay(){
	$("#BHPage").fadeIn(500);
}

/**
     * 函数说明：隐藏业务办理界面
     * @param  BHPage 业务办理界面的id
 */
function busiHandleNone(){
	$("#BHPage").fadeOut(10);
}


/**

     * 函数说明：由业务办理界面转到信息修改界面
     * @param  usrLogInNone 隐藏用户登录界面
     * @param  busiHandleDisplay 显示业务办理界面
 */
function infoModify(){
    busiHandleNone();
    infoModifyDisplay();
}

/**
     * 函数说明：显示信息修改界面
     * @param  BHPage 业务办理界面的id
 */
function infoModifyDisplay(){
    $("infoModifyPage").fadeIn(1000);
}

/**
     * 函数说明：显示信息修改界面
     * @param  BHPage 业务办理界面的id
 */
function infoModifyNone(){
    $("infoModifyPage").fadeOut(10);
}









/**
     * 函数说明：业务办理界面回到九宫格主页
     * @param  busiHandleNone 隐藏业务办理界面
     * @param  setJiugonggeDisplay 现实九宫格主页
 */
function BHReturn(){
	busiHandleNone();
  	setJiugonggeDisplay();
}

