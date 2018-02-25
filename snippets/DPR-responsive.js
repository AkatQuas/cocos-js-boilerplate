/*
file: cocos2d-HTML5/cocos2d/core/platform/CCEGLView.js
*/

// change the following 
var devicePixelRatio = view._devicePixelRatio = 1;

// to

var devicePixelRatio = view._devicePixelRatio = window.devicePixelRatio || 1;

/*
file: cocos2d-html5/cocos2d/CCDrawingPrimitivesCanvas.js
*/
// in drawImage function, line 309 probably, insert snippets
var ctx = this._renderContext;
(function (canvas, ctx) {
var devicePixelRatio = window.devicePixelRatio || 1;
var backingStorePixelRatio = ctx.webkitBackingStorePixelRatio ||
ctx.mozBackingStorePixelRatio ||
ctx.msBackingStorePixelRatio ||
ctx.oBackingStorePixelRatio ||
ctx.backingStorePixelRatio || 1;


var ratio = devicePixelRatio / backingStorePixelRatio;


if (devicePixelRatio !== backingStorePixelRatio) {
sourceSize.width *= ratio;
sourceSize.height *= ratio;
ctx.scale(ratio, ratio);
}

})(canvas, ctx);