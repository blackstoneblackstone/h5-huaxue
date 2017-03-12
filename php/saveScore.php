<?php

$openid = $_GET['openid'];
$gamescore = $_GET['score'];


$con = mysql_connect("123.57.237.121", "root", "lihb123456");
if (!$con) {
    die('Could not connect: ' . mysql_error());
}
mysql_select_db("games", $con);
$game = mysql_query("select * from stal where openid='" . $openid . "';");
$row = mysql_fetch_array($game);
echo json_encode($row);
if (empty($row)) {
    $re = mysql_query("insert into stal  (openid,score,time) values ('" . $openid . "'," . $gamescore . ",now());");
//    echo json_encode($re);
} else {
    if ($row['score'] <= $gamescore) {
        mysql_query("update  stal  set score=" . $gamescore . " where openid='" . $openid . "';");
    }
}
mysql_close($con);
?>