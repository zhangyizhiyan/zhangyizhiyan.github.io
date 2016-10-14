/**
 * 游戏主场景
 */
define(function(require,exports,module){
    var fg = fairygui;
    var Handler = Laya.Handler;
    var Browser = laya.utils.Browser;
    var PlayScene = (function(){
        function PlayScene(){
            this.injector = null;//注入

            this.root = null;
            this.daojishi = null;
            this.cuizi = null;
            
            this.pauseBtn = null;
        }

        PlayScene.prototype.render = function () {
            this.root = fg.UIPackage.createObject("游戏主场景", "主场景").asCom;
            this.root.setSize(fg.GRoot.inst.width, fg.GRoot.inst.height);
            fg.GRoot.inst.addChild(this.root);
            this.root.on(Laya.Event.MOUSE_MOVE,this,function(e){
                this.cuizi.x = this.root.displayObject.mouseX - 20;
                this.cuizi.y =this.root.displayObject.mouseY - 60;
            });
            this.root.on(Laya.Event.CLICK,this,function(e){
                if(this._isClicking == true){return;}
                var mouseX = this.root.displayObject.mouseX;
                var mouseY = this.root.displayObject.mouseY;
                this.root.displayObject.event("playScene:mouseClicked",
                            {x:mouseX,
                             y:mouseY});

                this.cuizi.x = mouseX - 20;
                this.cuizi.y = mouseY - 60;
                this.chiwoyibang.play(Handler.create(this,function(){
                    this._isClicking = false;
                }),1);
            });

            
            this.daojishi = this.root.getTransition("倒计时");
            this.daojishi.play(Handler.create(this,function(){
                this.root.displayObject.event("playScene:daojishiEnded");
            }),1,0.5);

            this.cuizi = this.root.getChild("锤子");
            this.chiwoyibang = this.root.getTransition("吃我一棒");
            this.score = this.root.getChild("总分");

            this.pauseBtn = this.root.getChild("暂停按钮");
            this.pauseBtn.onClick(this,function(){
                if (this.pauseBtn.selected){
                     this.root.displayObject.event("playScene:gamePause");
                }else{
                     this.root.displayObject.event("playScene:gameResume");
                }
            });

        }
        PlayScene.prototype.onExited = function(){
            Browser.container.style.cursor = "default";
            fg.GRoot.inst.removeChild(this.root);
            this.root.dispose();
        }
        PlayScene.prototype.getHoles = function(){
            var holes = [];
            for(var i = 0;i < 9;i++){
                holes.push(this.root.getChild("洞"+i));
                this.injector.inject(this.root.getChild("洞"+i));
            }
            return holes;    
        }
        PlayScene.prototype.showCuizi = function(){
            this.cuizi.visible = true;
            Browser.container.style.cursor = "none";
        }
        PlayScene.prototype.getTimeProgressbar = function(){
            return this.root.getChild("时间进度条");
        }

        PlayScene.prototype.updateScore = function(score){
            var t = ""
            if(score > 0){
                t = String(score);
            }else{
                t = "0" //不显示负数
            }
            this.score.text = t;
        }
        PlayScene.prototype.lvlUpHide = function(b){
            this.getTimeProgressbar().visible = !b;
            this.pauseBtn.visible = !b;
        }

        return PlayScene;
    })();
    module.exports = PlayScene;
});