/**
 * 结束场景代理
 */
define(function(require,exports,module){
    var GameEndSceneMediator = (function(){
        function GameEndSceneMediator(target,dispatcher,gameStateModel,soundModel){
            dispatcher.addEventListener("GameStateModel:endMenuExited",function(event){
                target.onExited();
            });
            dispatcher.addEventListener("GameStateModel:endMenuEntered",function(event){
                soundModel.playSound("over_music");
                target.render();
                target.root.on("gameEndScene:returnBtnClick",this,function(e){
                    gameStateModel.fsm.doTransition("clickReturnBtn");
                });
                target.root.on("gameEndScene:newBtnClick",this,function(e){
                    gameStateModel.fsm.doTransition("clickNewBtn");
                });

            });
            dispatcher.addEventListener("GameStateModel:playExited",function(event){
                target.setScore(gameStateModel.score);
            });
        }


        return GameEndSceneMediator;
    })();
    module.exports = GameEndSceneMediator;
});