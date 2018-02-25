var GameController = (function () {
    var _Controller = {};

    function _handleError (msg, errObj) {
        msg = msg || 'undefined error message';
        errObj = errObj || 'undefined error object';
        cc.log('error occurred: ' + msg);
        console.error(errObj);
    }

    // websocket

    _Controller.ws = new WebSocket(ENV.WSURL);
    _Controller.ws.sj = function (obj) {
        _Controller.ws.send(JSON.stringify(obj));
    };

    var _alertError = function (title, msg) {
        if (!msg) {
            msg = title,
                title = '提示';
        }
        console.log('error title', title);
        console.log('error message', msg);
    };
    _Controller.ws.addEventListener('open', function (evt) {
        cc.log('socket open');
    });

    _Controller.ws.addEventListener('message', function (evt) {
        var res = JSON.parse(evt.data);
        if (_opt) {
            if (_Controller.mmg[_opt]) {
                return _Controller.mmg[_opt](_data);
            } else {
                var scene = cc.director.getRunningScene();
                return scene[_opt](_data);
            }
        }
    });

    _Controller.ws.addEventListener('error', function (evt) {
        console.log(evt);
        _alertError('网路错误', '游戏失去连接，建议关闭网页后重新进入！');
    });

    _Controller.ws.addEventListener('close', function (evt) {
        // cc.log('controller ws closed!');
        _alertError('网路错误', '游戏失去连接，建议关闭网页后重新进入！');
    });

    _Controller.mmg = {
        profile: function (params) {
            // write the profile
            GC.PROFILE = Object.assign(GC.PROFILE, params.profile);
        }
    };

    _Controller.configWx = function (title, link, cb) {
        var xhr = cc.loader.getXMLHttpRequest();
        xhr.timeout = 5000;
        xhr.onreadystatechange = function () {
            if (xhr.readyState == 4) {
                if (xhr.status >= 200 && xhr.status < 300) {
                    var response = JSON.parse(xhr.responseText);
                    wx.config(response.config);


                    var share = {
                        title: title,
                        link: link,
                        desc: '现在参与答题即可瓜分千万绑元，是时候展现你的天龙功底了～',
                        imgUrl: 'http://p2dctyxhs.bkt.clouddn.com/tlbb-icon.png',
                        success: function () {
                            return true;
                        },
                        cancel: function () {
                            return false;
                        }
                    };

                    var js_apis = [
                        {
                            name: 'onMenuShareTimeline',
                            keys: ['title', 'link', 'imgUrl', 'success', 'cancel']
                        },
                        {
                            name: 'onMenuShareAppMessage',
                            keys: ['title', 'desc', 'link', 'imgUrl', 'success', 'cancel']
                        }
                    ];
                    js_apis.forEach(function (item) {
                        var conf = {};
                        item.keys.forEach(function (k) {
                            conf[k] = share[k];
                        });
                        wx[item.name](conf);
                    });
                    cb ? cb() : false;
                } else {
                    // error response
                }
            }
        };
        xhr.open('GET', ENV.HTTP_BASE + '/jssdk?jsapis=onMenuShareAppMessage,onMenuShareTimeline&url=' + encodeURIComponent(location.href), true);
        xhr.send();

    };
    return _Controller;
})();
