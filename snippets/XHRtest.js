var XHRLayer = cc.Layer.extend({
    ctor: function () {
        this._super();
    },
    handleHttp: function (xhr) {
        xhr.timeout = 5000;
        ;['loadstart', 'abort', 'error', 'load', 'loadend', 'timeout'].forEach(function (eventname) {
            xhr["on" + eventname] = function () {
                label.string += "\nEvent : " + eventname;
            };
        });
        xhr.onreadystatechange = function () {
            if (xhr.readyState == 4) {
                if (xhr.status >= 200 && xhr.status < 300) {
                    // good response
                    var httpStatus = xhr.statusText;
                    var response = xhr.responseText;
                    cc.log(response);
                } else {
                    // error response
                }
            }
        }
    },
    getRequest: function () {
        var xhr = cc.loader.getXMLHttpRequest();
        // true means asynchronously
        // false means synchronously
        this.handleHttp(xhr);
        xhr.open('GET', 'http://httpbin.org/gzip', true);

        xhr.setRequestHeader("Accept-Encoding", "gzip,deflate");

        xhr.send();
    },
    postPlainText: function () {
        var xhr = cc.loader.getXMLHttpRequest();
        this.handleHttp(xhr);
        xhr.open('POST', 'http://httpbin.org/post');
        xhr.send('plain text message');
    },
    postForms: function () {
        var xhr = cc.loader.getXMLHttpRequest();
        this.handleHttp(xhr);
        xhr.open('POST', 'http://httpbin.org/post');
        // send JSON string to server
        xhr.setRequestHeader('Content-Type', 'application/json;charset=utf-8');
        var args = JSON.stringify({
            a: hello,
            b: world
        });
        xhr.send(args);
        

        // send FormData to server 

        // xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded;charset=utf-8');
        // var args = 'a=hello&b=world';
        // xhr.send(args);
    }
});
var XHRScene = cc.Scene.extend({
    ctor: function () {
        this._super();
        this.addChild(new XHRLayer());
    },
    onEnter: function () {
    }
});