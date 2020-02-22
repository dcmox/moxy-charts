"use strict";
exports.__esModule = true;
var MoxyUI_core_1 = require("../lib/MoxyUI.core");
exports.rating = function (opts) {
    // 	background-position-x: 0px;
    MoxyUI_core_1.queryAll('.moxy-stars').forEach(function (el) {
        el.innerHTML = '&#9733;&#9733;&#9733;&#9733;&#9733;';
        if (el.dataset && el.dataset.maxStars) {
            var stars = '';
            for (var i = 0; i < parseInt(el.dataset.maxStars, 10); i++) {
                stars += '&#9733;';
            }
            el.innerHTML = stars;
        }
        el.onmousemove = function (e) {
            el.style.backgroundPositionX = e.clientX + 'px';
        };
        el.onmouseout = function (e) {
            if (el.dataset && el.dataset.stars) {
                var box = el.getClientRects();
                var maxStars = el.dataset && el.dataset.maxStars
                    ? parseInt(el.dataset.maxStars, 10)
                    : 5;
                var width = parseInt(window.getComputedStyle(el).width.replace('px', ''), 10);
                var starWidth = width / maxStars;
                el.style.backgroundPositionX =
                    box[0].x + starWidth * parseInt(el.dataset.stars, 10) + 'px';
            }
            else {
                el.style.backgroundPositionX = '0';
            }
        };
        el.onclick = function (e) {
            var box = el.getClientRects();
            var maxStars = el.dataset && el.dataset.maxStars
                ? parseInt(el.dataset.maxStars, 10)
                : 5;
            var width = parseInt(window.getComputedStyle(el).width.replace('px', ''), 10);
            var starWidth = width / maxStars;
            if (el.dataset &&
                el.dataset.partial &&
                el.dataset.partial === 'true') {
                el.dataset.stars = (maxStars -
                    Math.round(((width - (e.clientX - box[0].x)) / starWidth) * 2) /
                        2).toString();
            }
            else {
                el.dataset.stars = (maxStars -
                    Math.floor((width - (e.clientX - box[0].x)) / starWidth)).toString();
            }
        };
    });
};
