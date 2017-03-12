<?php
$openid = $_GET['openid'];
$pwd = $_GET['pwd'];
if($pwd!="7612"){
    echo "密码不对";exit;
}

$con = mysql_connect("123.57.237.121", "root", "lihb123456");
if (!$con) {
    die('Could not connect: ' . mysql_error());
}
mysql_select_db("games", $con);
mysql_query("update  stal  set state= 1 where openid='" . $openid . "';");
mysql_close($con);
echo 0;
?>