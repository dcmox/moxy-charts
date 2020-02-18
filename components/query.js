"use strict";
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
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
var queryMethods = {
    remove: function (el) {
        el.remove();
    },
    hide: function (el) {
        el.style.display = 'none';
    },
    show: function (el) {
        el.style.display = 'block';
        el.style.opacity = 1;
    },
    append: function (el) {
        var children = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            children[_i - 1] = arguments[_i];
        }
        el.append.apply(el, children);
    },
    removeClass: function (el, cls) {
        el.classList.remove(cls);
    },
    addClass: function (el, cls) {
        el.classList.add(cls);
    },
    attr: function (el, attr, value) {
        el.setAttribute(attr, value);
    },
    removeAttr: function (el, attr) {
        el.removeAttribute(attr);
    },
    removeProp: function (el, prop) {
        el.style.removeProperty(prop);
    },
    prop: function (el, prop, value) {
        el.style.setProperty(prop, value);
    }
};
var queryHandler = {
    get: function (target, keyOrMethod) {
        if (target.elements.length === 0) {
            return function () {
                var args = [];
                for (var _i = 0; _i < arguments.length; _i++) {
                    args[_i] = arguments[_i];
                }
                return [];
            };
        }
        else if (typeof target.elements[0][keyOrMethod] !== 'function' &&
            !queryMethods[keyOrMethod]) {
            return target.elements.map(function (el) { return el[keyOrMethod]; });
        }
        return function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i] = arguments[_i];
            }
            var result = [];
            target.elements.forEach(function (el) {
                if (el[keyOrMethod]) {
                    el[keyOrMethod].apply(el, args);
                }
                else if (queryMethods[keyOrMethod]) {
                    result.push(queryMethods[keyOrMethod].apply(queryMethods, __spreadArrays([el], args)));
                }
            });
            return result;
        };
    }
};
