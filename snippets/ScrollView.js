/*
The basic idea is to create 3 layers according to the priority when added to the parent node: 

- background layer
- scrollview layer
- mover layer

the background layer has the biggest size to be an overlay with some possible function or an empty function, just for swalling the event so the touch on scroll and the above layer won't affect the lower sprites or other layers.

the scrollview layer is the main part with a viewsize, and its container should be a node with the same size, smaller recommended though.
The content should be added to the container, set the proper position to make a good view.

the mover layer is above over the scrollview layer with a bigger size and shoulde be transparent.
And register the touch event listener to the mover layer, listening to the TouchMove event, change the offset of the scrollview. So when the touch move on the mover layer, the scrollview scrolls as well.

Be careful about the boundary, the 0 and the maximum.
*/
var HallMenusLayer = cc.Layer.extend({
    _ruleLayer: null,
    _scv: null,
    _ruleContent: null,
    ctor: function () {
        this._super();

        var self = this;
        self.addChild(self._ruleLayer = quickNode.layer({
            color: new cc.Color(0, 0, 0, 50),
            func: function () {
                // background layer function 
                self.removeChild(self._ruleLayer);
                self._ruleContent.removeAllChildren();
                self.removeChild(self._ruleContent);
                self._ruleContent = self._ruleLayer = null;
            }
        }), 5);

        self.addChild(self._ruleContent = quickNode.sprite({
            img: AppRes.hall_rule_bg,
            pos: {}, func: function () { }
        }), 10);

        // container with smaller size
        var _container = quickNode.layer({
            color: new cc.Color(0, 0, 0, 0),
            w: 700,
            h: 860
        });

        var $scw = 760, $scw2 = $scw / 2, $sch = 860;

        // scrollview with size ($w, $h)
        var _scv = self._scv = new cc.ScrollView(new cc.Size($scw, $sch), _container);
        // scrollview direction
        _scv.setDirection(cc.SCROLLVIEW_DIRECTION_VERTICAL);
        _scv.setPosition(0, 40);
        
        // scrollview in order of 5, mover layer 10
        self._ruleContent.addChild(_scv, 5);

        var _title = quickNode.label({
            label: '游戏规则', fz: 60,
            pos: { x: $scw2, y: $sch - 40 }
        });
        _container.addChild(_title);

        var _rulelist = [
            {
                label: '1、玩家可参与“初出茅庐”（简单）、“誉满江湖”（困难）题目，首次完成答题分别可获得50绑元奖励和100绑元奖励。',
                fz: 36, pos: { x: $scw2, y: $sch - 180 },
                dimensions: { w: 650, h: 180 }
            },
            {
                label: '2、“初出茅庐”（简单）每轮为5题，每题限时10S，玩家答题越快得分越高，每题最高100分，单轮最多获得500分。',
                fz: 36, pos: { x: $scw2, y: $sch - 330 },
                dimensions: { w: 650, h: 180 }
            },
            {
                label: '3、“誉满江湖”（困难）每轮为5题，每题限时10S，玩家答题越快得分越高，每题最高200分，单轮最多获得1000分。',
                fz: 36, pos: { x: $scw2, y: $sch - 480 },
                dimensions: { w: 650, h: 180 }
            },
            {
                label: '4、“少侠对决”可以邀请好友参与实时答题PK；每轮为5题，每题限时10S，玩家答题越快得分越高，每题最高200分，单轮最多获得1000分。获胜玩家可以过的本次所答分数，失败玩家会扣除两者分数之差。',
                fz: 36, pos: { x: $scw2, y: $sch - 670 },
                dimensions: { w: 650, h: 260 }
            },
            {
                label: '5、当玩家战斗力未满3000分时，可以继续通过“初出茅庐”（简单）、“誉满江湖”（困难）获取分数；当玩家战斗力超过3000分时，只能够通过“少侠对决”获取分数；',
                fz: 36, pos: { x: $scw2, y: $sch - 930 },
                dimensions: { w: 650, h: 220 }
            },
            {

                label: '6、“江湖文斗榜”可以查看玩家答题战斗力排行情况。右下角“我的奖励”可以查看玩家当前所获得的奖励。',
                fz: 36, pos: { x: $scw2, y: $sch - 1150 },
                dimensions: { w: 650, h: 180 }
            }
        ]
        _rulelist.forEach(function (params) {
            _container.addChild(quickNode.label(params));
        });

        var _mover = quickNode.layer({
            color: new cc.Color(255, 255, 255, 0),
            w: 800, h: 900,
            pos: { x: GC.w_2 - 400, y: GC.h_2 - 450 }
        });
        cc.eventManager.addListener({
            event: cc.EventListener.TOUCH_ONE_BY_ONE,
            swallowTouches: true,
            // required !!!
            onTouchBegan: function (touch, event) {
                var pos = touch.getLocation();
                var target = event.getCurrentTarget();
                if (cc.rectContainsPoint(target.getBoundingBox(), pos)) {
                    return true;
                } else {
                    return false;
                }
            },
            // required !!!!
            onTouchMoved: function (touch, event) {
                var pos = touch.getLocation();
                var target = event.getCurrentTarget();

                if (cc.rectContainsPoint(target.getBoundingBox(), pos)) {
                    var y = touch.getDelta().y + self._scv.getContentOffset().y;
                    y = y < 0 ? 0 : (y > 325 ? 325 : y);
                    self._scv.setContentOffset(new cc.Point(0, y));
                    return true;
                } else {
                    return false;
                }
            },
            // required !!!
            onTouchEnded: function (touch, event) {
                var pos = touch.getLocation();
                var target = event.getCurrentTarget();

                if (cc.rectContainsPoint(target.getBoundingBox(), pos)) {
                    return true;
                } else {
                    return false;
                }
            }
        }, _mover);

        // scrollview in order of 5, mover layer 10
        self._ruleContent.addChild(_mover, 10);
        return true;
    }
});
