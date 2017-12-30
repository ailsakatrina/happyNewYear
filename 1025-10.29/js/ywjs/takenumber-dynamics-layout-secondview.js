/**
 * @file takenumber-dynamics-layout-secondview.js
 * @author zhoutaotao
 * @version v1.0
 */
/**
 * 叫号第二层菜单页面（动态显示业务菜单）
 * @namespace
 */
var TakenumberDynamicsSecondview = {
    businessSet: new Set(),
    businessNameSet:new Set(),
    /**
     * 清空显示界面
     */
    clearYWTab: function() {
        $("#DynamicsSecondviewLayout1").html("");
        $("#DynamicsSecondviewLayout2").html("");
    },
    /**
     * 有两行业务内容调整显示/隐藏布局
     */
    adjustYWTabNormal: function() {
        $("#DynamicsSecondviewLayout2").css("display", "block");
        $("#DynamicsSecondviewLayout1").css("top", "166px");
    },
    /**
     * 只有一行业务内容调整显示/隐藏布局
     */
    adjustYWTabOneCenter: function() {
        $("#DynamicsSecondviewLayout2").css("display", "none");
        $("#DynamicsSecondviewLayout1").css("top", "240px");
    },
    /**
     * 业务点击事件
     * @param {object} obj 业务按钮对象
     */
    YWonclick: function(obj) {
        $("div[title='0000']").children("img").attr("src", "images/yyqh/secondViewDefault.png");
        $("div[title='0000']").find(".dynamicFontClass").css("color", "#000");
        var ywID = $(obj).attr("title");
        var ywName = $(obj).text();
        console.log("ywID:" + ywID);
        var _imgSrc = $(obj).children("img").attr("src");
        if (_imgSrc.indexOf('Default') > -1) {
            $(obj).children("img").attr("src", "images/yyqh/secondViewClick.png");
            $(obj).find(".dynamicFontClass").css("color", "#fff");
            this.businessSet.add(ywID);
            this.businessNameSet.add(ywName);
            console.log('add set:' + ywID);
        } else if (_imgSrc.indexOf('Click') > -1) {
            $(obj).children("img").attr("src", "images/yyqh/secondViewDefault.png");
            $(obj).find(".dynamicFontClass").css("color", "#000");
            this.businessSet.remove(ywID);
            this.businessNameSet.remove(ywName);
            console.log('remove set:' + ywID);
        }
        console.log('businessSet:'+this.businessSet.show());
    },
    distributeToWechat: function(data) {
        data = JSON.parse(data);
        data = data.data;
        if (data.hasOwnProperty('returnCode')) {
            var _returnCode = data['returnCode'];
            if (_returnCode != 'life-00001') {
                alert("返回数据异常");
                robotLog.sendErrorMsg(data);
                return false;
            }
        }
        queueId=data['queueId'];
        //需要提取票号，调用收集接口 ****************************
        if(data.hasOwnProperty('printQueueCode')){
          reportStatisticsTakenumber.reportTakeNumStatis(data['printQueueCode']);
        }


        TakenumberDynamicsFirstview.setTakeNumberFirstViewPageNone();
        this.setTakeNumberSecondViewPageNone();
        TakenumberQRCode.setTakeNumberQRCodePageDisplay();
    },
    /**
     * 提交按钮事件
     */
    businessSubmitClick: function() {
        var _businessList = this.businessSet.getItemList();
        var _businessNameList = this.businessNameSet.getItemList();
        if (_businessNameList.length<1){
          _businessNameList.push('以上均不是');
        }
        var posTypeItems = _businessList.join(",");
        token = TakenumberToken.takenumberTokenValue;
        console.log("posTypeItems:" + posTypeItems);
        console.log("queueCodes:" + queueCodes);
        console.log("clientName:" + clientName);
        console.log("idType:" + idType);
        console.log("idNo" + idNo);
        console.log("phoneNumber:" + phoneNumber);
        console.log("counterNo:" + counterNo);
        console.log("token:"+token);
        //提交数据到接口takeTickByQueueInfo
        var URL="http://112.74.34.118/interfaceapp/takeTickByQueueInfo/";
        var start=new Date().getTime();
        $.ajax({
            type: "POST",
            data: { "clientName": clientName,
                    "idType": idType,
                    "idNo": idNo,
                    "phoneNumber": phoneNumber,
                    "counterNo": counterNo,
                    "queueCode": queueCodes,
                    "posTypeItems": posTypeItems,
                    "token":token,
                    "toaPartyNo":toaPartyNo,
                    "toaPrivilegeLevel":toaPrivilegeLevel
                },
            url: URL,
            cache: false,
            dataType: "json",
            success: function(data) {
                var end=new Date().getTime();
                console.log("response Time:"+(end-start));
                result = data.result;
                if (result == "0") {
                    var msg = data.msg;
                    console.log("第三个接口返回：" + msg);
                    TakenumberDynamicsSecondview.distributeToWechat(msg);
                    reportStatisticsTakenumber.reportbusinessProcess(_businessNameList);
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
        // this.distributeToWechat();
    },
    /**
     * 点击“以上均不是”业务事件
     * @param  {object} obj “以上均不是”按钮对象
     */
    clearYW:function(obj){
        var ywID = $(obj).attr("title");
        console.log("ywID:" + ywID);
        var _imgSrc = $(obj).children("img").attr("src");
        if (_imgSrc.indexOf('Default') > -1) {
            $(obj).children("img").attr("src", "images/yyqh/secondViewClick.png");
            $(obj).find(".dynamicFontClass").css("color", "#fff");
            $(obj).prevAll().children("img").attr("src", "images/yyqh/secondViewDefault.png");
            $(obj).prevAll().find(".dynamicFontClass").css("color", "#000");
            this.businessSet.clear();
            console.log('clear set');
            console.log('add set:' + ywID);
        } else if (_imgSrc.indexOf('Click') > -1) {
            $(obj).children("img").attr("src", "images/yyqh/secondViewDefault.png");
            $(obj).find(".dynamicFontClass").css("color", "#000");
            // this.businessSet.clear();
            // console.log('remove set:' + ywID);
        }
        console.log('businessSet:'+this.businessSet.show());
    },
    /**
     * 添加第一行业务
     * @param {string} ywID 业务到ID
     * @param {string} ywDes 业务内容（描述）
     */
    addYWTabOne: function(ywID, ywDes) {
        var str = '';
        if ('0000' == ywID) {
            str += '<div title="' + ywID + '" style="width:168px;height:96px;margin-left:20px;margin-right:20px;display:inline-block;position:relative;" onclick="TakenumberDynamicsSecondview.clearYW(this)">';
            str += '<img style="width:168px;height:96px;" src="images/yyqh/secondViewDefault.png"/>';
            str += this.adjustText(ywDes);
            str += '</div>';
        } else {
            str += '<div title="' + ywID + '" style="width:168px;height:96px;margin-left:20px;margin-right:20px;display:inline-block;position:relative;" onclick="TakenumberDynamicsSecondview.YWonclick(this)">';
            str += '<img style="width:168px;height:96px;" src="images/yyqh/secondViewDefault.png"/>';
            str += this.adjustText(ywDes);
            str += '</div>';
        }
        $("#DynamicsSecondviewLayout1").append(str);
    },
    /**
     * 添加第二行业务
     * @param {string} ywID 业务到ID
     * @param {string} ywDes 业务内容（描述）
     */
    addYWTabTwo: function(ywID, ywDes) {
        var str = '';
        if ('0000' == ywID) {
            str += '<div title="' + ywID + '" style="width:168px;height:96px;margin-left:20px;margin-right:20px;display:inline-block;position:relative;" onclick="TakenumberDynamicsSecondview.clearYW(this)">';
            str += '<img style="width:168px;height:96px;" src="images/yyqh/secondViewDefault.png"/>';
            str += this.adjustText(ywDes);
            str += '</div>';
        } else {
            str += '<div title="' + ywID + '" style="width:168px;height:96px;margin-left:20px;margin-right:20px;display:inline-block;position:relative;"onclick="TakenumberDynamicsSecondview.YWonclick(this)">';
            str += '<img style="width:168px;height:96px;" src="images/yyqh/secondViewDefault.png"/>';
            console.log(ywDes.length);
            str += this.adjustText(ywDes);
            str += '</div>';
        }
        $("#DynamicsSecondviewLayout2").append(str);
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
            str += '<div style="width:168px;height:24px;position:absolute;left:0px;top:30px;text-align:center;"><font class="dynamicFontClass" style="font-family:DongQing;font-size:24px;color:#000;font-weight:bold;">';
            str += strArr[0];
            str += '</font></div>';
        } else if (strArr.length == 2) {
            str += '<div style="width:168px;height:24px;position:absolute;left:0px;top:18px;text-align:center;"><font class="dynamicFontClass" style="font-family:DongQing;font-size:24px;color:#000;font-weight:bold;">';
            str += strArr[0];
            str += '</font></div>';
            str += '<div style="width:168px;height:24px;position:absolute;left:0px;top:50px;text-align:center;"><font class="dynamicFontClass" style="font-family:DongQing;font-size:24px;color:#000;font-weight:bold;">';
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
        if (len > 3) {
            this.adjustYWTabNormal();
            mid = len / 2;
            for (var i = 0; i < len; i++) {
                if (i < len - mid) { this.addYWTabOne(ywList[i]['postType'], ywList[i]['description']); } else {
                    this.addYWTabTwo(ywList[i]['postType'], ywList[i]['description']);
                }
            }
            this.addYWTabTwo("0000", "以上均不是");
        } else {
            this.adjustYWTabOneCenter();
            for (var i = 0; i < len; i++) {
                this.addYWTabOne(ywList[i]['postType'], ywList[i]['description']);
            }
            this.addYWTabOne("0000", "以上均不是");
        }

    },
    /**
     * 第二级菜单页面-显示
     */
    setTakeNumberSecondViewPageDisplay: function(ywList = []) {
        $("#yuyuequhao_chuji").css("display", "block");
        this.layoutJS(ywList);
        RobotSDK.say({'text':speakContext.blyw[parseInt(3*Math.random())]});
    },
    /**
     * 第二级菜单页面-隐藏
     */
    setTakeNumberSecondViewPageNone: function() {
        $("#yuyuequhao_chuji").css("display", "none");
        this.businessSet.clear();
        this.businessSet.show();
    },
};
