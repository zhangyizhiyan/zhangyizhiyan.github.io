/**
 * 游戏主状态机 驱动游戏主流程
 */
define(function(require,exports,module){
    var GameStateModel = (function(){
        function GameStateModel(){
            this.dispatcher = null; //注入
            this._initData();
        }
        GameStateModel.prototype.init = function(){
            GameStateModel.dispatcher = this.dispatcher;
            if(!this.fsm){
                this.fsm = new jsfsa.Automaton(this.FSMCONFIG);
                this.fsm.doTransition("onbeginEntered");
            }  
             
        }
        GameStateModel.prototype.setScore = function(score){
            GameStateModel.prototype.score = score;
        }
        GameStateModel.prototype._initData = function(){
            GameStateModel.prototype.score = 0;
        }

        GameStateModel.prototype._onBeginEntered = function(e){
            GameStateModel.dispatcher.dispatch("GameStateModel:beginEntered",{loadType:"firstLoad"});
        }
        GameStateModel.prototype._beginOnloaded = function(e){
            GameStateModel.dispatcher.dispatch("GameStateModel:beginOnloaded",{loadType:"allLoad"});
            return "loading";
        }
        GameStateModel.prototype._loadingOnloaded = function (e) {
            GameStateModel.dispatcher.dispatch("GameStateModel:loadingOnloaded");
            return "mainMenu";
        }
        GameStateModel.prototype._onloadingEntered = function (e) {
            GameStateModel.dispatcher.dispatch("GameStateModel:loadingEntered");
        }
        GameStateModel.prototype._onloadingExited = function (e) {
            GameStateModel.dispatcher.dispatch("GameStateModel:loadingExited");
        }
        GameStateModel.prototype._onmainMenuEntered = function (e) {
            GameStateModel.dispatcher.dispatch("GameStateModel:mainMenuEntered");
        }
        GameStateModel.prototype._onmainMenuExited = function (e) {
            GameStateModel.dispatcher.dispatch("GameStateModel:mainMenuExited");
        }
        GameStateModel.prototype._onhelpMenuEntered = function (e) {
            GameStateModel.dispatcher.dispatch("GameStateModel:helpMenuEntered");
        }
        GameStateModel.prototype._onhelpMenuExited = function (e) {
            GameStateModel.dispatcher.dispatch("GameStateModel:helpMenuExited");
        }
        GameStateModel.prototype._onDaojishiEntered = function(e){
            GameStateModel.dispatcher.dispatch("GameStateModel:daojishiEntered");
        }   
        GameStateModel.prototype._onplayingExited = function(e){
            GameStateModel.dispatcher.dispatch("GameStateModel:playExited");
            GameStateModel.prototype._initData();
        }
        GameStateModel.prototype._onPlayingEntered = function(e){
            GameStateModel.dispatcher.dispatch("GameStateModel:playingEntered");
        }
        GameStateModel.prototype._onEndMenuEntered = function(e){
            GameStateModel.dispatcher.dispatch("GameStateModel:endMenuEntered");
        }

        GameStateModel.prototype._onEndMenuExited = function(e){
            GameStateModel.dispatcher.dispatch("GameStateModel:endMenuExited");
        }



        GameStateModel.prototype.FSMCONFIG = {
            "begin":{
                'onbeginEntered':GameStateModel.prototype._onBeginEntered,
                'onloaded':GameStateModel.prototype._beginOnloaded,
                isInitial:true
            },
            "loading":{
                listeners:{
                    entered:GameStateModel.prototype._onloadingEntered,
                    exited:GameStateModel.prototype._onloadingExited
                },
                'onloaded':GameStateModel.prototype._loadingOnloaded
            },
            "mainMenu":{
                listeners:{
                    entered:GameStateModel.prototype._onmainMenuEntered,
                    exited:GameStateModel.prototype._onmainMenuExited
                },
                'clickHelpBtn':'helpMenu',
                'clickNewBtn':'play'
            },
            "helpMenu": {
                listeners: {
                    entered: GameStateModel.prototype._onhelpMenuEntered,
                    exited: GameStateModel.prototype._onhelpMenuExited
                },
                'clickReturnBtn':'mainMenu'
            },
            "play":{
                listeners: {            
                    exited: GameStateModel.prototype._onplayingExited
                }
            },
            'play/daojishi':{
                listeners:{
                    entered: GameStateModel.prototype._onDaojishiEntered
                },
                isInitial:true,
                'finished':'play/playing'
            },
            'play/playing':{
                listeners:{
                    entered: GameStateModel.prototype._onPlayingEntered
                },
                'pause':'play/pause',
                'end':'endMenu'
            },
            'play/pause':{
                'play':"play/playing"
            },
            'endMenu':{
                listeners:{
                    entered:GameStateModel.prototype._onEndMenuEntered,
                    exited: GameStateModel.prototype._onEndMenuExited
                },
                "clickReturnBtn":'mainMenu',
                'clickNewBtn':'play'
                
            }


        };

        return GameStateModel;
    })();
    module.exports = GameStateModel;
});