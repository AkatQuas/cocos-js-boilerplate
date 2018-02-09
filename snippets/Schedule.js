/*
schedule means run the function intervally.
*/

var ScheduleLayer = cc.Layer.extend({
    sprite: null,
    timer: 0,
    ctor: function () {
        this._super();

        var size = cc.winSize;

        this.sprite  = new cc.LabelTTF('Timer: 0','',40);
        this.sprite.attr({
            x: size.width / 2,
            y: size.height / 2
        })
        this.addChild(this.sprite);

        this.timer = 0;
        this.schedule(this.timeUpdate, 1);
    },
    timeUpdate: function () {
        this.sprite.setString('Timer: '+(++this.timer));
    }
});
var ScheduleScene = cc.Scene.extend({
    onEnter: function () {
        this._super();
        this.addChild(new ScheduleLayer());
    }
});