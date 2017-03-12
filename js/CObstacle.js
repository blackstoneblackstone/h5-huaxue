function CObstacle(iX, iY, szType) {
    var _iX;
    var _iY;
    var _iType;

    var _oObstacle;
    var _oContainerObstacle;
    var _oRectangle;
    var _oGraphicRectangle;

    this._init = function (iX, iY, szType) {
        _iX = iX;
        _iY = iY;

        if (szType === "tree") {
            _iType = TREE;
        } else if (szType === "tree2") {
            _iType = TREE2;
        } else if (szType === "rock") {
            _iType = ROCK;
        } else if (szType === "fence") {
            _iType = FENCE;
        } else if (szType === "bonus") {
            _iType = BONUS;
        }

        _oContainerObstacle = new createjs.Container();
        s_oStage.addChild(_oContainerObstacle);


        if (_iType === BONUS) {
            var oTeamSprite = {
                images: [s_oSpriteLibrary.getSprite("bonus")],
                framerate: 5,
                // width, height & registration point of each sprite
                frames: {width: BONUS_WIDTH, height: BONUS_HEIGHT, regX: 0, regY: 0},
                animations: {idle: [0, 1, "idle"]}
            };
            var oSpriteSheetPlayer = new createjs.SpriteSheet(oTeamSprite);
            _oObstacle = new createjs.Sprite(oSpriteSheetPlayer, "idle");
            _oObstacle.stop();
        } else {
            _oObstacle = createBitmap(s_oSpriteLibrary.getSprite(szType));
        }

        _oObstacle.x = iX;
        _oObstacle.y = iY;


        switch (_iType) {
            case TREE:
                // s = new createjs.Shape();
                // s.graphics.beginFill("#ff0000");
                // s.graphics.drawRect(_oObstacle.x, _oObstacle.y - TREE_RECTANGLE_HEIGHT, TREE_RECTANGLE_WIDTH, TREE_RECTANGLE_HEIGHT);
                // s.graphics.endFill();
                // _oContainerObstacle.addChild(s);

                _oObstacle.regX = TREE_WIDTH / 2;
                _oObstacle.regY = TREE_HEIGHT;
                _oRectangle = new createjs.Rectangle(_oObstacle.x - TREE_WIDTH / 2, _oObstacle.y, TREE_RECTANGLE_WIDTH, TREE_RECTANGLE_HEIGHT);
                break;

            case TREE2:
                _oObstacle.regX = TREE2_WIDTH / 2;
                _oObstacle.regY = TREE2_HEIGHT;
                _oRectangle = new createjs.Rectangle(_oObstacle.x - TREE2_WIDTH / 2, _oObstacle.y, TREE2_RECTANGLE_WIDTH, TREE2_RECTANGLE_HEIGHT);
                break;

            case ROCK:
                _oObstacle.regX = ROCK_WIDTH / 2;
                _oObstacle.regY = ROCK_HEIGHT;
                _oRectangle = new createjs.Rectangle(_oObstacle.x, _oObstacle.y, ROCK_RECTANGLE_WIDTH, ROCK_RECTANGLE_HEIGHT);
                break;

            case FENCE:
                _oObstacle.regX = FENCE_WIDTH / 2;
                _oObstacle.regY = FENCE_HEIGHT;
                _oRectangle = new createjs.Rectangle(_oObstacle.x, _oObstacle.y, FENCE_RECTANGLE_WIDTH, FENCE_RECTANGLE_HEIGHT);
                break;

            case BONUS:
                _oObstacle.regX = BONUS_WIDTH / 2;
                _oObstacle.regY = BONUS_HEIGHT;
                _oRectangle = new createjs.Rectangle(_oObstacle.x, _oObstacle.y, BONUS_RECTANGLE_WIDTH, BONUS_RECTANGLE_HEIGHT);
                break;
        }

        _oObstacle.rotation = 0;
        _oContainerObstacle.addChild(_oObstacle);
        _oContainerObstacle.addChild(_oGraphicRectangle);

    };

    this.refreshRectangle = function () {
        switch (_iType) {
            case TREE:
                // s.x = _oObstacle.x + TREE_RECTANGLE_WIDTH / 2;
                // s.y = _oObstacle.y - TREE_RECTANGLE_HEIGHT;
                _oRectangle.setValues(_oObstacle.x-30, _oObstacle.y - TREE_RECTANGLE_HEIGHT, TREE_RECTANGLE_WIDTH, TREE_RECTANGLE_HEIGHT);
                break;

            case TREE2:
                _oRectangle.setValues(_oObstacle.x-50, _oObstacle.y - TREE2_RECTANGLE_HEIGHT, TREE2_RECTANGLE_WIDTH, TREE2_RECTANGLE_HEIGHT);
                break;

            case ROCK:
                _oRectangle.setValues(_oObstacle.x-50, _oObstacle.y, ROCK_RECTANGLE_WIDTH, ROCK_RECTANGLE_HEIGHT);
                break;

            case FENCE:
                _oRectangle.setValues(_oObstacle.x-20, _oObstacle.y, FENCE_RECTANGLE_WIDTH, FENCE_RECTANGLE_HEIGHT);
                break;

            case BONUS:
                _oRectangle.setValues(_oObstacle.x, _oObstacle.y - BONUS_RECTANGLE_HEIGHT, BONUS_RECTANGLE_WIDTH, BONUS_RECTANGLE_HEIGHT);
                break;
        }
    };

    this.getRectangle = function () {
        return _oRectangle;
    };

    this.changeStatusOn = function (iX, iY) {
        _oObstacle.x = iX;
        _oObstacle.y = iY;
        _oObstacle.visible = true;
        if (_iType === BONUS) {
            _oObstacle.play();
        }
    };

    this.changeStatusOff = function () {
        _oObstacle.x = -150;
        _oObstacle.y = -150;
        if (_iType === BONUS) {
            _oObstacle.stop();
        }
    };

    this.controlCollision = function (oSkierRectangle, i) {
        if (_iType === BONUS) {
            if (_oRectangle.intersection(oSkierRectangle) !== null) {
                s_oGame.bonusHitted(i);
            }
        } else {
            if (_oRectangle.intersection(oSkierRectangle) !== null) {
                s_oGame.collisionFound(_iType);
            }
        }
    };

    this.setInvisible = function () {
        _oObstacle.visible = false;
    };

    this.move = function (iVelocityAngle) {
        _oObstacle.y -= iVelocityAngle;
    };

    this.getY = function () {
        return _oObstacle.y;
    };

    this.getX = function () {
        return _oObstacle.x;
    };

    this._init(iX, iY, szType);

}