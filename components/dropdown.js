"use strict";
exports.__esModule = true;
var query_1 = require("./query");
var svg_1 = require("./svg");
exports.dropdown = function (opts) {
    query_1.queryAll('.moxy-dropdown').forEach(function (dd) {
        dd.style.setProperty('--theme', "var(--" + (opts.theme || 'blue') + ")");
        dd.style.setProperty('--backgroundColor', "var(--" + (opts.backgroundColor || 'blue') + ")");
        var select = query_1.query(dd)('select');
        var input = svg_1.elem('input', { "class": 'moxy-dropdown-input' });
        var list = svg_1.elem('ul', { "class": 'moxy-dropdown-list' });
        var span = svg_1.elem('span', {
            "class": 'moxy-dropdown-select'
        });
        input.onclick = function (e) {
            e.target.setSelectionRange(0, e.target.value.length);
        };
        span.innerHTML = '&#x1F893';
        span.onclick = function () { return input.focus(); };
        query_1.queryAll(dd)('option').forEach(function (opt, index) {
            var option = svg_1.elem('li', {
                'data-value': opt.value,
                'data-label': opt.innerText
            });
            option.innerText = opt.innerText;
            option.onclick = function () {
                input.value = option.dataset.label;
                input.dataset.value = option.dataset.value;
                query_1.query(select)("option[value=\"" + option.dataset.value + "\"]").setAttribute('selected', 'selected');
                list.classList.add('hidden');
            };
            list.append(option);
        });
        input.onkeyup = function (e) {
            query_1.queryAll(list)('li').forEach(function (li) {
                if (li.dataset.value
                    .toLowerCase()
                    .startsWith(e.target.value.toLowerCase()) ||
                    li.dataset.label
                        .toLowerCase()
                        .startsWith(e.target.value.toLowerCase()) ||
                    e.target.value.trim() === '') {
                    li.classList.remove('hidden');
                }
                else {
                    li.classList.add('hidden');
                }
            });
        };
        input.onfocus = function () { return list.classList.remove('hidden'); };
        input.onblur = function () { return setTimeout(function () { return list.classList.add('hidden'); }, 100); };
        list.classList.add('hidden');
        dd.append(input, list, span);
    });
};
