"use strict";
exports.__esModule = true;
var MoxyUI_core_1 = require("../lib/MoxyUI.core");
exports.treeView = function (opts) {
    MoxyUI_core_1.queryAll('.moxyTreeView').forEach(function (tv) {
        var _a;
        if (tv.dataset &&
            tv.dataset.showToggle &&
            tv.dataset.showToggle === 'true') {
            var el = MoxyUI_core_1.elem('div', { "class": 'moxyTreeViewOpts' });
            el.innerHTML =
                '<span class="expand">Expand</span> <span class="collapse">Collapse</span>';
            (_a = tv.parentNode) === null || _a === void 0 ? void 0 : _a.insertBefore(el, tv.nextSibling);
            MoxyUI_core_1.query(el)('.expand').onclick = function () {
                MoxyUI_core_1.queryAll(tv, true)('li:not(.expanded)').click();
            };
            MoxyUI_core_1.query(el)('.collapse').onclick = function () {
                MoxyUI_core_1.queryAll(tv, true)('li.expanded').click();
            };
        }
        MoxyUI_core_1.queryAll(tv)('li').forEach(function (node, index) {
            if (MoxyUI_core_1.query(node)('ul')) {
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
