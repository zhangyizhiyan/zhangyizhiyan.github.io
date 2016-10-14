/**
 * 帮助页面
 */
define(function(require,exports,module){
    var fg = fairygui;
    var HelpScene = (function(){
        function HelpScene(){
            this.root = null;
            this.returnBtn = null;
        }

        HelpScene.prototype.render = function(){  
            this.root = fg.UIPackage.createObject("游戏说明场景", "游戏说明").asCom;
            this.root.setSize(fg.GRoot.inst.width, fg.GRoot.inst.height);
            fg.GRoot.inst.addChild(this.root);

            this.returnBtn = this.root.getChild("返回主菜单").asButton;
            this.returnBtn.onClick(this,function(){
                 this.root.displayObject.event("helpScene:returnBtnClick");
            });
        }

        HelpScene.prototype.onExited = function () {
            fg.GRoot.inst.removeChild(this.root);
            this.root.dispose();
        }


        return HelpScene;
    })();
    module.exports = HelpScene;
});