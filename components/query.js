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
var queryMethods = {
    elements: [],
    remove: function () {
        this.elements.forEach(function (el) { return el.remove(); });
    },
    hide: function () {
        this.elements.forEach(function (el) { return (el.style.display = 'none'); });
    },
    show: function () {
        this.elements.forEach(function (el) {
            el.style.display = 'block';
            el.style.opacity = 1;
        });
    },
    append: function () {
        var children = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            children[_i] = arguments[_i];
        }
        this.elements.forEach(function (el) {
            el.append.apply(el, children);
        });
    },
    removeClass: function (cls) {
        this.elements.forEach(function (el) {
            el.classList.remove(cls);
        });
    },
    addClass: function (cls) {
        this.elements.forEach(function (el) {
            el.classList.add(cls);
        });
    },
    attr: function (attr, value) {
        this.elements.forEach(function (el) {
            el.setAttribute(attr, value);
        });
    },
    removeAttr: function (attr) {
        this.elements.forEach(function (el) {
            el.removeAttribute(attr);
        });
    },
    removeProp: function (prop) {
        this.elements.forEach(function (el) {
            el.removeProperty(prop);
        });
    },
    prop: function (prop, value) {
        this.elements.forEach(function (el) {
            el.setProperty(prop, value);
        });
    }
};
exports.queryAll = function (selector, wrap) {
    if (wrap === void 0) { wrap = false; }
    var items = [];
    if (typeof selector !== 'string') {
        return function (sel) {
            selector
                .querySelectorAll(sel)
                .forEach(function (item) { return items.push(item); });
            if (wrap) {
                return Object.assign({}, queryMethods, { items: items });
            }
            return items;
        };
    }
    document
        .querySelectorAll(selector)
        .forEach(function (item) { return items.push(item); });
    if (wrap) {
        return Object.assign({}, queryMethods, { items: items });
    }
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
// const queryAll = function (selector) {
//     var items = [];
//     if (typeof selector !== 'string') {
//         return function (sel) {
//             selector
//                 .querySelectorAll(sel)
//                 .forEach(function (item) { return items.push(item); });
//             return items;
//         };
//     }
//     document
//         .querySelectorAll(selector)
//         .forEach(function (item) { return items.push(item); });
//     return new Proxy({items}, queryHandler);
// };
// const queryHandler = {
//     get: (target, objectKey) => {
//         console.log('getter')
//         target.items.forEach((item) => {
//             item[objectKey]()
//         })
//         return { remove: () => {} }
//     },
//     apply: (target, thisArg, args) => {
//         console.log(target, thisArgs, args)
//         return target(...args)
//     }
// }
// console.log(queryAll('li').remove());
