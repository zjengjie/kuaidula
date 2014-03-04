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
date_default_timezone_set('Asia/Taipei');
if ($_POST['text'] && $_POST['text'] != "" && strpos($_POST['text'], "欢迎使用“快读啦") == false){
	$str = date("F j, Y, g:i a") . "-快读啦信息：来自";
	$str .= $_SERVER["REMOTE_ADDR"];
	$str .= "的朋友读了：";
	$str .= $_POST['text'];
	$str .= "\n";
	file_put_contents("nimda/log.txt", $str, FILE_APPEND);
	// error_log($str, 1, 'landxh@gmail.com');
	// error_log($str, 1, '496851081@qq.com');
} else {

}

?>