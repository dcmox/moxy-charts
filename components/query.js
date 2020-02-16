"use strict";
exports.__esModule = true;
exports.query = function (selector) {
    if (typeof selector !== 'string') {
        return function (sel) {
            return selector.querySelector(sel);
        };
    }
    return document.querySelector(selector) || false;
};
exports.queryAll = function (selector) {
    var items = [];
    if (typeof selector !== 'string') {
        return function (sel) {
            selector
                .querySelectorAll(sel)
                .forEach(function (item) { return items.push(item); });
            return items;
        };
    }
    document
        .querySelectorAll(selector)
        .forEach(function (item) { return items.push(item); });
    return items;
};
exports.bindAll = function (selector, fn) {
    if (typeof selector !== 'string') {
        return function (sel, fnn) {
            selector.querySelectorAll(sel).forEach(function (elem) {
                fnn(elem);
            });
        };
    }
    document.querySelectorAll(selector).forEach(function (elem) {
        fn(elem);
    });
};
