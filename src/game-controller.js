//  game controller singleton
var GameController = (function () {
    var _Controller = {};
    function _handleError(msg, errObj) {
        msg = msg || 'undefined error message';
        errObj = errObj || 'undefined error object';
        cc.log('error occurred: ' + msg);
        console.error(errObj);
    }
    // websocket
    _Controller.ws = (function () {
        var _ws = new WebSocket(ENV.WSURL);

        _ws.addEventListener('open', function (evt) {
            console.log(evt);
            cc.log('socket open');
            // create a game scene and enter it
        });

        _ws.addEventListener('message', function (evt) {
            console.log(evt);

            // todo rest logic
        });

        _ws.addEventListener('error', function (evt) {
            cc.log('controller ws on error');
            console.log(evt);
            cc.log('controller ws on error');
        });

        _ws.addEventListener('close', function (evt) {
            cc.log('controller ws closed!')

        });
        return _ws;
    });

    _Controller.mmg = {
        joinRoom: function (params) {
            var scene = cc.director.getRunningScene();
        },
    }


    _Controller.user = {
        nickname: '英俊潇洒赵天使',
        avatar: 'https://avatars3.githubusercontent.com/u/24731539?s=460&v=4',
        id: 1,
    }

    return _Controller;

})();


