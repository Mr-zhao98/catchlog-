//开启截屏功能
if (!requestScreenCapture()) { 
    console.log("请求截图失败"); 
    exit(); 
} 
//toastLog(" 请在无障碍中选择本 APP");
auto.waitFor();

let window = floaty.window(
    <horizontal gravity="center">
        {/* <button id="move" text=" 移动 " w="42" h="80" bg="#77ffffff" textSize="10sp" /> */}
      
      
        <button id="switchXX" text=" 切到强国 " w="42" h="80" bg="#77ffffff" textSize="10sp" />
       
        <button id="startLL" text=" 单账号(一键) " w="42" h="80" bg="#77ffffff" textSize="10sp" />
        <button id="startDZH" text=" 多账号(一键) " w="42" h="80" bg="#77ffffff" textSize="10sp" /> 
        <button id="startDT" text=" 挑战答题 " w="42" h="80" bg="#77ffffff" textSize="10sp" />
        <button id="startZSY" text=" 争上游/双人" w="42" h="80" bg="#77ffffff" textSize="10sp" />
      {/*   <!--
        <button id="startMR" text=" 每周/专项答题等 " w="42" h="80" bg="#77ffffff" textSize="10sp" />
        --> */}
        <button id="stop" text=" 停止 " w="42" h="80" bg="#77ffffff" textSize="10sp" />
        <button id="exit" text=" 退出 " w="42" h="80" bg="#77ffffff" textSize="10sp" />
        
    </horizontal>
);

let deviceWidth = device.width;
let deviceHeight = device.height;
window.setSize(-2, -2);
window.setPosition(deviceWidth * 0.02, deviceHeight * 0.03);
setInterval(() => {
}, 1000);


/* let wx, wy, downTime, windowX, windowY;
// 这个函数是对应悬浮窗的移动
window.move.setOnTouchListener(function (view, event) {
    switch (event.getAction()) {
        case event.ACTION_DOWN:
            wx = event.getRawX();
            wy = event.getRawY();
            windowX = window.getX();
            windowY = window.getY();
            downTime = new Date().getTime();
            return true;
        case event.ACTION_MOVE:
            // 如果按下的时间超过 xx 秒判断为长按，调整悬浮窗位置
            if (new Date().getTime() - downTime > 300) {
                window.setPosition(windowX + (event.getRawX() - wx), windowY + (event.getRawY() - wy));
            }
            return true;
        case event.ACTION_UP:
            // 手指弹起时如果偏移很小则判断为点击
            if (Math.abs(event.getRawY() - wy) < 30 && Math.abs(event.getRawX() - wx) < 30) {
                toastLog(" 长按调整位置 ")
            }
            return true;
    }
    return true;
});
 */
window.switchXX.click(() => {
   toastLog(" 切换到学习强国APP...");
   if (!launchApp("学习强国"))//启动学习强国app
   {
       console.error("找不到学习强国App!");
       return;
   }
});



// 这个函数是对应悬浮窗的退出
window.exit.click(() => {
    toastLog(" 退出！");
    exit();
});


let th = null;
/*打卡
window.startDK.click(() => {
    let ss = "./打卡.js";
    startTh(ss);
});
*/

//一键学习
window.startLL.click(() => {
    let ss = "./hwxxqg_v3.1.6.js";
    startTh(ss);
});
//多账号执行
window.startDZH.click(() => {
    if(files.exists('./用户数据.txt')){
  
    let ss = "./Maccount.js";
   startTh(ss);
   //engines.execScriptFile("Maccount.js");
     }else{
      toastLog("请先录入账号,再执行多账号版本")  
    }

});
//挑战答题
window.startDT.click(() => {
    let ss = "./challengeAnswer.js";
    startTh(ss);
});
//争上游
window.startZSY.click(() => {
    let ss = "./competition.js";
    startTh(ss);
});
//每日答题
/*
window.startMR.click(() => {
    let ss = "./dailyAnswer.js";
    startTh(ss);
});
*/
//停止
window.stop.click(() => {
    if (th == null) {
        toastLog(" 没有进行中的脚本 ");
    } else {
        if (th.isAlive()) {
            threads.shutDownAll();
            toastLog(" 停止！");
        } else {
            toastLog(" 没有进行中的脚本 ");
        }
    }
});

function startTh(fileStr) {
    var ss = fileStr;
    if (th == null) {
        th = threads.start(function () {
            toastLog(" 开启线程");
            let begin = require(ss);
            begin();
        });
    } else {
        if (th.isAlive()) {
            toastLog(" 脚本都在运行了你还点！？");
        } else {
            th = threads.start(function () {
                let begin = require(ss);
                begin();
            });
        }
    }
}