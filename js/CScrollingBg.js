function CScrollingBg(){
    var _oScrollingBg1 = null;
    var _oScrollingBg2 = null;

    this._init = function(){
        var oSpriteTile = s_oSpriteLibrary.getSprite('bg_scroll');

        _oScrollingBg1 = createBitmap(oSpriteTile);
        s_oStage.addChild(_oScrollingBg1);

        oSpriteTile = s_oSpriteLibrary.getSprite('bg_scroll');
        _oScrollingBg2 = createBitmap(oSpriteTile);
        _oScrollingBg2.y = CANVAS_HEIGHT;
        s_oStage.addChild(_oScrollingBg2);

        s_oStage.setChildIndex ( _oScrollingBg1, BG_GAME_INDEX );
        s_oStage.setChildIndex ( _oScrollingBg2, BG_GAME2_INDEX );

    };

    this.move = function(iVelocityAngle){
        if(_oScrollingBg1.y <= -CANVAS_HEIGHT){
            _oScrollingBg1.y = _oScrollingBg2.y + CANVAS_HEIGHT;
        }

        if(_oScrollingBg2.y <= -CANVAS_HEIGHT){
            _oScrollingBg2.y = _oScrollingBg1.y + CANVAS_HEIGHT;
        }

        _oScrollingBg1.y-=iVelocityAngle;
        _oScrollingBg2.y-=iVelocityAngle;
    };

    this._init();
}