/**
 * 输入键盘组件js文件
 * @author : fanboyi
 * @file : panel.js
 * @date : 2017-07-07
 */
var VirtualKeyboard = {
    inputObj: new Object(), //文本框对象
    placeholderText: '点击输入',
    initFlag: 0,
    /**
     * 跟随按键切换显示面板
     * @param {object} obj 被点击的按键对象
     */
    toggle: function(obj) {
        var panel = document.getElementById(obj.id + 'Panel');
        if ('none' == panel.style.display) {
            if ('alphabetPanel' == panel.id) {
                this.showPanel('alphabet');
                this.hidePanel('number');
                this.changeClassFocus('alphabet');
                this.changeClassBlur('number');
            } else {
                this.showPanel('number');
                this.hidePanel('alphabet');
                this.changeClassFocus('number');
                this.changeClassBlur('alphabet');
            }
        }
    },
    /**
     * 设置按键起作用的文本框
     * @param {objcect} obj 文本框对象
     */
    setInputObj: function(obj) {
        if (this.initFlag != 0) {
            $(this.inputObj).css("border-color", "#CCCCCC");
            $(this.inputObj).attr("placeholder", this.placeholderText);
        }
        this.initFlag = 1;
        this.placeholderText = $(obj).attr("placeholder");
        $(obj).css("border-color", "red");
        $(obj).attr("placeholder", "");
        this.inputObj = obj;
    },
    /**
     * 显示按键面板
     * @param  {string}  切换到相应按键面板的按钮ID值
     */
    showPanel: function(arg) {
        var obj = document.getElementById(arg + 'Panel');
        obj.style.display = 'block';
    },
    /**
     * 隐藏按键面板
     * @param  {string}  切换到相应按键面板的按钮ID值
     */
    hidePanel: function(arg) {
        var obj = document.getElementById(arg + 'Panel');
        obj.style.display = 'none';
    },
    /**
     * 修改失去焦点的按键的样式
     * @param  {string}  按键的ID值
     */
    changeClassFocus: function(arg) {
        var obj = document.getElementById(arg);
        obj.className = "focus";
    },
    /**
     * 修改获得焦点的按键的样式
     * @param  {string}  按键的ID值
     */
    changeClassBlur: function(arg) {
        var obj = document.getElementById(arg);
        obj.className = "blur";
    },
    /**
     * 文本框输入一个字符
     * @param  {object}  被按下的按键对象
     */
    add: function(obj) {
        this.inputObj.value += obj.alt;
        this.addTransparent(obj);
    },
    /**
     * 添加点击按钮后的效果
     * @param {object} obj 被按下的按键对象
     */
    addTransparent: function(obj) {
        var coords = obj.coords.split(",");
        console.log(coords[0]);
        console.log(coords[1]);
        if ("map1" == obj.parentNode.name) {
            var input = document.getElementById('pre_alp');
            setTimeout(function() {
                input.style.display = "none";
            }, 160);
            _left = coords[0] - coords[2] + 24;
            _top = coords[1] - coords[2] + 24;
            input.style.display = "block";
            input.style.position = "absolute";
            input.style.left = _left + "px";
            input.style.top = _top + "px";
            input.style.zIndex = "10";

        } else {
            var input = document.getElementById('pre_num');
            setTimeout(function() {
                input.style.display = "none";
            }, 160);
            _left = coords[0] - coords[2] + 108;
            _top = coords[1] - coords[2] + 14;
            input.style.display = "block";
            input.style.position = "absolute";
            input.style.left = _left + "px";
            input.style.top = _top + "px";
            input.style.zIndex = "10";


        }
    },
    /**
     * 清空文本框
     */
    refresh: function(obj) {
        this.inputObj.value = "";
        this.addTransparent(obj);
    },
    /**
     * 文本框删除一个字符
     */
    del: function(obj) {
        var content = this.inputObj.value;
        var length = content.length;
        this.inputObj.value = content.substring(0, length - 1);
        this.addTransparent(obj);
    }
};