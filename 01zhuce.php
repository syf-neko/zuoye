<?php
	include "./connect.php"; 

	$username = $_POST['un'];
	$password = $_POST['pw'];
	$sql = "INSERT INTO info (username,password) VALUES ('$username','$password')";
	$result = mysqli_query($connect,$sql);
	if($result){
		setcookie("username",$username,time()+24*60*60);
		setcookie("password",$password,time()+24*60*60);
		echo $username."注册成功";
	}else{
		echo "注册失败";
	}
?>