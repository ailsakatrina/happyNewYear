/**
 * @file reportStatistics-takenumber.js
 * @author yanhairui
 * @version v1.0
 */
 /**
  * 产品推荐报表统计---发送post到报表接口
  * @namespace
  */

  var reportStatisticsTakenumber = {
    /**
     * 取号报表数据收集
     * @param {string} item 收集对象
     */
     reportTakeNumStatis: function(item){
       console.log("item is " + item);
       var itemHeader = item.substr(0, 1);
       console.log('叫号类型： ' + itemHeader);
       if('S' == itemHeader){
         reportStatistics.post2ReportStatistics('ItemS');
         console.log("是： S 客户");
       }else if ('A' ==  itemHeader) {
         reportStatistics.post2ReportStatistics('ItemA');
         console.log("是： A 客户");
       }else if ('C' == itemHeader) {
         reportStatistics.post2ReportStatistics('ItemV');
         console.log("是： V 客户");
       }

     },
     /**
     * 处理业务办理报表
     */
     reportbusinessProcess:function(businessList){
         for (var i=0;i<businessList.length;i++)
          {
            reportStatistics.post2ReportStatistics(businessList[i]);
            console.log(businessList[i]);
          }
     },
  }
