<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8">
<title>html学习2.2.1</title>
</head>
<script>
    function myhide(id){
        var btn = document.getElementById("button_"+id);
        var ansdiv = document.getElementById("ans_"+id);
        if(btn.innerHTML == "查看答案"){
            ansdiv.style = "display:block";
            btn.innerHTML = "隐藏答案";
        }else{
            ansdiv.style = "display:none";
            btn.innerHTML = "查看答案";
        }
    }
</script>
</html>

（1）中村部長と直接話した。 

1.ちょくぜつ&emsp;&emsp;2.ちょうせつ&emsp;&emsp;3.ちょくせつ&emsp;&emsp;4.ちょうぜつ

<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8">
</head>
<body>
    <div><button id="button_1" onclick="myhide('1')">查看答案</button></div>
    <div id="ans_1" style="display:none">第1题的答案是59</div>
</body>
</html>

