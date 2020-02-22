"use strict";
exports.__esModule = true;
var MoxyUI_core_1 = require("../lib/MoxyUI.core");
exports.fadeLoader = function (opts) {
    MoxyUI_core_1.queryAll('.fade-loader').forEach(function (el) {
        if (el.dataset.theme) {
            el.style.setProperty('--theme', 'var(--' + el.dataset.theme + ')');
        }
        else {
            el.style.setProperty('--theme', 'var(--blue)');
        }
    });
};
