/*
skeleton animation needs module 'spine', config it in the project.json file

look for the "animation" field in the animation.json file, 

the function setAnimation will run the animation immediately

dont know how to pause and resume the animation on 09/02/2018, to be continued
*/
var FireCracker = cc.Layer.extend({
    _ani: null,
    ctor: function (low) {
        this._super();
        var self = this;
        var $h = low ? 300 : 500;
        var _ani = self._ani = new sp.SkeletonAnimation(AppRes.fca_json, AppRes.fca_atlas, .9);
        _ani.setPosition(150, $h);
        _ani.setAnimation(0,'static',false);
        self.addChild(_ani);

        return true;
    },
    start: function () {
        var self = this;
        self._ani.setAnimation(0, 'fire', false);
    },
    onExit: function () {
        this._ani = null;
        this._super();
    }
});