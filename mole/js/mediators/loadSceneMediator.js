/**
 * loading页面代理对象
 */
define(function(require,exports,module){
    var loadSceneMediator = (function () {
        function loadSceneMediator(target, dispatcher, gameStateModel) {
            dispatcher.addEventListener("GameStateModel:loadingEntered", function (event) {
                target.render();
                target.root.displayObject.on("loadScene:TweenComplete", this,function (event) {
                    gameStateModel.fsm.proceed();
                });
                target.root.displayObject.on("loadScene:exited", this,function (event) {
                    gameStateModel.fsm.pause();
                });
            });

            dispatcher.addEventListener("LoadModel:progress",function(event){
                target.updateProgress(event.params);
            });

            dispatcher.addEventListener("GameStateModel:loadingOnloaded",function(event){
                target.onLoaded();
            });

            dispatcher.addEventListener("GameStateModel:loadingExited",function(event){
                target.onExited();
            });
            
        }



        return loadSceneMediator;
    })();
    module.exports = loadSceneMediator;
});