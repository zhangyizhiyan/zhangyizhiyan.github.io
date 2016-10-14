/**
 * 帮助页面代理对象
 */
define(function(require,exports,module){
    var HelpSceneMeditor = (function(){
        function HelpSceneMeditor(target,dispatcher,gameStateModel){

            dispatcher.addEventListener("GameStateModel:helpMenuEntered", function (event) {
                target.render();
                 target.root.displayObject.on("helpScene:returnBtnClick", this,function (event) {
                    gameStateModel.fsm.doTransition("clickReturnBtn");
                });

            });

            dispatcher.addEventListener("GameStateModel:helpMenuExited",function(event){
                target.onExited();
            });
        }


        return HelpSceneMeditor;
    })();
    module.exports = HelpSceneMeditor;
});