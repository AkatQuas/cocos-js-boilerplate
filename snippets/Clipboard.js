/*
before using clipboard,
config the '-webkit-user-select: text;' in style in the index.html

*/
window.myClipboard = (function(window, document, navigator) {
    var textArea,
        copy;

    function isOS() {
        return navigator.userAgent.match(/ipad|iphone/i);
    }

    function createTextArea(text) {
        textArea = document.createElement('textArea');
        textArea.value = text;
        document.body.appendChild(textArea);
    }

    function selectText() {
        var range,
            selection;

        if (isOS()) {
            range = document.createRange();
            range.selectNodeContents(textArea);
            selection = window.getSelection();
            selection.removeAllRanges();
            selection.addRange(range);
            textArea.setSelectionRange(0, 999999);
        } else {
            textArea.select();
        }
    }

    function copyToClipboard() {        
        document.execCommand('copy');
        document.body.removeChild(textArea);
    }

    copy = function(text) {
        createTextArea(text);
        selectText();
        copyToClipboard();
    };

    return {
        copy: copy
    };
})(window, document, navigator);

// How to use
window.myClipboard.copy('text to be copied');


/*
another way
*/

var save = function (e) {
    e.clipboardData.setData('text/plain', cdk.value);
    e.preventDefault();
};
document.addEventListener('copy', save);
document.execCommand('copy');
document.removeEventListener('copy', save);