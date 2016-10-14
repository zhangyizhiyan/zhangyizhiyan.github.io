/**
 * 加载页面
 */
define(function (require, exports, module) {
    var Loader = Laya.Loader;
    var fg = fairygui;
    var LoadScene = (function () {
        function LoadScene() {
            this.root = null;
            this.loadTxt = null;
            this.controller = null;

        }
        LoadScene.prototype.postConstruct = function () {
            var self = this;
            fg.UIPackage.addPackage("data/img/loading");

            this.root = fg.UIPackage.createObject("loading", "loadingpage").asCom;
            this.root.getChild("loadingcomp").onTweenComplete = function () {
                self.root.displayObject.event("loadScene:TweenComplete");
                fg.GRoot.inst.removeChild(this.root);
                self.root.dispose();
            }

            this.root.setSize(fg.GRoot.inst.width, fg.GRoot.inst.height);
            this.loadTxt = this.root.getChild("loadingcomp").getChild("loadingtxt");
            this.controller = this.root.getController("c1");
        }

        LoadScene.prototype.render = function () {
            fg.GRoot.inst.addChild(this.root);
        }
        LoadScene.prototype.updateProgress = function (value) {
            this.loadTxt.text = "正在载入( " + String(Math.floor(value * 100)) + " %)";
        }
        LoadScene.prototype.onLoaded = function () {
            this.controller.selectedPage = "loaded";
        }
        LoadScene.prototype.onExited = function () {
            this.root.displayObject.event("loadScene:exited");
        }
        return LoadScene;
    })();
    module.exports = LoadScene;
});