"use strict";
exports.__esModule = true;
var MoxyUI_core_1 = require("../lib/MoxyUI.core");
exports.subWay = function (opts) {
    MoxyUI_core_1.queryAll('.moxy-subway').forEach(function (el) {
        var minSize = 0;
        if (el.dataset && el.dataset.theme) {
            el.style.setProperty('--theme', 'var(--' + el.dataset.theme + ')');
        }
        else {
            el.style.setProperty('--theme', 'var(--blue)');
        }
        if (el.dataset && el.dataset.size) {
            minSize = parseInt(el.dataset.size);
        }
        else {
            MoxyUI_core_1.queryAll(el)('span').forEach(function (span) {
                var font = window.getComputedStyle(span).fontFamily;
                var sz = window.getComputedStyle(span).fontSize;
                var width = MoxyUI_core_1.getTextWidth(span.innerText, font, sz);
                if (minSize < width) {
                    minSize = width;
                }
            });
        }
        var rail = MoxyUI_core_1.elem('div', {
            "class": 'rail'
        });
        el.prepend(rail);
        var initialPercent = 100 / MoxyUI_core_1.queryAll(el)('span').length;
        var padding = initialPercent / 2;
        MoxyUI_core_1.queryAll(el)('span').forEach(function (span, index) {
            span.style.display = 'block';
            span.style.width = minSize * 2 + 'px';
            span.style.height = minSize * 2 + 'px';
            span.style.lineHeight = minSize * 2 + 'px';
            span.style.borderRadius = '50%';
            span.style.textAlign = 'center';
            span.style.color = '#fff';
            span.style.top = "-" + (minSize + 2) + "px";
            var calc = initialPercent * (index + 1) - padding;
            span.style.left = 'calc(' + calc + '%' + (" - " + minSize + "px)");
        });
    });
};
