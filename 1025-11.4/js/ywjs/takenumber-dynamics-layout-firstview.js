/**
 * @file takenumber-dynamics-layout-firstview.js
 * @author zhoutaotao
 * @version v1.0
 */
/**
 * 叫号第一层菜单页面（动态显示业务菜单）
 * @namespace
 */
var TakenumberDynamicsFirstview = {
    /**
     * 清空显示界面
     */
    clearYWTab: function() {
        $("#DynamicsFirstviewLayout1").html("");
        $("#DynamicsFirstviewLayout2").html("");
    },
    /**
     * 有两行业务内容调整显示/隐藏布局
     */
    adjustYWTabNormal: function() {
        $("#DynamicsFirstviewLayout2").css("display", "block");
        $("#DynamicsFirstviewLayout1").css("top", "166px");
    },
    /**
     * 只有一行业务内容调整显示/隐藏布局
     */
    adjustYWTabOneCenter: function() {
        $("#DynamicsFirstviewLayout2").css("display", "none");
        $("#DynamicsFirstviewLayout1").css("top", "240px");
    },
    /**
     * 业务点击事件
     * @param {object} obj 业务按钮对象
     */
    YWonclick: function(obj) {
        var ywID = $(obj).attr("title");
        var businessName = $(obj).text();
        console.log("ywID:" + ywID);
        queueCodes = ywID;
        token = TakenumberToken.takenumberTokenValue;
        console.log("queueCodes:" + queueCodes);
        console.log("clientName:" + clientName);
        console.log("idType:" + idType);
        console.log("idNo" + idNo);
        console.log("phoneNumber:" + phoneNumber);
        console.log("counterNo:" + counterNo);
        console.log("token:" + token);

        if ('' == queueCodes) {
            var URL="http://112.74.34.118/interfaceapp/distributeCheck4ClientInfo/";
            //提交数据到接口distributeCheck4ClientInfo
            var start=new Date().getTime();
            $.ajax({
                type: "POST",
                // data: { "clientName": "警疗强", "idNo": "456689198006188313", "idType": "1", "phoneNumber": "", "counterNo": "110000069" },
                data: {
                    "clientName": clientName,
                    "idType": idType,
                    "idNo": idNo,
                    "phoneNumber": phoneNumber,
                    "counterNo": counterNo,
                    "token": token
                },
                url:URL,
                cache: false,
                dataType: "json",
                success: function(data) {
                    var end=new Date().getTime();
                    console.log("response Time:"+(end-start));
                    result = data.result;
                    if (result == "0") {
                        var msg = data.msg;
                        var start=new Date().getTime();
                        TakenumberDynamicsFirstview.distributeClient(msg);
                        var end=new Date().getTime();
                        console.log("response Time 接口2:"+(end-start));
                        robotLog.sendInfoMsg(msg);
                    } else {
                        console.log("获取业务外队列失败!");
                        console.log(result);
                        robotLog.sendErrorMsg(URL+data.msg);
                    }
                },
                error: function () {
                    console.log("ajax通信失败!");
                    robotLog.sendErrorMsg(URL+" ajax通信失败!");
                }
            });
        } else {
            var URL="http://112.74.34.118/interfaceapp/takeTickByQueueInfo/";

            //提交数据到接口takeTickByQueueInfo
            $.ajax({
                type: "POST",
                data: {
                    "clientName": clientName,
                    "idType": idType,
                    "idNo": idNo,
                    "phoneNumber": phoneNumber,
                    "counterNo": counterNo,
                    "queueCode": queueCodes,
                    "posTypeItems": "",
                    "token": token
                },
                url:URL,
                cache: false,
                dataType: "json",
                success: function(data) {

                    result = data.result;
                    if (result == "0") {
                        var msg = data.msg;
                        console.log("第三个接口返回：" + msg);

                        TakenumberDynamicsSecondview.distributeToWechat(msg);
                        reportStatisticsTakenumber.reportbusinessProcess([businessName]);
                        robotLog.sendInfoMsg(msg);
                    } else {
                        console.log("获取code失败!");
                        console.log(result);
                        robotLog.sendErrorMsg(URL+data.msg);
                    }
                },
                error: function () {
                    console.log("ajax通信失败!");
                    robotLog.sendErrorMsg(URL+" ajax通信失败!");
                }
            });
        }


        // this.distributeClient();
    },
    distributeClient: function(data) {
        data = JSON.parse(data);
        data = data.data;
        if (data.hasOwnProperty("ret")) {
            alert(data['msg']);
            robotLog.sendErrorMsg(data);
            return false;
        }
        if(data.returnCode!='life-00001'){
         console.log("数据异常");
         alert('数据异常');
         robotLog.sendErrorMsg(data);
         return false;
        }
        if(data.hasOwnProperty("toaPartyNo")){
            toaPartyNo=data['toaPartyNo'];
        }
        if(data.hasOwnProperty("toaPrivilegeLevel")){
            toaPrivilegeLevel=data['toaPrivilegeLevel'];
        }
        console.log("returnCode:" + data["returnCode"]);
        // var isPrint = "N";
        var isPrint = data["isPrintTicket"];
        var msg = data["message"];
        console.log("第二个接口isPrint: " + isPrint);
        if ("Y" == isPrint) {
            $("#yuyuequhao").fadeOut(10);
            queueId=data['queueId'];
            //需要提取票号，调用收集接口 ****************************
            if(data.hasOwnProperty('printQueueCode')){
              reportStatisticsTakenumber.reportTakeNumStatis(data['printQueueCode']);
            }


            //提交数据到微信接口
            if (data.hasOwnProperty('returnCode')) {
                var _returnCode = data['returnCode'];
                if (_returnCode != 'life-00001') {
                    alert("返回数据异常");
                    robotLog.sendErrorMsg(data);
                    return false;
                }
            }
            this.setTakeNumberFirstViewPageNone();
            TakenumberQRCode.setTakeNumberQRCodePageDisplay();
        } else {
            var posTypeItems = data["posTypeItems"];
            console.log(posTypeItems);
            // var posTypeItems = [{ 'postType': 'B008', 'description': '地址变更' }, { 'postType': 'B008', 'description': '电话变更' }, { 'postType': '0003', 'description': '电邮变更' }];
            TakenumberDynamicsSecondview.setTakeNumberSecondViewPageDisplay(posTypeItems);
            $('#yuyuequhao_sec').fadeOut();
            $('#yuyuequhao_chuji').fadeIn();

        }
    },
    /**
     * 添加第一行业务
     * @param {string} ywID 业务到ID
     * @param {string} ywDes 业务内容（描述）
     */
    addYWTabOne: function(ywID, ywDes) {
        var str = '';
        str += '<div title="' + ywID + '" style="width:240px;height:134px;margin-left:20px;margin-right:20px;display:inline-block;position:relative;" onclick="TakenumberDynamicsFirstview.YWonclick(this)">';
        str += '<img style="width:240px;height:134px;" src="images/yyqh/blyw.png"/>';
        str += this.adjustText(ywDes);
        str += '</div>';
        $("#DynamicsFirstviewLayout1").append(str);
    },
    /**
     * 添加第二行业务
     * @param {string} ywID 业务到ID
     * @param {string} ywDes 业务内容（描述）
     */
    addYWTabTwo: function(ywID, ywDes) {
        var str = '';
        str += '<div title="' + ywID + '" style="width:240px;height:134px;margin-left:20px;margin-right:20px;display:inline-block;position:relative;"onclick="TakenumberDynamicsFirstview.YWonclick(this)">';
        str += '<img style="width:240px;height:134px;" src="images/yyqh/blyw.png"/>';
        console.log(ywDes.length);
        str += this.adjustText(ywDes);
        str += '</div>';
        $("#DynamicsFirstviewLayout2").append(str);
    },
    /**
     * 显示调整字体布局
     * @param {string} ywDes 业务内容（描述）
     * @return {string} return 返回拼接好的布局字符串
     */
    adjustText: function(ywDes) {
        var strArr = ywDes.split("/");
        var str = '';
        if (strArr.length == 1) {
            str += '<div style="width:240px;;height:30px;position:absolute;left:0px;top:27px;text-align:center;"><font style="font-family:DongQing;font-size:36px;color:#fff;font-weight:bold;">';
            str += strArr[0];
            str += '</font></div>';
        } else if (strArr.length == 2) {
            str += '<div style="width:240px;;height:30px;position:absolute;left:0px;top:18px;text-align:center;"><font style="font-family:DongQing;font-size:36px;color:#fff;font-weight:bold;">';
            str += strArr[0];
            str += '</font></div>';
            str += '<div style="width:240px;;height:30px;position:absolute;left:0px;top:50px;text-align:center;"><font style="font-family:DongQing;font-size:36px;color:#fff;font-weight:bold;">';
            str += strArr[1];
            str += '</font></div>';
        }
        return str;
    },
    /**
     * 动态布局
     * @param {list} ywList  显示到业务内容列表 eg [{'ywContent':'办理业务','id':'0001'}]
     */
    layoutJS: function(ywList) {
        len = ywList.length;
        console.log('YWList.length', len);
        this.clearYWTab();
        if (len > 8) {
            len = 8;
        }
        if (len > 4) {
            this.adjustYWTabNormal();
            mid = len / 2;
            for (var i = 0; i < len; i++) {
                if (i < len - mid) { this.addYWTabOne(ywList[i]['queueCode'], ywList[i]['queueName']); } else {
                    this.addYWTabTwo(ywList[i]['queueCode'], ywList[i]['queueName']);
                }
            }
        } else {
            this.adjustYWTabOneCenter();
            for (var i = 0; i < len; i++) {
                this.addYWTabOne(ywList[i]['queueCode'], ywList[i]['queueName']);

            }
        }
    },
    /**
     * 第一级菜单页面-显示
     */
    setTakeNumberFirstViewPageDisplay: function(ywList = [{ 'queueCode': '办理业务', 'queueName': '0001' }, { 'queueCode': '缴纳保费', 'queueName': '0002' }, { 'queueCode': '自主打印', 'queueName': '0003' }]) {
        $("#yuyuequhao_sec").css("display", "block");
        this.layoutJS(ywList);
        RobotSDK.say({'text':speakContext.fwxz[parseInt(3*Math.random())]});
    },
    /**
     * 第一级菜单页面-隐藏
     */
    setTakeNumberFirstViewPageNone: function() {
        $("#yuyuequhao_sec").css("display", "none");
    },
};
