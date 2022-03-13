stopRadio()
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
    sleep(3000);
    log("2222")
    id("cn.xuexi.android:id/bg_play").findOnce().children().click();
    sleep(1000)

    back()
    }
    
 }

