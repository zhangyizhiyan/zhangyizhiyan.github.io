/**
 * 倒计时组件
 */
define(function(require,exports,module){
    var Handler = laya.utils.Handler;
    var TimeObjectMediator = (function(){
        function TimeObjectMediator(target, dispatcher){
            var self = this;
            this._tween = null;
            dispatcher.addEventListener("playSceneMediator:timeBegin",function(e){
                if(self._tween){return}
                self._tween = new Laya.Tween();
                self._tween.to(target,{value:0},90000,null,Handler.create(self,function(){
                    target.value = 100;
                    self._tween = null;
                    dispatcher.dispatch("timeObjectMediator:timeEnd");  
                }));
            });
            dispatcher.addEventListener("playSceneMediator:gamePause",function(e){
                self._tween.pause();
            });
            dispatcher.addEventListener("playSceneMediator:gameResume",function(e){
                self._tween.resume();
            });
            dispatcher.addEventListener("playSceneMediator:timeReset",function(e){
                target.value = 100;
                self._tween = null;
            });
        }
        

        return TimeObjectMediator;
    })();
    module.exports = TimeObjectMediator;
});