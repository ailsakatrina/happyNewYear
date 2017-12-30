/**
  * @file 机器人js SDK
  * @author zhoutaotao026@pingan.com.cn
  * @version 0.1
  */
var NAVIGATION_CODE = "startNavigation";
var NAVIGATION_CALLBACK_CODE = 'navigation_code';//导航回调码
var TTS_CODE = "startTTS";
var TTS_CALLBACK_CODE = "TTS_code";//tts语音回调码
var KEYWORD_CODE = "KeyWordsEventCallback";//关键词回调code
var KEYWORD_APPEND_CODE = "appendKeyWordsEvent";//添加关键词code
var KEYWORD_ADD_CODE = "addKeyWordsEvent";//添加关键词code
var KEYWORD_CLEAR_CODE = "clearKeyWordsEvent";//清楚关键词code
var NO_INTERACTION_CODE = "detectInteraction";//无交互回调
var NO_INTERACTION_CALLBACK_CODE = "NoInteraction_code";//无交互回调码
var ROBOT_ID_REQUEST_CODE = "requestRobotId";//机器人Id请求码
var ROBOT_ID_REPONSE_COCE = "setRobotId";//机器人Id回复码
(function(window) {
      /**
      * @author zhoutaotao026
      * @class
      * @description 机器人sdk类
      * @since version 0.1
      * @example RobotSDK.say({'text':"你好呀，我是机器人的SDK说话简单例子"})
      */
      window.RobotSDK = function(){
        return RobotSDK.fn._init();
      };
      // function RobotSDK(){
      //   return RobotSDK.fn.init();
      // }

      window.RobotSDK.fn = window.RobotSDK.prototype = {
          constructor: RobotSDK,
          /**
          * 内部初始化
          * @private
          */
          _init: function() {
              this.name = 'ssss';
              this.robotId = 'PingAnRobot008';
              this.navigationCallback = {};
              this.ttsCallback = {};//this.ttsCallback['successCallback']();
              this.keywordCallback={};//this.keywordCallback['12342233333']['successCallback']()
              this.interactionCallback = {};
              console.log('RobotSDK Init');
          },
          /**
           * webview调用接口
           * @param msg {string}  通信接口,json格式。
           * @example RobotSDK.setCommandInWeb('{"commandCode":"KeyWordsEventCallback","commandValue":"videoToPlayCallback"}');
           */
          setCommandInWeb:function(msg){
              var jsonObject = JSON.parse(msg);
              // alert(msg);
              if(jsonObject.commandCode == NAVIGATION_CODE){
                //{"commandCode":"startNavigation","commandValue":{"commandCode":"navigationCallbackgaitai"}}
                var _commandValueJson = jsonObject.commandValue;
                var _callbackCode = _commandValueJson.commandCode;
                if(_callbackCode == NAVIGATION_CALLBACK_CODE){
                  //低层接口之返回success,后续需要完善通信借口
                  this._getNavigationCallback()['successCallback']();
                }
              }else if (jsonObject.commandCode == TTS_CODE) {
                var _commandValueJson = jsonObject.commandValue;
                var _callbackCode = _commandValueJson.commandCode;
                if(_callbackCode == TTS_CALLBACK_CODE){
                  //低层接口之返回success,后续需要完善通信借口
                  this._getTTSCallback()['successCallback']();
                }
              }else if (jsonObject.commandCode == KEYWORD_CODE) {
                var _callbackCode = jsonObject.commandValue;
                //alert(_callbackCode);
                //低层接口之返回success,后续需要完善通信借口
                var getKeywordCallbackFun = this._getKeywordCallback(_callbackCode);
                 //alert(getKeywordCallbackFun);
                if(getKeywordCallbackFun.hasOwnProperty('successCallback')){
                  console.log(getKeywordCallbackFun['successCallback']);
                   //alert(getKeywordCallbackFun['successCallback']);
                  // alert(getKeywordCallbackFun['successCallback']);
                  getKeywordCallbackFun['successCallback']();
                }else {
                  console.log('callback has expire!!');
                  // alert('callback has expire!!');
                }
              }else if (jsonObject.commandCode == NO_INTERACTION_CODE) {
                var _commandValueJson = jsonObject.commandValue;
                var _callbackCode = _commandValueJson.commandCode;
                //alert(_callbackCode);
                //低层接口之返回success,后续需要完善通信借口
                var getNoInteractionCallbackFun = this._getNoInteractionCallback(_callbackCode);
                 //alert(getKeywordCallbackFun);
                if(getNoInteractionCallbackFun.hasOwnProperty('successCallback')){
                  console.log(getNoInteractionCallbackFun['successCallback']);
                   //alert(getKeywordCallbackFun['successCallback']);
                  // alert(getKeywordCallbackFun['successCallback']);
                  getNoInteractionCallbackFun['successCallback']();
                }else {
                  console.log('callback has expire!!');
                  // alert('callback has expire!!');
                }
              }else if (jsonObject.commandCode == ROBOT_ID_REPONSE_COCE) {
                  this.robotId = jsonObject.commandValue;
                  console.log('robotId:'+this.robotId);
                  //alert('robotId:'+this.robotId)
              }
            },
            /**
              * 底层调用webview的接口
              * @private
              * @param {string} msg 接口通信json字符串
            */
            doCommandInAndroid:function(msg){
              var message = msg.toString();
              try {
                window.JSInterface.doCommandInAndroid(message);
              } catch (e) {
                // console.error(e.name+":"+e.message);
              }
            },
            noticeServerCode:function(commandCode){
              var sendMsg = '{"commandCode":"'+commandCode+'"}';
              console.log(sendMsg);
              this.doCommandInAndroid(sendMsg);
            },
            noticeServerCodeAndValue:function(commandCode,commandValue){
              var sendMsg = '{"commandCode":"'+commandCode+'","commandValue":"'+commandValue+'"}';
              console.log(sendMsg);
              this.doCommandInAndroid(sendMsg);
             // alert(sendMsg);
            },
            /**
            * Navigation 导航模块
            */

            /**
              * 开始导航，有回调，内部使用
              * @private
              * @param {string} position 导航的目标位置
              * @param {string} callback 内部导航回调码
              */
            startNavigation:function(position,callback){
                var _isCallback = 1;
                var _commandCode = NAVIGATION_CODE;
                var _commandValue = '{\\"para\\":\\"'+position+'\\",\\"isCallback\\":\\"'+_isCallback+'\\",\\"callbackCode\\":\\"'+callback+'\\"}';
                this.noticeServerCodeAndValue(_commandCode,_commandValue);
            },
            /**
              * 开始导航，无回调
              * @private
              * @param {string} position 导航的目标位置
              */
            startNavigationWithoutCallback:function(position){
              var _isCallback = 0;
              var _commandCode= NAVIGATION_CODE;
              var _commandValue = '{\\"para\\":\\"'+position+'\\",\\"isCallback\\":\\"'+_isCallback+'\\"}';
              this.noticeServerCodeAndValue(_commandCode,_commandValue);
            },
            /**
            * Keywords 关键词匹配模块
            */
              /**
                * 生成关键词字符串
                * @private
                * @param {string} arr 要匹配的字符串 example "讲解|介绍&高峰会|会议&内容"
                * @param {string} callback 给底层发送的回调码 "xxxx"
                * @return {string} return 返回底层需要的关键词字符串格式
                */
            _generateQAConfig:function(arr,callback){
              var str = '';
              str += '(';
              str += '([';
              var huoci = arr.split("&");
              for(i = 0;i<huoci.length;i++){
                var yuci = huoci[i].split("|");
                if(yuci.length > 1){
                  for(j = 0;j<yuci.length;j++){
                    if(j == 0){
                      str += '(\\\"' + yuci[j] +'\\\"|' ;
                    }else if (j == yuci.length -1) {
                      str += '\\\"' + yuci[j] +'\\\")' ;
                    }else {
                      str += '\\\"' + yuci[j] +'\\\"|' ;
                    }
                  }
                  if(i < huoci.length-1){
                      str += ',';
                  }
                }else{
                  if(i < huoci.length-1){
                    str += '\\\"'+huoci[i]+'\\\",';
                  }else {
                    str += '\\\"'+huoci[i]+'\\\"';
                  }
                }
              }
              str += '],[\\\"'+callback+'\\\"]))';
              return str;
            },
            /**
              * 添加关键词匹配
              * @param {string} keyword 要匹配的字符串 example "讲解|介绍&高峰会|会议&内容"
              * @param {string} successCallback 匹配成功回调
              * @param {string} failureCallback 错误回调
              * @example
              * RobotSDK.addUserKeyWords({
              *
              *   'keyword': '讲解|介绍&口袋银行',
              *
              *   'successCallback': function(){
              *       console.log('successCallback')；
              *       },
              *
              *   'failureCallback': function(){
              *       console.log('failureCallback')；
              *     }
              * });
              */
            addUserKeyWords:function(param = {'keyword':'','successCallback':'','failureCallback':''},addOrappend=KEYWORD_APPEND_CODE){
              var _randomCallbackCode = this._genRandomNum(10);
              console.log('addUserKeyWords:callbackCode: '+_randomCallbackCode);
              var _successDict = {};
              if(param.hasOwnProperty("successCallback")){
                _successDict['successCallback'] = param.successCallback;
                this.keywordCallback[_randomCallbackCode] = _successDict;
                // this.keywordCallback[_randomCallbackCode]['successCallback']=param.successCallback;
              }else {
                _successDict['successCallback'] = function(){console.log('success callback');};
                this.keywordCallback[_randomCallbackCode] = _successDict;
              }
              if(param.hasOwnProperty("failureCallback")){
                this.keywordCallback[_randomCallbackCode]['failureCallback']=param.failureCallback;
              }else {
                this.keywordCallback[_randomCallbackCode]['failureCallback'] = function(){console.log('error callback');}
              }
              var _generateKeywordConfig = this._generateQAConfig(param.keyword,_randomCallbackCode);
              // var _generateKeywordConfig = this._generateQAConfig(param.keyword,_randomCallbackCode);
              //发送到机器人底层
              this.noticeServerCodeAndValue(addOrappend,_generateKeywordConfig);
            },
            /**
              * 清除关键词
              * @example RobotSDK.clearUserKeyWords();
              */
              clearUserKeyWords:function(){
                this.keywordCallback = {};
                //this.noticeServerCode(KEYWORD_CLEAR_CODE);
                this.addUserKeyWords({'keyword':'停止运动','successCallback':'function(){console.log("clear success callback")}','failureCallback':'function(){console.log("clear failure callback")}'},KEYWORD_ADD_CODE);

              },
        /**
          *
          * 导航到指定坐标位置、角度
          * @param {string} position 导航到指定坐标位置、角度 @example "X100Y200A90"
          * @param {string} successCallback 导航成功回调
          * @param {string} failureCallback 错误回调
          * @example
          * RobotSDK.moveTo({
          *
          *   'position': 'X100Y200A90',
          *
          *   'successCallback': function(){
          *       console.log('successCallback')；
          *       },
          *
          *   'failureCallback': function(){
          *       console.log('failureCallback')；
          *     }
          * });
          */
          moveTo:function(param = {'position':'X0Y0R0','successCallback':'function(){console.log("success callback")}','failureCallback':'function(){console.log("error callback")}'}){
            if(param.hasOwnProperty("successCallback")){
              this.navigationCallback['successCallback']=param.successCallback;
            }else {
              this.navigationCallback['successCallback'] = function(){console.log('success callback');}
            }
            if(param.hasOwnProperty("failureCallback")){
              this.navigationCallback['failureCallback']=param.failureCallback;
            }else {
              this.navigationCallback['failureCallback'] = function(){console.log('error callback');}
            }
            // console.log('successCallback:'+param.successCallback);
            //调用Navigation模块的startNavigation方法
            this.startNavigation(param.position,NAVIGATION_CALLBACK_CODE);
          },
          /**
            * 停止运动
            * @example RobotSDK.stopMotion();
            */
          stopMotion:function(){
            this.noticeServerCode("stopMotion");
            // this.say({'text':'现在停止运动！'});
          },
          _getNavigationCallback:function(){
            return this.navigationCallback;
          },
          /**
            *
            * 控制机器人说话
            * @param {string} text 机器人说话内容文本 @example "你好，世界"
            * @param {string} successCallback 说话完成成功回调
            * @param {string} failureCallback 错误回调
            * @example
            * RobotSDK.say({
            *
            *   'text': '你好，世界',
            *
            *   'successCallback': function(){
            *       console.log('successCallback')；
            *       },
            *
            *   'failureCallback': function(){
            *       console.log('failureCallback')；
            *     }
            * });
            */
          say:function(param = {'text':'','successCallback':'function(){console.log("success callback")}','failureCallback':'function(){console.log("error callback")}'}){
            if('' != param.text){
              if(param.hasOwnProperty("successCallback")){
                this.ttsCallback['successCallback']=param.successCallback;
              }else {
                this.ttsCallback['successCallback'] = function(){console.log('success callback');}
              }
              if(param.hasOwnProperty("failureCallback")){
                this.ttsCallback['failureCallback']=param.failureCallback;
              }else {
                this.ttsCallback['failureCallback'] = function(){console.log('error callback');}
              }
              //此处回调借口曾伟还未提供，暂时用无回调接口
              // this.startPlayVoice(param.text,TTS_CALLBACK_CODE);
              this._startTTS(param.text,TTS_CALLBACK_CODE);
            }
          },
          /**
            *
            * 机器人没有交互时回调
            * @param {string} time 没有交互到时间（单位秒） @example "20"
            * @param {string} successCallback 成功回调
            * @param {string} failureCallback 错误回调
            * @example
            * RobotSDK.getNoInteraction({
            *
            *   'time': '20',
            *
            *   'successCallback': function(){
            *       console.log('successCallback')；
            *       },
            *
            *   'failureCallback': function(){
            *       console.log('failureCallback')；
            *     }
            * });
            */
            addNoInteraction:function(param = {'time':'20','successCallback':'function(){console.log("success callback")}','failureCallback':'function(){console.log("error callback")}'}){
             var _randomCallbackCode = this._genRandomNum(10);
              console.log('addUserKeyWords:callbackCode: '+_randomCallbackCode);
              var _successDict = {};
              if(param.hasOwnProperty("successCallback")){
                _successDict['successCallback'] = param.successCallback;
                this.interactionCallback[_randomCallbackCode] = _successDict;
              }else {
                _successDict['successCallback'] = function(){console.log('success callback');};
                this.interactionCallback[_randomCallbackCode] = _successDict;
              }
              if(param.hasOwnProperty("failureCallback")){
                this.interactionCallback[_randomCallbackCode]['failureCallback']=param.failureCallback;
              }else {
                this.interactionCallback[_randomCallbackCode]['failureCallback'] = function(){console.log('error callback');}
              }
              //发送到机器人底层
              this._startNoInteraction(param.time,_randomCallbackCode);
            },
            /**
              * 删除无交互回调
              * @example RobotSDK.clearNoInteraction();
              */
              clearNoInteractionCallback:function(){
                this.interactionCallback = {};
              },

              /**
              * 发送命令到指定房间
              * @param {string} topic 房间名
              * @param {string} value 转发的命令
              * topic = "SZ_TVControl";
              * value = "{\"command\":[{\"commandCode\":\"web_open\",\"commandValue\":\"www.baidu.com\"}]}"
              *
            */
            pubToTopic:function(topic,value){
              commandCode = "pubToTopic";

              // commandValue = '{\\"topic\\":\\"'+topic+'\\",\\"value\\":\\"'+value+'\\"}';
              commandValue = '{\\"topic\\":\\"'+topic+'\\",\\"value\\":'+value+'}';
              // {
              // "commandCode":"pubToTopic",
              // "commandValue":{"topic":"SZ_TVControl",
              //                 "value":{"command":[{"commandCode":"web_open","commandValue":"www.baidu.com"}]}
              //                }
              // }
              this.noticeServerCodeAndValue(commandCode,commandValue);
            },
              /**
                * 获取机器人Id
                * @example RobotSDK.getRobotId();
                */
                getRobotId:function(){
                  this.noticeServerCode(ROBOT_ID_REQUEST_CODE);
                },
            _startNoInteraction:function(_time,callback){
              var _isCallback = 1;
              var _commandCode = NO_INTERACTION_CODE;
              var _commandValue = '{\\"para\\":\\"'+_time+'\\",\\"isCallback\\":\\"'+_isCallback+'\\",\\"callbackCode\\":\\"'+callback+'\\"}';
              this.noticeServerCodeAndValue(_commandCode,_commandValue);
            },
          _startTTS:function(_text,callback){
            var _isCallback = 1;
            var _commandCode = TTS_CODE;
            var _commandValue = '{\\"para\\":\\"'+_text+'\\",\\"isCallback\\":\\"'+_isCallback+'\\",\\"callbackCode\\":\\"'+callback+'\\"}';
            this.noticeServerCodeAndValue(_commandCode,_commandValue);
          },
          _getTTSCallback:function(){
            return this.ttsCallback;
          },
          _getKeywordCallback:function(_callbackCode){
            if(this.keywordCallback.hasOwnProperty(_callbackCode)){
              return this.keywordCallback[_callbackCode];
            }else {
              return {};
            }
          },
          _getNoInteractionCallback:function(_callbackCode){
            if(this.interactionCallback.hasOwnProperty(_callbackCode)){
              return this.interactionCallback[_callbackCode];
            }else {
              return {};
            }
          },

          /**
            * 公用函数模块
            */
            /**
              * 生成指定位数的随机数
              * @private
              * @param {int} n 随机数的位数
              * @return {string} 生成的指定位数随机数字符串
              */
            _genRandomNum:function(n){
              var rnd="";
              for(var i=0;i<n;i++)
              rnd+=Math.floor(Math.random()*10);
              return rnd;
            }

      };
      //window.RobotSDK.fn._init.prototype = window.RobotSDK.fn;
      // return RobotSDK;
      window.RobotSDK = window.RobotSDK.fn;
      window.RobotSDK._init();
  })(window)
