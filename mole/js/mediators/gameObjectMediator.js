/**
 * 代理游戏对象
 */
define(function(require,exports,module){

    var GameObjectMediator = (function(){
        function GameObjectMediator(target){
            this.gameObjectModel = null //注入;
            
            this.target = target;
            this.dispatcher = null;//注入
            this.soundModel = null;//注入

        }
        GameObjectMediator.prototype.postConstruct = function () {
            var self = this;
            this.gameObjectModel.on("GameObjectModel:movingEntered",this,function(config){
                this.target.moving(config.time);
            }); 
            this.gameObjectModel.on("GameObjectModel:actived",this,function(config){
                this.target.setGameObject(config);
            })
            this.gameObjectModel.on("GameObjectModel:HitedEntered",this,function(pos){
                this.target.gameObjectOnHit(this.gameObjectModel,pos);
            }); 

            this.gameObjectModel.on("GameObjectModel:updateScore",this,function(score){
                this.dispatcher.dispatch("GameObjectMediator:updateScore",score);
            });
            this.gameObjectModel.on("GameObjectModel:SleepEntered",this,function(index){
                this.dispatcher.dispatch("GameObjectMediator:SleepEntered",index);
            });



            this.target.displayObject.on("GameObject:movingEnded",this,function(e){
                this.gameObjectModel.fsm.doTransition("ending",this.gameObjectModel); 
            });
            this.target.displayObject.on("GameObject:hitEffectEnded",this,function(e){
                this.gameObjectModel.fsm.doTransition("ending",this.gameObjectModel);
            });


            this.dispatcher.addEventListener("playSceneMediator:mouseClicked",function(e){
                if((self.gameObjectModel.fsm.getCurrentState().name != "sleep") &&
                     (self.target.isClicked(e.params.pos))){
                    self.gameObjectModel.fsm.doTransition("hit",self.gameObjectModel,e.params.pos);
                    e.params.isHited = true;
                }
            });
            this.dispatcher.addEventListener("playSceneMediator:gamePause", function (e) {
                if(!self.gameObjectModel.fsm.isTransitioning() && 
                    self.gameObjectModel.fsm.getCurrentState().name == "moving"){
                        self.target.pause();
                }         
            });
            this.dispatcher.addEventListener("playSceneMediator:gameResume", function (e) {
                if(!self.gameObjectModel.fsm.isTransitioning() &&
                    self.gameObjectModel.fsm.getCurrentState().name == "moving"){
                        self.target.resume();
                }
            });
        }
        GameObjectMediator.prototype.active = function(index){
            this.gameObjectModel._iindex = index;
            this.gameObjectModel.fsm.doTransition('active',this.gameObjectModel);
        }
        return GameObjectMediator;
    })();
    module.exports = GameObjectMediator;
});