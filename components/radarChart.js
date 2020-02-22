"use strict";
exports.__esModule = true;
var MoxyUI_core_1 = require("../lib/MoxyUI.core");
var scale = function (value, sz) {
    var circle = MoxyUI_core_1.svge('circle', {
        cx: 0,
        cy: 0,
        fill: '#FAFAFA',
        opacity: '0.3',
        r: ((value / 4) * sz) / 2,
        stroke: '#999',
        strokeWidth: '0.2'
    });
    return circle;
};
var polarToX = function (angle, distance) {
    return Math.cos(angle - Math.PI / 2) * distance;
};
var polarToY = function (angle, distance) {
    return Math.sin(angle - Math.PI / 2) * distance;
};
var pathDefinition = function (points) {
    var d = 'M' + points[0][0].toFixed(4) + ',' + points[0][1].toFixed(4);
    for (var i = 1; i < points.length; i++) {
        d += 'L' + points[i][0].toFixed(4) + ',' + points[i][1].toFixed(4);
    }
    return d + 'z';
};
var caption = function (sz) { return function (col) {
    var text = MoxyUI_core_1.svge('text', {
        dy: 10 / 2,
        fill: '#444',
        style: 'font-weight: bold; text-shadow: 1px 1px 1px #fff',
        'text-anchor': 'middle',
        x: polarToX(col.angle, (sz / 2) * 0.95).toFixed(4),
        y: polarToY(col.angle, (sz / 2) * 0.95).toFixed(4)
    }, { innerHTML: col.caption });
    return text;
}; };
// tutorial courtesy of: https://itnext.io/react-svg-radar-chart-a89d15760e8
var shape = function (columns, opts) { return function (chartData, i) {
    var data = chartData;
    var path = MoxyUI_core_1.svge('path', {
        d: pathDefinition(columns.map(function (col) {
            var value = data[col.key];
            return [
                polarToX(col.angle, (value / 2) * opts.width),
                polarToY(col.angle, (value / 2) * opts.width),
            ];
        })),
        fill: "var(--" + opts.fillColor + ")",
        opacity: '.5',
        stroke: "var(--" + opts.borderColor + ")"
    });
    return path;
}; };
var points = function (points) {
    return points
        .map(function (point) { return point[0].toFixed(4) + ',' + point[1].toFixed(4); })
        .join(' ');
};
var axis = function (sz) { return function (col, i) {
    var polyline = MoxyUI_core_1.svge('polyline', {
        opacity: '0.3',
        points: points([
            [0, 0],
            [polarToX(col.angle, sz / 2), polarToY(col.angle, sz / 2)],
        ]),
        stroke: '#555',
        strokeWidth: '0.2'
    });
    return polyline;
}; };
exports.radarChart = function (data, element, opts) {
    if (!opts.width) {
        opts.width = 400;
    }
    if (!opts.height) {
        opts.height = 400;
    }
    var svg = MoxyUI_core_1.svge('svg', {
        "class": 'moxy-radarchart',
        height: opts.height,
        viewBox: "-20 0 " + (opts.width + 40) + " " + opts.width,
        width: opts.width
    });
    var group = MoxyUI_core_1.svge('g');
    for (var i = 4; i > 0; i--) {
        group.append(scale(i, opts.width));
    }
    var middleOfChart = (opts.width / 2).toFixed(4);
    var slices = [];
    var normalized = data;
    var keys = Object.keys(normalized[0]);
    var captions = opts.captions ? opts.captions : keys;
    var columns = keys.map(function (key, i, all) { return ({
        angle: (Math.PI * 2 * i) / all.length,
        caption: captions[key] || captions[i],
        key: key
    }); });
    var shp = MoxyUI_core_1.svge('g');
    var shapes = shape(columns, opts);
    shp.append.apply(shp, normalized.map(shapes));
    group.append(shp);
    var ax = MoxyUI_core_1.svge('g');
    ax.append.apply(ax, columns.map(axis(opts.width)));
    group.append(ax);
    var labels = MoxyUI_core_1.svge('g');
    labels.append.apply(labels, columns.map(caption(opts.width)));
    group.append(labels);
    for (var i = 4; i > 0; i--) {
        slices[slices.length] = MoxyUI_core_1.svge('g', {
            transform: "translate(" + middleOfChart + "," + middleOfChart + ")"
        });
        slices[slices.length - 1].append(group);
    }
    svg.append.apply(svg, slices);
    element.append(svg);
};
