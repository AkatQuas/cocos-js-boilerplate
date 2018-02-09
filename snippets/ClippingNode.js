// clipping node is amazing ,,
// be careful with the transparent part on the mask

// usage snipptes

var stencil = new cc.Sprite('res/mask.png');
var clip = new cc.ClippingNode(stencil);

clip.addChild(new cc.Sprite('res/content.png'));

var somelayer = new cc.Layer();

somelayer.addChild(clip);
