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