"use strict";
exports.__esModule = true;
exports.table = function (data, element, opts) {
    var _a;
    var html = '';
    if ((_a = opts) === null || _a === void 0 ? void 0 : _a.title) {
        html += "<h3>" + opts.title + "</h3>";
    }
    html += "<table class=\"moxy-table\">";
    html += "<thead><tr>";
    data.forEach(function (row) {
        html += "<th>" + row.label + "</th>";
    });
    html += "</thead></tr>";
    html += "<tbody><tr>";
    data.forEach(function (row) {
        html += "<td>" + row.value + "</td>";
    });
    html += "</tr></tbody>";
    if (element) {
        element.innerHTML = html;
    }
};
