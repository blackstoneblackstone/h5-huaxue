function CMenu() {
    var _oBg;
    var _oButPlay;
    var _oFade;
    var _oAudioToggle;

    var _pStartPosAudio;
    var menu;

    this._init = function () {
        _oBg = createBitmap(s_oSpriteLibrary.getSprite('bg_menu'));
        _oBg.on("pressup", this._onButPlayRelease);
        s_oStage.addChild(_oBg);

        if (DISABLE_SOUND_MOBILE === false || s_bMobile === false) {
            s_oSoundtrack.volume = 1;
        }

        var oSprite = s_oSpriteLibrary.getSprite('btn_play');
        _oButPlay = new CGfxButton((CANVAS_WIDTH / 2), CANVAS_HEIGHT - 180, oSprite);
        createjs.Tween.get(_oButPlay.getButtonImage(), {loop: true}).to({alpha: 0.2, y: (CANVAS_HEIGHT - 100)}, 1500);

        if (DISABLE_SOUND_MOBILE === false || s_bMobile === false) {
            var oSprite = s_oSpriteLibrary.getSprite('audio_icon');
            _pStartPosAudio = {x: CANVAS_WIDTH - (oSprite.height / 2) - 10, y: (oSprite.height / 2) + 10};
            _oAudioToggle = new CToggle(_pStartPosAudio.x, _pStartPosAudio.y, oSprite, s_bAudioActive);
            _oAudioToggle.addEventListener(ON_MOUSE_UP, this._onAudioToggle, this);
        }

        _oFade = new createjs.Shape();
        _oFade.graphics.beginFill("black").drawRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);

        s_oStage.addChild(_oFade);

        createjs.Tween.get(_oFade).to({alpha: 0}, 1000).call(function () {
            _oFade.visible = false;
        });
        menu = this;
    };

    this.unload = function () {
        _oButPlay.unload();
        _oButPlay = null;

        s_oStage.removeChild(_oBg);
        _oBg = null;
        s_oMenu = null;

    };

    this._onAudioToggle = function () {
        createjs.Sound.setMute(s_bAudioActive);
        s_bAudioActive = !s_bAudioActive;
    };

    this._onButPlayRelease = function () {
        createjs.Tween.get(_oBg).to({y: CANVAS_HEIGHT}, 600).call(function () {
            menu.unload();
            if (DISABLE_SOUND_MOBILE === false || s_bMobile === false) {
                createjs.Sound.play("click");
            }
        });
        new CExplain();
    };

    s_oMenu = this;

    this._init();
}

var s_oMenu = null;