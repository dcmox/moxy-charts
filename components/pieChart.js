"use strict";
exports.__esModule = true;
var IMoxyUI_1 = require("../lib/IMoxyUI");
var MoxyUI_util_1 = require("../lib/MoxyUI.util");
exports.pieChart = function (data, element, opts) {
    var _a;
    if (!opts) {
        opts = IMoxyUI_1.MoxyUIDefaultOptions;
    }
    var normalized = MoxyUI_util_1.normalizeData(data, -1);
    var inner = document.createElement('div');
    inner.className = 'chart-inner';
    inner.classList.add('pie-chart-svg');
    if ((_a = opts) === null || _a === void 0 ? void 0 : _a.title) {
        var h3 = document.createElement('h3');
        h3.innerHTML = opts.title;
        inner.prepend(h3);
    }
    var legendHtml = '';
    var pieHtml = '';
    var width = opts.width - 120 ||
        parseInt(element.style.width.replace('px', ''), 10) - 120 ||
        280;
    inner.style.setProperty('--circle-width', width.toString());
    var area = 2 * Math.PI * (width / 4);
    var pieInner = document.createElement('div');
    pieInner.className = 'pie-inner';
    var pieDeg = -90;
    normalized.forEach(function (ds, index) {
        pieHtml = "<circle stroke=\"var(--" + IMoxyUI_1.MoxyUIColors[index] + ")\" stroke-dasharray=\"calc(" + Math.ceil((ds.value / 100) * area) + ")\n        " + area + "\" r=\"" + width / 4 + "\" cx=\"" + width / 2 + "\" cy=\"" + width / 2 + "\" />";
        var pie = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
        pie.style.transform = "rotate(" + pieDeg + "deg)";
        pie.setAttribute('width', "" + width);
        pie.setAttribute('height', "" + width);
        pie.setAttribute('title', normalized[index].value + " - " + ds.label);
        pie.innerHTML = "" + pieHtml;
        pieInner.append(pie);
        pieDeg += Math.floor(ds.value * 3.65);
        if (index === normalized.length - 1 && pieDeg < 360) {
            pieDeg = 360;
        }
        legendHtml += "<label><span style=\"background-color: var(--" + IMoxyUI_1.MoxyUIColors[index] + ")\" class=\"key\"></span> " + ds.label + "</label>";
    });
    var legend = document.createElement('div');
    legend.className = 'legend';
    legend.innerHTML = legendHtml;
    inner.append(pieInner);
    inner.append(legend);
    if (element) {
        element.prepend(inner);
    }
};
