/**
 * 发送日志消息到监控系统
 * @authors FanBoyi (you@example.org)
 * @date    2017-08-24 11:33:54
 * @version 1.0
 */
var robotLog={

	_sendMsg:function (type,msg) {
		var start = new Date().getTime();
		  $.ajax({
            type: "POST",
            data: { "robotID":RobotSDK.robotId,
                    "logType":type,
                    "logContext":msg,
                  },
            url: "http://112.74.34.118:12352/monitorapp/updateRealtimeLog/",
            cache: false,
            dataType: "json",
            success: function(data) {
            	var end = new Date().getTime();
            	console.log("response Time:"+(end-start));
                result = data.result;
                console.log(result);
                if (result == "0") {
                    
                    console.log(msg);
                }else {
                    console.log("获取返回信息异常");
                }
            },
            error: function () {
            	console.log("ajax通信异常")
            }
        });
		
	},

	sendInfoMsg:function (msg) {
		this._sendMsg('js_info',msg);
	},

	sendWarningMsg:function (msg) {
		this._sendMsg('js_warning',msg);
	},

	sendErrorMsg:function (msg) {
		this._sendMsg('js_error',msg);
	},	
};
