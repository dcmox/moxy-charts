"use strict";
exports.__esModule = true;
var MoxyUI_util_1 = require("../lib/MoxyUI.util");
var svg_1 = require("./svg");
exports.lineChart = function (data, element, opts) {
    if (!opts.width) {
        opts.width = 500;
    }
    if (!opts.height) {
        opts.height = 400;
    }
    var svg = svg_1.svge('svg', {
        "class": 'moxy-lineChart',
        width: opts.width + 'px',
        height: opts.height + 'px',
        style: "background-color: var(--" + opts.backgroundColor + ")"
    });
    // console.log(opts)
    var xGrid = svg_1.svge('g', {
        "class": 'grid x-grid',
        id: 'xGrid'
    });
    var max = data.reduce(function (acc, cur) { return (cur.value > acc ? cur.value : acc); }, 0);
    var yPadding = 60;
    var xOffset = (opts.width - 113) / data.length;
    var y2 = opts.height - 113 + yPadding;
    var yOrigin = ((opts.height - 113) / 7) * 6 + yPadding;
    var normalized = MoxyUI_util_1.normalizeData(data, 100);
    var yMax = yOrigin;
    var sPath = "M113," + yOrigin + " ";
    var gPoints = svg_1.svge('g', {
        fill: "var(--" + opts.fillColor + ")",
        "class": 'set points'
    });
    var gxLabels = svg_1.svge('g', {
        "class": 'labels x-labels',
        fill: "var(--" + (opts.textColor || 'dark') + ")"
    });
    var gyLabels = svg_1.svge('g', {
        "class": 'labels y-labels',
        fill: "var(--" + (opts.textColor || 'dark') + ")"
    });
    for (var i = 0; i < data.length; i++) {
        var yPos = yMax - (normalized[i].value / 100) * yMax + yPadding;
        sPath += "L" + (xOffset * i + 113) + "," + yPos + " ";
        var circle = svg_1.svge('circle', {
            cx: xOffset * i + 113,
            cy: yMax - (normalized[i].value / 100) * yMax + yPadding,
            'data-value': data[i].value,
            r: 5
        });
        gPoints.append(circle);
        var xLabel = svg_1.svge('text', {
            x: xOffset * i + 113,
            y: y2 + 15
        }, { innerHTML: data[i].label });
        gxLabels.append(xLabel);
        var line = svg_1.svge('line', {
            x1: xOffset * i + 113,
            x2: xOffset * i + 113,
            y1: yPadding,
            y2: y2
        });
        xGrid.append(line);
    }
    sPath += "L" + (xOffset * (data.length - 1) + 113) + "," + yOrigin + " Z";
    svg.append(xGrid);
    var yGrid = svg_1.svge('g', {
        "class": 'grid y-grid',
        id: 'yGrid'
    });
    var yOffset = (opts.height - 113) / 7;
    var x2 = xOffset * (data.length - 1) + 113;
    for (var i = 0; i < 7; i++) {
        var line = svg_1.svge('line', {
            x1: 86,
            x2: x2,
            y1: yPadding + yOffset * i,
            y2: yPadding + yOffset * i
        });
        yGrid.append(line);
        var yLabel_1 = svg_1.svge('text', {
            x: 80,
            y: (yPadding + 5 + yOffset * i).toString()
        }, { innerHTML: Math.round(max - i * (max / 6)) });
        gyLabels.append(yLabel_1);
    }
    var yLabel = svg_1.svge('text', {
        y: 35,
        'text-anchor': 'middle',
        x: opts.width / 2
    }, { innerHTML: opts.title || '' });
    gyLabels.append(yLabel);
    svg.append(yGrid);
    var surfaces = svg_1.svge('g', { "class": 'surfaces' });
    var path = svg_1.svge('path', {
        "class": 'set',
        fill: "var(--" + opts.fillColor + ")",
        d: sPath
    });
    surfaces.append(path);
    svg.append(surfaces, gPoints, gxLabels, gyLabels);
    element.append(svg);
};
