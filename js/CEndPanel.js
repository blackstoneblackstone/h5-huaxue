function CEndPanel(oSpriteBg) {

    var _oBg;
    var _oGroup;

    var _oMsgText;
    var _oMsgTextOutline;
    var _oScoreText;
    var _oScoreTextOutline;

    var _pStartPosExit;
    var _oButExit;
    var _pStartPosRestart;
    var _oButRestart;
    var  _oMsgText2;

    this._init = function (oSpriteBg) {

        //活动画面
        _oBg = createBitmap(oSpriteBg);
        _oBg.x = 90;
        _oBg.y = 400;

        _oMsgTextOutline = new createjs.Text("", " 80px " + FONT1, "#000000");
        _oMsgTextOutline.x = CANVAS_WIDTH / 2;
        _oMsgTextOutline.y = 150;
        _oMsgTextOutline.textAlign = "center";
        _oMsgTextOutline.textBaseline = "alphabetic";
        _oMsgTextOutline.lineWidth = 500;
        _oMsgTextOutline.outline = 3;

        _oMsgText = new createjs.Text("", " 80px " + FONT1, "#ffffff");
        _oMsgText.x = CANVAS_WIDTH / 2;
        _oMsgText.y = 150;
        _oMsgText.textAlign = "center";
        _oMsgText.textBaseline = "alphabetic";
        _oMsgText.lineWidth = 500;

        _oScoreTextOutline = new createjs.Text("", " 50px " + FONT, "#bc1a20");
        _oScoreTextOutline.x = CANVAS_WIDTH / 2;
        _oScoreTextOutline.y = 250;
        _oScoreTextOutline.textAlign = "center";
        _oScoreTextOutline.textBaseline = "alphabetic";
        _oScoreTextOutline.lineWidth = 500;
        _oScoreTextOutline.outline = 3;

        _oScoreText = new createjs.Text("", " 50px " + FONT, "#bc1a20");
        _oScoreText.x = CANVAS_WIDTH / 2;
        _oScoreText.y = 250;
        _oScoreText.textAlign = "center";
        _oScoreText.textBaseline = "alphabetic";
        _oScoreText.lineWidth = 500;

        _oMsgText2 = new createjs.Text(TEXT_GAMEOVER_1, "bolder 50px " + FONT1, "#bc1a20");
        _oMsgText2.x = CANVAS_WIDTH / 2;
        _oMsgText2.y = 350;
        _oMsgText2.textAlign = "center";
        _oMsgText2.textBaseline = "alphabetic";
        _oMsgText2.lineWidth = 500;


        _oGroup = new createjs.Container();
        _oGroup.alpha = 0;
        _oGroup.visible = false;

        //背景长方形
        var bgRect = new createjs.Shape();
        bgRect.graphics.beginFill("#fefaef").drawRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);

        _oGroup.addChild(bgRect,_oBg, _oScoreTextOutline, _oScoreText, _oMsgTextOutline, _oMsgText,_oMsgText2);


        s_oStage.addChild(_oGroup);
    };

    this.unload = function () {
        s_oStage.removeChild(_oGroup);
        _oButExit.unload();
        _oButRestart.unload();
    };


    this.show = function (iScore, bFalling) {
        if (DISABLE_SOUND_MOBILE === false || s_bMobile === false) {
            var oGameOver = createjs.Sound.play("game_over");
            oGameOver.volume = 0.6;
        }

        _oMsgTextOutline.text = TEXT_GAMEOVER;
        _oMsgText.text = TEXT_GAMEOVER;

        _oScoreTextOutline.text = TEXT_SCORE + iScore;
        _oScoreText.text = TEXT_SCORE + iScore;

        _oGroup.visible = true;

        if (bFalling === false) {
            s_oGame.setUpdateFalse();
        }
        createjs.Tween.get(_oGroup).to({alpha: 1}, 1200).call(function () {
            s_oGame.setUpdateFalse();
        });

        var oSprite = s_oSpriteLibrary.getSprite('but_ph');
        _pStartPosExit = {x: 560, y: 1128};
        _oButExit = new CGfxButton(_pStartPosExit.x, _pStartPosExit.y, oSprite, _oGroup);
        _oButExit.addEventListener(ON_MOUSE_UP, this._onExit, this);

        var oSpriteRestart = s_oSpriteLibrary.getSprite('but_restart');
        _pStartPosRestart = {x: 230, y: 1128};
        _oButRestart = new CGfxButton(_pStartPosRestart.x, _pStartPosRestart.y, oSpriteRestart, _oGroup);
        _oButRestart.addEventListener(ON_MOUSE_UP, this._onRestart, this);

        $(s_oMain).trigger("save_score", [iScore, s_bNumActive]);
    };

    this._onExit = function () {
        if (DISABLE_SOUND_MOBILE === false || s_bMobile === false) {
            createjs.Sound.play("click");
        }
        // s_oGame.onExit();
        document.getElementById("canvas").style.display="none";
        document.getElementById("seeWx").style.display="block";

    };


    this._onRestart = function () {
        if (DISABLE_SOUND_MOBILE === false || s_bMobile === false) {
            createjs.Sound.play("click");
        }

        s_oGame.restartGame();

        s_oStage.removeChild(_oGroup);
        _oButExit.unload();
        _oButRestart.unload();
    };

    this._init(oSpriteBg);

    return this;
}
