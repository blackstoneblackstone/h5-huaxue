<?php
$openid = $_GET['openid'];
if ($openid == '' || $openid == null) {
    if ($_COOKIE['openid'] == null || $_COOKIE['openid'] == '') {
        $sourceUrl = "http://www.wexue.top/games/hx/Rank.php";
        $sourceUrl = urlencode($sourceUrl);
        header("location:https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx4069e1635ae1be38&redirect_uri=http%3a%2f%2fwww.wexue.top%2fwxAuth.php&response_type=code&scope=snsapi_base&state=" . $sourceUrl . "#wechat_redirect");
    } else {
        $openid = $_COOKIE['openid'];
    }
} else {
     setcookie('openid', $openid);
}

$con = mysql_connect("123.57.237.121", "root", "lihb123456");
if (!$con) {
    die('Could not connect: ' . mysql_error());
}
mysql_select_db("games", $con);
$gameScore = mysql_query("select * from stal where openid='" . $openid . "';");
$row = mysql_fetch_array($gameScore);
$score = 0;
$Rank = 0;
$state = true;
$lottery = "加油奥!";
$img = "";
if (empty($row)) {
    $state = false;
} else {
    $score = $row['score'];
    $gameRank = mysql_query("select count(id) from stal where score >='" . $score . "';");
    $gameRankRow = mysql_fetch_array($gameRank);
    $Rank = $gameRankRow['0'];
    if ($Rank <= 10) {
        $lottery = "60CM肖恩公仔一只";
        $img = "price/1.png";
    }
    if ($Rank > 10 && $Rank <= 30) {
        $lottery = "胖胖雪莉公仔一只";
        $img = "price/2.png";
    }
    if ($Rank > 30 && $Rank <= 60) {
        $lottery = "肖恩靠垫一个";
        $img = "price/3.png";
    }
    if ($Rank > 60 && $Rank <= 150) {
        $lottery = "肖恩钥匙扣一个";
        $img = "price/4.png";
    }

}
mysql_close($con);


$wxParams = curlGet("http://www.wexue.top/weixinjs.php?url=" . urlencode('http://www.wexue.top' . $_SERVER["REQUEST_URI"]));
// $wxParams = curlGet("http://localhost/v5/weixinjs.php?url=http://wx.widalian.com:8082".$_SERVER["REQUEST_URI"]);


function curlGet($url)
{
    $ch = curl_init();

    curl_setopt($ch, CURLOPT_URL, $url);
    curl_setopt($ch, CURLOPT_CUSTOMREQUEST, "GET");
    curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, FALSE);
    curl_setopt($ch, CURLOPT_SSL_VERIFYHOST, FALSE);
    curl_setopt($ch, CURLOPT_USERAGENT, 'Mozilla/5.0 (compatible; MSIE 5.01; Windows NT 5.0)');
    curl_setopt($ch, CURLOPT_FOLLOWLOCATION, 1);
    curl_setopt($ch, CURLOPT_AUTOREFERER, 1);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);

    $info = curl_exec($ch);

    if (curl_errno($ch)) {
        echo 'Errno' . curl_error($ch);
    } else {
        // echo 'success!!!';

        curl_close($ch);

        return $info;
    }
}

?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>我的排名</title>
    <meta name="viewport"
          content="width=device-width, user-scalable=no, initial-scale=1.0, minimum-scale=1.0, maximum-scale=1.0, minimal-ui"/>
    <meta name="msapplication-tap-highlight" content="no"/>
    <link href="css/weui.css" rel="stylesheet">
    <style>
        body {
            font-family: 微软雅黑;
            text-align: center;
        }

        .btn {
            float: left;
            height: 40px;
            text-align: center;
            border-radius: 8px;
            line-height: 40px;
        }
    </style>
</head>
<body>
<img src="sprites/logo.png" style="width: 55%;margin-top: 10px">
<img src="sprites/paihang.png" style="width: 80%;margin-top: 20px">
<?php if ($state) {
    ?>
    <div style="margin-top: 20px;text-align: center;width: 100%">
        您当前的最高分是:<label id="score"
                        style="color:#bc1a20;font-weight: bolder;font-size: 30px"><?php echo $score ?></label><br>
        排名是:<label id="rank" style="color:#bc1a20;font-size: 30px;font-weight: bolder;"><?php echo $Rank ?></label>
        <br>
        有机会获得<br>
        <label style="color:#bc1a20;font-weight: bolder;font-size: 25px">
            <?php echo $lottery; ?>
        </label>
        <br>
        <img src="<?php echo $img ?>">
    </div>
    <div style="width: 100%;height: 50px;margin-top: 10px">
        <div class="btn" id="rebtn" style="width: 50%;background-color: #bc1a20;color: #ffffff;margin-left: 8%">
            再玩一次
        </div>
        <div class="btn" id="huanbtn" style="width: 30%;background-color: #CCCCCC;margin-left: 4%;color: #999999">
            兑奖
        </div>
    </div>

<?php } else { ?>
    <div style="width: 100%;height: 50px;margin-top: 10px">
        <div style="font-size: 20px;">您还没参加活动</div>
        <div class="btn" id="rebtn" style="margin-top:20px;margin-bottom: 50px;width: 80%;background-color: #bc1a20;color: #ffffff;margin-left: 10%">
            小羊滑雪赢大奖
        </div>
    </div>
<?php } ?>
<div style="margin-top: 20px;text-align: left;margin-left:auto;margin-right: auto;font-size: 12px;width: 80%">
    <strong>兑奖日期</strong>:12月23日—12月25日<br>
    <strong>领奖地点</strong>:王府井赛特奥莱 临潼店 顾客服务中心<br>
    <strong>兑奖说明</strong>:您在12月23日之前都可以刷新分数,兑奖以22日24时截止的排行为准
</div>
<div style="text-align: center;width: 100%;font-size: 12px;margin-top: 10px;color: #cccccc">
    ©&™ Aardman Animations Ltd 2016
</div>
<div class="weui_dialog_confirm" id="priceTip" style="display: none">
    <div class="weui_mask"></div>
    <div class="weui_dialog">
        <div class="weui_dialog_hd"><strong class="weui_dialog_title">提示</strong></div>
        <div class="weui_dialog_bd">请您在12月23日—12月25日到王府井赛特奥莱-临潼店-顾客服务中心兑换</div>
        <div class="weui_dialog_ft">
            <a href="#" class="weui_btn_dialog primary" id="confirm">确定</a>
        </div>
    </div>
</div>
<script src="js/zepto.min.js" type="text/javascript"></script>
<script type="text/javascript" src="js/jweixin-1.0.0.js"></script>
<script>
    $("#rebtn").tap(function () {
        window.location.href = "index.php";
    })
    $("#huanbtn").tap(function () {
        $("#priceTip").show();
    })
    $("#confirm").tap(function () {
        $("#priceTip").hide();
    })

    wx.config(
        <?php echo $wxParams;?>
    );
    wx.ready(function () {
        wx.onMenuShareTimeline({
            title: '赛特奥莱临潼店开业啦,滑雪赢大奖,我得了<?php echo $score ?>分,快来挑战吧!', // 分享标题
            link: 'http://www.wexue.top/games/hx/index.php', // 分享链接
            imgUrl: 'http://www.wexue.top/games/hx/sprites/bg_explain.png', // 分享图标
            success: function () {
            },
            cancel: function () {
            }
        });
        wx.onMenuShareAppMessage({
            title: '赛特奥莱临潼店开业啦', // 分享标题
            desc: '滑雪赢大奖,我得了<?php echo $score ?>分,排名<?php echo $Rank ?>,快来挑战吧!!', // 分享描述
            link: 'http://www.wexue.top/games/hx/index.php', // 分享链接
            imgUrl: 'http://www.wexue.top/games/hx/sprites/bg_explain.png', // 分享图标
            type: 'link', // 分享类型,music、video或link，不填默认为link
            dataUrl: '', // 如果type是music或video，则要提供数据链接，默认为空
            success: function () {
                // 用户确认分享后执行的回调函数
            },
            cancel: function () {
                // 用户取消分享后执行的回调函数
            }
        });
    });
    var _mtac = {};
    (function () {
        var mta = document.createElement("script");
        mta.src = "http://pingjs.qq.com/h5/stats.js?v2.0.2";
        mta.setAttribute("name", "MTAH5");
        mta.setAttribute("sid", "500366321");

        var s = document.getElementsByTagName("script")[0];
        s.parentNode.insertBefore(mta, s);
    })();
</script>
</body>
</html>