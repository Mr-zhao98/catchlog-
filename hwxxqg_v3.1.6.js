//"ui";
/*
runtime.loadJar('./jsoup-1.12.1.jar');
importClass(org.jsoup.Jsoup);
importClass(org.jsoup.nodes.Document);
importClass(org.jsoup.select.Elements);
*/
importClass(com.stardust.autojs.core.accessibility.AccessibilityBridge.WindowFilter);
    let bridge = runtime.accessibilityBridge;
    let bridgeField = runtime.getClass().getDeclaredField("accessibilityBridge");
    let configField = bridgeField.getType().getDeclaredField("mConfig");
    configField.setAccessible(true);
    configField.set(bridge, configField.getType().newInstance());

    bridge.setWindowFilter(new JavaAdapter(AccessibilityBridge$WindowFilter, {
        filter: function (info) {
            return true;
        }
    }));


importClass(android.database.sqlite.SQLiteDatabase);
var questionCommon = require("./questionCommon.js");
var tikuCommon = require("./tikuCommon.js");
//var PrefCheckBox = require('./自定义配置.js');


/**
 * @Description: Auto.js xxqg-helper (6+6)+(6+6)+(1+1+2)+6+6+1+1=42分
 * @version: 3.1.6
 * @Author: Ivan
 * @Date: 2020-10-26
 */

var aCount = 12; //文章默认学习篇数
var vCount = 6; //小视频默认学习个数
var cCount = 2; //收藏+分享+评论次数
var asub = 3;//订阅个数
var aTime = 10; //每篇文章学习-103秒 103*7≈720秒=12分钟
var vTime = 30; //每个小视频学习-15秒
var rTime = 900; //广播收听-18分钟
var FuncConfig;//自定义配置


var commentText = ["支持党，支持国家！", "为实现中华民族伟大复兴而不懈奋斗！", "紧跟党走，毫不动摇！",
    "不忘初心，牢记使命", "努力奋斗，报效祖国！"
]; //评论内容，可自行修改，大于5个字便计分

var aCatlog = "推荐" //文章学习类别，可自定义修改为“要闻”、“新思想”等

var lCount = 1; //挑战答题轮数
var qCount = random(5,7); //挑战答题每轮答题数
var rightCount = 0; //争上游正确答题记数
var myScores = {}; //分数
//var myDiandian = {}; //点点通
var idNumber = ""; //学号
var customize_flag = false; //自定义运行标志

//学习功能配置
var FuncConfig;

//功能选择记录
var FuncList = {}; 

/**
 * @description: 延时函数
 * @param: seconds-延迟秒数
 * @return: null
 */
function delay(seconds) {
    sleep(1000 * seconds); //sleep函数参数单位为毫秒所以乘1000
}
   
/**
 * @description: 生成从minNum到maxNum的随机数
 * @param: minNum-较小的数
 * @param: maxNum-较大的数
 * @return: null
 */
function randomNum(minNum, maxNum) {
    switch (arguments.length) {
        case 1:
            return parseInt(Math.random() * minNum + 1, 10);
        case 2:
            return parseInt(Math.random() * (maxNum - minNum + 1) + minNum, 10);
        default:
            return 0;
    }
} 

/**
@description: 回到主页
@param: null
@return: null
*/
function backMain(){
    delay(2);
    while (!desc("工作").exists()) {
        toastLog("正在等待回到出主页");
        
        back();
        delay(2);
    }
    toastLog("已经回到主页");
}

/* *************************************************订阅功能****************************************************************/
/**

@description: 从强国号中寻找可订阅媒体
@param: null
@return: null
*/
function subQianggGuoHao(){

    var subSuccess = false; //是否有订阅成功的频道，有则返回ture，无则返回false
    if(descContains("强国号").exists()){
        descContains("强国号").findOne().click();
    }else if(textContains("强国号").exists()){
        textContains("强国号").findOne().click();
    }
    sleep(1000);
    try{
        var listCategory;
        if(textContains("推荐").exists()){
            listCategory =  text("推荐").findOne().parent();
        }
        else if(descContains("推荐").exists()){
            listCategory =  desc("推荐").findOne().parent();
        }
        listCategory.children().forEach(item=>{
            item.click();
            sleep(1000);
            err = false
            if(asub <= 0){
                throw '订阅已经够了，退出订阅模块'
                err = true
             } 
            
            while (!err) {
                var img = captureScreen()
                sleep(1200)
                var templ = images.read("./订阅.png")
                var p = findImage(img, templ);
                if(p){
                    toast("找到啦:" + p);
                    click(p.x,p.y)
                    asub--;
                }else{
                    toast("没找到");
                    err = true
                }
                
                if(asub <= 0){
                   throw '订阅已经够了，退出订阅模块'
                   err = true
                } 

            }
            sleep(500);
        });
    }
    catch(e){
        toast(e);
    }
    toastLog("订阅成功");
    return subSuccess;
    back();
    sleep(1000);
    back();
    sleep(1000)
}
/**
@description: 从地方平台中寻找可订阅媒体
@param: null
@return: null
*/
function subDiFangPingTai(){
    var subSuccess = false; //是否有订阅成功的频道，有则返回ture，无则返回false

    if(descContains("地方平台").exists()){
        descContains("地方平台").findOne().click();
    }else if(textContains("地方平台").exists()){
        textContains("地方平台").findOne().click();
    }
    delay(2);
    try{
        var listCategory;
        if(textContains("推荐").exists()){
            listCategory =  text("推荐").findOne().parent();
        }
        else if(descContains("推荐").exists()){
            listCategory =  desc("推荐").findOne().parent();
        }

        listCategory.children().forEach(item=>{
            item.click();
            sleep(1000);
            err = false
            if(asub <= 0){
                throw '订阅已经够了，退出订阅模块'
                err = true
             } 
            
            while (!err) {
                var img = captureScreen()
                sleep(1200)
                var templ = images.read("./订阅.png")
                var p = findImage(img, templ);
                if(p){
                    toast("找到啦:" + p);
                    click(p.x,p.y)
                    asub--;
                }else{
                    toast("没找到");
                    err = true
                }
                
                if(asub <= 0){
                   throw '订阅已经够了，退出订阅模块'
                   err = true
                } 

            }
            sleep(500);
        });
    }
    catch(e){
        toast(e);
    }
    toastLog("订阅成功");
    return subSuccess;
    back();
    sleep(1000);
    back();
    sleep(1000)
}


/**
@description: 学习平台订阅
@param: null
@return: null
*/
function sub() {
    var i = 0;
    let err = false;

    while(myScores['订阅']<2){
       
        desc("工作").click();
        delay(2);
        text("我的").findOne().click();
        delay(1);
        text("订阅").findOne().click();
        delay(1);
        text("添加").findOne().click();
        delay(2);

        if(subQianggGuoHao()){
            toastLog("从强国号中订阅了");
            back();
            sleep(1000)
            back();
            sleep(1000)
            //back()
        }
       
        else{
            if(subDiFangPingTai()){
                toastLog("从地方平台中订阅了");
                back();
                sleep(1000)
                back();
                sleep(1000)
                //back()
            }
            // if(asub<=0){
            //     //已经订阅够了一定数量，检查是否拿到积分
            //     delay(1);
            //     getScores(0);
            //     continue;
            // }
            else{
                toastLog("没有可以拿积分的订阅了，跳过");
                back()
                sleep(1000)
                back()
                break;
            }
            // else{
            //     while(subXianJiRongMei()&&asub>0){
            //         toastLog("从县级融媒中订阅了");
            //     }
            //     if(asub<=0){
            //         //已经订阅够了一定数量，检查是否拿到积分
            //         delay(1);
            //         getScores(0);
            //         continue;
            //     }
            //     toastLog("没有可以拿积分的订阅了，放弃吧，老铁");
            //     break;

            // }
        }
        
    }
    //回到主页
    backMain()
}


/**
 * @description: 文章学习计时(弹窗)函数
 * @param: n-文章标号 seconds-学习秒数
 * @return: null
 */
function article_timing(n, seconds) {
    seconds = randomNum(seconds - 5, seconds + 5);
    h = device.height; //屏幕高
    w = device.width; //屏幕宽
    // x = w * 0.64;
    x = (w / 5) * 3;
    h1 = h * 0.2;
    h2 = h * 0.85;
    for (var i = 0; i < seconds; i++) {
        while (!textContains("欢迎发表你的观点").exists()) //如果离开了文章界面则一直等待
        {
            console.error("当前已离开第" + (n + 1) + "文章界面，请重新返回文章页面...");
            sleep(1000);
        }
        if (i % 5 == 0) //每5秒打印一次学习情况
        {
            console.info("第" + (n + 1) + "篇文章已经学习" + (i + 1) + "秒,剩余" + (seconds - i - 1) + "秒!");
        }
        sleep(1000);
        if (i % 10 == 0) //每10秒滑动一次，如果android版本<7.0请将此滑动代码删除
        {
            toast("这是防息屏toast,请忽视-。-");
            if (i <= seconds / 2) {
                swipe(x, h2, x, h1, randomNum(450, 550)); //向下滑动
                //gestures([randomNum(450,550), [x, h2], [x, h1]]);
            } else {
                swipe(x, h1, x, h2, randomNum(450, 550)); //向上滑动
                //gesture(randomNum(450,550), [x, h1], [x, h2]);
            }
        }
    }
}

/**
 * @description: 视频学习计时(弹窗)函数
 * @param: n-视频标号 seconds-学习秒数
 * @return: null
 */
function video_timing_bailing(n, seconds) {
    seconds = randomNum(seconds - 5, seconds + 5);
    for (var i = 0; i * 5 < seconds; i++) {
        while (!textContains("分享").exists()) //如果离开了百灵小视频界面则一直等待
        {
            console.error("当前已离开第" + (n + 1) + "个百灵小视频界面，请重新返回视频");
            sleep(2000);
        }
        if (seconds > ((i + 1) * 5)) {
            sleep(5000);
            console.info("第" + (n + 1) + "个小视频已经观看" + ((i + 1) * 5) + "秒,剩余" + (seconds - (i + 1) * 5) + "秒!");
        } else {
            sleep((seconds - i * 5) * 1000);
        }
    }
}

/**
 * @description: 新闻联播小视频学习计时(弹窗)函数
 * @param: n-视频标号 seconds-学习秒数
 * @return: null
 */
function video_timing_news(n, seconds) {
    seconds = randomNum(seconds - 5, seconds + 5);
    for (var i = 0; i * 5 < seconds; i++) {
        while (!textContains("欢迎发表你的观点").exists()) //如果离开了联播小视频界面则一直等待
        {
            console.error("当前已离开第" + (n + 1) + "个新闻视频界面，请重新返回视频");
            sleep(2000);
        }
        if (seconds > ((i + 1) * 5)) {
            sleep(5000);
            console.info("第" + (n + 1) + "个新闻视频已经观看" + ((i + 1) * 5) + "秒,剩余" + (seconds - (i + 1) * 5) + "秒!");
        } else {
            sleep((seconds - i * 5) * 1000);
        }
    }
}

/**
 * @description: 广播学习计时(弹窗)函数
 * @param: r_time-已经收听的时间 seconds-学习秒数
 * @return: null
 */
function radio_timing(r_time, seconds) {
    for (var i = 0; i < seconds; i++) {
        sleep(1000);
        if (i % 5 == 0) //每5秒打印一次信息
        {
            console.info("广播已经收听" + (i + 1 + r_time) + "秒,剩余" + (seconds - i - 1) + "秒!");
        }
        if (i % 10 == 0) //每15秒弹一次窗防止息屏
        {
            toast("这是防息屏toast,请忽视-。-");
        }
    }
}

/**
 * @description: 日期转字符串函数
 * @param: y,m,d 日期数字 2019 1 1
 * @return: s 日期字符串 "2019-xx-xx"
 */
function dateToString(y, m, d) {
    var year = y.toString();
    if ((m + 1) < 10) {
        var month = "0" + (m + 1).toString();
    } else {
        var month = (m + 1).toString();
    }
    if (d < 10) {
        var day = "0" + d.toString();
    } else {
        var day = d.toString();
    }
    var s = year + "-" + month + "-" + day; //年-月-日
    return s;
}

/**
 * @description: 获取当天日期字符串函数
 * @param: null
 * @return: s 日期字符串 "2019-xx-xx"
 */
function getTodayDateString() {
    var date = new Date();
    var y = date.getFullYear();
    var m = date.getMonth();
    var d = date.getDate();

    var s = dateToString(y, m, d); //年-月-日
    return s
}

/**
 * @description: 获取昨天日期字符串函数
 * @param: null
 * @return: s 日期字符串 "2019-xx-xx"
 */
function getYestardayDateString() {
    var date = new Date();
    date.setDate(date.getDate() - 1);
    var y = date.getFullYear();
    var m = date.getMonth();
    var d = date.getDate();
    var s = dateToString(y, m, d); //年-月-日
    return s
}

/**
 * @description: 获取一周前日期字符串函数
 * @param: null
 * @return: s 日期字符串 "2019-xx-xx"
 */
function getLastweekDateString() {
    var date = new Date();
    date.setDate(date.getDate() - 7);
    var y = date.getFullYear();
    var m = date.getMonth();
    var d = date.getDate();
    var s = dateToString(y, m, d); //年-月-日
    return s
}

/**
 * @description: 增加或更新数据库
 * @param: title,idNumber,date
 * @return: res
 */
function getLearnedArticle(title, idnumber) {
    var dbName = "tiku.db";
    //文件路径
    var path = files.path(dbName);
    //确保文件存在
    if (!files.exists(path)) {
        // files.createWithDirs(path);
        console.error("未找到题库!请将题库放置与js同一目录下");
    }
    //创建或打开数据库
    var db = SQLiteDatabase.openOrCreateDatabase(path, null);
    var createTable = "\
    CREATE TABLE IF NOt EXISTS learnedArticles(\
    title CHAR(500),\
    id_number CHAR(15),\
    date_string CHAR(15)\
    );";
    // var cleanTable = "DELETE FROM tikuNet";
    db.execSQL(createTable);
    // db.execSQL(cleanTable);
    var sql = "SELECT * FROM  learnedArticles WHERE title = '" + title + "' AND id_number = '" + idnumber + "'";
    var cursor = db.rawQuery(sql, null);
    var res = cursor.moveToFirst();
    cursor.close();
    // console.warn("查询结果:",res);
    db.close();
    return res;
}

function insertLearnedArticle(title, idnumber, date_string) {
    var dbName = "tiku.db";
    var path = files.path(dbName);
    if (!files.exists(path)) {
        //files.createWithDirs(path);
        console.error("未找到题库!请将题库放置与js同一目录下");
    }
    var db = SQLiteDatabase.openOrCreateDatabase(path, null);
    var createTable = "\
    CREATE TABLE IF NOt EXISTS learnedArticles(\
    title CHAR(253),\
    id_number CHAR(15),\
    date_string CHAR(15)\
    );";
    // var cleanTable = "DELETE FROM tikuNet";
    db.execSQL(createTable);
    var sql = "INSERT INTO learnedArticles VALUES ('" + title + "','" + idnumber + "','" + date_string + "')";
    db.execSQL(sql);

    var sql = "SELECT COUNT(*) FROM learnedArticles WHERE id_number = '" + idNumber + "';";
    var cursor = db.rawQuery(sql, null);
    cursor.moveToFirst();
    let sCount = cursor.getLong(0);
    console.warn("插入已学表中，共", sCount, "条");
    db.close();
}

function cleanLearnedArticle(date_string) {
    var dbName = "tiku.db";
    var path = files.path(dbName);
    if (!files.exists(path)) {
        //files.createWithDirs(path);
        console.error("未找到题库!请将题库放置与js同一目录下");
    }
    var db = SQLiteDatabase.openOrCreateDatabase(path, null);
    var createTable = "\
    CREATE TABLE IF NOt EXISTS learnedArticles(\
    id_number CHAR(15),\
    date_string CHAR(15)\
    );";
    // var cleanTable = "DELETE FROM tikuNet";
    db.execSQL(createTable);
    /*
    var deleteTable = "DROP TABLE learnedArticles;";
    try {
        db.execSQL(deleteTable);
        console.info("删除表");
    } catch(e) {
        console.error(e);
    }
    */
    var cleanTable = "\
    DELETE FROM learnedArticles WHERE date_string < '" + date_string + "'\
    ;";
    // var cleanTable = "DELETE FROM tikuNet";
    try {
        db.execSQL(cleanTable);
        console.info("清空表");
    } catch (e) {
        console.error(e);
    }

    db.close();
}

/**
 * @description: 文章学习函数  (阅读文章+文章学习时长)---6+6=12分
 * @param: null
 * @return: null
 */
function articleStudyold() {
    while (!desc("工作").exists()); //等待加载出主页
    id("home_bottom_tab_icon_large").click(); //点击主页正下方的"学习"按钮
    sleep(2000);
    click(aCatlog);
    sleep(2000);
    let listView = className("ListView"); //获取文章ListView控件用于翻页
    var zt_flag = false; //判断进入专题界面标志
    var fail = 0; //点击失败次数
    var date_string = getTodayDateString(); //获取当天日期字符串
    for (var i = 0, t = 0; i < aCount;) {
        if (click(date_string, t) == true) { //如果点击成功则进入文章页面,不成功意味着本页已经到底,要翻页
            sleep(5000);
            // // sleep(10000); //等待加载出文章页面，后面判断是否进入了视频文章播放要用到
            //获取当前正在阅读的文章标题
            var currentNewsTitle = ""
            if (textContains("来源").exists()) { // 有时无法获取到 来源
                currentNewsTitle = textContains("来源").findOne().parent().children()[0].text();
            } else if (textContains("作者").exists()) {
                currentNewsTitle = textContains("作者").findOne().parent().children()[0].text();
            } else if (descContains("来源").exists()) {
                currentNewsTitle = descContains("来源").findOne().parent().children()[0].desc();
            } else if (descContains("作者").exists()) {
                currentNewsTitle = descContains("作者").findOne().parent().children()[0].desc();
            } else {
                toastLog("无法定位文章标题,即将退出并阅读下一篇")
                t++;
                back();
                sleep(2000);
                continue;
            }
            if (currentNewsTitle == "") {
                toastLog("标题为空,即将退出并阅读下一篇")
                t++;
                back();
                sleep(2000);
                continue;
            }
            var flag = getLearnedArticle(currentNewsTitle, date_string);
            if (flag) {
                //已经存在，表明阅读过了
                console.info("该文章已经阅读过，即将退出并阅读下一篇");
                t++;
                back();
                sleep(2000);
                continue;
            } else {
                //没阅读过，添加到数据库
                insertLearnedArticle(currentNewsTitle, date_string);
            }
            let n = 0;
            while (!textContains("欢迎发表你的观点").exists()) { //如果没有找到评论框则认为没有进入文章界面，一直等待
                sleep(2000);
                console.warn("正在等待加载文章界面...");
                if (n > 3) { //等待超过3秒则认为进入了专题界面，退出进下一篇文章
                    console.warn("没找到评论框!该界面非文章界面!");
                    zt_flag = true;
                    break;
                }
                n++;
            }
            if (desc("展开").exists()) { //如果存在“展开”则认为进入了文章栏中的视频界面需退出
                console.warn("进入了视频界面，即将退出并进下一篇文章!");
                t++;
                back();
                sleep(2000);
                if (myScores['视听学习时长'] != 6) {
                    click("电台");
                    sleep(1000);
                    click("最近收听");
                    toastLog("因为广播被打断，正在重新收听广播...");
                    sleep(2000);
                    back();
                }
                while (!desc("工作").exists());
                id("home_bottom_tab_icon_large").click();
                sleep(2000);
                continue;
            }
            if (zt_flag == true) { //进入专题页标志
                console.warn("进入了专题界面，即将退出并进下一篇文章!");
                t++;
                back();
                sleep(2000);
                zt_flag = false;
                continue;
            }
            toastLog("正在学习第" + (i + 1) + "篇文章,标题：", currentNewsTitle);
            fail = 0; //失败次数清0
            //开始循环进行文章学习
            article_timing(i, aTime);
            if ((i < cCount)) //收藏分享2篇文章
            {
                CollectAndShare(i); //收藏+分享 若c运行到此报错请注释本行！
            }
            if (i < cCount) //收藏分享2篇文章
            {
                Comment(i); //评论
            }
            sleep(2000);
            back(); //返回主界面
            while (!desc("工作").exists()); //等待加载出主页
            sleep(2000);
            i++;
            t++; //t为实际点击的文章控件在当前布局中的标号,和i不同,勿改动!
        } else {
            // if (i == 0){//如果第一次点击就没点击成功则认为首页无当天文章
            //     date_string = getYestardayDateString();
            //     console.warn("首页没有找到当天文章，即将学习昨日新闻!");
            //     continue;
            // }
            if (fail >= aCount) { //连续翻几页没有点击成功则认为今天的新闻还没出来，学习昨天的
                date_string = getYestardayDateString();
                console.warn("没有找到当天文章，即将学习昨日新闻!");
                click("综合");
                sleep(1000);
                listView = className("ListView"); //获取文章ListView控件用于翻页
                continue;
            }
            if (!textContains(date_string).exists()) { //当前页面当天新闻
                fail++; //失败次数加一
            }
            listView.scrollForward(); //向下滑动(翻页)
            t = 0;
            sleep(2000);
        }
    }
}

/**
 * @description: 文章学习函数  (阅读文章+文章学习时长)---6+6=12分
 * @param: null
 * @return: null
 */
function articleStudy() {
    /* h = device.height; //屏幕高
    w = device.width; //屏幕宽
    x = (w / 3) * 2;
    h1 = (h / 6) * 5;
    h2 = (h / 6); */
    toastLog("开始文章学习");
    while (!desc("工作").exists()); //等待加载出主页
    if (id("home_bottom_tab_icon_large").exists()) {
        toastLog("在主页面");
    } else {
        toastLog("没找到学习按键");
    }
    desc("工作").click(); //点击主页正下方的"学习"按钮
    sleep(2000);
    click(aCatlog);
    sleep(2000);
    let listView = className("android.widget.ListView"); //获取文章ListView控件用于翻页
    // var zt_flag = false; //判断进入专题界面标志
    // var fail = 0; //点击失败次数
    // var date_string = getTodayDateString(); //获取当天日期字符串

    for (let i = 0; i < aCount;) {
        //var idGroup = id("general_card_title_id").find();
        //let stBobao = text("播报").find();
        let stBobao = className("android.widget.TextView").text("播报").find();
        //let stBobao = listView.scrollable(true).depth(20).findOnce();
        //let aLength = idGroup.length;
        let aLength = stBobao.length;
        //toastLog(aLength);

        for (let j = 0; j < aLength; j++) {
            try {
                // var currentNewsTitle = stBobao[j].parent().parent().parent().child(0).text();
                if  (stBobao[j].parent().parent().parent().parent().clickable()) {
                    var currentNewsTitle = stBobao[j].parent().parent().parent().child(0).text();
                } else if (stBobao[j].parent().parent().parent().parent().parent().clickable()){
                    var currentNewsTitle = stBobao[j].parent().parent().parent().parent().child(0).text();
                }

                //toastLog(currentNewsTitle);
                let flag = getLearnedArticle(currentNewsTitle, idNumber);
                if (flag) {
                    //已经存在，表明阅读过了
                    console.info("该文章已经阅读过，即将退出并阅读下一篇");
                    //t++;
                    //back();
                    //sleep(2000);
                    continue;
                } else {
                    var hasClicked = false;
                    if  (stBobao[j].parent().parent().parent().parent().clickable()) {
                        hasClicked = stBobao[j].parent().parent().parent().parent().click();
                    } else if (stBobao[j].parent().parent().parent().parent().parent().clickable()){
                        hasClicked = stBobao[j].parent().parent().parent().parent().parent().click();
                    }
                    if (hasClicked) {
                        let arTime = new Date().getTime(); //文章学习开始时间
                        sleep(1000);
                        if (text("内容已下线").exists()) {
                            continue;
                        }
                        //没阅读过，添加到数据库
                        insertLearnedArticle(currentNewsTitle, idNumber, date_string);
                        // while (!textContains("欢迎发表你的观点").exists());
                        // sleep(1000);
                        /* let n = 0;
                        while (!textContains("欢迎发表你的观点").exists()) { //如果没有找到评论框则认为没有进入文章界面，一直等待
                            sleep(2000);
                            console.warn("正在等待加载文章界面...");
                            if (n > 3) { //等待超过3秒则认为进入了专题界面，退出进下一篇文章
                                console.warn("没找到评论框!该界面非文章界面!");
                                zt_flag = true;
                                break;
                            }
                            n++;
                        }
                        if (text("展开").exists()) { //如果存在“展开”则认为进入了文章栏中的视频界面需退出
                            console.warn("进入了视频界面，即将退出并进下一篇文章!");
                            //t++;
                            back();
                            sleep(2000);
                            if (myScores['视听学习时长'] != 6) {
                                click("电台");
                                sleep(1000);
                                click("最近收听");
                                toastLog("因为广播被打断，正在重新收听广播...");
                                sleep(2000);
                                back();
                            }
                            while (!desc("学习").exists());
                            desc("学习").click();
                            sleep(2000);
                            continue;
                        }
                        if (zt_flag == true) { //进入专题页标志
                            console.warn("进入了专题界面，即将退出并进下一篇文章!");
                            //t++;
                            back();
                            sleep(2000);
                            zt_flag = false;
                            continue;
                        } */
                        toastLog("正在学习第" + (i + 1) + "篇文章,标题：", currentNewsTitle);
                        fail = 0; //失败次数清0
                        //开始循环进行文章学习
                        article_timing(i, aTime);
                        let arEnd = new Date().getTime(); //文章学习结束时间
                        toastLog("文章学习了：", (arEnd - arTime) / 1000, "秒");
                        // toastLog("此文章学习结束");
                        if ((i < cCount)) //收藏分享2篇文章
                        {
                            CollectAndShare(i); //收藏+分享 若c运行到此报错请注释本行！
                        }
                        if ((i + 1) < cCount) //收藏分享2篇文章
                        {
                            Comment(i); //评论
                        }
                        //sleep(2000);
                        /* back(); //返回主界面
                        while (!desc("工作").exists()); //等待加载出主页 */
                        while (!desc("工作").exists()) {
                            //toastLog("正在等待加载出主页");
                            back(); //返回联播频道界面
                            sleep(1000);
                        }
                        //sleep(2000);
                        i++;

                        //t++;//t为实际点击的文章控件在当前布局中的标号,和i不同,勿改动!
                    } else {
                        /* if (i == 0){//如果第一次点击就没点击成功则认为首页无当天文章
                            date_string = getYestardayDateString();
                            console.warn("首页没有找到当天文章，即将学习昨日新闻!");
                            continue;
                        }
                        if (fail >= aCount) { //连续翻几页没有点击成功则认为今天的新闻还没出来，学习昨天的
                            date_string = getYestardayDateString();
                            console.warn("没有找到当天文章，即将学习昨日新闻!");
                            click("综合");
                            sleep(2000);
                            listView = className("ListView"); //获取文章ListView控件用于翻页
                            continue;
                        }
                        if (!textContains(date_string).exists()) { //当前页面当天新闻
                            fail++; //失败次数加一
                        } */
                        //sleep(2000);
                        //i++
                        back();
                    }
                }
                //如果超过阅读数量，中断循环
                if (i >= aCount) {
                    break;
                }
            } catch (e) {
                toastLog(e);
                while (!desc("工作").exists()) {
                    //toastLog("正在等待加载出主页");
                    back();
                    sleep(1000);
                }
                //try {
                //var currentNewsTitle = stBobao[j].parent().parent().parent().parent().parent().child(0).child(0).text();
                //}
            }
        }
        //listView = ss[0].parent().parent(); //获取文章ListView控件用于翻页
        listView.scrollForward(); //向下滑动(翻页)
        toastLog("listView滑动");
        //swipe(x, h1, x, h2, 500);
        //toastLog("滑动");
        sleep(100);
    }
    /*
    for (var i = 0, t = 0; i < aCount;) {
        if (click(date_string, t) == true) //如果点击成功则进入文章页面,不成功意味着本页已经到底,要翻页
        {
            let n = 0;
            while (!textContains("欢迎发表你的观点").exists()) //如果没有找到评论框则认为没有进入文章界面，一直等待
            {
                sleep(1000);
                console.warn("正在等待加载文章界面...");
                if (n > 3) //等待超过3秒则认为进入了专题界面，退出进下一篇文章
                {
                    console.warn("没找到评论框!该界面非文章界面!");
                    zt_flag = true;
                    break;
                }
                n++;
            }
            if (text("展开").exists()) //如果存在“展开”则认为进入了文章栏中的视频界面需退出
            {
                console.warn("进入了视频界面，退出并进下一篇文章!");
                t++;
                back();
                while (!desc("学习").exists());
                sleep(500);
                click("电台");
                sleep(1000);
                click("最近收听");
                toastLog("因为广播被打断，重新收听广播...");
                sleep(1000);
                if (!desc("学习").exists()){
                    back();
                }
                while (!desc("学习").exists());
                desc("学习").click();
                sleep(1000);
                click(aCatlog);
                sleep(1000);
                continue;
            }
            if (zt_flag == true) //进入专题页标志
            {
                console.warn("进入了专题界面，退出并进下一篇文章!")
                t++;
                back();
                sleep(1000);
                zt_flag = false;
                continue;
            }
            toastLog("正在学习第" + (i + 1) + "篇文章...");
            try
            {
                title = textContains("来源").findOne().parent().child(0).text();
                toastLog(title);
            }catch(e){
                console.warn(e);
            }
            fail = 0; //失败次数清0
            article_timing(i, aTime);
            if ((i < (myScores["收藏"]-1)) || (i < (myScores["分享"]-1))) //收藏分享2篇文章
            {
                CollectAndShare(i); //收藏+分享 若c运行到此报错请注释本行！
            }
            if (i < (myScores["发表观点"]-1)) //收藏分享2篇文章
            {
                Comment(i); //评论
            }
            back(); //返回主界面
            while (!desc("学习").exists()); //等待加载出主页
            sleep(1000);
            i++;
            t++; //t为实际点击的文章控件在当前布局中的标号,和i不同,勿改动!
        } else {
            if (i == 0) //如果第一次点击就没点击成功则认为首页无当天文章
            {
                date_string = getYestardayDateString();
                console.warn("首页没有找到当天文章，即将学习昨日新闻!");
                continue;
            }
            if (fail > 3) //连续翻几页没有点击成功则认为今天的新闻还没出来，学习昨天的
            {
                date_string = getYestardayDateString();
                console.warn("没有找到当天文章，即将学习昨日新闻!");
                click("综合");
                sleep(1000);
                continue;
            }
            if (!textContains(date_string).exists()) //当前页面当天新闻
            {
                fail++; //失败次数加一
            }
            listView.scrollForward(); //向下滑动(翻页)
            t = 0;
            sleep(1500);
        }
    }*/
}

/**
 * @description: “百灵”小视频学习函数
 * @param: vCount,vTime
 * @return: null
 */
function videoStudy_bailing(vCount, vTime) {
    h = device.height; //屏幕高
    w = device.width; //屏幕宽
    x = (w / 5) * 3; //横坐标2分之3处
    h1 = (h / 6) * 5; //纵坐标6分之5处
    h2 = (h / 6); //纵坐标6分之1处
    click("百灵");
    sleep(2000);
    var items = ["竖", "炫", "窗", "藏", "靓", "秀", "美食", "推荐"];
    let randomItem = items[Math.floor(Math.random() * items.length)];
    click(randomItem);
    sleep(3000);
    // var a = className("FrameLayout").depth(23).findOnce(0); //根据控件搜索视频框，但部分手机不适配，改用下面坐标点击
    // a.click();
    //根据控件搜索视频框，但部分手机不适配，改用下面坐标点击
    if (!className("android.widget.ImageView").depth(26).findOnce().parent().parent().click()) {
        click((w/2)+random()*10,h/4);//坐标点击第一个视频
    }
    sleep(1000);
    for (var i = 0; i < vCount; i++) {
        toastLog("正在观看第" + (i + 1) + "个小视频");
        video_timing_bailing(i, vTime); //观看每个小视频
        if (i != vCount - 1) {
            swipe(x, h1, x, h2, 500); //往下翻（纵坐标从5/6处滑到1/6处）
        }
    }
    back();
    sleep(2000);
}

/**
 * @description:新闻联播小视频学习函数
 * @param: null
 * @return: null
 */

function videoStudy_news() {
    h = device.height; //屏幕高
    w = device.width; //屏幕宽
    x = (w / 5) * 3;
    h1 = h * 0.2;
    h2 = h * 0.85;
    while (!desc("工作").exists());
    //toastLog('电视台')
    desc("电视台").click();
    //back();
    toastLog('开始视频学习...');
    sleep(1000)
    toastLog('联播')
    click("联播频道");
    sleep(2000);
    let listView = className("ListView"); //获取listView视频列表控件用于翻页
    log("111111111")
    let s = "中央广播电视总台";
    // if (!textContains("中央广播电视总台")) {
    //     s = "央视网";
    //     log("222222")
    // }
    sleep(1000)
    var date_string = getTodayDateString(); //获取当天日期字符串
    sleep(1000)
    log(date_string)
    log("33333333")
    //sleep(15000);
    let scrollCount = 0;
    for (var i = 0; i < vCount;) {
        let stLianbo = text(s).find();
        log("444444")
        for (let j = 0; j < (stLianbo.length - 1); j++) {
            let currentNewsTitle = stLianbo[j].parent().parent().parent().child(0).text();
            log(stLianbo[j].parent().parent().parent().child(0))
            let currentDate = stLianbo[j].parent().child(1).text();
             //toastLog(currentDate);
            let flag = getLearnedArticle(currentNewsTitle + currentDate, idNumber);
            log(flag);
            log("8888");
            sleep(500)
            if (flag) {
                //已经存在，表明阅读过了
                console.info("该视频已经看过，即将退出并看下一个");
                //t++;
                //back();
                //sleep(2000);
                continue;
            } else {
                // if (stLianbo[j].parent().parent().parent().parent().click()) {
                var c = click(currentNewsTitle)
                sleep(1500)
                while (!textContains("欢迎发表你的观点").exists())
                //if()
                log(c);
                sleep(500)
                if (textContains("欢迎发表你的观点").exists()) {
                    //没阅读过，添加到数据库
                    log("55555555")
                    insertLearnedArticle(currentNewsTitle + currentDate, idNumber, date_string);
                    sleep(1500)
                   // while (!textContains("欢迎发表你的观点").exists());
                    log("566666665")
                    toastLog("即将学习第" + (i + 1) + "个视频！标题：", currentNewsTitle);
                    video_timing_news(i, vTime); //学习每个新闻联播小片段
                    /* back(); //返回联播频道界面
                    while (!desc("").exists()); //等待加载出主页
                    sleep(1000); */
                    while (!desc("电视台").exists()) {
                        //toastLog("正在等待加载出主页");
                        back(); //返回联播频道界面
                        sleep(1000);
                    }
                    //toastLog(vLength,i);
                    i++;
                    if (i >= vCount) {
                        break;
                    }
                } else if (text("你已经看到我的底线了").exists()) {
                    console.error("Error：没有可以观看的视频了!");
                    continue;
                } else {
                    listView.scrollForward(); //翻页
                    scrollCount++;
                    toastLog("内翻页");
                    sleep(1000);
                    //t -= 1    
                }
            }
        }
        if (text("你已经看到我的底线了").exists() && i <= vCount) {
            console.error("Error：没有可以观看的视频了!");
            break;
        } else {
            // toastLog(scrollCount);
            if (scrollCount < 7) {
                listView.scrollForward(); //翻页
            } else {
                swipe(x, h2, x, h1, 500);
            }
            scrollCount++;
            toastLog("外翻页");
            sleep(1000);
        }
    }

    /*
    for (var i = 0, t = 1; i < vCount;) {
        if (click(s, t) == true) {
            toastLog("即将学习第" + (i + 1) + "个视频!");
            video_timing_news(i, vTime); //学习每个新闻联播小片段
            back(); //返回联播频道界面
            while (!desc("电视台").exists()); //等待加载出主页
            sleep(1000);
            i++;
            t++;
            if (i == 3 | t > 6) { //如果是平板等设备，请尝试修改i为合适值！
                listView.scrollForward(); //翻页
                sleep(2000);
                t = 2;
            }
        } else {
            listView.scrollForward(); //翻页
            sleep(2000);
            t = 2;
        }
    }*/
    // id("home_bottom_tab_text_highlight").className("android.widget.TextView").text("工作").findOne().parent().click();
    id("home_bottom_tab_button_work").click();
    // text("工作").click();
    // desc("工作").click();
}


/**
 * @description: 听“电台”新闻广播函数  (视听学习+视听学习时长)---6+6=12分
 * @param: null
 * @return: null
 */
function listenToRadio() {
    click("电台");
    sleep(1000);
    click("听广播");
    sleep(2000);
    if (textContains("最近收听").exists()) {
        click("最近收听");
        toastLog("正在收听广播...");
        sleep(1000);
        back(); //返回电台界面
        sleep(1000);
        return true;
    }
    if (textContains("推荐收听").exists()) {
        click("推荐收听");
        toastLog("正在收听广播...");
        sleep(1000);
        back(); //返回电台界面
        sleep(1000);
        return true;
    }
}

/**
@description: 停止广播
@param: null
@return: null
*/
function stopRadio() {
    toastLog("停止收听广播！");
    click("电台");
    sleep(1000);
    click("听广播");
    sleep(2000);
    while (!(textContains("正在收听").exists() || textContains("最近收听").exists() || textContains("推荐收听").exists())) {
        toastLog("等待加载");
        sleep(2000)
    }
    sleep(1000)
    if (click("正在收听")) {

        // var zj=textContains("最近收听").findOne().bounds();
        // var x=zj.centerX();
        // var y=zj.centerY();
        // log("111")
        // click(x,y);
        // //click("最近收听");
    sleep(3000);
    log("2222")
    
    id("cn.xuexi.android:id/bg_play").findOnce().children().click();

    //back();

    sleep(1000)
    // if (id("btn_back").findOne().exists()) {
    //     id("btn_back").findOne().click()
    //     sleep(2000);
    //     back();
    //  }
    back()
    }
    
 }


/**
 * @description: 收藏加分享函数  (收藏+分享)---1+1=2分
 * @param: i-文章标号
 * @return: null
 */
function CollectAndShare(i) {
    while (!textContains("欢迎发表你的观点").exists()) //如果没有找到评论框则认为没有进入文章界面，一直等待
    {
        sleep(1000);
        toastLog("等待进入文章界面")
    }
    toastLog("正在进行第" + (i + 1) + "次收藏和分享...");

    var textOrder = text("欢迎发表你的观点").findOnce().drawingOrder();
    var collectOrder = textOrder + 2;
    var shareOrder = textOrder + 3;
    var collectIcon = className("ImageView").filter(function(iv) {
        return iv.drawingOrder() == collectOrder;
    }).findOnce();

    var shareIcon = className("ImageView").filter(function(iv) {
        return iv.drawingOrder() == shareOrder;
    }).findOnce();

    //var collectIcon = classNameContains("ImageView").depth(10).findOnce(0);//右下角收藏按钮
    // collectIcon.click(); //点击收藏
    // console.info("收藏成功!");
    // sleep(1000);

    //var shareIcon = classNameContains("ImageView").depth(10).findOnce(1);//右下角分享按钮
    shareIcon.click(); //点击分享
    while (!text("分享到学习强国").exists()); //等待弹出分享选项界面
    sleep(1000);
    click("分享到学习强国");
    sleep(2000);
    console.info("分享成功!");
    back(); //返回文章界面
    sleep(1000);

    // collectIcon.click(); //再次点击，取消收藏
    // console.info("取消收藏!");
    // sleep(1000);
}

/**
 * @description: 单独的收藏加分享函数  (收藏+分享)---1+1=2分
 * @param: i-文章标号
 * @return: null
 */
function newCollectAndShare() {
    toastLog("开始评论分享收藏");
    while (!desc("工作").exists()); //等待加载出主页
    if (id("home_bottom_tab_icon_large").exists()) {
        toastLog("在主页面");
    } else {
        toastLog("没找到学习按键");
    }
    desc("工作").click(); //点击主页正下方的"学习"按钮
    sleep(2000);
    click("要闻");
    sleep(2000);
    var wzlist = className("android.widget.ListView").depth(21).rowCount(10).findOne().children();
    for(i=0;i<2;i++){
    while (!id("comm_head_xuexi_mine").exists()); //等待加载出主页 
    log("在主页面");
   // scrollDown();
    //text('播报').findOnce(i+1).parent().parent().parent().parent().parent().click();
    wzlist[i+1].click();//由于文章播报可点击的父控件有6/7两种深度，现换成文章列表点击
    sleep(500)
      while (!textContains("欢迎发表你的观点").exists()) //如果没有找到评论框则认为没有进入文章界面，一直等待
    {
        sleep(1000);
        toastLog("等待进入文章界面")
    }
    toastLog("正在进行第" + (i + 1) + "次收藏和分享...");

    var textOrder = text("欢迎发表你的观点").findOnce().drawingOrder();
    var collectOrder = textOrder + 2;
    var shareOrder = textOrder + 3;
    var collectIcon = className("ImageView").filter(function(iv) {
        return iv.drawingOrder() == collectOrder;
    }).findOnce();

    var shareIcon = className("ImageView").filter(function(iv) {
        return iv.drawingOrder() == shareOrder;
    }).findOnce();

    //var collectIcon = classNameContains("ImageView").depth(10).findOnce(0);//右下角收藏按钮
    // collectIcon.click(); //点击收藏
    // console.info("收藏成功!");
    // sleep(1000);

    //var shareIcon = classNameContains("ImageView").depth(10).findOnce(1);//右下角分享按钮
    shareIcon.click(); //点击分享
    while (!text("分享到学习强国").exists()); //等待弹出分享选项界面
    sleep(1000);
    click("分享到学习强国");
    sleep(2000);
    console.info("分享成功!");
    back(); //返回文章界面
    sleep(1000);
    Comment(i);
    sleep(1000);
    back();
    sleep(1000);
    }
}
    

    
    // collectIcon.click(); //再次点击，取消收藏
    // console.info("取消收藏!");
    // sleep(1000);
    


/**
 * @description: 评论函数---2分
 * @param: i-文章标号
 * @return: null
 */
function Comment(i) {
    while (!textContains("欢迎发表你的观点").exists()) //如果没有找到评论框则认为没有进入文章界面，一直等待
    {
        sleep(1000);
        toastLog("等待进入文章界面")
    }
    click("欢迎发表你的观点"); //单击评论框
    toastLog("正在进行第" + (i + 1) + "次评论...");
    sleep(1000);
    var num = random(0, commentText.length - 1) //随机数
    setText(commentText[num]); //输入评论内容
    sleep(1000);
    click("发布"); //点击右上角发布按钮
    console.info("评论成功!");
    sleep(2000);
    click("删除"); //删除该评论
    sleep(2000);
    click("确认"); //确认删除
    console.info("评论删除成功!");
    sleep(1000);
}


/**
 * @description: 本地频道
 * @param: null
 * @return: null
 */
function localChannel() {
    while (!desc("工作").exists()); //等待加载出主页
    toastLog("点击本地频道");
    if (text("新思想").exists()) {
        text("新思想").findOne().parent().parent().child(3).click();
        sleep(3000);
        className("android.support.v7.widget.RecyclerView").findOne().child(0).click();
        sleep(2000);
        toastLog("返回主界面");
        sleep(2000)
        back();
        text("新思想").findOne().parent().parent().child(0).click();
    } else {
        toastLog("请手动点击本地频道！");
    }
}

/**
 * @description: 获取积分
 * @param: null
 * @return: null
 */
function getScores() {
    while (!text("积分").exists());//等待加载出主页
    toastLog("正在获取积分...");
    while (!text("积分明细").exists()) {
        if (id("comm_head_xuexi_score").exists()) {
            id("comm_head_xuexi_score").findOnce().click();
        } else if (text("积分").exists()) {
            text("积分").findOnce().parent().child(1).click();
        }
        delay(2);
    }

    let err = false;
    while (!err) {
        try {
            className("android.widget.ListView").findOnce().children().forEach(item => {
                let name = item.child(0).child(0).text();
                let str = item.child(2).text().split("/");
                let score = str[0].match(/[0-9][0-9]*/g);
                myScores[name] = score;
            });
            err = true;
        } catch (e) {
            toastLog(e);
        }
    }
    toastLog(myScores);
    delay(1);

    // while (!text("强国城兑福利").exists());
    // toastLog("正在获取点点通...");

    // click("强国城兑福利");

    // while (!text("点点通明细").exists());
    // text("点点通明细").findOnce().parent().click();
    // //sleep(5000);
    // while (!text("今日").exists());
    // sleep(1000);
    // myDiandian = {
    //     "有效浏览": 0,
    //     "有效视听": 0,
    //     "挑战答题": 0
    // };
    // try {
    //     var diandian = className("android.widget.ListView").findOnce(1).children();
    //     if (!diandian.empty()) {
    //         for (i = 1; i < diandian.length; i++) {
    //             let name = diandian[i].child(2).text();
    //             let str = diandian[i].child(3).text();
    //             let score = parseInt(str.match(/[0-9][0-9]*/g));
    //             myDiandian[name] += score
    //         }
    //     }
    // } catch (e) {
    //     // console.warn(e);
    // }
    // toastLog(myDiandian);
    // 阅读文章数
    aCount = 12 - myScores["我要选读文章"];
    // if (aCount < (12 - myDiandian["有效浏览"])) {
    //     aCount = 12 - myDiandian["有效浏览"];
    // }
    // 阅读文章时长
    if (aCount > 0) {
        aTime = 32;
    } else {
        aTime = 0;
    }
    // aTime = 30;
    // 视频学习数
    vCount = 6 - myScores["视听学习"];
    // 视频学习时长
    rTime = (6 - myScores["视听学习时长"]) * 60;
    if (rTime < 0) {
        rTime = 0;
    }
    // 如果条数够了，时长还不够，学习小视频，三条一个循环
    if (vCount == 0 && rTime > 0) {
        vCount = 3;
    }
    // 分享与发表观点
    if ((myScores["分享"] == 1) && (myScores["发表观点"] == 1)) {
        cCount = 0;
    } else {
        cCount = 2;
    }
    // 挑战答题次数
    lCount = 1 - myScores["挑战答题"] / 3;
    //aCount = 12;
    //aTime = 30;
    //vCount = 12;
    //lCount = 1;
    //rTime = 150;

    toastLog('剩余文章：' + aCount.toString() + '篇')
    toastLog('剩余每篇文章学习时长：' + aTime.toString() + '秒')
    toastLog('剩余视频：' + vCount.toString() + '个')
    toastLog('剩视听学习时长：' + rTime.toString() + '秒')
    /*
    sleep(1000);
    back();
    sleep(1000);
    back();
    sleep(1000);
    back();
    sleep(1000);
    back();*/
    while (!desc("工作").exists()) {
        //toastLog("正在等待加载出主页");
        back();
        sleep(1000);
    }
}
//纯积分获取

function getS() {
    while (!text("积分").exists());//等待加载出主页
    toastLog("正在获取积分...");
    while (!text("积分明细").exists()) {
        if (id("comm_head_xuexi_score").exists()) {
            id("comm_head_xuexi_score").findOnce().click();
        } else if (text("积分").exists()) {
            text("积分").findOnce().parent().child(1).click();
        }
        delay(2);
    }

    let err = false;
    while (!err) {
        try {
            className("android.widget.ListView").findOnce().children().forEach(item => {
                let name = item.child(0).child(0).text();
                let str = item.child(2).text().split("/");
                let score = str[0].match(/[0-9][0-9]*/g);
                myScores[name] = score;
            });
            err = true;
        } catch (e) {
            toastLog(e);
        }
    }
    toastLog(myScores);
    delay(1);
    while (!desc("工作").exists()) {
        //toastLog("正在等待加载出主页");
        back();
        sleep(1000);
    }
}


/**
 * @description: 获取ID号
 * @param: null
 * @return: null
 */
function getUserId() {
    while (!text("我的").exists()); //等待加载出主页

    toastLog("正在获取学号...");
    //id("comm_head_xuexi_mine").waitFor();
   // while (!id("comm_head_xuexi_mine").exists());
    // id("comm_head_xuexi_mine").click();
   // id("comm_head_xuexi_mine").findOne().click()
   sleep(1000)
   text('我的').findOne().click();
    sleep(1000)
    while(!id("my_avatar").exists())
    sleep(600)
    if (id("my_avatar").exists()) {
        id("my_avatar").findOne().click();
    }
    id("tv_item_title").className("android.widget.TextView").text("学号").waitFor();
    while (!text("学号").exists());
    sleep(500);
    idNumber = id("tv_item_content").findOnce(1).parent().child(1).text();
    toastLog("学号：", idNumber);

    while (!desc("工作").exists()) {
        //toastLog("正在等待加载出主页");
        back();
        sleep(1000);
    }
}

/**
 * @description: 启动app
 * @param: null
 * @return: null
 */
function start_app() {
   // console.setPosition(0, device.height * 0.12); //部分华为手机console有bug请注释本行
    //console.setSize(500,400)
    //console.show(); //部分华为手机console有bug请注释本行
    //console.setSize(300, 200)
    toastLog("正在启动app...");
//     FuncConfig = storages.create("强国学习配置"); 
//     //FuncList = {};
//   // accountList = {};
// var articlely = Funconfig.get("article");
// var videoly = Funconfig.get("video");
// var suby = Funconfig.get("sub");
// var daily = Funconfig.get("daliy");
// var weekly=Funconfig.get("week");
// var specially=Funconfig.get("special");
// var competely=Funconfig.get("compete");
// var challengely = Funconfig.get("challenge");
// var fightly = Funconfig.get("fight");
//  //  sleep(2000);
    //读取脚本配置
    FuncConfig = storages.create("强国学习配置"); 
    FuncList = {};
    //accountList = {};
   // FuncList["文章模式"] = FuncConfig.get("文章模式");
    //FuncList["账户切换"] = FuncConfig.get("账户切换");
    FuncList["文章学习"] = FuncConfig.get("文章学习");
    FuncList["广播学习"] = FuncConfig.get("广播学习");
    FuncList["视频学习"] = FuncConfig.get("视频学习");
    FuncList["订阅"] = FuncConfig.get("订阅");
    FuncList["分享评论"] = FuncConfig.get("分享评论");
    FuncList["本地频道"] = FuncConfig.get("本地频道");
    FuncList["日常答题"] = FuncConfig.get("日常答题");
    FuncList["每周答题"] = FuncConfig.get("每周答题");
    FuncList["专项答题"] = FuncConfig.get("专项答题");
    FuncList["四人赛"] = FuncConfig.get("四人赛");
    FuncList["挑战答题"] = FuncConfig.get("挑战答题");
    FuncList["对战答题"] = FuncConfig.get("对战答题");
   // FuncList["帐号列表"] = FuncConfig.get("帐号列表");
   // FuncList["开始序号"] = FuncConfig.get("开始序号");

    toastLog(FuncList);
    if (!launchApp("学习强国")) //启动学习强国app
    {
        console.error("找不到学习强国App!");
        return;
    }
    while (!text("我的").exists()) {
        toastLog("正在检测主页");
       // sleep(2000);
        //back();
        sleep(1000);
    }
    sleep(1000);
}

/**
 * @description: 数组洗牌//"ui";
/*
runtime.loadJar('./jsoup-1.12.1.jar');
importClass(org.jsoup.Jsoup);
importClass(org.jsoup.nodes.Document);
importClass(org.jsoup.select.Elements);
*/




/**
 * @Description: Auto.js xxqg-helper (6+6)+(6+6)+(1+1+2)+6+6+1+1=42分
 * @version: 3.1.6
 * @Author: Ivan
 * @Date: 2020-10-26
 */

var aCount = 12; //文章默认学习篇数
var vCount = 6; //小视频默认学习个数
var cCount = 2; //收藏+分享+评论次数
var asub = 3;
var aTime = 10; //每篇文章学习-103秒 103*7≈720秒=12分钟
var vTime = 30; //每个小视频学习-15秒
var rTime = 900; //广播收听-18分钟

var commentText = ["支持党，支持国家！", "为实现中华民族伟大复兴而不懈奋斗！", "紧跟党走，毫不动摇！",
    "不忘初心，牢记使命", "努力奋斗，报效祖国！"
]; //评论内容，可自行修改，大于5个字便计分

var aCatlog = "推荐" //文章学习类别，可自定义修改为“要闻”、“新思想”等

var lCount = 1; //挑战答题轮数
var qCount = random(5,7); //挑战答题每轮答题数
var rightCount = 0; //争上游正确答题记数
var myScores = {}; //分数
//var myDiandian = {}; //点点通
var idNumber = ""; //学号
var customize_flag = false; //自定义运行标志

/**
 * @description: 延时函数
 * @param: seconds-延迟秒数
 * @return: null
 */
function delay(seconds) {
    sleep(1000 * seconds); //sleep函数参数单位为毫秒所以乘1000
}
   
/**
 * @description: 生成从minNum到maxNum的随机数
 * @param: minNum-较小的数
 * @param: maxNum-较大的数
 * @return: null
 */
function randomNum(minNum, maxNum) {
    switch (arguments.length) {
        case 1:
            return parseInt(Math.random() * minNum + 1, 10);
        case 2:
            return parseInt(Math.random() * (maxNum - minNum + 1) + minNum, 10);
        default:
            return 0;
    }
} 

/**
 * @description: 文章学习计时(弹窗)函数
 * @param: n-文章标号 seconds-学习秒数
 * @return: null
 */
function article_timing(n, seconds) {
    seconds = randomNum(seconds - 5, seconds + 5);
    h = device.height; //屏幕高
    w = device.width; //屏幕宽
    // x = w * 0.64;
    x = (w / 5) * 3;
    h1 = h * 0.2;
    h2 = h * 0.85;
    for (var i = 0; i < seconds; i++) {
        while (!textContains("欢迎发表你的观点").exists()) //如果离开了文章界面则一直等待
        {
            console.error("当前已离开第" + (n + 1) + "文章界面，请重新返回文章页面...");
            sleep(1000);
            back();
            sleep(500)
        }
        if (i % 5 == 0) //每5秒打印一次学习情况
        {
            console.info("第" + (n + 1) + "篇文章已经学习" + (i + 1) + "秒,剩余" + (seconds - i - 1) + "秒!");
        }
        sleep(1000);
        if (i % 10 == 0) //每10秒滑动一次，如果android版本<7.0请将此滑动代码删除
        {
            toast("这是防息屏toast,请忽视-。-");
            if (i <= seconds / 2) {
                swipe(x, h2, x, h1, randomNum(450, 550)); //向下滑动
                //gestures([randomNum(450,550), [x, h2], [x, h1]]);
            } else {
                swipe(x, h1, x, h2, randomNum(450, 550)); //向上滑动
                //gesture(randomNum(450,550), [x, h1], [x, h2]);
            }
        }
    }
}

/**
 * @description: 视频学习计时(弹窗)函数
 * @param: n-视频标号 seconds-学习秒数
 * @return: null
 */
function video_timing_bailing(n, seconds) {
    seconds = randomNum(seconds - 5, seconds + 5);
    for (var i = 0; i * 5 < seconds; i++) {
        while (!textContains("分享").exists()) //如果离开了百灵小视频界面则一直等待
        {
            console.error("当前已离开第" + (n + 1) + "个百灵小视频界面，请重新返回视频");
            sleep(2000);
        }
        if (seconds > ((i + 1) * 5)) {
            sleep(5000);
            console.info("第" + (n + 1) + "个小视频算法")
        }
    }
}
/*
 * @param: 数组arr
 * @return: 随机排序后的数组arr
 */
function randSort(arr){
    for(i = 0,len = arr.length;i < len; i++ ){
        var rand = parseInt(Math.random()*len);
        var temp = arr[rand];
        arr[rand] = arr[i];
        arr[i] = temp;
    }
    return arr;
}

//主函数
function main() {
    if (!tikuCommon.judge_tiku_existence()) { //题库不存在则退出
        return;
    }
    if (!tikuCommon.judge_tiku_columnName_existence("option")) {
        var sql = "ALTER  TABLE  tiku  ADD COLUMN  option CHAR(10)"
        // tikuCommon.executeSQL(sql);
        return;
    }
    /* // 开启截屏功能
    if (!requestScreenCapture()) { 
        toastLog("请求截图失败"); 
        exit(); 
    }  */
    // requestScreenCapture();
 
    start_app(); //启动app
    var start = new Date().getTime(); //程序开始时间
    let lastWeek = getLastweekDateString();
    //toastLog(lastWeek);
    cleanLearnedArticle(lastWeek); //先清空浏览记录
    date_string = getTodayDateString();
    // localChannel(); //本地频道
    //除文章和视频学习外，都要先判断
    sleep(300)
    getUserId(); //获取学号
    sleep(300)
    getScores(); //获取积分
    //sleep(7000);
    let radioOn = false;
    var musicVolume = device.getMusicVolume();
    device.setMusicVolume(0);
    try {
        if ((myScores['本地频道'] != 1)&&(FuncList['本地频道'])) {
            localChannel(); //本地频道
            //toastLog("电台");
            radioOn = true;
        }
        if ((rTime > 0)&&(FuncList['广播学习'])) {
            listenToRadio(); //听电台广播
            radioOn = true;
            var r_start = new Date().getTime(); //广播开始时间
        }
        var startNumber = [1, 2, 3, 4, 5, 6, 7, 8, 9];
        startNumber = randSort(startNumber);
        console.info(startNumber);
        for (var l = 0; l < startNumber.length; l++){
            toastLog(startNumber[l]);
            switch (startNumber[l]) {
                case 1:
                    toastLog("1");
                    if ((myScores['挑战答题'] != 6)&&(FuncList['挑战答题'])) {
                        challengeQuestion(); //挑战答题
                    }
                    break;
                case 2:
                    toastLog("2");
                    if ((myScores['双人对战'] == 0)&&(FuncList['对战答题'])) {
                        doubleBattle(); //双人对战
                    }
                    break;
                case 3:
                    toastLog("3");
                    if ((myScores['四人赛'] < 3)&&(FuncList['四人赛'])) {
                        
                        zsyBattle(); //争上游答题
                    }
                    break;
                case 4:
                    toastLog("4");
                    if ((myScores['每日答题'] != 5)&&(FuncList['日常答题'])) {
                        dailyQuestion(); //每日答题
                    }
                    break;
                case 5:
                    toastLog("5");
                //     let curr_time = new Date();
                //     let weekNum = curr_time.getDay();
                //     // toastLog('weekday:' + weekNum);
                    if ((myScores['订阅'] == 0 )&&(FuncList['订阅'])) {
                    
                        sub(); //订阅学习平台
                        backMain()
                     }
                     break;
                case 7:
                    toastLog("7");
                    if((myScores['每周答题']==0)&&(FuncList['每周答题'])){
                        weeklyQuestion();
                    }
                    break;
                case 8:
                    toastLog("8");
                    if((myScores['专项答题']==0)&&(FuncList['专项答题'])){
                        zhuanxiangQuestion();
                    }
                    break;
                case 9:
                    toastLog("9");
                    if((myScores['分享']==0)&&(FuncList['分享评论'])){
                        
                        newCollectAndShare();
                    }
                    break;
                case 6:
                    toastLog("6");
                    // 原新闻学习
                    // 原打开电台，开始计时
                    if (aCount == 0) {
                        aCount = cCount;
                        aTime = 10;
                    }
                    if ((aCount != 0)&&(FuncList['文章学习'])&&(myScores['我要选读文章'] != 12)) {
                    
                    articleStudy(); //学习文章，包含点赞、分享和评论
                        getScores();
                    }
            }
        }
        
        if (((rTime > 0) && !radioOn)&&(FuncList['广播学习'])) {
            
            listenToRadio(); //继续听电台
            radioOn = true;
        }
        var end = new Date().getTime(); //广播结束时间
        var radio_time = (parseInt((end - r_start) / 1000)); //广播已经收听的时间
        radio_timing(radio_time, rTime - radio_time); //广播剩余需收听时间
        if ((radioOn)&&(FuncList['广播学习'])) {
            stopRadio();
        }
        if ((myScores['视听学习'] != 6)&&(FuncList['视频学习'])) {
         //  if (1) {
            videoStudy_news(); //看视频
            getS()
            // toastLog('小视频学习')
            // vCount= 2*(6 - myScores['视听学习时长']);
            // vTime=30;
            // videoStudy_bailing(vCount, vTime); //看视频
            
        }
        while ((myScores['视听学习时长'] != 6)&&(FuncList['视频学习'])) {
           // getScores();
            if ((myScores['视听学习时长'] != 6)&&(FuncList['视频学习'])) {
                toastLog('小视频学习')
                //getS()
          //  toastLog('小视频学习')
                vCount= 2*(6 - myScores['视听学习时长']);
                vTime=30;
          //  videoStudy_bailing(vCount, vTime); //看视频
            
                videoStudy_bailing(vCount, vTime); //看视频
                
            }
            getS();
        }
        while((myScores['我要选读文章'] != 12)&&(FuncList['文章学习'])){
             if ((myScores['我要选读文章'] != 12)&&(FuncList['文章学习'])) {
           // getScores();) {
                 toastLog('文章学习')
                // aCatlog = "时评"
                 articleStudy(); //看视频
                 
            }
             getS();
            //aCount = 0;
        }
      
    } catch(e) {
        console.error(e);
    }
    device.setMusicVolume(musicVolume);
    end = new Date().getTime(); //程序结束时间
    toastLog("运行结束,共耗时" + (parseInt(end - start)) / 1000 + "秒");
}


/********************************************UI部分***********************************************/
/*
auto.waitFor(); //等待获取无障碍辅助权限

ui.layout(
    <vertical>
        <text textSize="16sp" textColor="red" text="欢迎使用xxqg-helper!" />
        <button id="all" h="90" text="完整运行" />
        <button id="customize" h="90" text="自定义运行（文章视频数量按照自定义值）" />
        <button id="cq" h="60" text="挑战答题" />
        <button id="dq" h="60" text="每日答题" />
        <button id="wq" h="60" text="每周答题" />
        <button id="zq" h="60" text="专项答题" />
        <button id="stop" h="70" text="停止运行" />
        
        <horizontal>
            <text textSize="16sp" marginLeft="15" textColor="black" text="文章学习类别:" />
            <input id="acatlog" text="" />
        </horizontal>
        
        <horizontal>
            <text textSize="16sp" marginLeft="15" textColor="black" text="文章数量(个):" />
            <input id="acount" w="30" text="" />
            <text textSize="16sp" marginLeft="15" textColor="black" text="视频数量(个):" />
            <input id="vcount" w="30" text="" />
        </horizontal>
        
        <horizontal>
            <text textSize="16sp" marginLeft="15" textColor="black" text="挑战答题轮数:" />
            <input id="lcount" w="30" text="" />
            <text textSize="16sp" marginLeft="15" textColor="black" text="挑战答题每轮答题数:" />
            <input id="qcount" w="30" text="" />
        </horizontal>
        
        
        <button w="250" layout_gravity="center" id="about" text="关于本助手" />
    </vertical>
);

ui.acatlog.setText(aCatlog.toString());
ui.acount.setText(aCount.toString());
ui.vcount.setText(vCount.toString());
ui.lcount.setText(lCount.toString());
ui.qcount.setText(qCount.toString());

var thread = null;

ui.all.click(function() {
    if (thread != null && thread.isAlive()) {
        alert("注意!", "当前程序正在运行，请结束之前进程");
        return;
    }
    toast("开始完整运行");
    thread = threads.start(function() {
        aCatlog = ui.acatlog.getText();
        lCount = parseInt(ui.lcount.getText());
        qCount = parseInt(ui.qcount.getText());
        main();
    });
});

ui.customize.click(function() {
    if (thread != null && thread.isAlive()) {
        alert("注意!", "当前程序正在运行，请结束之前进程");
        return;
    }
    toast("开始自定义运行");
    thread = threads.start(function() {
        aCount = parseInt(ui.acount.getText());
        vCount = parseInt(ui.vcount.getText());
        aCatlog = ui.acatlog.getText();
        lCount = parseInt(ui.lcount.getText());
        qCount = parseInt(ui.qcount.getText());
        customize_flag = true;
        toastLog('文章数量：' + aCount.toString() + '篇')
        toastLog('视频数量：' + vCount.toString() + '个')
        toastLog('类别：' + aCatlog)
        main();
    });
});


ui.cq.click(function() {
    if (thread != null && thread.isAlive()) {
        alert("注意!", "当前程序正在运行，请结束之前进程");
        return;
    }
    thread = threads.start(function() {
        lCount = parseInt(ui.lcount.getText());
        qCount = parseInt(ui.qcount.getText());
        start_app();
        challengeQuestion();
    });
});

ui.dq.click(function() {
    if (thread != null && thread.isAlive()) {
        alert("注意!", "当前程序正在运行，请结束之前进程");
        return;
    }
    thread = threads.start(function() {
        start_app();
        dailyQuestion();
    });
});

ui.zq.click(function() {
    if (thread != null && thread.isAlive()) {
        alert("注意!", "当前程序正在运行，请结束之前进程");
        return;
    }
    thread = threads.start(function() {
        console.setPosition(0, device.height / 2); //部分华为手机console有bug请注释本行
        console.show(); //部分华为手机console有bug请注释本行
        toastLog("正在启动app...");
        if (!launchApp("学习强国")) //启动学习强国app
        {
            console.error("找不到学习强国App!");
            return;
        }
        zhuanxiangQuestion();
    });
});

ui.wq.click(function() {
    if (thread != null && thread.isAlive()) {
        alert("注意!", "当前程序正在运行，请结束之前进程");
        return;
    }
    thread = threads.start(function() {
        console.setPosition(0, device.height / 2); //部分华为手机console有bug请注释本行
        console.show(); //部分华为手机console有bug请注释本行
        toastLog("正在启动app...");
        if (!launchApp("学习强国")) //启动学习强国app
        {
            console.error("找不到学习强国App!");
            return;
        }
        toastLog('每周')
        weeklyQuestion();
    });
});

ui.stop.click(function() {
    if (thread != null && thread.isAlive()) {
        threads.shutDownAll();
        toast("已停止运行！")
        console.hide();
    } else {
        toast("当前没有线程在运行！")
    }
});
/*
ui.update.click(function () {
    if (thread != null && thread.isAlive()) {
        alert("注意!", "当前程序正在运行，请结束之前进程");
        return;
    }
    confirm("确认更新题库吗?")
    .then(c => {
        if(c){
            console.show();
            thread = threads.start(function () {
                updateTikunet()
            });
            console.hide();
        }
    });
});

ui.about.click(function() {
    alert("xxqg-helper", "本脚本只可用于个人学习Auto.js，不得用于一切商业或违法用途，否则追究责任！造成的后果自负！\n 任何问题请上github交流!");
});
*/


/*************************************************挑战答题部分******************************************************/

/**
 * @description: 挑战答题
 * @param: null
 * @return: null
 */
function challengeQuestion() {
    while (!id("comm_head_xuexi_mine").exists());
    id("comm_head_xuexi_mine").click();
    //while (!textContains("我的").exists());
    //text("我的").click();
    while (!textContains("我要答题").exists());
    sleep(1000);
    click("我要答题");
    while (!text("每日答题").exists());
    sleep(1000);
    let myImage = className("android.view.View").text("每日答题").findOne();
    // toastLog(myImage.parent().parent().childCount());
    myImage = myImage.parent().parent().child(10);
    myImage.click();
    // text("挑战答题").click();
    console.verbose("开始挑战答题")
    sleep(4000);
    let conNum = 0; //连续答对的次数
    let lNum = 1; //轮数
    while (true) {
        questionCommon.challengeQuestionLoop(conNum, qCount);
        sleep(randomNum(2,4) * 1000);
        if (text("v5IOXn6lQWYTJeqX2eHuNcrPesmSud2JdogYyGnRNxujMT8RS7y43zxY4coWepspQkvw" +
                "RDTJtCTsZ5JW+8sGvTRDzFnDeO+BcOEpP0Rte6f+HwcGxeN2dglWfgH8P0C7HkCMJOAAAAAElFTkSuQmCC").exists()) //遇到❌号，则答错了,不再通过结束本局字样判断
        {
            if (lNum >= lCount && conNum >= qCount) {
                console.verbose("挑战答题结束！");
                /* 回退4次返回主页 */
                while (!desc("工作").exists()) {
                    //toastLog("正在等待加载出主页");
                    back();
                    sleep(1000);
                }
                break;
            } else {
                console.verbose("等10秒开始下一轮...")
                sleep(3000); //等待10秒才能开始下一轮
                if (textStartsWith("确定退出答题练习").exists()) {
                    click("退出");
                }
                back();
                //desc("结束本局").click();//有可能找不到结束本局字样所在页面控件，所以直接返回到上一层
                sleep(1000);
                //desc("再来一局").click();
                back();
                while (!text("每日答题").exists());
                sleep(1000);
                // text("挑战答题").click();
                let myImage = className("android.view.View").text("每日答题").findOne();
                // toastLog(myImage.parent().parent().childCount());
                myImage = myImage.parent().parent().child(10);
                myImage.click();
                sleep(4000);
                if (conNum >= qCount) {
                    lNum++;
                }
                conNum = 0;
            }
            console.warn("第" + lNum.toString() + "轮开始...")
        } else //答对了
        {
            conNum++;
        }
    }
}

/*************************************************争上游、双人对战部分*************************************************/

/**
 * @description: 双人对战
 * @param: null
 * @return: null
 */
function doubleBattle() {
    while (!id("comm_head_xuexi_mine").exists());
    id("comm_head_xuexi_mine").click();
    //while (!textContains("我的").exists());
    //text("我的").click();
    while (!textContains("我要答题").exists());
    sleep(1000);
    click("我要答题");
    while (!text("每日答题").exists());
    sleep(1000);
    let myImage = className("android.view.View").text("每日答题").findOne();
    // toastLog(myImage.parent().parent().childCount());
    myImage = myImage.parent().parent().child(9);
    myImage.click();
    sleep(1000);
    if (text("网络较差").exists()) {
        toastLog("网络较差！下次再战！");
        return;
    }
    className("android.view.View").text("").findOne().click();
    console.verbose("开始双人对战");
    // sleep(1000);
    // text("开始对战").click();
    //sleep(4000);
    let conNum = 0; //连续答对的次数
    let lNum = 1; //轮数
    rightCount = 0; //答对题数
    while (!text("开始").exists());
    while (rightCount < 5) {

        try {
            var isRight = false;
            // isRight = questionCommon.competitionLoop(conNum);
            if (questionCommon.competitionLoop(conNum)) { //如果点击正确答案，正确点击数加1
                rightCount++;
            }
        } catch (error) {
            
        }
        if (text("100").depth(24).exists() || text("继续挑战").exists()) {
            toastLog("有人100了");
            break;
        }
        //sleep(randomNum(4000, 6000));
        //sleep(3000);
        conNum++;

    }
    // toastLog("挑战答题结��");
    console.verbose("双人对战结束");
    sleep(4000);
    back();
    sleep(1000);
    back();
    text("退出").click();
    while (!desc("工作").exists()) {
        //toastLog("正在等待加载出主页");
        back();
        sleep(1000);
    }
}

/**
 * @description: 争上游答题
 * @param: null
 * @return: null
 */
function zsyBattle() {
    while (!id("comm_head_xuexi_mine").exists());
    id("comm_head_xuexi_mine").click();
    while (!textContains("我要答题").exists());
    sleep(1000);
    click("我要答题");
    while (!text("每日答题").exists());
    sleep(1000);
    let myImage = className("android.view.View").text("每日答题").findOne();
    // toastLog(myImage.parent().parent().childCount());
    myImage = myImage.parent().parent().child(8);
    myImage.click();

    if (text("网络较差").exists()) {
        toastLog("网络较差！下次再战！");
        return;
    }
    console.verbose("开始四人赛");
    text("开始比赛").click();
    sleep(1000);
    let conNum = 0; //连续答对的次数
    let lNum = 2; //轮数
    for (i = 0; i < lNum; i++) {
        if (questionCommon.competitionLoop(conNum)) { //如果点击正确答案，正确点击数加1
                rightCount++;
            }
        }
        sleep(4000);

    text("继续挑战").click();
    // toastLog("争上游答题结束");
    console.verbose("四人赛结束");
    while (!desc("工作").exists()) {
        //toastLog("正在等待加载出主页");
        back();
        sleep(1000);
    }
}

/*************************************************每日答题部分***************************************************/
/**
 * @description: 每日答题
 * @param: null
 * @return: null
 */
function dailyQuestion() {
    while (!id("comm_head_xuexi_mine").exists());
    id("comm_head_xuexi_mine").click();
    //text("我的").click();
    while (!textContains("我要答题").exists());
    sleep(1000);
    click("我要答题");
    while (!text("每日答题").exists());
    sleep(1000);
    text("每日答题").click();
    console.verbose("开始每日答题");
    sleep(2000);
    let dlNum = 0; //每日答题轮数
    while (true) {
        questionCommon.dailyQuestionLoop();
        if (text("再来一组").exists()) {
            sleep(2000);
            dlNum++;
            if (!text("领取奖励已达今日上限").exists()) {
                text("再来一组").click();
                console.warn("第" + (dlNum + 1).toString() + "轮答题:");
                sleep(1000);
            } else {
                console.verbose("每日答题结束！");
                text("返回").click();
                /* sleep(1000);
                back();
                sleep(1000);
                back();
                sleep(1000); */
                while (!desc("工作").exists()) {
                    //toastLog("正在等待加载出主页");
                    back();
                    sleep(1000);
                }
                break;
            }
        }
    }
}


/**
 * @description: 每周答题
 * @param: null
 * @return: null
 */
function weeklyQuestion() {
    while (!id("comm_head_xuexi_mine").exists());
    id("comm_head_xuexi_mine").click();
    //text("我的").click();
    while (!textContains("我要答题").exists());
    sleep(1000);
    click("我要答题");
    while (!text("每周答题").exists());
    sleep(1000);
    text("每周答题").click();
    sleep(1000);
    if (text("未作答").exists()){
        text("未作答").findOne().parent().click();
   // var x1=text("未作答").findOnce().bounds().centerX();
   // var y1=text("未作答").findOnce().bounds().centerY();
   // click(x1,y1);
    console.verbose("开始每周答题");
    sleep(2000);
    let dlNum = 0; //每周答题轮数
    //console.verbose("开始每周答题");
    sleep(500);
    while (true) {
        questionCommon.dailyQuestionLoop();
        if (text("返回").exists()) {
            back();
            sleep(1000);
            back();
            sleep(1000);
            back();
            //sleep(1000);
            //back();
            //sleep(1000);
            while (!desc("工作").exists()) {
                    //toastLog("正在等待加载出主页");
                    back();
                    sleep(1000);
                }
            break;
        }
    }
    console.verbose("每周答题结束");
  }else{
      console.verbose("无可答题目，返回主界面");
      back();
      sleep(1000);
      back();
      sleep(1000);
      while (!desc("工作").exists()) {
                    //toastLog("正在等待加载出主页");
                    back();
                    sleep(1000);
                }
  }
}

/**
 * @description: 专项答题
 * @param: null
 * @return: null
 */
function zhuanxiangQuestion() {
    while (!id("comm_head_xuexi_mine").exists());
    id("comm_head_xuexi_mine").click();
    //text("我的").click();
    while (!textContains("我要答题").exists());
    sleep(1000);
    click("我要答题");
    while (!text("每周答题").exists());
    sleep(1000);
    text("专项答题").click();
    sleep(1000);
    if (text("开始答题").exists()){
        text("开始答题").findOne().click();
  //  var x1=text("开始答题").findOnce().bounds().centerX();
   // var y1=text("开始答题").findOnce().bounds().centerY();
   // click(x1,y1);
    console.verbose("开始专项答题");
    sleep(2000);
    let dlNum = 0; //每周答题轮数
    console.verbose("开始专项答题");
    sleep(500);
    //console.verbose("开始专项答题");
    //sleep(2000);
    while (true) {
        questionCommon.dailyQuestionLoop();
        if (text("返回").exists() || text("查看解析").exists()) {
            back();
            sleep(1000);
            back();
            sleep(1000);
            back();
            //sleep(1000);
            //back();
            //sleep(1000);
            while (!desc("工作").exists()) {
                    //toastLog("正在等待加载出主页");
                    back();
                    sleep(1000);
                }
            break;
        }
    }
    console.verbose("专项答题结束");
    }else{
           console.verbose("无可答题目，返回主界面");
      back();
      sleep(1000);
      back();
      sleep(1000);
      while (!desc("工作").exists()) {
                    //toastLog("正在等待加载出主页");
                    back();
                    sleep(1000);
                }   
    }
}


/*************************************************订阅部分***************************************************/
// /**
//  * @description: 订阅强国号
//  * @param  null
//  * @return: null
//  */
// function Subscription() {
//     var listView = className("android.view.View").depth(13).findOnce(1);
//     var listArray = listView.children();
//     //toastLog(listArray[1].child(1).text());

//     var delayTime = 120;
//     var myColor = "#e32416";
//     //var myColor = "#f2f3f5";
//     var myThreshold = 4;
//     var isName = "";
//     while (true) {
//         try {
//             if (isName == listArray[2].child(1).text()) {
//                 break;
//             }
//             // console.hide(); //隐藏console控制台窗口
//             sleep(delayTime); //等待截屏
//             var img = captureScreen(); //截个屏
//             // captureScreen("./ddd.png");//截个屏
//             // var img = images.read("./ddd.png");
//             // console.show(); //显示console控制台窗口
    
//             isName = listArray[2].child(1).text();
//             var isFind = false;
//             listArray.some(item => {
//                 // let isSub = isSubscription(delayTime, myColor, myThreshold, item.child(2));
    
//                 if (item.children().length > 2) {
//                     //toastLog(item.child(1).text());
//                     var listBounds = item.child(2).bounds();
//                     // toastLog(listBounds);
//                     var point = findColor(img, myColor, {
//                         region: [listBounds.left, listBounds.top, listBounds.right - listBounds.left, listBounds.bottom - listBounds.top],
//                         threshold: myThreshold
//                     });
//                     if (point) {
//                         // toastLog(item.child(1).text());
//                         toastLog("已订阅");
//                         item.child(2).click();
//                         isFind = true;
//                         sleep(1000)
//                         return true;
//                     } else {
//                         // return false;
//                     }
//                 }
//                 //displayColor(item.child(2).bounds().centerX() + 5, item.child(2).bounds().centerY() + 5);
//             });
//             if (!isFind && listView.scrollable()) {
//                 listView.scrollForward();
//                 sleep(100);
//                 //console.error("滑动");
//                 listView = className("android.view.View").depth(13).findOnce(1);
//                 listArray = listView.children();
//                 if (isName == listArray[2].child(1).text()) {
//                     listView.scrollForward();
//                     //console.warn("滑动2");
//                     listView = className("android.view.View").depth(13).findOnce(1);
//                     listArray = listView.children();
//                 }
//             }
//             sleep(100);
//         } catch(e) {
//             console.error(e);
//         } 
//     }
//     return isFind;
// }
// /**
// @description: 学习平台订阅
// @param: null
// @return: null
// */
// function subScribe() {
//     h = device.height; //屏幕高
//     w = device.width; //屏幕宽
//     x = (w / 3) * 2; //横坐标2分之3处
//     h1 = (h / 6) * 5; //纵坐标6分之5处
//     h2 = (h / 6); //纵坐标6分之1处
//     while (!desc("工作").exists()); //等待加载出主页
//     desc("工作").click();
//     toastLog('正在订阅...');
//     click("订阅");
//     sleep(random(1000, 2000));
//     //click("添加");
//     //text("添加").click();
//     //toastLog(className("android.widget.TextView").depth(25).text("添加").findOnce().text());
//     //listArray = className("android.support.v7.widget.RecyclerView").findOne().children();
//     //toastLog(listArray[0].findOne(className("android.widget.TextView")).text());
//     //className("android.support.v7.widget.RecyclerView").findOne().children().forEach(child => {
//         //var target = child.findOne(className("android.widget.TextView"));
//         //target.parent().click();
//         //toastLog(target.text());
//     //});
//     // toastLog(className("android.support.v7.widget.RecyclerView").findOne().children().findOne(className("android.widget.TextView")).text());
    
//     className("android.support.v7.widget.RecyclerView").findOne().child(0).click();
//     sleep(random(1000, 2000));
//     click("上新");
//     //click("主要央媒");
//     sleep(random(1000, 2000));
//     // click("强国号",0);
//     // toastLog(className("android.widget.ListView").findOnce(0));
//     // var listView = className("android.widget.ListView").findOnce(0); //获取listView视频列表控件用于翻页
//     var i = myScores["订阅"];
//     // toastLog("订阅：" + i);
//     i = 0
//     let falseNumber = 0; 
//     let isSub = false;
//     while (i < 2) {
//         isSub = Subscription();
//         // toastLog(isSub);
//         if (isSub) {
//             i++;
//             myScores["订阅"]++;
//             // toastLog(myScores["订阅"]);
//         } else {
//             //break;
//             falseNumber++;
//             //click("推荐");
//             //sleep(1000);
//         }
//         if (falseNumber > 2) {
//             toastLog("没有可订阅的强国号");
//             break;
//         }
//     }
//     back();
//     //while (!desc("工作").exists());
//     desc("工作").click();
//     // click("时评");
//     sleep(1000);
// }
//module.exports = {
 //   main:main,
    //insertQuestions:insertQuestions
//};

module.exports = main;