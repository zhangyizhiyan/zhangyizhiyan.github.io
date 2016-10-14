/**
 * 加载资源
 */
define(function(require,exports,module){
    var LoadResourceCommand = (function(){
        function LoadResourceCommand(loadModel){

            this.execute = function(event){
                if(event.params.loadType == 'firstLoad'){
                    loadModel.firstLoad();
                }else if (event.params.loadType == 'allLoad'){
                    loadModel.allLoad();
                }
            }
        }
        return LoadResourceCommand;
    })();
    module.exports = LoadResourceCommand;
});