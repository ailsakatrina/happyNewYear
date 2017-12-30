/**
* @file 本js实现页面加载后的初始化，包括18道题的题库TEXT，记录每道题结果的数组RESULT，统计每个选项答案个数的数组OPTION
* @author 许琇婷
* @version v0.1
*/


//初始化题库
var TEXT = new Array(18);
TEXT[0] = '  有时会有毫无原因地想要破坏某些物品或产生伤害他人的冲动？ ';
TEXT[1] = '  总是担心亲人，经常做无意义的联想？ ';
TEXT[2] = '  听到自杀、犯罪或生病的事，就会心烦意乱很长时间，很难不去想它？ ';
TEXT[3] = '  有时会有毫无原因地想要破坏某些物品或产生伤害他人的冲动？ ';
TEXT[4] = '  为了要完全记住一些不重要的事情而困扰？ ';
TEXT[5] = '  忘性大？ ';
TEXT[6] = '  对自己做的大多数事情都要产生怀疑？ ';
TEXT[7] = '  当看到刀、匕首和其他尖锐物品时，会感到心烦意乱？ ';
TEXT[8] = '  常常没有必要地检查门窗、煤气、钱物、文件、信件等？ ';
TEXT[9] = '  时常无原因地计数？ ';
TEXT[10] = '  不得不反复多次做某些事情，直到认为自己已经做好了为止？ ';
TEXT[11] = '  因为没有必要地花很多时间重复做某些事情而经常迟到？ ';
TEXT[12] = '  一些不愉快的想法常违背意愿地进入头脑中，不能摆脱？ ';
TEXT[13] = '  有时不得不毫无理由地多次重复相同的内容、句子或数字？ ';
TEXT[14] = '  常常设想自己粗心大意或细小的差错会引起灾难性的后果？ ';
TEXT[15] = '  注意力不集中？ ';
TEXT[16] = '  常反复洗手且洗手的时间长，超过正常所必须时间？ ';
TEXT[17] = '  时常无原则地担心自己患了某种疾病？ ';

//初始化题库
var Q_Number = new Array(18);
Q_Number[0] = 'Q1:';
Q_Number[1] = 'Q2:';
Q_Number[2] = 'Q3:';
Q_Number[3] = 'Q4:';
Q_Number[4] = 'Q5:';
Q_Number[5] = 'Q6:';
Q_Number[6] = 'Q7:';
Q_Number[7] = 'Q8:';
Q_Number[8] = 'Q9:';
Q_Number[9] = 'Q10:';
Q_Number[10] = 'Q11:';
Q_Number[11] = 'Q12:';
Q_Number[12] = 'Q13:';
Q_Number[13] = 'Q14:';
Q_Number[14] = 'Q15:';
Q_Number[15] = 'Q16:';
Q_Number[16] = 'Q17:';
Q_Number[17] = 'Q18:';



//初始化记录用户每一题（共18题）所勾选的选项，在点击‘上一题’时显示记录
var RESULT = new Array(18);
for(var i=0;i<RESULT.length;i++){
	RESULT[i] = -1;//RESULT将被赋值为0,1,2,先将其初始化为-1
}
		
//初始化统计‘是’，‘否’，‘有时会’三个答案的全局变量数组
var OPTION = new Array(3);
OPTION[0] = 0;
OPTION[1] = 0;
OPTION[2] = 0;
var OPTION_TEMP = '';



/**

     * 函数说明：初始化所有记录答案的数组为-1，将所有对号显示为“未选择”,显示第一题，且显示测试部分，隐藏答案部分
     * @param  i 遍历题目
     
 */
function initial(){
	for(var i=0;i<RESULT.length;i++){
		RESULT[i] = -1;//RESULT将被赋值为0,1,2,先将其初始化为-1
	}
	//将所有对号显示为“未选择”
	$(".rightLogo").attr("src","images/self-test-xxt/unchosenButton.png");
	//显示第一题
	$('#text').html(TEXT[0]);
	//显示第一题题号
	$('#qNumber').html(Q_Number[0]);
	//第一题左侧按钮为返回
	$('#ocdBtn1').attr('src',"images/self-test-xxt/last_nor.png")
	//隐藏答案部分
	$('#answerPage').hide();
}
