<?php
$sourceUrl=$_GET["sourceUrl"];
header("Location:https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx4069e1635ae1be38&redirect_uri=http%3a%2f%2fwww.wexue.top%2fwxAuth.php&response_type=code&scope=snsapi_base&state=".$sourceUrl."#wechat_redirect");
?>