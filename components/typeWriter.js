"use strict";
exports.__esModule = true;
var MoxyUI_core_1 = require("../lib/MoxyUI.core");
exports.typeWriter = function (opts) {
    MoxyUI_core_1.queryAll('.moxy-typewriter').forEach(function (el) {
        var i = 0;
        var text = '';
        var speed = el.dataset && el.dataset.speed ? parseInt(el.dataset.speed, 10) : 50;
        var adjustedSpeed = speed;
        var blinker = null;
        var typeAway = function () {
            clearInterval(blinker);
            if (i < text.length) {
                if (text.charAt(i + 1) === ' ') {
                    if (Math.floor(Math.random() * 3) === 1) {
                        adjustedSpeed += Math.random() * 100 + 20;
                    }
                }
                else if (
                // tslint:disable-next-line: quotemark
                ['!', '.', '?', ':', "'"].indexOf(text.charAt(i + 1)) > -1) {
                    if (Math.floor(Math.random() * 2) === 1) {
                        adjustedSpeed += Math.random() * 400 + 20;
                    }
                    else {
                        adjustedSpeed += Math.random() * 100 + 20;
                    }
                }
                else {
                    adjustedSpeed = speed + Math.random() * 20;
                }
                el.innerHTML += text.charAt(i);
                i++;
                setTimeout(typeAway, adjustedSpeed);
            }
        };
        text = el.innerHTML;
        el.innerHTML = '';
        blinker = setInterval(function () {
            el.classList.toggle('blink');
        }, 500);
        setTimeout(typeAway, 3000);
    });
};
