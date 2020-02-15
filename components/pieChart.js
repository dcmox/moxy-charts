"use strict";
exports.__esModule = true;
var IMoxyUI_1 = require("../lib/IMoxyUI");
var MoxyUI_util_1 = require("../lib/MoxyUI.util");
var svg_1 = require("./svg");
exports.pieChart = function (data, element, opts) {
    var _a;
    if (!opts) {
        opts = IMoxyUI_1.MoxyUIDefaultOptions;
    }
    var normalized = MoxyUI_util_1.normalizeData(data, -1);
    var width = opts.width - 120 ||
        parseInt(element.style.width.replace('px', ''), 10) - 120 ||
        280;
    var inner = svg_1.elem('div', {
        "class": 'chart-inner pie-chart-svg',
        style: "--circle-width: " + width
    });
    if ((_a = opts) === null || _a === void 0 ? void 0 : _a.title) {
        var h3 = svg_1.elem('h3', { innerHTML: opts.title });
        inner.prepend(h3);
    }
    var legendHtml = '';
    var pieHtml = '';
    var area = 2 * Math.PI * (width / 4);
    var pieInner = svg_1.elem('div', { "class": 'pie-inner' });
    var pieDeg = -90;
    normalized.forEach(function (ds, index) {
        var pie = svg_1.svge('svg', {
            width: width,
            height: width,
            title: normalized[index].value + " - " + ds.label,
            style: "transform: rotate(" + pieDeg + "deg)"
        });
        var circle = svg_1.svge('circle', {
            cx: width / 2,
            cy: width / 2,
            r: width / 4,
            stroke: "var(--" + IMoxyUI_1.MoxyUIColors[index] + ")",
            'stroke-dasharray': "calc(" + Math.ceil((ds.value / 100) * area) + ")\n            " + area
        });
        pie.append(circle);
        pieInner.append(pie);
        pieDeg += Math.floor(ds.value * 3.65);
        if (index === normalized.length - 1 && pieDeg < 360) {
            pieDeg = 360;
        }
        legendHtml += "<label><span style=\"background-color: var(--" + IMoxyUI_1.MoxyUIColors[index] + ")\" class=\"key\"></span> " + ds.label + "</label>";
    });
    var legend = svg_1.elem('div', { "class": 'legend' }, { innerHTML: legendHtml });
    inner.append(pieInner);
    inner.append(legend);
    if (element) {
        element.prepend(inner);
    }
};
