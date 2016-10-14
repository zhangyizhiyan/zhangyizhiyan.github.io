/**
 * 依赖注入配置
 */
define(function(require,exports,module){
    var GameStateModel = require("./js/models/gameStateModel.js");
    var LoadModel = require("./js/models/loadModel.js");
    var SoundModel = require("./js/models/soundModel.js");
    var GameObjectModel = require("./js/models/gameObjectModel.js");

    var StartupCommand = require("./js/commands/startupCommand.js");
    var LoadResourceCommand = require('./js/commands/loadResourceCommand.js');
    var FixFairyguiCommand = require("./js/commands/fixFairyguiCommand.js");
    var FairyguiInitCommand = require("./js/commands/fairyguiInitCommand.js");

    var LoadScene = require("./js/views/loadScene.js");
    var StartScene = require("./js/views/startScene.js");
    var HelpScene = require("./js/views/helpScene.js");
    var PlayScene = require("./js/views/playScene.js");
    var GameEndScene = require("./js/views/gameEndScene.js");
    var GameObject = require("./js/views/gameObject.js");

    
    var Config = (function(){
        function Config(){
            this.commands = null;//注入
            this.injector = null;//注入
        }
        Config.prototype.setup = function(){
            //commands
            this.commands.add("fixFairyGui",FixFairyguiCommand);
            this.commands.add('startup',StartupCommand);
            


            this.commands.add('GameStateModel:beginEntered',LoadResourceCommand);
            this.commands.add("GameStateModel:beginOnloaded",LoadResourceCommand);

            this.commands.add("LoadModel:allLoaded",FairyguiInitCommand);

            //models
            this.injector.mapClass('gameStateModel',GameStateModel,true);
            this.injector.mapClass('loadModel',LoadModel,true);
            this.injector.mapClass('soundModel',SoundModel,true);

            this.injector.mapClass('gameObjectModel',GameObjectModel);

            //views
            this.injector.mapClass('loadScene',LoadScene,true);
            this.injector.mapClass('startScene',StartScene,true);
            this.injector.mapClass('helpScene',HelpScene,true);
            this.injector.mapClass('playScene',PlayScene);
            this.injector.mapClass("gameEndScene",GameEndScene,true);

            this.injector.mapClass('gameObject',GameObject);

            //mediators

        }
        
        return Config;
    })();
    module.exports = Config;
});