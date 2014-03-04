<!DOCTYPE HTML>
<html>
<head>
	<title>快读啦</title>
	<script type="text/javascript">
	location.href = "//kuaidula.com";
	</script>
</head>
<body>

</body>
</html>
<?php
if ($_POST['text'] && $_POST['text'] != "" && $_POST['text'] != "十九八七六五四三二一开始！欢迎使用“快读啦”，你可以不用移动你的眼球就能阅读，相信大家已经明白怎么使用了，请尽兴！"){
	$str = "快读啦信息：来自";
	$str .= $_SERVER["REMOTE_ADDR"];
	$str .= "的朋友读了：";
	$str .= $_POST['text'];
	error_log($str, 1, 'landxh@gmail.com');
	error_log($str, 1, '496851081@qq.com');
} else {

}

?>