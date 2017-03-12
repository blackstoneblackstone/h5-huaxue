<?php
$openid = $_GET['openid'];
if ($openid == '' || $openid == null) {
    if ($_COOKIE['openid'] == null || $_COOKIE['openid'] == '') {
        $sourceUrl = "http://www.wexue.top/games/hx/index.php";
        $sourceUrl = urlencode($sourceUrl);
        header("location:https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx4069e1635ae1be38&redirect_uri=http%3a%2f%2fwww.wexue.top%2fwxAuth.php&response_type=code&scope=snsapi_base&state=" . $sourceUrl . "#wechat_redirect");
    } else {
        $openid = $_COOKIE['openid'];
    }
} else {
    setcookie('openid', $openid);
}


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
<html><!DOCTYPE html>
<html>
<head>
    <title>王府井赛特奥莱临潼店开业啦</title>
    <link rel="stylesheet" href="css/reset.css"
          type="text/css">
    <link rel="stylesheet" href="css/main.css"
          type="text/css">
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">

    <meta name="msapplication-tap-highlight" content="no"/>
    <script>
        if (/Android (\d+\.\d+)/.test(navigator.userAgent)) {
            var version = parseFloat(RegExp.$1);
            if (version > 2.3) {
                var phoneScale = parseInt(window.screen.width) / 790;
                document.write('<meta name="viewport" content="width=790, minimum-scale = ' + phoneScale + ', maximum-scale = ' + phoneScale + ', target-densitydpi=device-dpi">');
            } else {
                document.write('<meta name="viewport" content="width=790, target-densitydpi=device-dpi">');
            }
        } else {
            document.write('<meta name="viewport" content="width=790, user-scalable=no, target-densitydpi=device-dpi">');
        }
    </script>
    <script type="text/javascript" src="js/zepto.min.js"></script>
    <script type="text/javascript" src="js/createjs-2014.12.12.min.js"></script>
    <script type="text/javascript" src="js/CVector2.js"></script>
    <script type="text/javascript" src="js/CMath.js"></script>
    <script type="text/javascript" src="js/ctl_utils.js"></script>
    <script type="text/javascript" src="js/sprite_lib.js"></script>
    <script type="text/javascript" src="js/settings.js"></script>
    <script type="text/javascript" src="js/CLang.js"></script>
    <script type="text/javascript" src="js/CPreloader.js"></script>
    <script type="text/javascript" src="js/CMain.js"></script>
    <script type="text/javascript" src="js/CTextButton.js"></script>
    <script type="text/javascript" src="js/CToggle.js"></script>
    <script type="text/javascript" src="js/CGfxButton.js"></script>
    <script type="text/javascript" src="js/CMenu.js"></script>
    <script type="text/javascript" src="js/CExplain.js"></script>
    <script type="text/javascript" src="js/CGame.js"></script>
    <script type="text/javascript" src="js/CInterface.js"></script>
    <script type="text/javascript" src="js/CEndPanel.js"></script>
    <script type="text/javascript" src="js/CPausePanel.js"></script>
    <script type="text/javascript" src="js/CSkier.js"></script>
    <script type="text/javascript" src="js/CObstacle.js"></script>
    <script type="text/javascript" src="js/CScrollingBg.js"></script>
    <script type="text/javascript" src="js/CLineStroke.js"></script>
    <script type="text/javascript" src="js/CHelp.js"></script>
</head>
<body ondragstart="return false;" ondrop="return false;">
<div
    style="z-index:-1;position: fixed; background-color: transparent; top: 0px; left: 0px; width: 100%; height: 100%"></div>
<script>
    $(document).ready(function () {
        $("#close").tap(function () {
            $("#seeWx").hide();
            $("#canvas").show();
        });
        var oMain = new CMain({
            skier_spd: 20,               //Skier friction. More you increase it, lower will be the friction on the snow.
            obstacles_spd: 20,           //Obstacles speed. More you increase it, greater will be the obstacle speed.
            score_to_add: 1,             //Score to add at every update
            score_bonus: 50,             //Score to add when you pick a yellow flag
            max_object_for_type: 10,     //Number of max objects to create
            min_object_row: 1,           //Minimum number of obstacles for each row
            max_object_row: 3,           //Maximum number of obstacles for each row
            speed_increase_score: 500,   //Value of score to increase speed. Example: every 500 points, obstacle speed is increased.
            speed_increase: 5          //Amount of the obstacle speed increment.
        });


        $(oMain).on("game_start", function (evt) {
            //alert("game_start");
        });

        $(oMain).on("save_score", function (evt, iScore) {
            $.ajax({
                url: "saveScore.php?openid=<?php echo $openid?>&score=" + iScore,
                method: 'get'
            })
        });

        $(oMain).on("restart", function (evt) {
            //alert("restart");
        });

        if (isIphone()) {
            setTimeout(function () {
                sizeHandler();
            }, 200);
        } else {
            sizeHandler();
        }
    });

</script>

<div id="seeWx">
    <img id="close" src="sprites/but_exit.png" style="position:absolute;height:80px;height: 80px;top:30px;right: 30px;">
    <img src="sprites/seeWx.jpg" style="height: 100%;width: 100%">
</div>
<canvas id="canvas" class='ani_hack' width="790" height="1330"
        style="background-color:#fefaef;height: 100%;width: 100%;"></canvas>
<script type="text/javascript" src="js/jweixin-1.0.0.js"></script>
<script type="text/javascript">
    wx.config(
        <?php echo $wxParams;?>
    );
    wx.ready(function () {
        wx.onMenuShareTimeline({
            title: '王府井赛特奥莱临潼店开业啦', // 分享标题
            link: 'http://www.wexue.top/games/hx/index.php', // 分享链接
            imgUrl: 'http://www.wexue.top/games/hx/sprites/bg_explain.png', // 分享图标
            success: function () {
            },
            cancel: function () {
            }
        });
        wx.onMenuShareAppMessage({
            title: '王府井赛特奥莱临潼店开业啦', // 分享标题
            desc: '小羊肖恩带你赚翻圣诞,快来挑战吧', // 分享描述
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