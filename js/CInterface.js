function CInterface(){
    var _oAudioToggle;
    var _oButExit;
    
    var _oHelpPanel=null;
    
    var _pStartPosExit;
    var _pStartPosAudio;
    
    var _oScoreText;
    var _oScorePos;
    var _oScoreTextOutline;
    
    this._init = function(){                
        var oExitX;
        
        var oSprite = s_oSpriteLibrary.getSprite('but_exit');
        _pStartPosExit = {x: CANVAS_WIDTH - (oSprite.height/2)- 10, y: (oSprite.height/2) + 10};
        _oButExit = new CGfxButton(_pStartPosExit.x, _pStartPosExit.y, oSprite, s_oStage);
        _oButExit.addEventListener(ON_MOUSE_UP, this._onExit, this);

        oExitX = CANVAS_WIDTH - (oSprite.width/2)- 120;
        _pStartPosAudio = {x: oExitX, y: (oSprite.height/2) + 10};

        if(DISABLE_SOUND_MOBILE === false || s_bMobile === false){
            var oSprite = s_oSpriteLibrary.getSprite('audio_icon');
            _oAudioToggle = new CToggle(_pStartPosAudio.x,_pStartPosAudio.y,oSprite,s_bAudioActive);
            _oAudioToggle.addEventListener(ON_MOUSE_UP, this._onAudioToggle, this);        
            s_oStage.setChildIndex ( _oAudioToggle, BUTTON_INDEX );  
        }
        
        _oScorePos = {x: 50, y:CANVAS_HEIGHT-180};
        _oScoreTextOutline = new createjs.Text("0分","bold 50px "+FONT, "#fec12b");
        _oScoreTextOutline.x = _oScorePos.x;
        _oScoreTextOutline.y = _oScorePos.y;
        _oScoreTextOutline.textAlign = "left";
        _oScoreTextOutline.textBaseline = "alphabetic";
        _oScoreTextOutline.outline = 5;
        s_oStage.addChild(_oScoreTextOutline);
        _oScoreText = new createjs.Text("0分","bold 50px "+FONT, "#ff6527");
        _oScoreText.x = _oScorePos.x;
        _oScoreText.y = _oScorePos.y;
        _oScoreText.textAlign = "left";
        _oScoreText.textBaseline = "alphabetic";
        s_oStage.addChild(_oScoreText);
        
        s_oStage.setChildIndex ( _oButExit, BUTTON_INDEX );
        
        _oHelpPanel = new CHelp(s_oSpriteLibrary.getSprite('bg_help'));
    };
    
    this.unload = function(){
        if(DISABLE_SOUND_MOBILE === false || s_bMobile === false){
            _oAudioToggle.unload();
            _oAudioToggle = null;
        }
        
        _oButExit.unload();
        
        
        if(_oHelpPanel!==null){
            _oHelpPanel.unload();
        }
        s_oInterface = null;
    };
    
    this.refreshButtonPos = function(iNewX,iNewY){
        _oButExit.setPosition(_pStartPosExit.x - iNewX,iNewY + _pStartPosExit.y);
        if(DISABLE_SOUND_MOBILE === false || s_bMobile === false){
            _oAudioToggle.setPosition(_pStartPosAudio.x - iNewX,iNewY + _pStartPosAudio.y);
        }     
        _oScoreTextOutline.x = _oScorePos.x + iNewX;
        _oScoreText.x = _oScorePos.x + iNewX;
    };
    
    this._onButRestartRelease = function(){
        s_oGame.restartGame();
    };
    
    this.onExitFromHelp = function(){
        _oHelpPanel.unload();
        s_oGame.setUpdateTrue();
    };
    
    this.refreshScore = function(iScore){
        _oScoreText.text = iScore+"分";
        _oScoreTextOutline.text = iScore+"分";
    };
    
    this.bonusTaken = function(){
        createjs.Tween.get(_oScoreText).to({scaleX:1.2, scaleY:1.2}, 200, createjs.Ease.backOut  ).call(function() {
            createjs.Tween.get(_oScoreText).to({scaleX:1, scaleY:1}, 200, createjs.Ease.backIn   ).call(function() {
            
            });
        });
        createjs.Tween.get(_oScoreTextOutline).to({scaleX:1.2, scaleY:1.2}, 200, createjs.Ease.backOut  ).call(function() {
            createjs.Tween.get(_oScoreTextOutline).to({scaleX:1, scaleY:1}, 200, createjs.Ease.backIn   ).call(function() {
            
            });
        });
    };
    
    this._onAudioToggle = function(){
        createjs.Sound.setMute(s_bAudioActive);
        s_bAudioActive = !s_bAudioActive;
    };
    
    this._onExit = function(){
        if(DISABLE_SOUND_MOBILE === false || s_bMobile === false){
                createjs.Sound.play("click");
        }
        s_oGame.onExit();  
    };
    
    s_oInterface = this;
    
    this._init();
    
    return this;
}

var s_oInterface = null;