/**
 * 游戏主菜单代理对象
 */
define(function(require,exports,module){
    var StartSceneMediator = (function(){
        function StartSceneMediator(target,dispatcher,gameStateModel,soundModel){
            var self = this;
            this._firstRender = true;
            dispatcher.addEventListener("GameStateModel:mainMenuEntered",function(event){
                target.render();
                if(soundModel.isMute()){
                    target.setSoundBtn(true);                  
                }else{
                    if(self._firstRender){
                        soundModel.playMusic("game_music");
                    }
                }
                self._firstRender = false;

                target.root.displayObject.on("startScene:helpBtnClick",this,function(event){
                    gameStateModel.fsm.doTransition("clickHelpBtn");});
                target.root.displayObject.on("startScene:newBtnClick",this,function(event){
                    gameStateModel.fsm.doTransition("clickNewBtn");});
                target.root.displayObject.on("startScene:muted",this,function(event){
                     soundModel.setMute(true);});
                target.root.displayObject.on("startScene:playMusic",this,function(event){
                    soundModel.setMute(false);
                    soundModel.playMusic("game_music");});
    
            });
            
            dispatcher.addEventListener("GameStateModel:mainMenuExited",function(event){
                target.onExited();
            });

        }
        return StartSceneMediator;
    })();
    module.exports = StartSceneMediator;
});