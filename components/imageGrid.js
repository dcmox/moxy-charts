"use strict";
exports.__esModule = true;
var MoxyUI_core_1 = require("../lib/MoxyUI.core");
exports.imageGrid = function (opts) {
    MoxyUI_core_1.queryAll('.moxy-grid').forEach(function (el) {
        var columns = 2;
        if (el.dataset && el.dataset.columns) {
            columns = parseInt(el.dataset.columns, 10);
        }
        var len = MoxyUI_core_1.queryAll(el)('img').length;
        if (columns > len) {
            columns = 2;
        }
        el.style.setProperty('--columns', 100 / columns + '%');
        el.style.setProperty('--nColumns', columns * 8 + 'px');
        var div = MoxyUI_core_1.elem('div', { "class": 'row' });
        var columnElements = [];
        var columnSizes = [];
        for (var i = 0; i < columns; i++) {
            columnElements.push(MoxyUI_core_1.elem('div', { "class": 'column' }));
            columnSizes[i] = 0;
        }
        /* Todo - calculation so that there are no gaps */
        MoxyUI_core_1.queryAll(el)('img').forEach(function (img, index) {
            if (index === len - 1) {
                var smallest = Math.min.apply(Math, columnSizes);
                var si = columnSizes.indexOf(smallest);
                columnElements[si].append(img);
            }
            else {
                columnElements[index % columns].append(img);
                columnSizes[index % columns] += img.naturalHeight;
            }
        });
        el.innerHTML = '';
        div.append.apply(div, columnElements);
        el.append(div);
    });
};
