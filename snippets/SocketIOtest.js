var SocketIOLayer = cc.Layer.extend({
    _sioClient: null,
    _sioClientStatus: null,
    ctor: function () {
        this._super();
    },
    onCreateSIOCLient: function () {
        // create a client by using the static method, url does not need to contain the protocol
        var sioclient = SocketIOLayer.connet('ws://tool.itharbors.com:4000', { "force new connection": true });

        //if you need to track multiple sockets it is best to store them with tags in your own array for now
        sioclient.tag = 'test Client';

        //register event callbacks
        //this is an example of a handler declared inline
        sioclient.on("connect", function () {
            var msg = sioclient.tag + " Connected!";
            cc.log(msg);
            sioclient.send(msg);
        });

        //example of a handler that is shared between multiple clients
        sioclient.on("message", this.message);

        sioclient.on("echotest", function (data) {
            // self emit event
            // together with this.selfEmit function
            cc.log("echotest 'on' callback fired!");
            var msg = this.tag + " says 'echotest' with data: " + data;
            cc.log(msg);
        });

        sioclient.on("testevent", this.testevent);

        sioclient.on("disconnect", this.disconnection);

        this._sioClient = sioclient;
    },
    message: function (data) {
        // this refers to sioclient, aka this._sioClient
        var msg = this.tag + 'received message: ' + data;
        cc.log(msg);
    },
    disconnection: function () {
        // this refers to sioclient, aka this._sioClient
        var msg = this.tag + ' disconnected!';
        cc.log(msg);
    },
    sendMessage: function () {
        // send message to server
        if (this._sioClient != null) {
            this._sioClient.send('Hello Socket.IO!');
        } else {
            cc.log('socket not connected!');
        }
    },
    selfEmitTest: function (sender) { 
        if (this._sioClient != null) {
            this._sioClient.emit('testevent',"[{\"name\":\"myname\",\"type\":\"mytype\"}]");
        } else {
            cc.log('socket not connected!');
        }
    },
    selfEmitEcho: function (sender) { 
        if (this._sioClient != null) {
            this._sioClient.emit('echotest',"[{\"name\":\"myname\",\"type\":\"mytype\"}]");
        } else {
            cc.log('socket not connected!');
        }
    },
    cutConnection: function () {
        if (this._sioClient != null) {
            this._sioClient.disconnect();
            this._sioClient = null;
        }
    }

});
var SocketIOScene = cc.Scene.extend({
    ctor: function () {
        this._super();
        this.addChild(new SocketIOLayer());
    },
    onEnter: function () {
    }
});