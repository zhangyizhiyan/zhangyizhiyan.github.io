/**
 * 舞台根节点代理对象
 */
define(function(require,exports,module){
    var LoadSceneMediator = require("./loadSceneMediator.js");
    var StartSceneMediator = require("./startSceneMediator.js");
    var HelpSceneMediator = require("./helpSceneMediator.js");
    var PlaySceneMediator = require("./playSceneMediator.js");
    var GameEndSceneMediator = require("./gameEndSceneMediator.js");

    var RootViewMediator = (function(){
        function RootViewMediator(target,dispatcher,mediators,injector,gameStateModel){
           
            Laya.stage.addChild(target);
            Laya.stage.bgColor = "#FFFFFF";
            dispatcher.addEventListener("LoadModel:firstLoaded",function(event){
                mediators.create(LoadSceneMediator,injector.getValue('loadScene'));
                gameStateModel.fsm.doTransition('onloaded');
            });
            dispatcher.addEventListener("LoadModel:allLoaded",function(event){
                mediators.create(StartSceneMediator,injector.getValue('startScene'));
                gameStateModel.fsm.doTransition('onloaded');
            });

            mediators.create(HelpSceneMediator,injector.getValue('helpScene'));
            mediators.create(PlaySceneMediator,injector.getValue('playScene'));
            mediators.create(GameEndSceneMediator,injector.getValue("gameEndScene"));

        }

        return RootViewMediator
    })();

    module.exports = RootViewMediator;
});