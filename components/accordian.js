"use strict";
exports.__esModule = true;
var MoxyUI_core_1 = require("../lib/MoxyUI.core");
exports.accordian = function (opts) {
    MoxyUI_core_1.queryAll('.moxy-accordian').forEach(function (el) {
        MoxyUI_core_1.queryAll(el)('h1, h2, h3, h4').forEach(function (node) {
            node.onclick = function (e) {
                if (el.dataset &&
                    el.dataset.dynamic &&
                    el.dataset.dynamic === 'true') {
                    MoxyUI_core_1.bindAll(el)('h1, h2, h3, h4', function (h) {
                        h.nextElementSibling.style.maxHeight = null;
                        h.nextElementSibling.classList.remove('expanded');
                    });
                }
                e.target.classList.toggle('expanded');
                var content = e.target.nextElementSibling;
                content.style.maxHeight = content.style.maxHeight
                    ? null
                    : content.scrollHeight + 'px';
            };
        });
    });
};
