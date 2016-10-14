/**
 * 入口模块
 */
define(function(require,exports,module){
    var Config = require("./config.js");
    var MoleGame = soma.Application.extend({
        constructor:function(config){
            this.config = config;
            soma.Application.call(this);
        },
        init: function () {
            this.injector.inject(this.config);
            this.config.setup();
        },
        start:function(){
            this.dispatcher.dispatch("startup",{
                renderMode:laya.webgl.WebGL,
                width:MoleGame.WIDTH,
                height:MoleGame.HEIGHT,
                screenMode:MoleGame.SCREEN_HORIZONTAL,
                scaleMode:MoleGame.SHOW_FULL,
                frameRate:'mouse',
                showStat:true
            });
        },



    });
    MoleGame.WIDTH = 750;
    MoleGame.HEIGHT = 550;
    MoleGame.SCREEN_HORIZONTAL = laya.display.Stage.SCREEN_HORIZONTAL;
    MoleGame.SHOW_FULL = laya.display.Stage.SIZE_FULL;

    new MoleGame(new Config());
});