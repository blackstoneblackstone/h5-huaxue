function CLineStroke(iX, iAngle){    
    var _oLine;
    
    var _iCont = 0;
    var _bCanWrite =  true;
    var _bUpdate = true;
    
    this._init = function(iX){  
        
        _oLine = new createjs.Shape();
        _oLine.y = SKIER_Y_START+10;
        s_oStage.addChild(_oLine);
        s_oStage.setChildIndex ( _oLine, LINE_INDEX );

        _oLine.graphics.beginStroke("black");
        _oLine.graphics.moveTo(iX, 0);
        
    };
    
    this.update = function(iX, iVelocity){
        if(_bUpdate === true){
            _oLine.y-=iVelocity;
            if(_bCanWrite === true){
                _iCont+=iVelocity;
                _oLine.graphics.lineTo(iX, _iCont);
            }
        }
    };
    
    this.getY = function(){
        return _oLine.y;
    };
    
    this.getState = function(){
        return _bCanWrite;
    };
    
    this.getUpdate = function(){
        return _bUpdate;
    };
    
    this.changeState = function(){
        _bCanWrite = !_bCanWrite;
        _oLine.graphics.endStroke();
    };
    
    this.unload = function(){
        _bUpdate = false;
        s_oStage.removeChild(_oLine);
    };
    this._init(iX, iAngle);
}

