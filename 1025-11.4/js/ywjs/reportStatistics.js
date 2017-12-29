/**
 * @file reportStatistics.js
 * @author yanhairui
 * @version v1.0
 */
 /**
  * 产品推荐报表统计---发送post到报表接口
  * @namespace
  */

  var reportStatistics = {
    /**
     * 报表数据收集
     * @param {object} itemType 收集对象
     */
    post2ReportStatistics: function(itemType){
      if(!reportItem.hasOwnProperty(itemType)){
        return false;
      }
      _statementType = reportItem[itemType][2];
      _statementDescription = reportItem[itemType][3];
      _type = reportItem[itemType][0];
      _typeDescripton =  reportItem[itemType][1];

      var _robotId = RobotSDK.robotId;
      //alert(_robotId);
      $.ajax({
               //提交数据的类型 POST GET
               type:"POST",
               async:"true",
               //提交的网址
              //  url:"http://127.0.0.1:8000/interfaceapp/generateTokenResponse/",
              //  url:"http://192.168.4.123:8000/reportapp/statementFormStatistics/",
              url:"http://112.74.34.118:12350/reportapp/statementFormStatistics/",
               //提交的数据
               data:{'robotID':_robotId,'type':_type,'typeDescripton':_typeDescripton, 'statementType':_statementType,'statementDescription':_statementDescription},
               //返回数据的格式
               datatype: "json",//"xml", "html", "script", "json", "jsonp", "text".
               //成功返回之后调用的函数
               success:function(data){
              //$("#msg").html(decodeURI(data));
                //alert(data.msg);
                console.log(data.msg);

               },
               //调用执行后调用的函数
               //调用出错执行的函数
               error: function(){
                   //请求出错处理
                  // alert("error");
                 console.log("error");
               }
            });
    },


  };
