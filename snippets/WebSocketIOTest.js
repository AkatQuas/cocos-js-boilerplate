var WebSocket = WebSocket || window.WebSocket || window.MozWebSocket;

var WebScoketLayer = cc.Layer.extend({
    _wsiSendText: null,
    _wsiSendBinary: null,

    _sendTextStatus: null,
    _sendBinaryStatus: null,

    _sendTextTimes: 0,
    _sendBinaryTimes: 0,
    init: function () {
        var winSize = cc.director.getWinSize();

        var self = this;

        this._wsiSendText = new WebScoket('wss://echo.websocket.org');
        this._wsiSendText.onopen = function (evt) {
            // on connection callback
            cc.log("open url: "+self._wsiSendText.url+", protocol: "+self._wsiSendText.protocol);
        }
        // send text function please check ** this.sendText **

        this._wsiSendText.onmessage = function (evt) { 
            self._sendTextTimes++;
            cc.log('response text msg:'+evt.data+', '+self._sendTextTimes);
        }

        this._wsiSendText.onerror = function (evt) {
            cc.log('_wsiSendText Error war fired');
            if (cc.sys.isObjectValid(self)) {
                
            } else {
                cc.log('WebSocket test layer was destroyed!');
            }
        }

        this._wsiSendText.onclose = function (evt) {
            self._wsiSendText = null;
        }

        this._wsiSendBinary = new WebScoket('ws://echo.websocket.org');
        this._wsiSendBinary.binaryType = 'arraybuffer';
        this._wsiSendBinary.onopen = function (evt) {
            cc.log("open url: "+self._wsiSendBinary.url+", protocol: "+self._wsiSendBinary.protocol);
        }

        // send binary please check ** this.sendBinary **

        this._wsiSendBinary.onmessage = function (evt) {
            self._sendBinaryTimes++;
            var binary = new Uint16Array(evet.data);
            var binaryStr = 'response bin msg: ';
            var str = '';

            for (var i = 0; i< binary.length; i++) {
                if (binary[i]===0) {
                    str +="\'\\0\'";
                } else {
                    var hexChar = "0x" + binary[i].toString('16').toUpperCase();
                    str += String.fromCharCode(hexChar);
                }
                binaryStr += str + ', '+ self._sendBinaryTimes;
                cc.log(binaryStr);
            }
        }
        this._wsiSendBinary.onerror = function (evt) {
            cc.log('_wsiSendBinary Error was fired');
            if (cc.sys.isObjectValid(self)) {
                cc.log('an error was fired');
            } else {
                cc.log('websocket test layer was destroyed');
            }
        }

        this._wsiSendBinary.onclose = function (evt) {
            cc.log('_wsiSendBinary websocket instance closed.')
            self._wsiSendBinary = null;
        }

        // todo
        
    },
    sendText: function (sender) {
        if (this._wsiSendText.readyState == WebSocket.OPEN) {
            this._wsiSendText.send('Hello WebSocket 中文, I am a text message.');
        } else {
            var warning = 'send text websocket instance is not ready';
            cc.log(warning);
        }
    }, 
    sendBinary: function (sender) {
        if (this._wsiSendBinary.readyState == WebSocket.OPEN) {
            var buf = 'Hello WebSocket中文， \0 I am \0 a \0 binary message.';
            var binary = this._stringCovertToArray(buf);
            this._wsiSendBinary.send(binary.buffer);
        } else {
            var warning = 'send binary websocket instance is not ready';
            cc.log(warning);
        }
    },
    onExit: function () {
        if (this._wsiSendText) {
            this._wsiSendText.close();
        }
        if (this._wsiSendBinary) {
            this._wsiSendBinary.close();
        }
        if (this._wsiError) {
            this._wsiError.close();
        }
        this._super();
    },
    _stringCovertToArray: function (strData) {
        if (!strData) {
            return null;
        }
        var arrData = new Uint16Array(strData.length);
        for (var i = 0; i < strData.length; i++) {
            arrData[i] = strData.charCodeAt(i);
        }
        return arrData;
    }
});

WebScoketLayer.create = function () {
    var retObj = new WebScoketLayer();
    if (retObj && retObj.init()) {
        return retObj;
    }
    return null;
}

var SocketIOScene = cc.Scene.extend({
    ctor: function () {
        this._super();
        this.addChild(new WebScoketLayer());
    },
    onEnter: function () {
    }
});