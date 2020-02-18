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
exports.queryAll = function (selector, proxy) {
    if (proxy === void 0) { proxy = false; }
    var elements = [];
    if (typeof selector !== 'string') {
        return function (sel) {
            selector
                .querySelectorAll(sel)
                .forEach(function (el) { return elements.push(el); });
            if (proxy) {
                return new Proxy({ elements: elements }, queryHandler);
            }
            return elements;
        };
    }
    document
        .querySelectorAll(selector)
        .forEach(function (el) { return elements.push(el); });
    if (proxy) {
        return new Proxy({ elements: elements }, queryHandler);
    }
    return elements;
};
exports.bindAll = function (selector, fn) {
    if (typeof selector !== 'string') {
        return function (sel, fnn) {
            selector.querySelectorAll(sel).forEach(function (el) {
                fnn(el);
            });
        };
    }
    document.querySelectorAll(selector).forEach(function (el) {
        fn(el);
    });
};
var queryHandler = {
    get: function (target, keyOrMethod) {
        if (target.elements.length === 0) {
            return null;
        }
        else if (typeof target.elements[0][keyOrMethod] !== 'function') {
            return target.elements.map(function (el) { return el[keyOrMethod]; });
        }
        return function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i] = arguments[_i];
            }
            var result = target.elements.forEach(function (el) {
                el[keyOrMethod](args);
            });
            return result;
        };
    }
};
