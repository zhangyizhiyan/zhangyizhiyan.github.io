/**
 * 开始菜单场景
 */
define(function(require,exports,module){
    var Loader = Laya.Loader;
    var fg = fairygui;
    var StartScene = (function(){
        function StartScene(){

            this.root = null;
            this.helpBtn = null;
            this.newBtn = null;
            this.soundBtn = null;
        }
        StartScene.prototype.render = function () {
            this.root = fg.UIPackage.createObject("主菜单场景", "主菜单").asCom;
            this.root.setSize(fg.GRoot.inst.width, fg.GRoot.inst.height);

            this.helpBtn = this.root.getChild("游戏说明").asButton;
            this.helpBtn.onClick(this, function () {
                this.root.displayObject.event("startScene:helpBtnClick");
            });

            this.newBtn = this.root.getChild("新游戏").asButton;
            this.newBtn.onClick(this, function () {
                this.root.displayObject.event("startScene:newBtnClick");   
            });
            fg.GRoot.inst.addChild(this.root); 
            this.soundBtn = this.root.getChild("声音设置"); 
            this.soundBtn.onClick(this,function(){
                if(this.soundBtn.selected){
                    this.root.displayObject.event("startScene:muted");
                }else{
                    this.root.displayObject.event("startScene:playMusic");
                }            
            });     
        }

        StartScene.prototype.setSoundBtn = function(selected){
            this.soundBtn.selected = selected;
        }

        StartScene.prototype.onExited = function(){
            fg.GRoot.inst.removeChild(this.root);
            this.root.dispose();
        }
        return StartScene;
    })();
    module.exports = StartScene;
});