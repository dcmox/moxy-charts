"use strict";
exports.__esModule = true;
var MoxyUI_core_1 = require("../lib/MoxyUI.core");
// TODO: Add data-source with debounce
exports.dropdown = function (opts) {
    // Loop through each dropdown of class .moxy-dropdown
    MoxyUI_core_1.queryAll('.moxy-dropdown').forEach(function (dd) {
        // Set properties to each of them
        dd.style.setProperty('--theme', "var(--" + (opts.theme || 'blue') + ")");
        dd.style.setProperty('--backgroundColor', "var(--" + (opts.backgroundColor || 'blue') + ")");
        // Create the elements necessary for our custom dropdown
        var select = MoxyUI_core_1.query(dd)('select');
        var input = MoxyUI_core_1.elem('input', { "class": 'moxy-dropdown-input' });
        var list = MoxyUI_core_1.elem('ul', { "class": 'moxy-dropdown-list' });
        var span = MoxyUI_core_1.elem('span', {
            "class": 'moxy-dropdown-select'
        });
        input.onclick = function (e) {
            e.target.setSelectionRange(0, e.target.value.length);
        };
        span.innerHTML = '&#x1F893';
        span.onclick = function () { return input.focus(); };
        // Iterate through all optionsi n the select
        MoxyUI_core_1.queryAll(dd)('option').forEach(function (opt, index) {
            var option = MoxyUI_core_1.elem('li', {
                'data-label': opt.innerText,
                'data-value': opt.value
            });
            option.innerText = opt.innerText;
            option.onclick = function () {
                input.value = option.dataset.label;
                input.dataset.value = option.dataset.value;
                MoxyUI_core_1.queryAll(select, true)('option').removeAttribute('selected');
                MoxyUI_core_1.query(select)("option[value=\"" + option.dataset.value + "\"]").setAttribute('selected', 'selected');
                list.classList.add('hidden');
            };
            list.append(option);
        });
        // Handle our search selection
        input.onkeyup = function (e) {
            // Handle return on selection, hide dropdown
            if (e.keyCode === 13) {
                var active = MoxyUI_core_1.query(list)('li.active');
                if (active) {
                    active.click();
                }
                input.blur();
                return;
            }
            // Handle keycodes
            if (e.keyCode === 40 || e.keyCode === 38) {
                var previouslyActive = MoxyUI_core_1.query(list)('li.active');
                if (e.keyCode === 38 && !previouslyActive) {
                    return;
                }
                var activeItem = previouslyActive
                    ? e.keyCode === 40
                        ? previouslyActive.nextSibling
                        : previouslyActive.previousSibling
                    : MoxyUI_core_1.query(list)('li:not(.hidden):not(.active)');
                if (previouslyActive) {
                    previouslyActive.classList.remove('active');
                }
                activeItem.classList.add('active');
                return;
            }
            // Handle clearing out selection
            if (e.target.value.trim() === '') {
                MoxyUI_core_1.queryAll(select, true)('option').removeAttribute('selected');
                input.dataset.value = '';
                return;
            }
            // Handle filtering our list
            MoxyUI_core_1.queryAll(list)('li').forEach(function (li) {
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
        // Handle other input events
        input.onfocus = function () { return list.classList.remove('hidden'); };
        input.onblur = function () {
            return setTimeout(function () {
                list.classList.add('hidden');
                MoxyUI_core_1.queryAll(list, true)('li.active').removeClass('active');
            }, 150);
        };
        // Initialize list to being hidden and append our custom elements
        list.classList.add('hidden');
        dd.append(input, list, span);
    });
};
