<?php
header('content-type:text/html;charset=utf8')
$connect = mysqli_connect('loncalhost','root','root','mysql',3306);
$uname = $_REQUEST['username'];
$pw = $_REQUEST['password'];
$sql = "SELECT * FROM info WHERE username='$uname' AND password='$pw'";
$result = mysqli_query($connect,$sql);
$rows = mysqli_num_rows($result);
if($rows>0){
	setcookie('un',$uname,time()+24*3600);
	setcookie('pw',$pw,time()+24*3600);
	echo "1";
}else{
	echo "0";
}
?>