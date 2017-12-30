/**
 * @file reportItem.js
 * @author yanhairui
 * @version v1.0
 */
 /**
  * 产品推荐报表统计---元素id与报表统计type和itemType
  * @namespace
  */
// eg："pinganfu":["checkProduct","check_PAF"], 元素id是pinganfu，type是checkProduct，itemType是check_PAF
  var reportItem = {
    "shaoerpinganfu":["checkProduct","产品查看","check_SEPAF","少儿平安福"],
    "pinganfu":["checkProduct","产品查看","check_PAF","平安福"],
    "anxinbao":["checkProduct","产品查看","check_AXB","安鑫宝"],
    "zhinengxing":["checkProduct","产品查看","check_ZNX","智能星"],
    "jinguanjia":["checkProduct","产品查看","check_JGJ","金管家"],

    "one":["checkActivity","活动查看","check_MTJS","幕天捐书"],
    "two":["checkActivity","活动查看","check_SNDSS","少年读书说"],
    "three":["checkActivity","活动查看","check_MDWDP","门店温度篇"],
    "four":["checkActivity","活动查看","check_MDJZP","门店价值篇"],
    "ItemA":["callDiversion","分流叫号","itemA","A类客户"],
    "ItemS":["callDiversion","分流叫号","ItemS","S类客户"],
    "ItemV":["callDiversion","分流叫号","itemV","V类客户"],

    "地址变更":["businessProcess","业务办理","addressChange","地址变更"],
    "电邮变更":["businessProcess","业务办理","emailChange","电邮变更"],
    "电话变更":["businessProcess","业务办理","phoneChange","电话变更"],
    "账户变更":["businessProcess","业务办理","accountChange","账户变更"],
    "保单贷款":["businessProcess","业务办理","policyLoan","保单贷款"],
    "部分领取":["businessProcess","业务办理","partialCollection","部分领取"],
    "累计红利领取":["businessProcess","业务办理","bonusCollection","累计红利领取"],
    "其他活动":["businessProcess","业务办理","ohters","其他活动"],
    "以上均不是":["businessProcess","业务办理","allNot","以上均不是"],
    "交纳保费":["businessProcess","业务办理","paidPremium","交纳保费"],

    "shaoerpinganfuQR":["ScanQRProduct","产品二维码扫描","ScanQR_SEPAF","少儿平安福"],
    "pinganfuQR":["ScanQRProduct","产品二维码扫描","ScanQR_PAF","平安福"],
    "anxinbaoQR":["ScanQRProduct","产品二维码扫描","ScanQR_AXB","安鑫宝"],
    "zhinengxingQR":["ScanQRProduct","产品二维码扫描","ScanQR_ZNX","智能星"],
    "pinganjinguanjiaQR":["ScanQRProduct","产品二维码扫描","ScanQR_JGJ","金管家"],
    "twoQR":["ScanQRActivity","活动二维码扫描","ScanQR_ZNX","少儿读书说"],

  }
