/**
 * 游戏主场景代理对象
 */
define(function(require,exports,module){
    var GameObjectMediator = require("./gameObjectMediator.js");
    var TimeObjectMediator = require("./timeObjectMediator.js");
    var NextWindow = require("../views/nextWindow.js");
    var PlaySceneMediator = (function(){

        function PlaySceneMediator(target, dispatcher, mediators, gameStateModel,soundModel) {
            var self = this;
            dispatcher.addEventListener("GameStateModel:daojishiEntered", function (event) {
                target.render();

                self.meds = mediators.create(GameObjectMediator, target.getHoles());
                            
                mediators.create(TimeObjectMediator,target.getTimeProgressbar());
                target.root.displayObject.on("playScene:daojishiEnded", this,function (event) {
                    gameStateModel.fsm.doTransition("finished");
                });
                target.root.displayObject.on("playScene:mouseClicked",this,function(pos){
                    if(gameStateModel.fsm.getCurrentState().name == "play/pause"){
                        return;
                    }
                    var message = {pos:pos,isHited:false};
                    dispatcher.dispatch("playSceneMediator:mouseClicked",message);

                    if(!message.isHited){
                        soundModel.playSound("no_hit");
                    }
                });
                target.root.displayObject.on("playScene:gamePause",this,function(e){
                    _gamePause();
                });
                target.root.displayObject.on("playScene:gameResume",this,function(e){
                    _gameResume();
                });

            });
            dispatcher.addEventListener("GameStateModel:playExited",function(event){
                target.onExited();
                Laya.timer.clearAll(self);
                self._initData();
            });
            dispatcher.addEventListener("GameStateModel:playingEntered",function(event){
                target.showCuizi();
                self.activeGameObject();
                dispatcher.dispatch("playSceneMediator:timeBegin");
            });
            dispatcher.addEventListener("timeObjectMediator:timeEnd",function(event){
                gameStateModel.fsm.doTransition("end");
            });
            dispatcher.addEventListener("GameObjectMediator:updateScore",function(event){
                var score = event.params;
                var nextWindow = null;
                gameStateModel.setScore(score);
                target.updateScore(score);
                if(score > self._lvUpScore){
                    soundModel.playSound("game_pass");
                    _gamePause();
                    self._lvUpScore = Math.floor(self._lvUpScore * 1.5);
                    self._n += 1;

                    nextWindow = new NextWindow({score:score,nextScore:self._lvUpScore});
                    nextWindow.show();
                    target.lvlUpHide(true);
                    nextWindow.onClick(this,function(){
                        gameStateModel.setScore(0);
                        target.updateScore(0);
                        dispatcher.dispatch("playSceneMediator:timeReset")
                        _gameResume();
                        nextWindow.hide();
                        target.lvlUpHide(false);
                    });

                }               
            });
            dispatcher.addEventListener("GameObjectMediator:SleepEntered",function(event){
                for(var i = 0; i < self._notActive.length;i++){
                    if(self._notActive[i] == event.params){
                        return;
                    }
                }
                self._notActive.push(event.params);
            });

            this._initData();

            function _gamePause() {
                gameStateModel.fsm.doTransition("pause");
                Laya.timer.clear(self, self._activeGameObject);
                dispatcher.dispatch("playSceneMediator:gamePause");
            }
            function _gameResume() {
                gameStateModel.fsm.doTransition("play");
                dispatcher.dispatch("playSceneMediator:gameResume");
            }

        }
        PlaySceneMediator.prototype.activeGameObject = function(){
            Laya.timer.loop(this._activeTime,this,this._activeGameObject);      
        }
        PlaySceneMediator.prototype._activeGameObject = function () {
            var len = this._notActive.length;
            if (len > this._n) {
                len = this._n;
            }
            for (var i = 0; i < len; i++) {
                var index = Math.floor(Math.random() * this._notActive.length);
                this.meds[this._notActive[index]].active(this._notActive[index]);
                this._notActive.splice(index, 1);
            }
        }

        PlaySceneMediator.prototype._initData = function () {
            this._n = 1;
            this._activeTime = 1500;
            this._notActive = [0, 1, 2, 3, 4, 5, 6, 7, 8];
            this._lvUpScore = 10000;
        }


        return PlaySceneMediator;
    })();
    module.exports = PlaySceneMediator;
});