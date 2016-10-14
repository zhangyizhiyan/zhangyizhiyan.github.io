/**
 * 音效、音乐模块
 */
define(function(require,exports,module){
    var SoundManager = Laya.SoundManager;
    var SoundModel = (function(){
        function SoundModel(){ }

        SoundModel.prototype.playMusic = function(key,loops,complete){
             SoundManager.playMusic(SoundModel.SOUNDS[key],loops,complete);   
        }
        SoundModel.prototype.playSound = function(key,loops,complete){
            SoundManager.playSound(SoundModel.SOUNDS[key],loops,complete);
        }
        SoundModel.prototype.setMute  = function(t){
            SoundManager.muted = t;            
        }
        SoundModel.prototype.isMute = function(){
            return SoundManager.muted;
        }

        SoundModel.SOUNDS = {
            "begin_music":"data/music/音效@jaqu6.mp3",
            "game_music":"data/music/音效@jaqu5.mp3",
            "game_pass":"data/music/音效@jaqu4.mp3",
            "no_hit":"data/music/音效@jaqu3.mp3",
            "over_music":"data/music/音效@jaqu2.mp3",
            "second_music":"data/music/音效@jaqu1.mp3"
        };
        return SoundModel;
    })();
    module.exports = SoundModel;
});