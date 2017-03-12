function CMain(oData) {
    var _bUpdate;
    var _iCurResource = 0;
    var RESOURCE_TO_LOAD = 0;
    var _iState = STATE_LOADING;
    var _oData;

    var _oPreloader;
    var _oMenu;
    var _oHelp;
    var _oGame;

    this.initContainer = function () {
        s_oCanvas = document.getElementById("canvas");
        s_oStage = new createjs.Stage(s_oCanvas);
        createjs.Touch.enable(s_oStage);

        s_bMobile = $.browser.mobile;
        if (s_bMobile === false) {
            s_oStage.enableMouseOver(20);
            $('body').on('contextmenu', '#canvas', function (e) {
                return false;
            });
        }

        s_iPrevTime = new Date().getTime();

        createjs.Ticker.addEventListener("tick", this._update);
        createjs.Ticker.setFPS(30);

        //版权信息
        var copyright = new createjs.Text(TEXT_COPYRIGHT, "20px 微软雅黑", "#cccccc");
        copyright.textAlign = "center";
        copyright.textBaseline = "alphabetic";
        copyright.y = CANVAS_HEIGHT - 100;
        copyright.x = CANVAS_WIDTH / 2;
        s_oStage.addChild(copyright);
        s_oStage.setChildIndex(copyright, 200);


        if (navigator.userAgent.match(/Windows Phone/i)) {
            DISABLE_SOUND_MOBILE = true;
        }

        s_oSpriteLibrary = new CSpriteLibrary();

        //ADD PRELOADER
        _oPreloader = new CPreloader();

    };

    this.preloaderReady = function () {
        if (DISABLE_SOUND_MOBILE === false || s_bMobile === false) {
            this._initSounds();
        }

        this._loadImages();
        _bUpdate = true;
    };

    this.soundLoaded = function () {
        _iCurResource++;
        var iPerc = Math.floor(_iCurResource / RESOURCE_TO_LOAD * 100);
        _oPreloader.refreshLoader(iPerc);

        if (_iCurResource === RESOURCE_TO_LOAD) {
            _oPreloader.unload();

            if (DISABLE_SOUND_MOBILE === false || s_bMobile === false) {
                s_oSoundtrack = createjs.Sound.play("soundtrack", {loop: -1});
            }
            this.gotoMenu();
        }
    };

    this._initSounds = function () {
        if (!createjs.Sound.initializeDefaultPlugins()) {
            return;
        }

        if (navigator.userAgent.indexOf("Opera") > 0 || navigator.userAgent.indexOf("OPR") > 0) {
            createjs.Sound.alternateExtensions = ["mp3"];
            cregulatejs.Sound.addEventListener("fileload", createjs.proxy(this.soundLoaded, this));

            createjs.Sound.registerSound("./sounds/soundtrack.ogg", "soundtrack");
            createjs.Sound.registerSound("./sounds/press_button.ogg", "click");
            createjs.Sound.registerSound("./sounds/game_over.ogg", "game_over");
            createjs.Sound.registerSound("./sounds/falling.ogg", "falling");
            createjs.Sound.registerSound("./sounds/skiing_direction.ogg", "skiing_direction");
            createjs.Sound.registerSound("./sounds/bonus.ogg", "bonus");
            createjs.Sound.registerSound("./sounds/skiing_idle.ogg", "skiing_idle");

        } else {

            createjs.Sound.alternateExtensions = ["ogg"];
            createjs.Sound.addEventListener("fileload", createjs.proxy(this.soundLoaded, this));
            createjs.Sound.registerSound("./sounds/soundtrack.mp3", "soundtrack");
            createjs.Sound.registerSound("./sounds/press_button.mp3", "click");
            createjs.Sound.registerSound("./sounds/game_over.mp3", "game_over");
            createjs.Sound.registerSound("./sounds/falling.mp3", "falling");
            createjs.Sound.registerSound("./sounds/skiing_direction.mp3", "skiing_direction");
            createjs.Sound.registerSound("./sounds/bonus.mp3", "bonus");
            createjs.Sound.registerSound("./sounds/skiing_idle.mp3", "skiing_idle");
        }

        RESOURCE_TO_LOAD += 7;

    };

    this._loadImages = function () {
        s_oSpriteLibrary.init(this._onImagesLoaded, this._onAllImagesLoaded, this);

        s_oSpriteLibrary.addSprite("but_exit", "./sprites/but_exit.png");
        s_oSpriteLibrary.addSprite("but_play", "./sprites/but_play.png");
        s_oSpriteLibrary.addSprite("bg_help", "./sprites/bg_help.png");
        s_oSpriteLibrary.addSprite("help_mobile", "./sprites/help_mobile.png");
        s_oSpriteLibrary.addSprite("arrow", "./sprites/arrow.png");

        s_oSpriteLibrary.addSprite("bg_menu", "./sprites/bg_menu.jpg");
        s_oSpriteLibrary.addSprite("bg_scroll", "./sprites/bg_scroll.jpg");

        s_oSpriteLibrary.addSprite("but_restart", "./sprites/but_restart.png");
        s_oSpriteLibrary.addSprite("audio_icon", "./sprites/audio_icon.png");

        s_oSpriteLibrary.addSprite("skier_sprite", "./sprites/skier_sprite.png");
        // s_oSpriteLibrary.addSprite("skier_falling", "./sprites/skier_falling.png");

        s_oSpriteLibrary.addSprite("tree", "./sprites/tree.png");
        s_oSpriteLibrary.addSprite("tree2", "./sprites/tree2.png");
        s_oSpriteLibrary.addSprite("rock", "./sprites/rock.png");
        s_oSpriteLibrary.addSprite("fence", "./sprites/fence.png");
        s_oSpriteLibrary.addSprite("bonus", "./sprites/bonus.png");
        s_oSpriteLibrary.addSprite("bonus_hitted", "./sprites/bonus_hitted.png");
        s_oSpriteLibrary.addSprite("speed_up", "./sprites/speed_up.png");

        s_oSpriteLibrary.addSprite("topbg", "./sprites/topbg.jpg");
        s_oSpriteLibrary.addSprite("btn_start", "./sprites/btn_start.png");
        s_oSpriteLibrary.addSprite("but_ph", "./sprites/but_ph.png");
        s_oSpriteLibrary.addSprite("operate", "./sprites/operate.png");
        s_oSpriteLibrary.addSprite("bg_explain", "./sprites/bg_explain.png");
        s_oSpriteLibrary.addSprite("btn_play", "./sprites/btn_play.png");


        RESOURCE_TO_LOAD += s_oSpriteLibrary.getNumSprites();
        s_oSpriteLibrary.loadSprites();
    };

    this._onImagesLoaded = function () {
        _iCurResource++;
        var iPerc = Math.floor(_iCurResource / RESOURCE_TO_LOAD * 100);
        _oPreloader.refreshLoader(iPerc);

        if (_iCurResource === 30) {
            _oPreloader.unload();

            if (DISABLE_SOUND_MOBILE === false || s_bMobile === false) {
                s_oSoundtrack = createjs.Sound.play("soundtrack", {loop: -1});
            }

            this.gotoMenu();
        }
    };

    this._onAllImagesLoaded = function () {

    };

    this.onAllPreloaderImagesLoaded = function () {
        this._loadImages();
    };

    this.gotoMenu = function () {
        _oMenu = new CMenu();
        _iState = STATE_MENU;
    };

    this.gotoGame = function (iMode, szImage, bNumActive) {
        s_iMode = iMode;
        s_szImage = szImage;
        s_bNumActive = bNumActive;

        _oGame = new CGame(_oData);
        _iState = STATE_GAME;

        $(s_oMain).trigger("game_start");
    };

    this.gotoHelp = function () {
        _oHelp = new CHelp();
        _iState = STATE_HELP;
    };

    this.stopUpdate = function () {
        _bUpdate = false;
    };

    this.startUpdate = function () {
        _bUpdate = true;
    };

    this._update = function (event) {
        if (_bUpdate === false) {
            return;
        }
        var iCurTime = new Date().getTime();
        s_iTimeElaps = iCurTime - s_iPrevTime;
        s_iCntTime += s_iTimeElaps;
        s_iCntFps++;
        s_iPrevTime = iCurTime;

        if (s_iCntTime >= 1000) {
            s_iCurFps = s_iCntFps;
            s_iCntTime -= 1000;
            s_iCntFps = 0;
        }

        if (_iState === STATE_GAME) {
            _oGame.update();
        }
        s_oStage.update(event);
    };

    s_oMain = this;

    _oData = oData;

    this.initContainer();
}
var s_bMobile;
var s_bAudioActive = true;
var s_iCntTime = 0;
var s_iTimeElaps = 0;
var s_iPrevTime = 0;
var s_iCntFps = 0;
var s_iCurFps = 0;
var s_iMode;
var s_szImage;
var s_bNumActive;

var s_oDrawLayer;
var s_oStage;
var s_oMain;
var s_oSpriteLibrary;
var s_oSoundtrack;
var s_oSkiingAudio;
var s_oCanvas;
