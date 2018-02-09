/*
    creates a series frames to run as cc.Animation
*/

var PListAnimationLayer = cc.Layer.extend({
    sprite: null,
    ctor: function () {
        this._super();
        var size = cc.winSize;
        cc.spriteFrameCache.addSpriteFrames(res.xani_plist);
        var frames = [];
        for (var i = 0; i< 10; i++) {
            var str = "xani_"+i+".png";
            var frame = cc.spriteFrameCache.getSpriteFrame(str);

            frames.push(frame);
        }
        var action = new cc.Animate(new cc.Animation(frames, 0.02));
        this.sprite = new cc.Sprite();
        this.sprite.attr({
            x: size.width / 2,
            y: size.height / 2
        });
        this.addChild(this.sprite);

        this.sprite.runAction(action.repeatForever());

        return true;
    }
});

var PListAnimationScene = cc.Scene.extend({
    onEnter: function () {
        this._super();
        this.addChild(new PListAnimationLayer());
    }
});
