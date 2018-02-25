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
            params.label = '' + params.label;
            var _n = new cc.LabelTTF('' + params.label, '', params.fz || 40);
            return _attr(_n, params);
        }
    };
})();


/*
// copy to clipboard
var save = function (e) {
    e.clipboardData.setData('text/plain', cdk.value);
    e.preventDefault();
};
document.addEventListener('copy', save);
document.execCommand('copy');
document.removeEventListener('copy', save);

// in IOS, if you need copy, change the css in index.html

// -webkit-user-select: none;  -> -webkit-user-select: text;

// and then register the function


window.myClipboard = (function (window, document, navigator) {
    var textArea, copy;

    function isOS() {
        return navigator.userAgent.match(/ipad|iphone/i);
    }

    function createTextArea(text) {
        textArea = document.createElement('textArea');
        textArea.value = text;
        document.body.appendChild(textArea);
    }
    function selectText() {
        var range,
            selection;

        if (isOS()) {
            range = document.createRange();
            range.selectNodeContents(textArea);
            selection = window.getSelection();
            selection.removeAllRanges();
            selection.addRange(range);
            textArea.setSelectionRange(0, 999999);
        } else {
            textArea.select();
        }
    }

    function copyToClipboard() {
        document.execCommand('copy');
        document.body.removeChild(textArea);
    }

    copy = function (text) {
        createTextArea(text);
        selectText();
        copyToClipboard();
    };
    return {
        copy: copy
    };
})(window, document, navigator);

*/