/**
 * @file takenumber-qrcode.js
 * @author zhoutaotao
 * @version 0.1
 */
/**
 * 发送消息模块
 * @namespace
 * @example
 * TakenumberQRCode.init('qrcodeDiv');
 */
var TakenumberQRCode = {
    option: Object,
    timeoutObj: Object,
    waitTimeoutObj: Object,
    QUERY_TIME: 1000,
    WAIT_TIME: 30000,
    printCode: '',
    pinCode: '',
    msg: '',
    /**
     * 二维码初始化函数
     * @param {string} id 二维码绑定到div标签id
     * @example
     * TakenumberQRCode.initQRCode('qrcodeDiv','152','152')；
     */
    initQRCode: function(id, width = '152', height = '152') {
        this.option = new QRCode(document.getElementById(id), {
            text: '0000',
            width: width,
            height: height,
            colorDark: '#000000',
            colorLight: '#ffffff',
            correctLevel: QRCode.CorrectLevel.M
        });
    },
    /**
     * 设置二维码显示内容
     * @param {string} content 二维码显示内容
     * @example
     * TakenumberQrcode.setQRContent('http://www.baidu.com')；
     */
    setQRContent: function(content) {
        this.option.makeCode(content);
    },
    /**
     * 轮询二维码是否扫描
     * @param {string} printCode 小票号
     */
    isScanQR: function() {
        var URL="http://112.74.34.118/interfaceapp/queryCounterQueueInfoForOpenId/";
        var start=new Date().getTime();
        $.ajax({
            type: "POST",
            data: { 'queueId': queueId, "token": TakenumberToken.takenumberTokenValue },
            url: URL,
            cache: false,
            dataType: "json",
            success: function(data) {
                var end=new Date().getTime();
                console.log("response Time:"+(end-start));
                console.log(data);
                var result = data.result;
                if (result == '0') {
                    console.log("查询:" + data.msg);
                    var msg = data.msg;
                    robotLog.sendInfoMsg(msg);
                    if (-1 == msg.indexOf('openId')) {
                        TakenumberQRCode.timeoutObj = window.setTimeout("TakenumberQRCode.isScanQR()", TakenumberQRCode.QUERY_TIME);
                        console.log("don't have openId");
                    } else if (msg.indexOf('openId') > 0) {
                        console.log("扫描成功");
                        TakenumberQRCode.setTakeNumberQRCodePageNone();
                        TakenumberQRCodeDone.setTakeNumberQRCodeDonePageDisplay();
                        RobotSDK.say({ 'text': speakContext.smewmwc[parseInt(3 * Math.random())] });
                    }
                } else if (result == '1') {
                    console.log("扫描失败");
                    robotLog.sendErrorMsg(URL+result);
                }
            },
            error: function() {
                robotLog.sendErrorMsg(URL+" ajax通信失败");
            }
        });
    },
    /**
     * 没人扫码，默认等待一定时间二维码消失
     */
    waitTimeoutFun: function() {
        TakenumberQRCode.setTakeNumberQRCodePageNone();
        TakenumberQRCodeDone.setTakeNumberQRCodeDonePageDisplay();
    },
    /**
     * 二维码页面显示
     * @param {object} data 取号接口返回到json数据
     */
    setTakeNumberQRCodePageDisplay() {
        var URL="http://112.74.34.118/interfaceapp/getWetchatQRCodeUrl/";

        $('#takenumberQRCode').html("请稍后。。。。。。");
        var start=new Date().getTime();
        $.ajax({
            type: "POST",
            data: {
                "weappNo": weappNo,
                "scenceid": queueId,
                "expiresec": expiresec,
                "token": TakenumberToken.wechatTokenValue
            },
            url:URL,
            cache: false,
            dataType: "json",
            success: function(data) {
                var end=new Date().getTime();
                console.log("response Time:"+(end-start));
                console.log(data);
                result = data.result;
                if (result == "0") {
                    var msg = data.msg;
                    console.log("msg：" + msg);
                    robotLog.sendInfoMsg(msg);
                    $('#takenumberQRCode').html('<img id="QRcodeImg" src="' + msg + '" style="width: 100%;height: 100%">');
                } else {
                    console.log("获取code失败!");
                    console.log(result);
                    robotLog.sendErrorMsg(URL+result);
                }
            },
            error: function() {
                robotLog.sendErrorMsg(URL+" ajax通信失败");
            }
        });
        $("#yuyuequhao_erweima").css("display", "block");
        console.log('startScanQRStatus');
        this.timeoutObj = window.setTimeout("TakenumberQRCode.isScanQR()", this.QUERY_TIME);
        this.waitTimeoutObj = window.setTimeout("TakenumberQRCode.waitTimeoutFun()", this.WAIT_TIME);

        RobotSDK.say({ 'text': speakContext.smewm[parseInt(3 * Math.random())] });
    },
    /**
     * 二维码页面隐藏
     */
    setTakeNumberQRCodePageNone(content) {
        $("#yuyuequhao_erweima").css("display", "none");
        console.log('clearScanQRStatus');
        window.clearTimeout(this.timeoutObj);
        window.clearTimeout(this.waitTimeoutObj);
    },
    /**
     * 二维码页面隐藏
     */
    exitToHome() {
        window.clearTimeout(this.timeoutObj);
        window.clearTimeout(this.waitTimeoutObj);
        this.setTakeNumberQRCodePageNone();
        setJiugonggeDisplay();
    },
};