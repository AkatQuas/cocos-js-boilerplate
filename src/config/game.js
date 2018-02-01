
var GC = GC || {};

GC.winSize = cc.winSize;

GC.h = GC.winSize.height;

GC.w = GC.winSize.width;

GC.w_2 = GC.winSize.width / 2;

GC.h_2 = GC.winSize.height / 2;

GC.SOUND_ON = false;

GC.GAME_STATE_ENUM = {
    HOME: 0,
    SINGLE_PLAY: 1,
    DOUBLE_PLAY: 2,
    OVER: 3
};

GC.GAME_STATE = GC.GAME_STATE_ENUM.HOME;
