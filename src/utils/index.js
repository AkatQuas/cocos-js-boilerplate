var regTouchEvent = function (node, func) {
    cc.eventManager.addListener({
        event: cc.EventListener.TOUCH_ONE_BY_ONE,
        swallowTouches: true,
        onTouchBegan: function (touch, event) {
            var pos = touch.getLocation();
            var target = event.getCurrentTarget();
            if (cc.rectContainsPoint(target.getBoundingBox(), pos)) {
                return true;
            } else {
                return false;
            }
        },
        onTouchMoved: function (touch, event) {
            var pos = touch.getLocation();
            var target = event.getCurrentTarget();

            if (cc.rectContainsPoint(target.getBoundingBox(), pos)) {
                return true;
            } else {
                return false;
            }
        },
        onTouchEnded: function (touch, event) {
            var pos = touch.getLocation();
            var target = event.getCurrentTarget();

            if (cc.rectContainsPoint(target.getBoundingBox(), pos)) {
                func ? func() : false;
                return true;
            } else {
                return false;
            }
        }
    }, node);
};

var quickNode = (function () {

    var _attr = function (node, params) {

        if (params.pos) {
            node.setPosition(params.pos.x || GC.w_2, params.pos.y || GC.h_2);
        }
        if (params.anchor) {
            node.setAnchorPoint(params.anchor.x, params.anchor.y);
        }
        if (params.scale) {
            node.setScale(params.scale);
        }
        if (params.rotation) {
            node.setRotation(params.rotation);
        }
        // change the label color
        if (params.label && params.color) {
            node.setColor(params.color);
        }
        if (params.label && params.dimensions) {
            node.setDimensions(params.dimensions.w, params.dimensions.h);
        }
        if (params.func) {
            regTouchEvent(node, params.func);
        }
        return node;
    };
    return {
        layer: function (params) {
            var _n = new cc.LayerColor(params.color, params.w || GC.w, params.h || GC.y);
            return _attr(_n, params);
        },
        sprite: function (params) {
            var _n = new cc.Sprite(params.img);
            return _attr(_n, params);
        },
        label: function (params) {
            var _n = new cc.LabelTTF(params.label, '', params.fz || 40);
            return _attr(_n, params);
        }
    };
})();
