function CExplain() {
    var _oBg, _oButPlay, explainText1, explainText2, explainText3, explainText4, explainText5, explainText6, explainText7, line, lineGraphics;

    this._init = function () {
        s_oSpriteLibrary.addSprite("game_fail1", "./sprites/game_fail1.png");
        s_oSpriteLibrary.addSprite("game_fail2", "./sprites/game_fail2.jpg");
        s_oSpriteLibrary.addSprite("game_fail3", "./sprites/game_fail3.png");
        s_oSpriteLibrary.addSprite("game_fail4", "./sprites/game_fail4.png");
        s_oSpriteLibrary.addSprite("game_fail5", "./sprites/game_fail5.png");
        s_oSpriteLibrary.addSprite("game_fail6", "./sprites/game_fail6.png");
        s_oSpriteLibrary.loadSprites();
        
        _oBg = createBitmap(s_oSpriteLibrary.getSprite('bg_explain'));
        _oBg.y = 50;
        _oBg.alpha = 0;
        s_oStage.addChild(_oBg);
        createjs.Tween.get(_oBg).to({alpha: 1}, 1500).call(function () {

        });

        if (DISABLE_SOUND_MOBILE === false || s_bMobile === false) {
            s_oSoundtrack.volume = 1;
        }

        //游戏说明
        explainText1 = new createjs.Text(TEXT_LOTTERY_EXPLAIN, "bolder 35px "+FONT1, "#000000");
        explainText1.textAlign = "center";
        explainText1.textBaseline = "alphabetic";
        explainText1.y = 700;
        explainText1.x = CANVAS_WIDTH / 2;
        s_oStage.addChild(explainText1);


        //线
        line = new createjs.Shape();
        lineGraphics = line.graphics;
        lineGraphics.beginStroke("#CCCCCC");
        lineGraphics.setStrokeStyle(1);
        lineGraphics.moveTo(80, 800);
        lineGraphics.lineTo(710, 800);
        s_oStage.addChild(line);

        //奖品列表
        explainText2 = new createjs.Text(TEXT_LOTTERY_LIST, "30px 微软雅黑", "#000000");
        explainText2.textAlign = "left";
        explainText2.textBaseline = "alphabetic";
        explainText2.lineHeight = 50;
        explainText2.y = 850;
        explainText2.x = 100;
        s_oStage.addChild(explainText2);

        //数字
        explainText3 = new createjs.Text("1 0", "30px gotham_boldregular", "#ff6527");
        explainText3.y = 825;
        explainText3.x = 223;
        s_oStage.addChild(explainText3);

        explainText4 = new createjs.Text(20, "30px gotham_boldregular", "#ff6527");
        explainText4.y = 875;
        explainText4.x = 223;
        s_oStage.addChild(explainText4);

        explainText5 = new createjs.Text(30, "30px gotham_boldregular", "#ff6527");
        explainText5.y = 925;
        explainText5.x = 223;
        s_oStage.addChild(explainText5);

        explainText6 = new createjs.Text(90, "30px gotham_boldregular", "#ff6527");
        explainText6.y = 975;
        explainText6.x = 223;
        s_oStage.addChild(explainText6);

        //开始游戏按钮
        var oSprite = s_oSpriteLibrary.getSprite('btn_start');
        _oButPlay = new CGfxButton((CANVAS_WIDTH / 2), CANVAS_HEIGHT - 330, oSprite);
        _oButPlay.addEventListener(ON_MOUSE_UP, this._onButPlayRelease, this);

        //奖品领取地址
        explainText7 = new createjs.Text(TEXT_LOTTERY_PLACE, "25px "+FONT1, "#000000");
        explainText7.textAlign = "left";
        explainText7.textBaseline = "alphabetic";
        explainText7.lineHeight = 50;
        explainText7.y = CANVAS_HEIGHT - 230;
        explainText7.x = 100;
        s_oStage.addChild(explainText7);


    };

    this._onSiteLogoRelease = function () {
        // CreateLinksInGame('Ski-Rush','game','logo');
    };

    this.unload = function () {

        _oButPlay.unload();
        _oButPlay = null;

        s_oStage.removeChild(_oBg);
        s_oStage.removeChild(explainText1);
        s_oStage.removeChild(explainText2);
        s_oStage.removeChild(explainText3);
        s_oStage.removeChild(explainText4);
        s_oStage.removeChild(explainText5);
        s_oStage.removeChild(explainText6);
        s_oStage.removeChild(explainText7);
        s_oStage.removeChild(line);
        _oBg = null;
        explainText1 = null;
        explainText2 = null;
        explainText3 = null;
        explainText4 = null;
        explainText5 = null;
        explainText6 = null;
        explainText7 = null;
        line=null;
    };

    // this.refreshButtonPos = function (iNewX, iNewY) {
    //     _oAudioToggle.setPosition(_pStartPosAudio.x - iNewX, iNewY + _pStartPosAudio.y);
    // };

    this._onAudioToggle = function () {
        createjs.Sound.setMute(s_bAudioActive);
        s_bAudioActive = !s_bAudioActive;
    };

    this._onButPlayRelease = function () {
        this.unload();

        if (DISABLE_SOUND_MOBILE === false || s_bMobile === false) {
            createjs.Sound.play("click");
        }

        s_oMain.gotoGame();
    };

    s_oExplain = this;

    this._init();
}

var s_oExplain = null;