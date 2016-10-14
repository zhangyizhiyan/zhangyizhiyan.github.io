/**
 * 游戏结束场景
 */
define(function(require,exports,module){
    var fg = fairygui;
    var GameEndScene = (function(){
        function GameEndScene(){
            this.root = null;
            this.returnBtn = null;
            this.newBtn = null;
            this.score = null;
        }

        GameEndScene.prototype.render = function(){
            this.root = fg.UIPackage.createObject("结束场景", "结束场景").asCom;
            this.root.setSize(fg.GRoot.inst.width, fg.GRoot.inst.height);
            fg.GRoot.inst.addChild(this.root);

            this.returnBtn = this.root.getChild("返回主菜单按钮").asButton;
            this.returnBtn.onClick(this,function(){
                 this.root.displayObject.event("gameEndScene:returnBtnClick");
            });
            this.newBtn = this.root.getChild("重新开始按钮");
            this.newBtn.onClick(this,function(){
                this.root.displayObject.event("gameEndScene:newBtnClick");
            });
            this.score = this.root.getChild("得分");
            this.score.text = this._score;

        }
        GameEndScene.prototype.onExited = function () {
            fg.GRoot.inst.removeChild(this.root);
            this.root.dispose();
        }
        GameEndScene.prototype.setScore = function(score){
            this._score = score;
        }

        return GameEndScene;
    })();
    module.exports = GameEndScene;
});