String.prototype.format = function () {
    var args = arguments;
    this.unkeyed_index = 0;
    return this.replace(/\{(\w*)\}/g, function (match, key) {
        if (key === '') {
            key = this.unkeyed_index;
            this.unkeyed_index++
        }
        if (key == +key) {
            return args[key] !== 'undefined'
                ? args[key]
                : match;
        } else {
            for (var i = 0; i < args.length; i++) {
                if (typeof args[i] === 'object' && typeof args[i][key] !== 'undefined') {
                    return args[i][key];
                }
            }
            return match;
        }
    }.bind(this));
};


function mdform(h) {
    var form = `
    <form>
    <textarea>
    {}
    </textarea>
    </form>
    `.format("hej mor");
    return form;
}

$(document).ready(function () {
});