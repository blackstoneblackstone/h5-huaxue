function CSkier(oParentContainer) {
    var _oSkier;
    var _oSpriteSkier;
    var _oRectangle;
    var _szState;
    var _iRotation;

    var s;

    this._init = function (oParentContainer) {
        var oSourceImage = s_oSpriteLibrary.getSprite("skier_sprite");
        var _oSprite = {
            images: [oSourceImage],
            framerate: 30,
            // width, height & registration point of each sprite
            frames: {width: SKIER_WIDTH, height: SKIER_HEIGHT, regX: SKIER_WIDTH / 2, regY: SKIER_HEIGHT / 2},
            animations: {
                idle: [0],
                left1: [1],
                left2: [2],
                left3: [3],
                left4: [4],
                left5: [5],
                left6: [6],
                left7: [7],
                left8: [8],
                left9: [9],
                right1: [10],
                right2: [11],
                right3: [12],
                right4: [13],
                right5: [14],
                right6: [15],
                right7: [16],
                right8: [17],
                right9: [18]
            }
        };
        _oSpriteSkier = new createjs.SpriteSheet(_oSprite);
        _oSkier = createSprite(_oSpriteSkier, "idle", 0, 0, SKIER_WIDTH, SKIER_HEIGHT);
        _oSkier.x = SKIER_X_START;
        _oSkier.y = SKIER_Y_START;
        _oSkier.rotation = 0;
        oParentContainer.addChild(_oSkier);
        _oRectangle = new createjs.Rectangle(_oSkier.x, _oSkier.y + 20, SKIER_RECTANGLE_WIDTH, SKIER_RECTANGLE_HEIGHT);
        _szState = "idle";

        // s = new createjs.Shape();
        // s.graphics.beginFill("#ff0000");
        // s.graphics.drawRect(_oSkier.x, _oSkier.y + 20, SKIER_WIDTH, SKIER_HEIGHT);
        // s.graphics.endFill();
        // oParentContainer.addChild(s);


        s_oStage.setChildIndex(oParentContainer, SKIER_INDEX);

    };

    this.falling = function () {
        s_oStage.setChildIndex(oParentContainer, SKIER_FALLING_INDEX);
        var oSprite = {
            images: [s_oSpriteLibrary.getSprite("skier_sprite")],
            framerate: 30,
            frames: {
                width: SKIER_WIDTH, height: SKIER_HEIGHT, regX: SKIER_WIDTH / 2, regY: SKIER_HEIGHT / 2
            },
            animations: {idle: [0, 18, "idle"]}
        };
        _oSpriteSkier = new createjs.SpriteSheet(oSprite);
        _oSkier.spriteSheet = _oSpriteSkier;

        _oSkier.gotoAndPlay("idle");
    };

    this.refreshRectangle = function () {
        _oRectangle.setValues(_oSkier.x, _oSkier.y + 20, SKIER_RECTANGLE_WIDTH, SKIER_RECTANGLE_HEIGHT);
    }

    this.getFrame = function () {
        return _oSkier.currentFrame;
    };

    this.setUltimateFrame = function () {
        _oSkier.stop();
    };

    this.changeFrameStateLeft = function (iState) {
        _oSkier.gotoAndStop(iState);
        _szState = "left";
    };

    this.changeFrameStateRight = function (iState) {
        _oSkier.gotoAndStop(iState);
        _szState = "right";
    };

    this.changeFrameStateIdle = function () {
        _oSkier.gotoAndStop(0);
        _szState = "idle";
    };

    this.returnState = function () {
        return _szState;
    };

    this.getRectangle = function () {
        return _oRectangle;
    };

    this.getSprite = function () {
        return _oSkier;
    };

    this.addPos = function (newX) {
        _oSkier.x += newX;
    };

    this.setPos = function (newX) {
        _oSkier.x += newX;
    };

    this.getX = function () {
        return _oSkier.x;
    };

    this.getY = function () {
        return _oSkier.y;
    };

    this.setRotation = function (iValue) {
        _iRotation = iValue;
    };

    this.getRotation = function () {
        return _iRotation;
    };

    this.getValue = function () {
        return _bCellOccupied;
    };

    this._init(oParentContainer);

}