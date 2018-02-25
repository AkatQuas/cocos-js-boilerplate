var MyLoaderScene = cc.Scene.extend({
    _interval : null,
    _className:"MyLoaderScene",
    cb: null,
    target: null,
    /**
     * Contructor of MyLoaderScene
     * @returns {boolean}
     */
    init : function(){
        var self = this;

        // can be modified

        return true;
    },

    onEnter: function () {
        var self = this;
        self._super();
        // make a loading scene and make the game start logic
        cc.Node.prototype.onEnter.call(self);
        self.schedule(self._startLoading, 0.1);
    },
    /**
     * init with resources
     * @param {Array} resources
     * @param {Function|String} cb
     * @param {Object} target
     */
    initWithResources: function (resources, cb, target) {
        if(cc.isString(resources))
            resources = [resources];
        this.resources = resources || [];
        this.cb = cb;
        this.target = target;
    },

    _startLoading: function () {
        var self = this;
        self.unschedule(self._startLoading);
        var res = self.resources;
        cc.loader.load(res,
            function (result, count, loadedCount) {
                var percent = (loadedCount / count * 100) | 0;
                percent = Math.min(percent, 100);
                cc.log(percent);
            }, function () {
                if (self.cb)
                    self.cb.call(self.target);
            });
    },
});

MyLoaderScene.preload = function(resources, cb, target){
    var _cc = cc;
    if(!_cc.myloaderScene) {
        _cc.myloaderScene = new MyLoaderScene();
        _cc.myloaderScene.init();
    }
    _cc.myloaderScene.initWithResources(resources, cb, target);

    cc.director.runScene(_cc.myloaderScene);
    return _cc.myloaderScene;
};
