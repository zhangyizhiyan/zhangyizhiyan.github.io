/**
 * 游戏中各动物对象view
 */
define(function(require,exports,module){
    var fg = fairygui;
    var TimeLine = Laya.TimeLine;
    var Event  = Laya.Event;
    var Handler = Laya.Handler;
    var GameObject = (function(_super){
        function GameObject(){
            GameObject.super(this);
            this._pool = new fg.GObjectPool();
            this._movingTween = new TimeLine();
        }
        Laya.class(GameObject,'game.view.GameObject',_super);
        GameObject.prototype.constructFromXML = function(xml){           
           _super.prototype.constructFromXML.call(this,xml);
              
           this._gameObject = this.getChild("游戏对象");
           this._gameObject._orgX = this._gameObject.x;
           this._gameObject._orgY = this._gameObject.y;
           this._hitEffect = this.getChild("打击效果");   
        }

        GameObject.prototype.moving = function (time) {   
            this._movingTween.to(this._gameObject,{y: 175},time,null,0)
                             .to(this._gameObject,{y: 300},time,null,200);
            this._movingTween.on(Event.COMPLETE,this,this._onMovingComplete);
            this._movingTween.play();

        }
        GameObject.prototype._onMovingComplete = function(){
            this.displayObject.event("GameObject:movingEnded");
        }

        GameObject.prototype.setGameObject = function(o){
            this._gameObject.url = o.url;
            this._gameObject._onHitUrl = o.onHitUrl;
        }
        GameObject.prototype.gameObjectOnHit = function(o,pos){
            var self = this;
            
            var effect = this._pool.getObject(o._onHitEffectUrl);
            this._movingTween.reset();
            this._gameObject.url = this._gameObject._onHitUrl;
            this._hitEffect.visible = true;

            this._hitEffect.setPlaySettings(0,-1,1,-1,function(){
                self._gameObject.x = self._gameObject._orgX;
                self._gameObject.y = self._gameObject._orgY;
                self.displayObject.event("GameObject:hitEffectEnded");
                self._hitEffect.visible = false;
            });
            this._hitEffect.playing = true;  

            effect.x = pos.x;
            effect.y = pos.y;
            fg.GRoot.inst.addChild(effect);
            setTimeout(function() {
                fg.GRoot.inst.removeChild(effect);
                self._pool.returnObject(effect);
            }, 2000);

            //this.displayObject.event("GameObject:movingEnded");
        }
        GameObject.prototype.isClicked = function(pos){
            if(this._gameObject.y > 240){
                return false;
            }
            var gameObjectPos = this.localToGlobal(this._gameObject.x,this._gameObject.y);
            if((gameObjectPos.x <= pos.x && pos.x <= gameObjectPos.x + this._gameObject.width)
                 &&(gameObjectPos.y <= pos.y && pos.y <= gameObjectPos.y + this._gameObject.height)){
                        return true;
                 }
            return false;
        }
        GameObject.prototype.pause = function () {
            if(this._movingTween){
                this._movingTween.pause();
            }
        }
        GameObject.prototype.resume = function () {
            if (this._movingTween) {
                this._movingTween.resume();
            }
        }

        return GameObject;
    })(fg.GComponent);
    module.exports = GameObject;
});