/**
 * 游戏对象model
 */
define(function(require,exports,module){

    var GameObjectModel = (function(_super){
        function GameObjectModel(){
            GameObjectModel.super(this);
            this.gameStateModel = null;//注入
            this.fsm = new jsfsa.Automaton(this.FSMCONFIG);
            this._upTime = 1500;        
        }
        Laya.class(GameObjectModel,"game.model.GameObjectModel",_super);

        GameObjectModel.prototype._onMovingEntered = function(e,o){
            o.event("GameObjectModel:movingEntered",{time:o._upTime});
        }
        GameObjectModel.prototype._onActive = function(e,o){
            var i = Math.floor(Math.random() * 5);
            o._upTime = GameObjectModel.GAME_OBJECTS[i].upTime;
            o._url = GameObjectModel.GAME_OBJECTS[i].url;
            o._onHitUrl = GameObjectModel.GAME_OBJECTS[i].onHitUrl;
            o._onHitEffectUrl = GameObjectModel.GAME_OBJECTS[i].onHitEffectUrl;
            o._updateScore = GameObjectModel.GAME_OBJECTS[i].updateScore;
 
            o.event("GameObjectModel:actived",{url:o._url,onHitUrl:o._onHitUrl});
            return 'moving';
        }
        GameObjectModel.prototype._onHitedEntered = function(e,o,pos){
           o.event("GameObjectModel:HitedEntered",pos);
           o.event("GameObjectModel:updateScore",o._updateScore(o.gameStateModel.score));
        }
        GameObjectModel.prototype._onSleepEntered = function(e,o){
            o.event("GameObjectModel:SleepEntered",o._iindex);
        }

        GameObjectModel.prototype.FSMCONFIG = {

            'sleep':{
                listeners:{
                    entered:GameObjectModel.prototype._onSleepEntered
                },
                isInitial:true,
                'active':GameObjectModel.prototype._onActive
            },
            'moving':{
                listeners:{
                    entered:GameObjectModel.prototype._onMovingEntered
                },
                'ending':'sleep',
                'hit':'hited'
            },
            'hited':{
                listeners:{
                    entered:GameObjectModel.prototype._onHitedEntered
                },
                'ending':'sleep'            
            }
        }
        GameObjectModel.GAME_OBJECTS =[
            {
                name:"地鼠之王",
                url:"ui://rqcp75rqfb4b5",
                onHitUrl:"ui://rqcp75rqfb4b6",
                upTime:1200,
                onHitEffectUrl:"ui://rwt3ssrg10h091x",
                updateScore:function(score){
                    return score + 500;
                }
            },
            {
                name:"疯狂地鼠",
                url:"ui://rqcp75rqfb4b7",
                onHitUrl:"ui://rqcp75rqfb4b8",
                upTime:1500,
                onHitEffectUrl:"ui://rwt3ssrg10h091z",
                updateScore:function(score){
                    return score + 100;
                }
            },
            {
                name:"精灵鼠",
                url:"ui://rqcp75rqfb4ba",
                onHitUrl:"ui://rqcp75rqfb4b9",
                upTime:1000,
                onHitEffectUrl:"ui://rwt3ssrg10h091w",
                updateScore:function(score){
                    return Math.floor(score + score * 0.2);
                }
            },
            {
                name:"流氓兔",
                url:"ui://rqcp75rqfb4bc",
                onHitUrl:"ui://rqcp75rqfb4bb",
                upTime:1500,
                onHitEffectUrl:"ui://rwt3ssrg10h091v",
                updateScore:function(score){
                    return Math.floor(score / 2);
                }
            },
            {
                name:"龙猫",
                url:"ui://rqcp75rqfb4be",
                onHitUrl:"ui://rqcp75rqfb4bd",
                upTime:1600,
                onHitEffectUrl:"ui://rwt3ssrg10h091y",
                updateScore:function(score){
                    return score - 100;
                }
            }
        ]
                   
        return GameObjectModel;
    })(Laya.EventDispatcher);

    module.exports = GameObjectModel;
});