
var GC = GC || {};

var ENUMS = ENUMS || {};

// evnvironment config
ENV = (function () {

    _ENV = 1 ? 'development' : 'production';

    _ENV === 'development' ? (function () {
        setInterval(function () {
            cc.log('beating, game not dead');
        }, 60000);
    })() : false;
    return _ENV === 'development' ? {
        GAME_ENV: _ENV,
        WSURL: 'ws://192.168.1.99:9001/ws',
        HTTP_BASE: 'http://192.168.1.99:9000'
    } : {
            GAME_ENV: _ENV,
            WSURL: 'ws://',
            HTTP_BASE: '/api'
        }

})();

// enums something
ENUMS.GAME_STATE = {
    // not playing state, check ranking page or after a round of game or before game to start
    IDLE: 0,

    // singler playing, check with GAME_MODE(easy|normal)
    SINGLE_PLAY: 1,

    // double players playing, after waiting done
    DOUBLE_PLAY: 2,

    // waiting the opponent to receive the challenge
    WAITING: 3,
};

ENUMS.GAME_MODE = {
    EASY: 0,
    NORMAL: 1
}

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

GC.GAME_MODE = ENUMS.GAME_MODE.EASY;
