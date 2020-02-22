"use strict";
exports.__esModule = true;
var MoxyUI_core_1 = require("../lib/MoxyUI.core");
/* Add ability to search, data-searchable, pagination */
exports.table = function (opts) {
    MoxyUI_core_1.queryAll('.moxy-table').forEach(function (tbl) {
        tbl.style.setProperty('--theme', "var(--" + (opts.theme || 'grey') + ")");
        MoxyUI_core_1.queryAll(tbl)('thead th').forEach(function (th, index) {
            if (th.dataset &&
                th.dataset.sortable &&
                (th.dataset.sortable === 'true' || th.dataset.sortable === '1')) {
                th.onclick = function (e) {
                    var _a;
                    var rows = MoxyUI_core_1.queryAll(tbl)('tbody tr');
                    if (th.dataset.sortDir && th.dataset.sortDir === 'asc') {
                        MoxyUI_core_1.queryAll(tbl)('thead th').forEach(function (thh) {
                            if (thh.dataset && thh.dataset.sortDir) {
                                thh.dataset.sortDir = '';
                            }
                        });
                        th.dataset.sortDir = 'desc';
                    }
                    else {
                        MoxyUI_core_1.queryAll(tbl)('thead th').forEach(function (thh) {
                            if (thh.dataset && thh.dataset.sortDir) {
                                thh.dataset.sortDir = '';
                            }
                        });
                        th.dataset.sortDir = 'asc';
                    }
                    rows.sort(function (a, b) {
                        if (th.dataset.sortDir &&
                            th.dataset.sortDir === 'asc') {
                            return MoxyUI_core_1.query(a)("td:nth-child(" + (index + 1) + ")")
                                .innerText <
                                MoxyUI_core_1.query(b)("td:nth-child(" + (index + 1) + ")").innerText
                                ? -1
                                : 1;
                        }
                        else {
                            return MoxyUI_core_1.query(a)("td:nth-child(" + (index + 1) + ")")
                                .innerText <
                                MoxyUI_core_1.query(b)("td:nth-child(" + (index + 1) + ")").innerText
                                ? 1
                                : -1;
                        }
                    });
                    MoxyUI_core_1.query(tbl)('tbody').innerHTML = '';
                    (_a = MoxyUI_core_1.query(tbl)('tbody')).append.apply(_a, rows);
                };
            }
        });
        setResizable(tbl);
    });
};
var setResizable = function (tbl) {
    var row = tbl.getElementsByTagName('tr')[0];
    var cols = row ? row.children : undefined;
    if (!cols) {
        return;
    }
    tbl.style.overflow = 'hidden';
    var tableHeight = tbl.offsetHeight;
    for (var i = 0; i < cols.length; i++) {
        var div = MoxyUI_core_1.elem('div', {
            "class": 'resizer',
            style: "height:" + tableHeight + "px;"
        });
        cols[i].appendChild(div);
        cols[i].style.position = 'relative';
        setListeners(div);
    }
};
var setListeners = function (div) {
    var pageX;
    var col;
    var nCol;
    var colWidth;
    var nColWidth;
    div.addEventListener('mousedown', function (e) {
        col = e.target.parentElement;
        nCol = col.nextElementSibling;
        pageX = e.pageX;
        var padding = paddingDiff(col);
        colWidth = col.offsetWidth - padding;
        if (nCol) {
            nColWidth = nCol.offsetWidth - padding;
        }
    });
    div.addEventListener('mouseover', function (e) { return (e.target.style.borderRight = '2px solid var(--theme)'); });
    div.addEventListener('mouseout', function (e) { return (e.target.style.borderRight = ''); });
    document.addEventListener('mousemove', function (e) {
        if (col) {
            var diffX = e.pageX - pageX;
            if (nCol) {
                nCol.style.width = nColWidth - diffX + 'px';
            }
            col.style.width = colWidth + diffX + 'px';
        }
    });
    document.addEventListener('mouseup', function (e) {
        col = null;
        nCol = null;
        pageX = null;
        nColWidth = null;
        colWidth = null;
    });
};
var paddingDiff = function (col) {
    return getStyleVal(col, 'box-sizing') === 'border-box'
        ? 0
        : parseInt(getStyleVal(col, 'padding-left'), 10) +
            parseInt(getStyleVal(col, 'padding-right'), 10);
};
var getStyleVal = function (e, prop) {
    return window.getComputedStyle(e, null).getPropertyValue(prop);
};
