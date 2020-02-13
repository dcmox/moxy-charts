"use strict";
exports.__esModule = true;
exports.calendar = function (element, opts) {
    if (!opts.height) {
        opts.height = opts.width;
    }
    var div = document.createElement('div');
    div.className = 'inner-calendar';
    return true;
};
