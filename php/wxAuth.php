<?php
//https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx4069e1635ae1be38&redirect_uri=http%3a%2f%2fwww.wexue.top%2fwxAuth.php&response_type=code&scope=snsapi_base&state=http%3a%2f%2fwww.wexue.top%3a20000%2fhuaxue%2findex.html#wechat_redirect
header("Content-type: text/html; charset=utf-8");
$openid = '';
$code = $_GET['code'];
$state = $_GET['state'];
$url = 'https://api.weixin.qq.com/sns/oauth2/access_token?appid=wx4069e1635ae1be38&secret=4578c042ea9361b6e16626f1aa3d7e52&code=' . $code . '&grant_type=authorization_code';
$result = null;

try {
    $result = curlGet($url);

    $obj = json_decode($result);
    $openid = $obj->openid;
} catch (Exception $e) {
    echo $e->getTraceAsString();
}

function curlGet($url, $method = 'get', $data = '')
{
    $ch = curl_init();
    $header = "Accept-Charset: utf-8";
    curl_setopt($ch, CURLOPT_URL, $url);
    curl_setopt($ch, CURLOPT_CUSTOMREQUEST, strtoupper($method));
    curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, FALSE);
    curl_setopt($ch, CURLOPT_SSL_VERIFYHOST, FALSE);
    curl_setopt($ch, CURLOPT_USERAGENT, 'Mozilla/5.0 (compatible; MSIE 5.01; Windows NT 5.0)');
    curl_setopt($ch, CURLOPT_FOLLOWLOCATION, 1);
    curl_setopt($ch, CURLOPT_AUTOREFERER, 1);
    curl_setopt($ch, CURLOPT_POSTFIELDS, $data);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
    $temp = curl_exec($ch);
    return $temp;
}

header("Location:" . urldecode($state) . "?openid=" . $openid);

?>