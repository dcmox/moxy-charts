"use strict";
exports.__esModule = true;
exports.normalizeData = function (data, maxValue) {
    if (maxValue === void 0) { maxValue = 80; }
    var normalized = [];
    if (maxValue === -1) {
        var maxDataValue_1 = data.reduce(function (acc, current) { return acc + parseInt(current.value, 10); }, 0);
        data.forEach(function (ds) {
            normalized.push({
                label: ds.label,
                value: Math.round((ds.value / maxDataValue_1) * 100)
            });
        });
        return normalized;
    }
    var maxDataValue = data.reduce(function (acc, current) {
        return parseInt(current.value, 10) < acc
            ? acc
            : parseInt(current.value, 10);
    }, 0);
    var ratio = maxDataValue / maxValue;
    data.forEach(function (ds) {
        normalized.push({
            label: ds.label,
            value: Math.round(ds.value / ratio)
        });
    });
    return normalized;
};
