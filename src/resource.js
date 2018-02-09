var _myres = {
    misc: function (name) { return 'res/misc/'+name+'.png'},
    button: function (name) { return 'res/button/'+name+'.png'},
    img: function (name) { return 'res/img/'+name+'.png'}
}
var AppRes = {
    

};

var g_resources = [];
for (var i in AppRes) {
    g_resources.push(AppRes[i]);
}

_myres = null;