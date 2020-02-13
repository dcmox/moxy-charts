"use strict";
exports.__esModule = true;
var IMoxyUI_1 = require("../lib/IMoxyUI");
var MoxyUI_util_1 = require("../lib/MoxyUI.util");
exports.treeMap = function (data, element, opts) {
    var normalized = MoxyUI_util_1.normalizeData(data, -1);
    var inner = document.createElement('div');
    inner.className = 'chart-inner';
    inner.classList.add('chart-treemap');
    var html = '';
    var main = 'width';
    var alt = 'height';
    normalized.sort(function (a, b) { return (a.value > b.value ? -1 : 1); });
    var wr = 100;
    var hr = 100;
    var rv = -1;
    normalized.forEach(function (ds, index) {
        var carry = index % 1 === 0 ? wr : hr;
        if (rv === -1) {
            rv = ds.value;
        }
        else {
            rv = Math.ceil(ds.value * (100 / carry));
        }
        var remainder = main === 'height' ? wr : hr;
        if (index === normalized.length - 1) {
            rv = wr;
        }
        html += "<div style=\"float: left;" + main + ": " + rv + "%; " + alt + ": " + remainder + "%; background-color: var(--" + IMoxyUI_1.MoxyUIColors[normalized.length - 1 - index] + ")\"><span>" + ds.label + " (" + normalized[index].value + ")</span></div>";
        wr = main === 'width' ? wr - rv : wr;
        hr = main === 'height' ? hr - rv : hr;
        if (index % 1 === 0) {
            main = main === 'width' ? 'height' : 'width';
            alt = alt === 'height' ? 'width' : 'height';
        }
    });
    html += '</div>';
    inner.innerHTML = html;
    element.append(inner);
};
