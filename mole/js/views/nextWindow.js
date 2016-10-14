/**
 * 显示下一关窗口
 */
define(function(require,exports,module){
    var fg = fairygui;
    var Tween = laya.utils.Tween;
    var Handler = laya.utils.Handler;
    var NextWindow = (function(_super){
        function NextWindow(data){
            NextWindow.super(this);
            this._data = data;
        }
        Laya.class(NextWindow,'game.view.NextWindow',_super);

        NextWindow.prototype.onInit = function(){
            this.contentPane = fg.UIPackage.createObject("UI","下一关");
            this.center();
            this.setPivot(0.5,0.5);

            this._score = this.contentPane.getChild("总分");
            this._nextScore = this.contentPane.getChild("目标");
            this._score.text = this._data.score;
            this._nextScore.text = this._data.nextScore;
        }
        NextWindow.prototype.doShowAnimation = function(){
            this.setScale(0.1,0.1);
            Tween.to(this, { scaleX: 1,scaleY: 1 },300,
                 laya.utils.Ease.QuadOut, Handler.create(this, this.onShown));
        }
        NextWindow.prototype.doHideAnimation = function(){
            Tween.to(this, { scaleX: 0.1,scaleY: 0.1 },300,
                 laya.utils.Ease.QuadOut, Handler.create(this, this.hideImmediately));
        }

        return NextWindow;
    })(fg.Window);
    module.exports = NextWindow;
});