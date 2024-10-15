/** 应用在外语>日语 >试题页面
 * 点击按钮（id=“chakan_”+数字）
 * 按钮的文字在“显示答案”和“隐藏答案”之间切换
 * div（id=“daan_”+数字）同步显示答案或者隐藏答案 */
function hidetimu(id){
    var btn = document.getElementById("chakan_"+id);
    var ansdiv = document.getElementById("daan_"+id);
    if(btn.innerHTML == "查看答案"){
        ansdiv.style = "display:block";
        btn.innerHTML = "隐藏答案";
    }else{
        ansdiv.style = "display:none";
        btn.innerHTML = "查看答案";
    }
}

// 滚动到页面顶部的函数
function scrollToTop() {
    window.scrollTo({
      top: 0,
      behavior: 'smooth' // 可选，平滑滚动效果
    });
}