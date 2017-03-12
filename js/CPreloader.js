function CPreloader() {
    var _oLoadingText;
    var _oProgressBar;
    var _oFade;
    var _oContainer;
    var logo;

    this._init = function () {
        s_oSpriteLibrary.init(this._onImagesLoaded, this._onAllImagesLoaded, this);
        s_oSpriteLibrary.addSprite("bg_menu", "./sprites/bg_menu.jpg");
        s_oSpriteLibrary.addSprite("progress_bar", "./sprites/loading.png");
        s_oSpriteLibrary.addSprite("logo", "./sprites/logo.png");
        s_oSpriteLibrary.loadSprites();

        _oContainer = new createjs.Container();
        s_oStage.addChild(_oContainer);
    };

    this.unload = function () {
        _oContainer.removeAllChildren();
    };

    this.hide = function () {
        var oParent = this;
        setTimeout(function () {
            createjs.Tween.get(_oFade).to({alpha: 1}, 500).call(function () {
                oParent.unload();
                s_oMain.gotoMenu();
            });
        }, 1000);
    };

    this._onImagesLoaded = function () {

    };

    this._onAllImagesLoaded = function () {
        this.attachSprites();

        s_oMain.preloaderReady();
    };

    this.attachSprites = function () {

        // var oBg = createBitmap(s_oSpriteLibrary.getSprite('bg_menu'));
        // _oContainer.addChild(oBg);

        var oSprite = s_oSpriteLibrary.getSprite('progress_bar');


        var spriteSheet = new createjs.SpriteSheet({
            "framerate": 5,
            "images": [oSprite],
            "frames": {"regX": 0, "height": 250, "count": 6, "regY": 0, "width": 250, spacing: 15},
            "animations": {
                "run": [0, 5, "run", 1.5],
            }
        });
        _oProgressBar = new createjs.Sprite(spriteSheet, "run");
        _oProgressBar.x = CANVAS_WIDTH / 2 - (250 / 2);
        _oProgressBar.y = 300;
        _oContainer.addChild(_oProgressBar);

        _oLoadingText = new createjs.Text("", "40px " + FONT, "#fff");
        _oLoadingText.x = CANVAS_WIDTH / 2;
        _oLoadingText.y = 350 + 250;
        _oLoadingText.shadow = new createjs.Shadow("#000", 2, 2, 2);
        _oLoadingText.textBaseline = "alphabetic";
        _oLoadingText.textAlign = "center";
        _oContainer.addChild(_oLoadingText);

        logo = createBitmap(s_oSpriteLibrary.getSprite('logo'), 400, 50);
        logo.y = 30;
        logo.x= 190;
        _oContainer.addChild(logo);
    };

    this.refreshLoader = function (iPerc) {
        _oLoadingText.text = iPerc + "%";
    };

    this._init();
}