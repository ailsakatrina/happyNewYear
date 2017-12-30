/**
 * 金管家二维码界面js文件
 * @author : zhoutaotao
 * @file : recommendQRcode.js
 * @date : 2017-08-28
 */
 var recommendQRcode = {
   WAITTIMEOUTTIME:20000,//二维码出现时间
   WAITTIMEOUTOBJ:new Object(),//二维码定时器对象
   SCAN_QR_TIME:1000,//二维码轮询是否被扫描时间
   SCAN_TIMER_OBJ:new Object(),//二维码轮询定时器对象
   isNeedIntercept : 0,//拦截后NLPReply行为（唱歌/笑话等）
   QRcodeParaType:'',//二维码标识
   /**
    * 界面显示
    * @param {int} isNeedIntercept 是否需要拦截
    * @param {string} action  需要拦截情况下，拦截后需要执行的命令
    */
    setRecommendQRcodePageDisplay:function(isNeedIntercept=0){
      this.resetParaTypeValue();
      this.startQRcodeTimer();
      this.startPollQRcodeTimer();
      $("#JGJQRcode").css("display","block");
      ReportQRCode.reportQRChange(scanQRJGJCode,'pinganjinguanjia',this.getRecommendQRParaType());
      if(1 == isNeedIntercept){
        this.isNeedIntercept = 1;
      }
      console.log('this.isNeedIntercept:'+this.isNeedIntercept);
      reportStatistics.post2ReportStatistics('jinguanjia');
    },
    /**
     * 界面隐藏
     */
     setRecommendQRcodePageNone:function(){
       this.clearQRcodeTimer();
       this.clearPollQRcodeTimer();
       this.isNeedIntercept = 0;
       $("#JGJQRcode").css("display","none");
     },
     /**
     * 二维码取消按钮事件
     */
     cancleBtnEvent:function(){
       this.noticeRobotQRScanComplete();
       this.setRecommendQRcodePageNone();
     },
     /**
      * 定时二维码消失
     */
     startQRcodeTimer:function(){
       this.clearQRcodeTimer();
       this.WAITTIMEOUTOBJ = window.setTimeout("recommendQRcode.setRecommendQRcodePageNone()",recommendQRcode.WAITTIMEOUTTIME);
     },
     /**
     * 清除二维码消失定时器
     */
     clearQRcodeTimer:function(){
       window.clearTimeout(this.WAITTIMEOUTOBJ);
     },
     /**
       * 二维码是否被扫描
     */
     isScanQR:function(){
       var _paraTypeValue =  this.getRecommendQRParaType();
       $.ajax({
               type:"POST",
               data: {'paraType':_paraTypeValue},
               url: "http://112.74.34.118/interfaceapp/getAndResetParaValue/",
               cache: false,
               dataType: "json",
               success: function(data, statues, xml){
                   var result = data.result;
                   if(result == 'success'){
                     console.log("查询:"+data.msg);
                     if(data.msg == '0'){
                       recommendQRcode.SCAN_TIMER_OBJ = window.setTimeout("recommendQRcode.isScanQR()",recommendQRcode.SCAN_QR_TIME);
                     }else if (data.msg == '1') {
                       console.log("扫描成功");
                       console.log('this.isNeedIntercept:'+recommendQRcode.isNeedIntercept);
                       recommendQRcode.noticeRobotQRScanComplete();
                       recommendQRcode.setRecommendQRcodePageNone();
                      //  RobotSDK.say({'text':'扫描完成'});
                       reportStatistics.post2ReportStatistics('pinganjinguanjiaQR');


                     }
                   }else if(result == 'error'){
                       console.log("扫描失败");
                   }
               },
               error: function(){
                   // alert("ajax通信失败");
               }
           });
     },
     /**
      * 重置金管家二维码扫描值
     */
     resetParaTypeValue:function(){
       _paraTypeValue = this.getRecommendQRParaType();
       console.log('reset paraType:'+_paraTypeValue);
       $.ajax({
               type:"POST",
               data: {'paraType':_paraTypeValue,'paraValue':'0','paraNotes':'jinguanjiaQR'},
               url: "http://112.74.34.118/interfaceapp/setParaValue/",
               cache: false,
               dataType: "json",
               success: function(data, statues, xml){
                   var result = data.result;
                   if(result == 'success'){
                       console.log('金管家二维码值重置成功');
                   }else{
                     console.log("金管家二维码值重置失败");
                   }

               },
               error: function(){
                   // alert("ajax通信失败");
               }
           });
     },
     /**
     * 开始二维码轮询
     */
     startPollQRcodeTimer:function(){
       this.clearPollQRcodeTimer();
       this.isScanQR();
     },
     /**
     * 清除二维码轮询定时器对象
     */
     clearPollQRcodeTimer:function(){
       window.clearTimeout(this.SCAN_TIMER_OBJ);
     },
     /**
     * 获取金管家二维码到 paraType
     */
     getRecommendQRParaType:function(){
       if('' == this.QRcodeParaType){
         this.QRcodeParaType = RobotSDK.robotId+'_jinguanjiaQR';
       }
       return this.QRcodeParaType;
     },
     /**
      * 拦截二维码消失通知机器人
     */
     noticeRobotQRScanComplete:function(){
       if(1 == recommendQRcode.isNeedIntercept){
         RobotSDK.noticeServerCode("QRcodeScanComplete");
       }
     }

 };
