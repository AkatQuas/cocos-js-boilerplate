var LabelLayer = cc.Layer.extend({
    sprite: null,
    ctor: function () {
        this._super();

        var size = cc.winSize;

        var colorLayer = new cc.LayerColor(cc.color(142,29,42));
        this.addChild(colorLayer);

        this.sprite  = new cc.LabelTTF('some label','',40);
        this.sprite.attr({
            x: size.width / 2,
            y: size.height / 1.3
        })

        this.sprite.enableStroke(cc.color(100, 0, 100), 10);
        this.sprite.enableShadow(cc.color(10, 10, 10), 50, 59);

        this.addChild(this.sprite);


    }
});
var LabelScene = cc.Scene.extend({
    onEnter: function () {
        this._super();
        this.addChild(new LabelLayer());
    }
});