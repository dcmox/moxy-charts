"use strict";
exports.__esModule = true;
var MoxyUI_core_1 = require("../lib/MoxyUI.core");
exports.progressScroll = function (opts) {
    MoxyUI_core_1.queryAll('.moxy-progress-scroll').forEach(function (el) {
        if (el.dataset && el.dataset.target) {
            var track_1 = MoxyUI_core_1.elem('div', { "class": 'moxy-scroll-progress-track' });
            var progress = MoxyUI_core_1.elem('div', {
                "class": 'moxy-scroll-progress-percent'
            });
            track_1.append(progress);
            el.append(track_1);
            var target = el.dataset.target;
            if (!el.dataset.target.startsWith('#') &&
                !el.dataset.target.startsWith('.')) {
                target = '#' + target;
            }
            MoxyUI_core_1.query(target).onscroll = function (e) {
                var winScroll = e.target.scrollTop || e.target.scrollTop;
                var height = e.target.scrollHeight - e.target.clientHeight;
                var scrolled = (winScroll / height) * 100;
                MoxyUI_core_1.query(track_1)('div').style.width = scrolled + '%';
            };
        }
    });
};
