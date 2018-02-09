var MainSprite = cc.Sprite.extend({
    _privateAttr: null,
    ctor: function () {
        this._super();
        // maybe not using it, using onEnter instead
    },
    onEnter: function () {
        this._super();
        // ... your code
    },
    onExit: function () {
        // ... your code
        this._super();
    },
    otherMemberFunction: function () {}
});
