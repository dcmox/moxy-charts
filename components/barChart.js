"use strict";
exports.__esModule = true;
var IMoxyUI_1 = require("../lib/IMoxyUI");
var MoxyUI_util_1 = require("../lib/MoxyUI.util");
exports.barChart = function (data, element, style, opts) {
    var _a;
    if (!opts) {
        opts = IMoxyUI_1.MoxyUIDefaultOptions;
    }
    var normalized = MoxyUI_util_1.normalizeData(data);
    var html = '<div class="chart-inner bar-chart">';
    if ((_a = opts) === null || _a === void 0 ? void 0 : _a.title) {
        html += "<h3>" + opts.title + "</h3>";
    }
    if (style === 'bar') {
        normalized.forEach(function (ds, index) {
            html += "<div class=\"chart-row\" title=\"" + data[index].value + " - " + ds.label + "\"><div class=\"chart-bar\" style=\"background-color: var(--" + IMoxyUI_1.MoxyUIColors[index % 7] + "); width: " + ds.value + "%;\"></div><span>" + data[index].value + " <label>" + ds.label + "</label></span></div>";
        });
    }
    else {
        var legendHtml_1 = '';
        normalized.forEach(function (ds, index) {
            html += "<div class=\"chart-column\" title=\"" + data[index].value + " - " + ds.label + "\"><div class=\"chart-bar\" style=\"background-color: var(--" + IMoxyUI_1.MoxyUIColors[index % 7] + "); height: " + ds.value + "%;\"></div></div>";
            legendHtml_1 += "<span><label>" + ds.label + "</label>" + data[index].value + "</span>";
        });
        html += "<div class=\"legend\">" + legendHtml_1 + "</legend>";
    }
    html += '</div>';
    if (element) {
        element.innerHTML = html;
    }
};
