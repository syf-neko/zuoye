<?php
header('content-type:text/html;charset=utf8')
$connect = mysqli_connect('loncalhost','root','root','mysql',3306);
if(mysquli_connect_error()){
	die('数据库连接错误')
}

?>