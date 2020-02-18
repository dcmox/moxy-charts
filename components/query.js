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
    remove: function (elements) {
        elements.forEach(function (el) { return el.remove(); });
    },
    hide: function (elements) {
        elements.forEach(function (el) { return (el.style.display = 'none'); });
    },
    show: function (elements) {
        elements.forEach(function (el) {
            el.style.display = 'block';
            el.style.opacity = 1;
        });
    },
    append: function (elements) {
        var children = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            children[_i - 1] = arguments[_i];
        }
        elements.forEach(function (el) {
            el.append.apply(el, children);
        });
    },
    removeClass: function (elements, cls) {
        elements.forEach(function (el) {
            el.classList.remove(cls);
        });
    },
    addClass: function (elements, cls) {
        elements.forEach(function (el) {
            el.classList.add(cls);
        });
    },
    attr: function (elements, attr, value) {
        elements.forEach(function (el) {
            el.setAttribute(attr, value);
        });
    },
    removeAttr: function (elements, attr) {
        elements.forEach(function (el) {
            el.removeAttribute(attr);
        });
    },
    removeProp: function (elements, prop) {
        elements.forEach(function (el) {
            el.removeProperty(prop);
        });
    },
    prop: function (elements, prop, value) {
        elements.forEach(function (el) {
            el.setProperty(prop, value);
        });
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
