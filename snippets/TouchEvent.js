var TouchEventLayer = cc.Layer.extend({
    sprite: null,
    listener: null,
    ctor: function () {
        this._super();

        var size = cc.winSize;

        this.sprite = new cc.Sprite(res.Sprite_Img);
        this.sprite.attr({
            x: size.width / 2,
            y: size.height / 2
        });
        this.addChild(this.sprite, 0);

        // code type 1
        this.listener = cc.EventListener.create({
            event: cc.EventListener.TOUCH_ONE_BY_ONE,
            swallowTouches: true,
            onTouchBegan: function (touch, event) {
                var pos = touch.getLocation();
                var target = event.getCurrentTarget();

                // check whther the touch position is in the sprite box
                if (cc.rectContainsPoint(target.getBoundingBox(), pos)) {
                    cc.log('touch position in the sprite box')
                    return true;
                } else {
                    cc.log('touch is outside of the sprite target');
                    return false;
                }

                // another way of checking, converting to node space 

                // var target = event.getCurrentTarget();
                // var locationInNode = target.convertToNodeSpace(touch.getLocation());
                // var s = target.getContentSize();
                // var rect = cc.rect(0,0,s.width,s.height);
                // if (cc.rectContainsPoint(rect, locationinNode)) {
                //     cc.log('touch position in the sprite box')
                //     return true;
                // } else {
                //     cc.log('touch is outside of the sprite target');
                //     return false;
                // }
            },
            onTouchMoved: function(touch, event) {
                var target = event.getCurrentTarget();
                target.setPosition(touch.getLocation());
            },
            onTouchEnded: function (touch, event) {
                // do something
                // maybe remove the listener

                // cc.eventManager.removeListener(this.listener);

            }
        });

        cc.eventManager.addListener(this.listener, this.sprite);

        // code type 2

        // cc.eventManager.addListener({
        //     event: cc.EventListener.TOUCH_ONE_BY_ONE,
        //     swallowTouches: true,
        //     onTouchBegan: function (touch, event) { cc.log('Touch began'); },
        //     onTouchMoved: function (touch, event) { cc.log('Touch moved'); },
        //     onTouchEnded: function (touch, event) { cc.log('Touch ended'); },
        //     onTouchCancelled: function (touch, event) { cc.log('Touch cancelled') }
        // }, this);


    }
});
var TouchEventScene = cc.Scene.extend({
    onEnter: function () {
        this._super();
        this.addChild(new TouchEventLayer());
    }
});