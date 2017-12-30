/**
  * @file takenumber-token.js
  * @author zhoutaotao
*/

/**
  *@namespace
*/
var TakenumberToken={

    takenumberTokenValue:'',
    wechatTokenValue:'',
  /**
    * 获取叫号机token
  */
  getICCSToken:function(){
    var URL="http://112.74.34.118/interfaceapp/generateTokenResponse/";
    var start=new Date().getTime();
    $.ajax({
            type:"POST",
            data: {},
            url:URL,
            cache: false,
            dataType: "json",
            success: function(data, statues, xml){
              var end=new Date().getTime();
              console.log("response Time:"+(end-start));
                var result = data.result;
                if(result == 'success'){
                  msg = data.msg;
                  TakenumberToken.takenumberTokenValue = msg;
                  robotLog.sendInfoMsg(msg);
                }
            },
            error: function(){
                robotLog.sendErrorMsg(URL+" ajax通信失败!");
            }
        });
  },

/**
 * 获取WeChat token
 */
 getWeChatToken:function(){
  var URL="http://112.74.34.118/interfaceapp/generateWechatToken/";
  var start=new Date().getTime();
    $.ajax({
            type:"POST",
            data: {},
            url:URL,
            cache: false,
            dataType: "json",
            success: function(data){
              var end=new Date().getTime();
              console.log("response Time:"+(end-start));
                var result = data.result;
                if(result == '0'){
                  msg = data.msg;
                  TakenumberToken.wechatTokenValue=msg;
                  console.log(msg);
                  robotLog.sendInfoMsg(msg);
                }
            },
            error: function(){
                robotLog.sendErrorMsg(URL+" ajax通信失败!");
            }
        });
 },
}
