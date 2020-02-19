"use strict";
exports.__esModule = true;
var query_1 = require("./query");
var svg_1 = require("./svg");
exports.treeView = function (opts) {
    query_1.queryAll('.moxyTreeView').forEach(function (tv) {
        var _a;
        if (tv.dataset && tv.dataset.showToggle) {
            var el = svg_1.elem('div', { "class": 'moxyTreeViewOpts' });
            el.innerHTML =
                '<span class="expand">Expand</span> <span class="collapse">Collapse</span>';
            (_a = tv.parentNode) === null || _a === void 0 ? void 0 : _a.insertBefore(el, tv.nextSibling);
            query_1.query(el)('.expand').onclick = function () {
                query_1.queryAll(tv, true)('li:not(.expanded)').click();
            };
            query_1.query(el)('.collapse').onclick = function () {
                query_1.queryAll(tv, true)('li.expanded').click();
            };
        }
        query_1.queryAll(tv)('li').forEach(function (node, index) {
            if (query_1.query(node)('ul')) {
                node.classList.add('expandable');
                node.onclick = function (e) {
                    if (e.target.classList.contains('expandable')) {
                        e.target.classList.toggle('expanded');
                        e.stopPropagation();
                    }
                };
            }
        });
    });
};
