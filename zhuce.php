<?php
header('content-type:text/html;charset=utf8')
$connect = mysqli_connect('loncalhost','root','root','mysql',3306);
require "./connect.php";
$uname = $_REQUEST['username'];
$pw = $_REQUEST['password'];

$sql = "SELECT * FROM info WHERE username='$uname' AND password='$pw'";

$result = mysqli_query($connect,$sql);

$rows = mysqli_num_rows($result);
if($rows>0){
	echo "1";
}else{
	$bool = mysql_query($connect,"INSERT INTO userinfo (name,password) VALUES ('$uname','$pw')")
	if($bool){
		echo "0";	
	}	
}

?>