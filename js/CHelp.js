function CHelp(oSpriteBg) {

    var _oBg;
    var _oGroup1;
    var _oGroup2;

    var _oMsgText;
    var _oMsgText2;
    var _oMsgText3;

    var _oHelpSprite;
    var _oArrowLeft;
    var _oArrowRight;
    var _pStartPosExit;
    var _oButExit;


    this._init = function (oSpriteBg) {

        _oGroup1 = new createjs.Container();
        _oGroup1.alpha = 0;
        _oGroup1.visible = false;

        _oGroup2 = new createjs.Container();
        _oGroup2.visible = false;

        _oBg = createBitmap(oSpriteBg);

        s_oStage.addChild(_oBg);

        _oMsgText = new createjs.Text("", " 40px " + FONT, "#ffffff");
        _oMsgText.x = CANVAS_WIDTH / 2;
        _oMsgText.y = (CANVAS_HEIGHT / 3) + 20;
        _oMsgText.textAlign = "center";
        _oMsgText.textBaseline = "alphabetic";
        _oMsgText.lineWidth = 500;
        _oGroup1.addChild(_oMsgText);


        _oMsgText.text = TEXT_MOBILE;
        _oMsgText.text = TEXT_MOBILE;
        _oHelpSprite = createBitmap(s_oSpriteLibrary.getSprite('help_mobile'));
        _oHelpSprite.x = CANVAS_WIDTH / 2 - 250;
        _oHelpSprite.y = CANVAS_HEIGHT / 2 - 150;
        _oGroup1.addChild(_oHelpSprite);

        s_oStage.addChild(_oGroup1);

        var operate = createBitmap(s_oSpriteLibrary.getSprite('operate'));
        operate.x = CANVAS_WIDTH / 2 - 250;
        operate.y = CANVAS_HEIGHT / 2 - 150;
        _oGroup2.addChild(operate);

        var oSprite = s_oSpriteLibrary.getSprite('btn_start');
        _pStartPosExit = {x: CANVAS_WIDTH - 170, y: CANVAS_HEIGHT / 2 - 215};
        _oButExit = new CGfxButton(394, 1002, oSprite, s_oStage);
        _oButExit.addEventListener(ON_MOUSE_UP, this._onExit, this);

        s_oStage.addChild(_oGroup2);

        _oArrowLeft = createBitmap(s_oSpriteLibrary.getSprite('arrow'));
        _oArrowLeft.x = CANVAS_WIDTH / 2 - 270;
        _oArrowLeft.y = CANVAS_HEIGHT / 2;
        _oArrowLeft.regX = 30;
        _oArrowLeft.regY = 43;
        _oArrowLeft.rotation = 180;
        s_oStage.addChild(_oArrowLeft);

        _oArrowRight = createBitmap(s_oSpriteLibrary.getSprite('arrow'));
        _oArrowRight.x = CANVAS_WIDTH / 2 + 270;
        _oArrowRight.y = CANVAS_HEIGHT / 2;
        _oArrowRight.regX = 30;
        _oArrowRight.regY = 43;
        s_oStage.addChild(_oArrowRight);

        _oArrowLeft.visible = false;
        _oArrowRight.visible = true;
        this.show();
    };

    this._initListener = function () {
        _oArrowLeft.addEventListener("click", this._previousPage);
        _oArrowRight.addEventListener("click", this._nextPage);
    };

    this._previousPage = function () {
        _oGroup1.visible = true;
        _oGroup2.visible = false;
        _oArrowLeft.visible = false;
        _oArrowRight.visible = true;
    };

    this._nextPage = function () {
        _oGroup1.visible = false;
        _oGroup2.visible = true;
        _oArrowLeft.visible = true;
        _oArrowRight.visible = false;
    };

    this.show = function () {

        _oGroup1.visible = true;

        var oParent = this;
        createjs.Tween.get(_oGroup1).to({alpha: 1}, 500).call(function () {
            oParent._initListener();
        });
    };

    this._onExit = function () {
        s_oGame.onHelpExit();
    };

    this.unload = function () {
        _oArrowLeft.removeAllEventListeners("click");
        _oArrowRight.removeAllEventListeners("click");
        s_oStage.removeChild(_oGroup1);
        s_oStage.removeChild(_oGroup2);
        s_oStage.removeChild(_oArrowRight);
        s_oStage.removeChild(_oArrowLeft);
        _oButExit.unload();
        s_oStage.removeChild(_oBg);

    };

    this._init(oSpriteBg);

    return this;
}
