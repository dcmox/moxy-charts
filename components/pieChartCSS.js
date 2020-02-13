"use strict";
exports.__esModule = true;
var IMoxyUI_1 = require("../lib/IMoxyUI");
var MoxyUI_util_1 = require("../lib/MoxyUI.util");
exports.pieCSSChart = function (data, element, opts) {
    var _a;
    if (!opts) {
        opts = IMoxyUI_1.MoxyUIDefaultOptions;
    }
    throw new Error('Deprecated in favor of SVG');
    return; // deprecated for now
    var normalized = MoxyUI_util_1.normalizeData(data, -1);
    var inner = document.createElement('div');
    inner.className = 'chart-inner';
    inner.classList.add('pie-chart');
    if ((_a = opts) === null || _a === void 0 ? void 0 : _a.title) {
        var h3 = document.createElement('h3');
        h3.innerHTML = opts.title;
        inner.prepend(h3);
    }
    var backgroundImage = '';
    var legendHtml = '';
    normalized.forEach(function (ds, index) {
        if (index === 0) {
            backgroundImage += "var(--" + IMoxyUI_1.MoxyUIColors[index] + ") calc(3.6deg * " + ds.value * 3.6 + "),\n";
        }
        else {
            backgroundImage += "var(--" + IMoxyUI_1.MoxyUIColors[index] + ") 0 calc(3.6deg * " + ds.value * 3.6 + "),\n";
        }
        legendHtml += "<label><span style=\"background-color: var(--" + IMoxyUI_1.MoxyUIColors[index] + ")\" class=\"key\"></span> " + ds.label + "</label>";
    });
    backgroundImage += "#fff 0\n";
    var pieInner = document.createElement('div');
    pieInner.className = 'pie-inner';
    var pie = document.createElement('div');
    pie.className = 'pie';
    var legend = document.createElement('div');
    legend.className = 'legend';
    legend.innerHTML = legendHtml;
    pieInner.prepend(pie);
    inner.append(pieInner);
    inner.append(legend);
    if (element) {
        element.prepend(inner);
        pie.style.backgroundImage = "conic-gradient(" + backgroundImage + ")";
    }
};
