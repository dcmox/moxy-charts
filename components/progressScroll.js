"use strict";
exports.__esModule = true;
var query_1 = require("./query");
var svg_1 = require("./svg");
exports.progressScroll = function (opts) {
    query_1.queryAll('.moxy-progress-scroll').forEach(function (el) {
        if (el.dataset && el.dataset.target) {
            var track_1 = svg_1.elem('div', { "class": 'moxy-scroll-progress-track' });
            var progress = svg_1.elem('div', {
                "class": 'moxy-scroll-progress-percent'
            });
            track_1.append(progress);
            el.append(track_1);
            var target = el.dataset.target;
            if (!el.dataset.target.startsWith('#') &&
                !el.dataset.target.startsWith('.')) {
                target = '#' + target;
            }
            query_1.query(target).onscroll = function (e) {
                console.log(e);
                var winScroll = e.target.scrollTop || e.target.scrollTop;
                var height = e.target.scrollHeight - e.target.clientHeight;
                var scrolled = (winScroll / height) * 100;
                query_1.query(track_1)('div').style.width = scrolled + '%';
            };
        }
    });
};
