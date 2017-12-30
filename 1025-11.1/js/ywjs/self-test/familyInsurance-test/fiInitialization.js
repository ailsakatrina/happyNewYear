/**
* @file 本js实现页面加载后的初始化，包括8道题的题库以及相应的图片，每道题的选项，记录每道题结果的数组FI_RESULT
* @author 许琇婷
* @version v0.1
*/
//初始化每道题之前的图片
var FI_IMAGE = new Array(8);
FI_IMAGE[0] = "images/family-insurance/1.png";
FI_IMAGE[1] = "images/family-insurance/2.png";
FI_IMAGE[2] = "images/family-insurance/3.png";
FI_IMAGE[3] = "images/family-insurance/4.png";
FI_IMAGE[4] = "images/family-insurance/5.png";
FI_IMAGE[5] = "images/family-insurance/6.png";
FI_IMAGE[6] = "images/family-insurance/7.png";
FI_IMAGE[7] = "images/family-insurance/8.png";


//初始化题库
var FI_TEXT = new Array(8);
FI_TEXT[0] = new Array(2);
FI_TEXT[1] = new Array(2);
FI_TEXT[2] = new Array(2);
FI_TEXT[3] = new Array(2);
FI_TEXT[4] = new Array(2);
FI_TEXT[5] = new Array(2);
FI_TEXT[6] = new Array(2);
FI_TEXT[7] = new Array(2);

//0为单选，1为多选
FI_TEXT[0] = ["享受日常健康运动，你遇到过哪些小麻烦？",1];
FI_TEXT[1] = ["人生的每个阶段都充满着不同快乐，您现在是？",0];
FI_TEXT[2] = ["陪伴孩子的成长，让你最操心的是...",0];
FI_TEXT[3] = ["生活好习惯你能HOLD住哪些？",1];
FI_TEXT[4] = ["假期太短，你的时间主要都去哪儿了？",0];
FI_TEXT[5] = ["土豪的生活，你做到了哪些？",1];
FI_TEXT[6] = ["孩子大了我们就老了，你为那时候做了哪些准备？",1];
FI_TEXT[7] = ["辛苦干了一年，钱最主要花哪去了？",0];

//初始化选项
var FI_CHOICE = new Array(8);
FI_CHOICE[0] = "【多选】";
FI_CHOICE[1] = "【单选】";
FI_CHOICE[2] = "【单选】";
FI_CHOICE[3] = "【多选】";
FI_CHOICE[4] = "【单选】";
FI_CHOICE[5] = "【多选】";
FI_CHOICE[6] = "【多选】";
FI_CHOICE[7] = "【单选】";

//初始化选项
var FI_OPTION = new Array(8);
FI_OPTION[0] = new Array(5);
FI_OPTION[1] = new Array(5);
FI_OPTION[2] = new Array(6);
FI_OPTION[3] = new Array(4);
FI_OPTION[4] = new Array(4);
FI_OPTION[5] = new Array(5);
FI_OPTION[6] = new Array(5);
FI_OPTION[7] = new Array(6);


FI_OPTION[0] = ["自己的运动损伤","运动中误伤他人","骑行中复杂的交通路况","其他意外状况","还好，没遇到什么麻烦"];
FI_OPTION[1] = ["单身贵族","二人世界","有子女未成年，您家宝贝年龄","子女成年，您家孩子年龄","退休人生（55岁以上）"];
FI_OPTION[2] = ["身体健康，还不要闯祸","上辅导班，争取做学霸","兴趣爱好，总要有一个吧","送去留学，出去开阔视野","给孩子咱点钱吧，支持创业、置业、婚嫁","一切顺其自然"];
FI_OPTION[3] = ["吃货的早餐从不落下","每周锻炼一次，我要好身体","十点半前上床碎觉","艾玛，一个都做不到唉，泪奔..."];
FI_OPTION[4] = ["和家人朋友看电影，吃饭、读书","喊上死党一起运动，打球、健身","世界那么大，必须去看看","no zuo no die，蹦极、跳伞、攀岩..."];
FI_OPTION[5] = ["买！奢侈品","吃！有机食品","住！高端住宅","开！壕车","这个问题不要@我，桑心..."];
FI_OPTION[6] = ["所以现在努力挣钱啊","就指望儿女将来照顾了","缴纳社保，相信dang和国家","家里不差钱，自己不用做准备","暂时没想那么多"];
FI_OPTION[7] = ["柴米油盐酱醋茶","吃喝玩乐，花花花","买房、买车、还贷款了...","投资自己，提升B格","存钱、银行理财","做生意、炒股"];



//初始化记录用户每一题（共8题）所勾选的选项，每道题有6个元素存放最多6个选项是否被勾选
var FI_RESULT = new Array(8);
FI_RESULT[0] = new Array(6);
FI_RESULT[1] = new Array(6);
FI_RESULT[2] = new Array(6);
FI_RESULT[3] = new Array(6);
FI_RESULT[4] = new Array(6);
FI_RESULT[5] = new Array(6);
FI_RESULT[6] = new Array(6);
FI_RESULT[7] = new Array(6);

for(var i=0;i<8;i++){
  for(var j=0;j<6;j++){
    FI_RESULT[i][j] = -1; 
  }
}


    


