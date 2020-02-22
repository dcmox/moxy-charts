"use strict";
exports.__esModule = true;
exports.calculator = function (element, opts) {
    if (!opts.width) {
        opts.width = element.style.width
            ? parseInt(element.style.width.replace('px', ''), 10)
            : element.clientWidth;
    }
    if (!opts.height) {
        opts.height = element.style.height
            ? parseInt(element.style.height.replace('px', ''), 10)
            : element.clientHeight;
    }
    element.innerHTML = "\n        <div class=\"moxy-calculator\" tabindex=\"0\" style=\"--theme: var(--" + (opts.theme ||
        'blue') + ")\">\n            <div class=\"calc-window\">\n                <div class=\"current\">0</div>\n                <div class=\"history\"></div>\n            </div>\n            <div>\n                <div class=\"numbers\">\n                    <div class=\"operator sqr\" data-op=\"sqr\" tabindex=\"3\">x<sup>2</sup></div>\n                    <div class=\"operator\" data-op=\"del\" tabindex=\"2\">del</div>\n                    <div class=\"operator\" data-op=\"clr\" tabindex=\"1\">C</div>\n                    <div class=\"number\" data-op=\"9\" tabindex=\"15\">9</div>\n                    <div class=\"number\" data-op=\"8\" tabindex=\"14\">8</div>\n                    <div class=\"number\" data-op=\"7\" tabindex=\"13\">7</div>\n                    <div class=\"number\" data-op=\"6\" tabindex=\"12\">6</div>\n                    <div class=\"number\" data-op=\"5\" tabindex=\"11\">5</div>\n                    <div class=\"number\" data-op=\"4\" tabindex=\"10\">4</div>\n                    <div class=\"number\" data-op=\"3\" tabindex=\"9\">3</div>\n                    <div class=\"number\" data-op=\"2\" tabindex=\"8\">2</div>\n                    <div class=\"number\" data-op=\"1\" tabindex=\"7\">1</div>\n                    <div class=\"operator\" data-op=\".\" tabindex=\"16\">.</div>\n                    <div class=\"number\" data-op=\"0\" tabindex=\"6\">0</div>\n                    <div class=\"operator\" data-op=\"posneg\" tabindex=\"17\">+/-</div>\n                </div>\n                <div class=\"operators\">\n                    <div class=\"operator\" data-op=\"/\" tabindex=\"3\">/</div>\n                    <div class=\"operator\" data-op=\"*\" tabindex=\"3\">x</div>\n                    <div class=\"operator\" data-op=\"+\" tabindex=\"4\">+</div>\n                    <div class=\"operator\" data-op=\"-\" tabindex=\"4\">-</div>\n                    <div class=\"operator\" data-op=\"=\" tabindex=\"5\">=</div>\n                </div>\n            </div>\n        </div>\n    ";
    var win = element.querySelector('.calc-window .current');
    var history = element.querySelector('.calc-window .history');
    var calc = element.querySelector('.moxy-calculator');
    var lastAction = '';
    var lastOp = '';
    var isLocked = false;
    if (calc && history && win) {
        /* TODO - Fix SQR, fix subtracting using = over and over when not 0 */
        calc.onkeypress = function (e) {
            var key = String.fromCharCode(e.which);
            if (calc && calc.querySelector("div[data-op='" + key + "']")) {
                calc.querySelector("div[data-op='" + key + "']").click();
                calc.querySelector("div[data-op='" + key + "']").focus();
                setTimeout(function () { return calc.focus(); }, 50);
            }
        };
        calc.onkeyup = function (e) {
            var key = '';
            if (e.which === 46 || e.which === 8) {
                key = 'del';
                calc.querySelector("div[data-op='" + key + "']").click();
                calc.querySelector("div[data-op='" + key + "']").focus();
                setTimeout(function () { return calc.focus(); }, 50);
            }
        };
        element.querySelectorAll('.number').forEach(function (n) {
            n.onkeypress = function (e) {
                if (e.which === 13 && !isLocked) {
                    isLocked = true;
                    e.target.click();
                    isLocked = false;
                }
            };
            n.onclick = function (e) {
                if (isLocked) {
                    return;
                }
                isLocked = true;
                if ((win && win.innerHTML === '0') || lastAction === 'op') {
                    win.innerHTML = e.target.innerHTML;
                }
                else if (win) {
                    win.innerHTML += e.target.innerHTML;
                    win.innerHTML = Number(win.innerHTML.replace(/,/g, '')).toLocaleString();
                }
                lastAction = 'num';
                isLocked = false;
            };
        });
        var memory_1 = '';
        var lastMemory_1 = '';
        /* TODO - cleanup code */
        element.querySelectorAll('.operator').forEach(function (n) {
            n.onkeypress = function (e) {
                if (e.which === 13 && !isLocked) {
                    isLocked = true;
                    e.target.click();
                    isLocked = false;
                }
            };
            n.onclick = function (e) {
                var _a, _b;
                if (isLocked) {
                    return;
                }
                isLocked = true;
                var operator = e.target.dataset.op;
                if (operator === 'clr') {
                    win.innerHTML = '0';
                    memory_1 = '';
                    history.innerHTML = '';
                    lastMemory_1 = '';
                    lastAction = '';
                    lastOp = '';
                    isLocked = false;
                    return;
                }
                else if (operator === 'posneg') {
                    if (((_a = win) === null || _a === void 0 ? void 0 : _a.innerHTML.indexOf('-')) === -1) {
                        win.innerHTML = '-' + win.innerHTML;
                    }
                    else if (win) {
                        win.innerHTML = win.innerHTML.slice(1);
                    }
                    isLocked = false;
                    return;
                }
                else if (operator === '.' && win) {
                    if (win && lastAction === 'op') {
                        win.innerHTML = '0.';
                        lastAction = 'num';
                    }
                    else if (win.innerHTML.indexOf('.') === -1) {
                        win.innerHTML += '.';
                    }
                    isLocked = false;
                    return;
                }
                else if (operator === 'del') {
                    if (lastOp === '=') {
                        memory_1 = '';
                        history.innerHTML = memory_1;
                        isLocked = false;
                        return;
                    }
                    else if (lastAction === 'num') {
                        win.innerHTML = Number(win.innerHTML
                            .slice(0, win.innerHTML.length - 1)
                            .replace(/,/g, ''));
                        isLocked = false;
                        return;
                    }
                    else {
                        isLocked = false;
                        return;
                    }
                }
                else if (lastAction === 'op' && operator === '=') {
                    if (lastOp === '=' && win) {
                        memory_1 =
                            win.innerHTML.replace(/,/g, '') +
                                ' ' +
                                lastMemory_1
                                    .split(' ')
                                    .slice(-4)
                                    .join(' ');
                        history.innerHTML = memory_1;
                        var v = eval(memory_1.slice(0, memory_1.length - 2));
                        if (v) {
                            if (v.toString().length > 20) {
                                win.innerHTML = Number(v).toPrecision();
                            }
                            else {
                                win.innerHTML = Number(v).toLocaleString();
                            }
                        }
                        isLocked = false;
                        return;
                    }
                    memory_1 = memory_1.slice(0, memory_1.length - 2) + operator + ' ';
                    history.innerHTML = memory_1;
                    isLocked = false;
                    return;
                }
                else if (lastOp === '=') {
                    memory_1 = memory_1
                        .split('=')
                        .slice(1)
                        .join('');
                }
                else if (lastOp === operator && lastAction === 'op') {
                    isLocked = false;
                    return;
                }
                else if (lastOp !== operator && lastAction === 'op') {
                    memory_1 =
                        memory_1.slice(0, memory_1.length - 2) +
                            ' ' +
                            operator +
                            ' ';
                    history.innerHTML = memory_1;
                    isLocked = false;
                    return;
                }
                lastAction = 'op';
                memory_1 +=
                    ((_b = win) === null || _b === void 0 ? void 0 : _b.innerHTML.replace(/,/g, '')) + ' ' + operator + ' ';
                if (history) {
                    history.innerHTML = memory_1;
                }
                if (win) {
                    var v = eval(memory_1.slice(0, memory_1.length - 2));
                    if (v !== undefined) {
                        if (v.toString().length > 20) {
                            win.innerHTML = Number(v).toPrecision();
                        }
                        else {
                            win.innerHTML = Number(v).toLocaleString();
                        }
                    }
                }
                if (operator === '=') {
                    lastMemory_1 = memory_1;
                    memory_1 = '';
                }
                lastOp = operator;
                isLocked = false;
            };
        });
    }
};
