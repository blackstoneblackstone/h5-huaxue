function CGame(oData) {
    // 角度
    var _iAngle = 0;
    var _iStroke = 0;
    //当前行
    var _iCurNumRows;
    // 分数
    var _iScore = 0;

    var _iAppScore = 0;
    var _iNumFree = 0;
    var _iVelocity = 0.5;
    var _iVelocityObstacles;
    var _iYForControl;
    var _iYForCreateRow;
    var _iSpeedToAdd = 0;

    var _iY1 = 90;
    var _iX1 = 0;
    var _iY2 = 0;
    var _iX2 = 10;
    // 矢量
    var _vAxis = new CVector2(0, CANVAS_HEIGHT);

    var _vStartPos = new CVector2(SKIER_X_START, SKIER_Y_START);

    var _vEndPos = new CVector2(CANVAS_WIDTH / 2, CANVAS_HEIGHT / 2);

    var _aTreeUnused = new Array();
    var _aTree2Unused = new Array();
    var _aRockUnused = new Array();
    var _aFenceUnused = new Array();
    var _aBonusUnused = new Array();

    var _aTreeInGame = new Array();
    var _aTree2InGame = new Array();
    var _aRockInGame = new Array();
    var _aFenceInGame = new Array();
    var _aBonusInGame = new Array();

    var _oInterface;
    var _oSkier;
    var _oSkierRectangle;

    var _oSoundChangeDir = 0;

    var _aLineStrokeLeft = [null, null];
    var _aLineStrokeRight = [null, null];

    var _bUpdate = false;
    var _bFalling = false;
    var _bCanMoveSkier = true;
    var _bGameOver = false;
    var _bAudioLeft = false;
    var _bAudioRight = false;
    var _bBonusTaken = false;

    var _oContainerSkier;
    var _oScrollingBg;

    var _oEndPanel = null;
    var _oParent;


    this._init = function () {
        if (DISABLE_SOUND_MOBILE === false || s_bMobile === false) {
            s_oSoundtrack.volume = 0.6;
            s_oSkiingAudio = createjs.Sound.play("skiing_idle", {loop: -1});
        }
        _iCurNumRows = 0;
        _iVelocityObstacles = OBSTACLES_SPD;
        NUM_ROW = Math.floor((CANVAS_HEIGHT + MAX_OBSTACLE_HEIGHT) / HEIGHT_BETWEEN_OBSTACLES);
        _iYForControl = SKIER_Y_START + MAX_OBSTACLE_HEIGHT + (SKIER_HEIGHT / 2);
        _iYForCreateRow = CANVAS_HEIGHT + MAX_OBSTACLE_HEIGHT;

        _oScrollingBg = new CScrollingBg();

        this.createLine(SKIER_X_START, _iAngle);

        _oContainerSkier = new createjs.Container();
        s_oStage.addChild(_oContainerSkier);
        _oSkier = new CSkier(_oContainerSkier);

        for (var i = 0; i < MAX_OBJECT_FOR_TYPE; i++) {
            if (i < MAX_OBJECT_FOR_TYPE / 2) {
                _aTreeUnused.push(new CObstacle(-MAX_OBSTACLE_WIDTH, -MAX_OBSTACLE_HEIGHT, "tree"));
                _aTree2Unused.push(new CObstacle(-MAX_OBSTACLE_WIDTH, -MAX_OBSTACLE_HEIGHT, "tree2"));
            }
            _aRockUnused.push(new CObstacle(-MAX_OBSTACLE_WIDTH, -MAX_OBSTACLE_HEIGHT, "rock"));
            _aFenceUnused.push(new CObstacle(-MAX_OBSTACLE_WIDTH, -MAX_OBSTACLE_HEIGHT, "fence"));
            _aBonusUnused.push(new CObstacle(-MAX_OBSTACLE_WIDTH, -MAX_OBSTACLE_HEIGHT, "bonus"));
        }
        this._controlIfAllReady();

        _oInterface = new CInterface();

    };

    this._controlIfAllReady = function () {
        if (_aTreeUnused.length === MAX_OBJECT_FOR_TYPE / 2) {
            _iNumFree += _aTreeUnused.length;
        }
        if (_aTree2Unused.length === MAX_OBJECT_FOR_TYPE / 2) {
            _iNumFree += _aTree2Unused.length;
        }
        if (_aRockUnused.length === MAX_OBJECT_FOR_TYPE) {
            _iNumFree += _aRockUnused.length;
        }
        if (_aFenceUnused.length === MAX_OBJECT_FOR_TYPE) {
            _iNumFree += _aFenceUnused.length;
        }
        if (_aBonusUnused.length === MAX_OBJECT_FOR_TYPE) {
            _iNumFree += _aBonusUnused.length;
        }

        if (_iNumFree >= MAX_OBJECT_FOR_TYPE * (NUM_ELEMENTS - 1)) {
            var iY = _iYForCreateRow;
            for (var i = 0; i < NUM_ROW; i++, iY += HEIGHT_BETWEEN_OBSTACLES) {
                this._createRow(iY);
            }
        }
        _iNumFree = 0;
    };

    //创建障碍行 最多3个
    this._createRow = function (iY) {
        var iNumObstacles = Math.round(Math.random() * (MAX_OBJECT_ROW - MIN_OBJECT_ROW) + MIN_OBJECT_ROW);
        var iX = 0;
        var iTypeSelected;
        var iLastElement;
        var aAreas = new Array();
        for (var i = 0; i < iNumObstacles; i++) {
            aAreas.push(i);
        }
        var _iCurAreaRange = CANVAS_WIDTH;
        for (var k = 0; k < iNumObstacles; k++) {
            var iAreaIndex = Math.floor(Math.random() * aAreas.length);
            var iRangeArea = aAreas[iAreaIndex];
            aAreas.splice(iAreaIndex, 1);

            iX = Math.floor(Math.random() * (((_iCurAreaRange * (iRangeArea + 1)) - 50)  - ((_iCurAreaRange * iRangeArea) + 50) ) + (_iCurAreaRange * iRangeArea) + 50 );
            iTypeSelected = Math.floor(Math.random() * NUM_ELEMENTS);

            switch (iTypeSelected) {
                case TREE:
                    _aTreeInGame.push(this.getFirstAvailableObstacle(iTypeSelected));
                    iLastElement = _aTreeInGame.length - 1;
                    if (_aTreeInGame[iLastElement] !== null) {
                        _aTreeInGame[iLastElement].changeStatusOn(iX, iY);
                    } else {
                        _aTreeInGame.pop();
                    }
                    break;
                case TREE2:
                    _aTree2InGame.push(this.getFirstAvailableObstacle(iTypeSelected));
                    iLastElement = _aTree2InGame.length - 1;
                    if (_aTree2InGame[iLastElement] !== null) {
                        _aTree2InGame[iLastElement].changeStatusOn(iX, iY);
                    } else {
                        _aTree2InGame.pop();
                    }
                    break;
                case ROCK:
                    _aRockInGame.push(this.getFirstAvailableObstacle(iTypeSelected));
                    iLastElement = _aRockInGame.length - 1;
                    if (_aRockInGame[iLastElement] !== null) {
                        _aRockInGame[iLastElement].changeStatusOn(iX, iY);
                    } else {
                        _aRockInGame.pop();
                    }
                    break;
                case FENCE:
                    _aFenceInGame.push(this.getFirstAvailableObstacle(iTypeSelected));
                    iLastElement = _aFenceInGame.length - 1;
                    if (_aFenceInGame[iLastElement] !== null) {
                        _aFenceInGame[iLastElement].changeStatusOn(iX, iY);
                    } else {
                        _aFenceInGame.pop();
                    }
                    break;
                case BONUS:
                    _aBonusInGame.push(this.getFirstAvailableObstacle(iTypeSelected));
                    iLastElement = _aBonusInGame.length - 1;
                    if (_aBonusInGame[iLastElement] !== null) {
                        _aBonusInGame[iLastElement].changeStatusOn(iX, iY);
                    } else {
                        _aBonusInGame.pop();
                    }
                    break;
            }
        }
        _iCurNumRows = NUM_ROW;
    };

    this.getFirstAvailableObstacle = function (iType) {

        var oApp;
        var iLastElement;
        switch (iType) {
            case TREE:
                if (_aTreeUnused.length > 0) {
                    iLastElement = _aTreeUnused.length - 1;
                    oApp = _aTreeUnused[iLastElement];
                    _aTreeUnused.pop();
                    return oApp;
                } else {
                    return null;
                }
            case TREE2:
                if (_aTree2Unused.length > 0) {
                    iLastElement = _aTree2Unused.length - 1;
                    oApp = _aTree2Unused[iLastElement];
                    _aTree2Unused.pop();
                    return oApp;
                } else {
                    return null;
                }
            case ROCK:
                if (_aRockUnused.length > 0) {
                    iLastElement = _aRockUnused.length - 1;
                    oApp = _aRockUnused[iLastElement];
                    _aRockUnused.pop();
                    return oApp;
                } else {
                    return null;
                }
            case FENCE:
                if (_aFenceUnused.length > 0) {
                    iLastElement = _aFenceUnused.length - 1;
                    oApp = _aFenceUnused[iLastElement];
                    _aFenceUnused.pop();
                    return oApp;
                } else {
                    return null;
                }
            case BONUS:
                if (_aBonusUnused.length > 0) {
                    iLastElement = _aBonusUnused.length - 1;
                    oApp = _aBonusUnused[iLastElement];
                    _aBonusUnused.pop();
                    return oApp;
                } else {
                    return null;
                }
        }
    };

    this._mouseMove = function () {
        s_oStage.on("stagemousemove", function (evt) {
            if (evt.stageX > 0 && evt.stageX < CANVAS_WIDTH) {
                _vEndPos.set(Math.floor(evt.stageX), CANVAS_HEIGHT / 2);
            }
        })
    };

    this._moveSkier = function () {
        if (_oSkier.getRotation() <= -TOLLERANCE || _oSkier.getRotation() >= TOLLERANCE) {
            if (_oSkier.getX() <= _vEndPos.getX()) {
                if (_iVelocity < SKIER_SPD) {
                    if (_iVelocity < 0) {
                        _iVelocity += CHANGE_DIRECTION_FASTER;
                    } else {
                        _iVelocity += DECELERATION;
                    }

                    if (_iVelocity > SKIER_SPD) {
                        _iVelocity = SKIER_SPD;
                    }
                }
                // check canvas
                if (_oSkier.getX() + _iVelocity < CANVAS_WIDTH) {
                    _oSkier.addPos(_iVelocity);
                }
            } else if (_oSkier.getX() > _vEndPos.getX() - SKIER_SPD) {
                if (_iVelocity > -SKIER_SPD) {
                    if (_iVelocity > 0) {
                        _iVelocity -= CHANGE_DIRECTION_FASTER;
                    } else {
                        _iVelocity -= DECELERATION;
                    }
                    if (_iVelocity < -SKIER_SPD) {
                        _iVelocity = -SKIER_SPD;
                    }
                }
                // check canvas
                if (_oSkier.getX() + _iVelocity > 0) {
                    _oSkier.addPos(_iVelocity);
                }
            }
            _oSkier.refreshRectangle();
        } else {
            _iVelocity = 0.5;
        }
    };

    this.createLine = function (iX) {
        _aLineStrokeLeft[_iStroke] = new CLineStroke(iX - 7);
        _aLineStrokeRight[_iStroke] = new CLineStroke(iX + 7);
    };

    this._setRotation = function () {
        var vApp = new CVector2(_vEndPos.getX(), -_vEndPos.getY());

        _vStartPos.set(_oSkier.getX(), -_oSkier.getY());
        _vStartPos.subV(vApp);
        _iAngle = angleBetweenVectors(_vAxis, _vStartPos);

        _iAngle = toDegree(_iAngle);

        this._changeVelocityObstacles();

        if (_oSkier.getX() <= _vEndPos.getX()) {
            _iAngle *= -1;
        }

        if (_oSkier.returnState() !== "idle") {
            if (_iAngle < TOLLERANCE && _iAngle > -TOLLERANCE) {
                _oSkier.changeFrameStateIdle();
                _bAudioLeft = false;
                _bAudioRight = false;
            }
        }

        if (_iAngle < -TOLLERANCE) {
            _oSkier.changeFrameStateRight(Math.floor((-_iAngle) / 6) + 10);
            if ((DISABLE_SOUND_MOBILE === false || s_bMobile === false) && _bAudioLeft === false) {
                if (_oSoundChangeDir === 0) {
                    createjs.Sound.play("skiing_direction");
                    _bAudioLeft = true;
                    _bAudioRight = false;
                } else {
                    if (_oSoundChangeDir.position === 0) {
                        createjs.Sound.play("skiing_direction");
                        _bAudioLeft = true;
                        _bAudioRight = false;
                    }
                }
            }
        } else if (_iAngle > TOLLERANCE) {
            _oSkier.changeFrameStateLeft(Math.floor(_iAngle / 6));
            if ((DISABLE_SOUND_MOBILE === false || s_bMobile === false) && _bAudioRight === false) {
                if (_oSoundChangeDir === 0) {
                    _oSoundChangeDir = createjs.Sound.play("skiing_direction");
                    _bAudioLeft = false;
                    _bAudioRight = true;
                } else {
                    if (_oSoundChangeDir.position === 0) {
                        _oSoundChangeDir = createjs.Sound.play("skiing_direction");
                        _bAudioLeft = false;
                        _bAudioRight = true;
                    }
                }
            }
        }

        _oSkier.setRotation(_iAngle);
    };

    this._changeVelocityObstacles = function () {

        if (_iAngle > TOLLERANCE || _iAngle < -TOLLERANCE) {
            _iVelocityObstacles = ((((_iY2 - _iY1) / (_iX2 - _iX1)) * (_iAngle - _iX1) + _iY1) / 100) + MODIFIER;

        } else {
            if (_iVelocityObstacles < OBSTACLES_SPD) {
                _iVelocityObstacles += ACCELERATION;
            }
        }
    };

    this._moveObstacles = function () {
        var oApp;
        for (var i = 0; i < _aTreeInGame.length; i++) {
            _aTreeInGame[i].move(_iVelocityObstacles + _iSpeedToAdd);
            if (_aTreeInGame[i].getY() < _iYForControl) {
                _aTreeInGame[i].refreshRectangle();
                _oSkierRectangle = _oSkier.getRectangle();
                _aTreeInGame[i].controlCollision(_oSkierRectangle, i);
                oApp = this._controlIfObstaclesIsOverCanvas(TREE, i);
                if (oApp !== null) {
                    _aTreeUnused.push(oApp);
                    i--;
                }
            }
        }
        for (var i = 0; i < _aTree2InGame.length; i++) {
            _aTree2InGame[i].move(_iVelocityObstacles + _iSpeedToAdd);
            if (_aTree2InGame[i].getY() < _iYForControl) {
                _aTree2InGame[i].refreshRectangle();
                _oSkierRectangle = _oSkier.getRectangle();
                _aTree2InGame[i].controlCollision(_oSkierRectangle, i);
                oApp = this._controlIfObstaclesIsOverCanvas(TREE2, i);
                if (oApp !== null) {
                    _aTree2Unused.push(oApp);
                    i--;
                }
            }
        }
        for (var i = 0; i < _aRockInGame.length; i++) {
            _aRockInGame[i].move(_iVelocityObstacles + _iSpeedToAdd);
            if (_aRockInGame[i].getY() < _iYForControl) {
                _aRockInGame[i].refreshRectangle();
                _oSkierRectangle = _oSkier.getRectangle();
                _aRockInGame[i].controlCollision(_oSkierRectangle, i);
                oApp = this._controlIfObstaclesIsOverCanvas(ROCK, i);
                if (oApp !== null) {
                    _aRockUnused.push(oApp);
                    i--;
                }
            }
        }
        for (var i = 0; i < _aFenceInGame.length; i++) {
            _aFenceInGame[i].move(_iVelocityObstacles + _iSpeedToAdd);
            if (_aFenceInGame[i].getY() < _iYForControl) {
                _aFenceInGame[i].refreshRectangle();
                _oSkierRectangle = _oSkier.getRectangle();
                _aFenceInGame[i].controlCollision(_oSkierRectangle, i);
                oApp = this._controlIfObstaclesIsOverCanvas(FENCE, i);
                if (oApp !== null) {
                    _aFenceUnused.push(oApp);
                    i--;
                }
            }
        }
        for (var i = 0; i < _aBonusInGame.length; i++) {
            _aBonusInGame[i].move(_iVelocityObstacles + _iSpeedToAdd);
            if (_aBonusInGame[i].getY() < _iYForControl) {
                _aBonusInGame[i].refreshRectangle();
                _oSkierRectangle = _oSkier.getRectangle();
                _aBonusInGame[i].controlCollision(_oSkierRectangle, i);
                oApp = this._controlIfObstaclesIsOverCanvas(BONUS, i);
                if (oApp !== null) {
                    _aBonusUnused.push(oApp);
                    i--;
                }
            }
        }
        if (_iCurNumRows < NUM_ROW) {
            this._createRow(_iYForCreateRow);
        }
    };

    //碰撞
    this.collisionFound = function (iType) {
        if (!_bGameOver) {
            if (DISABLE_SOUND_MOBILE === false || s_bMobile === false) {
                createjs.Sound.play("falling");
            }
            if (iType === ROCK || iType === FENCE) {
                _oSkier.falling();
                _bFalling = true;
                _bCanMoveSkier = false;
            } else {

                var xShifting = 10;
                var yShifting = 30;

                createjs.Tween.get(s_oStage).to({
                    x: Math.round(Math.random() * xShifting),
                    y: Math.round(Math.random() * yShifting)
                }, 50).call(function () {
                    createjs.Tween.get(s_oStage).to({
                        x: Math.round(Math.random() * xShifting * 0.8),
                        y: -Math.round(Math.random() * yShifting * 0.8)
                    }, 50).call(function () {
                        createjs.Tween.get(s_oStage).to({
                            x: Math.round(Math.random() * xShifting * 0.6),
                            y: Math.round(Math.random() * yShifting * 0.6)
                        }, 50).call(function () {
                            createjs.Tween.get(s_oStage).to({
                                x: Math.round(Math.random() * xShifting * 0.4),
                                y: -Math.round(Math.random() * yShifting * 0.4)
                            }, 50).call(function () {
                                createjs.Tween.get(s_oStage).to({
                                    x: Math.round(Math.random() * xShifting * 0.2),
                                    y: Math.round(Math.random() * yShifting * 0.2)
                                }, 50).call(function () {
                                    createjs.Tween.get(s_oStage).to({
                                        x: Math.round(Math.random() * xShifting),
                                        y: -Math.round(Math.random() * yShifting)
                                    }, 50).call(function () {
                                        createjs.Tween.get(s_oStage).to({y: 0, x: 0}, 50).call(function () {
                                        });
                                    });
                                });
                            });
                        });
                    });
                });
            }
            this.gameOver();
        }
    };

    this.bonusHitted = function (i) {
        if (!_bGameOver && !_bBonusTaken) {
            if (DISABLE_SOUND_MOBILE === false || s_bMobile === false) {
                createjs.Sound.play("bonus");
            }
            _bBonusTaken = true;
            _aBonusInGame[i].setInvisible();
            var oSprite = createBitmap(s_oSpriteLibrary.getSprite("bonus_hitted"));
            oSprite.x = _aBonusInGame[i].getX();
            oSprite.y = _aBonusInGame[i].getY();
            oSprite.regX = BONUS_WIDTH / 2;
            oSprite.regY = BONUS_HEIGHT;
            s_oStage.addChild(oSprite);
            var oParent = this;
            createjs.Tween.get(oSprite).to({
                x: oSprite.x / 2 + 25,
                y: (CANVAS_HEIGHT - 50) / 2
            }, 350, createjs.Ease.linear).call(function () {
                oParent.setBonusTakenFalse();
                createjs.Tween.get(oSprite).to({
                    x: 50,
                    y: CANVAS_HEIGHT - 50
                }, 650, createjs.Ease.backOut).call(function () {
                    oParent.setScore(SCORE_BONUS);
                    s_oStage.removeChild(this);
                });
            });
        }
    };

    this.setBonusTakenFalse = function () {
        _bBonusTaken = false;
    };

    this._controlIfObstaclesIsOverCanvas = function (iType, i) {
        var oApp;
        switch (iType) {
            case TREE:
                if (_aTreeInGame[i].getY() < 0) {
                    _aTreeInGame[i].changeStatusOff();
                    oApp = _aTreeInGame[i];
                    _aTreeInGame.splice(i, 1);
                    _iCurNumRows--;
                    return oApp;
                } else {
                    return null;
                }
                break;
            case TREE2:
                if (_aTree2InGame[i].getY() < 0) {
                    _aTree2InGame[i].changeStatusOff();
                    oApp = _aTree2InGame[i];
                    _aTree2InGame.splice(i, 1);
                    _iCurNumRows--;
                    return oApp;
                } else {
                    return null;
                }
                break;
            case ROCK:
                if (_aRockInGame[i].getY() < 0) {
                    _aRockInGame[i].changeStatusOff();
                    oApp = _aRockInGame[i];
                    _aRockInGame.splice(i, 1);
                    _iCurNumRows--;
                    return oApp;
                } else {
                    return null;
                }
                break;
            case FENCE:
                if (_aFenceInGame[i].getY() < 0) {
                    _aFenceInGame[i].changeStatusOff();
                    oApp = _aFenceInGame[i];
                    _aFenceInGame.splice(i, 1);
                    _iCurNumRows--;
                    return oApp;
                } else {
                    return null;
                }
                break;
            case BONUS:
                if (_aBonusInGame[i].getY() < 0) {
                    _aBonusInGame[i].changeStatusOff();
                    oApp = _aBonusInGame[i];
                    _aBonusInGame.splice(i, 1);
                    _iCurNumRows--;
                    return oApp;
                } else {
                    return null;
                }
                break;
        }

    };

    this._controlLineIfOverCanvas = function () {
        if (_aLineStrokeLeft[_iStroke].getY() < 0 && _aLineStrokeLeft[_iStroke].getState() === true) {
            _aLineStrokeLeft[_iStroke].changeState();
            _aLineStrokeRight[_iStroke].changeState();
            if (_iStroke === 0) {
                _iStroke++;
            } else if (_iStroke === 1) {
                _iStroke--;
            }
            this.createLine(_oSkier.getX(), _iAngle);
        }
        if (_aLineStrokeLeft[0].getY() < -SKIER_Y_START && _aLineStrokeLeft[0].getState() === false) {
            if (_iStroke === 0) {
                _aLineStrokeLeft[1].unload();
                _aLineStrokeRight[1].unload();
            } else if (_iStroke === 1) {
                _aLineStrokeLeft[0].unload();
                _aLineStrokeRight[0].unload();
            }
        }
        if (_aLineStrokeLeft[1] !== null) {
            if (_aLineStrokeLeft[1].getY() < -SKIER_Y_START && _aLineStrokeLeft[1].getState() === false) {
                if (_iStroke === 0) {
                    _aLineStrokeLeft[1].unload();
                    _aLineStrokeRight[1].unload();
                } else if (_iStroke === 1) {
                    _aLineStrokeLeft[0].unload();
                    _aLineStrokeRight[0].unload();
                }
            }
        }
    };

    this.setScore = function (iScoreToAdd) {
        _iScore += iScoreToAdd;
        _iAppScore += iScoreToAdd;
        var iValue = _iAppScore - SCORE_FOR_INCREASE_SPD;
        if (iValue >= 0 && _iSpeedToAdd <= SPEED_INCREASE * 7) {
            var oSprite = createBitmap(s_oSpriteLibrary.getSprite('speed_up'));
            oSprite.x = -800;
            oSprite.y = CANVAS_HEIGHT / 2;
            oSprite.regX = 648 / 2;
            oSprite.regY = 106 / 2;
            s_oStage.addChild(oSprite);
            createjs.Tween.get(oSprite).to({x: CANVAS_WIDTH / 2}, 500).wait(100).call(function () {
                createjs.Tween.get(oSprite).to({x: CANVAS_WIDTH + 600}, 500).call(function () {
                    s_oStage.removeChild(oSprite);
                });
            });
            _iSpeedToAdd += SPEED_INCREASE;
            _iAppScore = 0;
        }
        _oInterface.refreshScore(_iScore);
        if (iScoreToAdd > SCORE_TO_ADD) {
            _oInterface.bonusTaken();
        }
    };

    this.gameOver = function () {
        if (DISABLE_SOUND_MOBILE === false || s_bMobile === false) {
            s_oSkiingAudio.volume = 0;
            s_oSoundtrack.volume = 0;
        }
        if (!_bGameOver) {
            var failNum = Math.round(Math.random() + MIN_OBJECT_ROW);
            _oEndPanel = CEndPanel(s_oSpriteLibrary.getSprite('game_fail' + failNum));
            _oEndPanel.show(_iScore + 1, _bFalling);
            _bGameOver = true;
        }
    };

    this.unload = function () {
        _oInterface.unload();
        if (_oEndPanel !== null) {
            _oEndPanel.unload();
        }

        _aTreeUnused = [];
        _aTree2Unused = [];
        _aRockUnused = [];
        _aFenceUnused = [];

        _aTreeInGame = [];
        _aTree2InGame = [];
        _aRockInGame = [];
        _aFenceInGame = [];

        createjs.Tween.removeAllTweens();
        s_oStage.removeAllChildren();
    };

    this.onExit = function () {
        this.unload();
        s_oMain.gotoMenu();

        $(s_oMain).trigger("restart");
    };

    this.onHelpExit = function () {
        _oInterface.onExitFromHelp();
    };

    this.setUpdateFalse = function () {
        _bUpdate = false;
    };

    this.setUpdateTrue = function () {
        _bUpdate = true;
    };

    this.restartGame = function () {
        s_oStage.removeAllChildren();

        s_oMain.gotoGame();

    };

    this.update = function () {
        if (_bUpdate === false) {
            return;
        } else {
            this._mouseMove();
            if (_bCanMoveSkier) {
                this._moveSkier();
                this._setRotation();
                this.setScore(SCORE_TO_ADD);
            }
            this._moveObstacles();
            if (_aLineStrokeLeft[0].getUpdate() === true) {
                _aLineStrokeLeft[0].update(_oSkier.getX() - 7, _iVelocityObstacles + _iSpeedToAdd);
                _aLineStrokeRight[0].update(_oSkier.getX() + 7, _iVelocityObstacles + _iSpeedToAdd);
            }
            if (_aLineStrokeLeft[1] !== null) {
                if (_aLineStrokeLeft[1].getUpdate() === true) {
                    _aLineStrokeLeft[1].update(_oSkier.getX() - 7, _iVelocityObstacles + _iSpeedToAdd);
                    _aLineStrokeRight[1].update(_oSkier.getX() + 7, _iVelocityObstacles + _iSpeedToAdd);
                }
            }
            _oScrollingBg.move(_iVelocityObstacles + _iSpeedToAdd);
            this._controlLineIfOverCanvas();
            if (_bFalling === true) {
                if (_oSkier.getFrame() === 13) {
                    _oSkier.setUltimateFrame();
                }
                if (_iVelocityObstacles - 0.5 > 0) {
                    _iVelocityObstacles = _iVelocityObstacles - DECELERATION_HITTED;
                }
            }
        }
    };

    s_oGame = this;
    _oParent = this;

    SKIER_SPD = oData.skier_spd;
    OBSTACLES_SPD = oData.obstacles_spd;
    SCORE_TO_ADD = oData.score_to_add;
    SCORE_BONUS = oData.score_bonus;
    MAX_OBJECT_FOR_TYPE = oData.max_object_for_type;
    MIN_OBJECT_ROW = oData.min_object_row;
    MAX_OBJECT_ROW = oData.max_object_row;
    SCORE_FOR_INCREASE_SPD = oData.speed_increase_score;
    SPEED_INCREASE = oData.speed_increase;

    this._init();
}

var s_oGame;
