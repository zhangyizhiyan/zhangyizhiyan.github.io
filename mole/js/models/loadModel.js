/**
 * 加载资源model
 */
define(function(require,exports,module){
    var Handler = Laya.Handler;
    var Loader = Laya.Loader;
    var LoadModel = (function(){
        function LoadModel(){
            this.dispatcher = null;//注入

            this.isFirstLoad = false;
        }
        LoadModel.prototype.load = function (data) {
            Laya.loader.load(data,
                Handler.create(this, this._onLoaded, [], false),
                Handler.create(this, this._onProgress, [], false));
        }
        
        LoadModel.prototype._onLoaded = function () {
            if (this.isFirstLoad) {
                this.dispatcher.dispatch("LoadModel:firstLoaded");
            } else {
                this.dispatcher.dispatch("LoadModel:allLoaded");
            }   
        }
        LoadModel.prototype._onProgress = function(value){
            this.dispatcher.dispatch("LoadModel:progress",value);
        }
        LoadModel.prototype.firstLoad = function(){
            this.isFirstLoad = true;
            this.load(LoadModel.FIRST_URLS);
        }
        LoadModel.prototype.allLoad = function(){
            this.isFirstLoad = false;
            this.load(LoadModel.ALL_URLS);
        }


        LoadModel.FIRST_URLS = [{ url: "data/img/loading@atlas0.png", type: Loader.IMAGE },
            { url: "data/img/loading.fui", type: Loader.BUFFER }
        ];
        LoadModel.ALL_URLS = [{ url: "data/img/UI@atlas0.png", type: Loader.IMAGE },
            { url: "data/img/UI.fui", type: Loader.BUFFER },
            { url: "data/img/场景@atlas0.png", type: Loader.IMAGE },
            { url: "data/img/场景.fui", type: Loader.BUFFER },
            { url: "data/img/游戏对象.fui", type: Loader.BUFFER },
            { url: "data/img/主菜单场景.fui", type: Loader.BUFFER },
            { url: "data/img/游戏说明场景.fui", type: Loader.BUFFER },
            { url:"data/img/结束场景.fui",type:Loader.BUFFER},
            { url: "data/img/游戏主场景.fui", type: Loader.BUFFER },
            { url: "data/img/游戏对象@atlas0.png", type: Loader.IMAGE },
            
            {url: "data/music/音效.fui", type: Loader.BUFFER },
            {url:"data/music/音效@jaqu1.mp3",type:Loader.SOUND},
            {url:"data/music/音效@jaqu2.mp3",type:Loader.SOUND},
            {url:"data/music/音效@jaqu3.mp3",type:Loader.SOUND},
            {url:"data/music/音效@jaqu4.mp3",type:Loader.SOUND},
            {url:"data/music/音效@jaqu5.mp3",type:Loader.SOUND},
            {url:"data/music/音效@jaqu6.mp3",type:Loader.SOUND}

        ];



        return LoadModel;
    })();
    module.exports = LoadModel;
});