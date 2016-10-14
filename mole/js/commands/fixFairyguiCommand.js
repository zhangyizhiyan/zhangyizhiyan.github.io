/**
 * 修改fairygui库
 */
define(function (require, exports, module) {
    var fg = fairygui;
    var FixFairyguiCommand = (function () {
        function FixFairyguiCommand() {
            this.execute = function (event) {
                /*修改faiygui 不支持控制器页面缓动结束回调 */
                var oldTweenComplete = fg.GearLook.prototype.__tweenComplete;
                fg.GearLook.prototype.__tweenComplete = function () {
                    oldTweenComplete.call(this);
                    if (this._owner.onTweenComplete) {
                        this._owner.onTweenComplete();
                    }
                }
                /**修改playOneShotSound 与Soundmanager 相结合，
                 * 实现静音判断功能 默认playOneShotSound只播放音效
                */
                var oldPlayOneShotSound = fg.GRoot.prototype.playOneShotSound;
                fg.GRoot.prototype.playOneShotSound  = function(sound,volumeScale){
                    if(Laya.SoundManager.muted || Laya.SoundManager.soundMuted){
                        return;
                    }else{
                        oldPlayOneShotSound.call(this,sound,volumeScale);
                    }
                }
            }
        }


        return FixFairyguiCommand;
    })();
    module.exports = FixFairyguiCommand;
});