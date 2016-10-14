/**
 * fairygui包初始化 组件自定义
 */
define(function(require,exports,module){
    var fg = fairygui;
    var GameObject = require("./../views/gameObject.js");
    var FairyguiInitCommand = (function(){
        function FairyguiInitCommand() {
            this.execute = function (event) {
                fg.UIPackage.addPackage("data/img/UI");
                fg.UIPackage.addPackage("data/img/场景");
                fg.UIPackage.addPackage("data/img/游戏对象");
                fg.UIPackage.addPackage("data/img/主菜单场景");
                fg.UIPackage.addPackage("data/img/游戏说明场景");
                fg.UIPackage.addPackage("data/img/游戏主场景");
                fg.UIPackage.addPackage("data/img/结束场景");
                fg.UIPackage.addPackage("data/music/音效");

                for (var i = 0; i < 9; i++) {
                    fg.UIObjectFactory.setPackageItemExtension(
                        fg.UIPackage.getItemURL("游戏主场景", "出入洞_" + i),
                        GameObject);
                }
            }
        }

        return FairyguiInitCommand;
    })();
    module.exports = FairyguiInitCommand;
});