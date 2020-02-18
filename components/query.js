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
    items: [],
    remove: function () {
        this.items.forEach(function (item) { return item.remove(); });
    },
    hide: function () {
        this.items.forEach(function (item) { return (item.style.display = 'none'); });
    },
    show: function () {
        this.items.forEach(function (item) {
            item.style.display = 'block';
            item.style.opacity = 1;
        });
    },
    append: function () {
        var children = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            children[_i] = arguments[_i];
        }
        this.items.forEach(function (item) {
            item.append.apply(item, children);
        });
    },
    removeClass: function (cls) {
        this.items.forEach(function (item) {
            item.classList.remove(cls);
        });
    },
    addClass: function (cls) {
        this.items.forEach(function (item) {
            item.classList.add(cls);
        });
    },
    attr: function (attr, value) {
        this.items.forEach(function (item) {
            item.setAttribute(attr, value);
        });
    },
    removeAttr: function (attr) {
        this.items.forEach(function (item) {
            item.removeAttribute(attr);
        });
    },
    removeProp: function (prop) {
        this.items.forEach(function (item) {
            item.removeProperty(prop);
        });
    },
    prop: function (prop, value) {
        this.items.forEach(function (item) {
            item.setProperty(prop, value);
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
