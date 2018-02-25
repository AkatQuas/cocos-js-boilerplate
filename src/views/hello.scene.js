var HelloScene = cc.Scene.extend({
    ctor: function () {
        this._super();
    },
    onEnter:function () {
        this._super();
        cc.log("At the very beginning scene");
    }
});

