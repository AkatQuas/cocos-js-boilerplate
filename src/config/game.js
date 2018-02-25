
var GC = GC || {};

var ENUMS = ENUMS || {};

// evnvironment config
ENV = (function () {

    var mode = ['development', 'test', 'production'];

    var _CUR = mode[2];

    _CUR === mode[0] ? (function () {
        setInterval(function () {
            cc.log('beating, game not dead');
        }, 60000);
    })() : false;

    var _conf = {};

    _conf[mode[0]] = {
        RUNTIME: _CUR,
        WSURL: 'ws://192.168.1.99:9001/ws',
        HTTP_BASE: 'http://192.168.1.99:8090/api'
    };
    _conf[mode[1]] = {
        RUNTIME: _CUR,
        WSURL: 'ws://tlbb.xuanxiangkeji.com:9001/ws',
        HTTP_BASE: '/api'
    };
    _conf[mode[2]] = {
        RUNTIME: _CUR,
        WSURL: 'ws://w001.wx.wuhuqumei.com:9001/ws',
        HTTP_BASE: '/api'
    };

    return _conf[_CUR];

})();
// enums something
ENUMS.GAME_STATE = {
    // not playing state, check ranking page or after a round of game or before game to start
    IDLE: 0,

    PLAYING: 1,
    // waiting the opponent to receive the challenge, after join room, before ready
    WAITING: 3,

    // ready, not waiting, not playing, about to start game
    READY: 4
};

ENUMS.GAME_MODE = {
    NULL: '0',
    SINGLE: 'single',
    DOUBLE: 'vs'
};

ENUMS.GAME_LEVEL = {
    NULL: '0',
    EASY: 'easy',
    HARD: 'hard'
};

// global config, easy to read
// cc.winSize may not exist before the GC, so is possible to config manually
GC.winSize = cc.winSize || {
    height: 1920,
    width: 1080
};

GC.h = GC.winSize.height;

GC.w = GC.winSize.width;

GC.w_2 = GC.winSize.width / 2;

GC.h_2 = GC.winSize.height / 2;

GC.SOUND_ON = false;

GC.EFFECT_ON = false;

GC.GAME_STATE = ENUMS.GAME_STATE.IDLE;

GC.GAME_MODE = ENUMS.GAME_MODE.NULL;

GC.GAME_LEVEL = ENUMS.GAME_LEVEL.NULL;

GC.GAME_ROOMNUMBER = -1;

GC.PROFILE = {};

GC.OPPONENT = {};
