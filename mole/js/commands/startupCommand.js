/**
 * 游戏初始化命令
 */
define(function(require,exports,module){
    var RootViewMediator = require("./../mediators/rootViewMediator.js");
    var StartupCommand = (function () {
        function StartupCommand(gameStateModel,mediators,dispatcher) {
            
             this.execute = function (event) {
                this._layaInit(event.params);
                //修改fairygui 库
                dispatcher.dispatch("fixFairyGui");
                //rootMediator
                mediators.create(RootViewMediator,fairygui.GRoot.inst.displayObject);
                //初始化游戏状态机
                gameStateModel.init();

            }
           
        }

        StartupCommand.prototype._layaInit = function (config) {
            Laya.init(config.width, config.height, config.renderMode);
            Laya.stage.screenMode = config.screenMode;
            Laya.stage.scaleMode = config.scaleMode;
            Laya.stage.frameRate = config.frameRate;
            if(config.showStat){
                laya.utils.Stat.show(0, 0);
            }
            
        }

        return StartupCommand;
    })();
    module.exports = StartupCommand;
});