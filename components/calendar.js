"use strict";
exports.__esModule = true;
var query_1 = require("./query");
exports.shortDate = function (date) {
    return date
        .toLocaleDateString('en-US', {
        month: 'short',
        year: 'numeric'
    })
        .toUpperCase();
};
exports.calendar = function (element, opts) {
    if (!opts.height) {
        opts.height = opts.width;
    }
    var monthYear = exports.shortDate(new Date());
    var height = opts.height ? opts.height / 6 : 100;
    var fontSize = '14px';
    if (opts.height < 200) {
        fontSize = '10px';
    }
    element.innerHTML = "<div class=\"moxy-calendar\" style=\"--theme: var(--" + (opts.theme ||
        'blue') + "); --textColor: var(--" + (opts.textColor ||
        'white') + "); --cellHeight: " + (height + 'px') + "; --fontSize: " + fontSize + "\">\n\t<div class=\"calendar-header\">\n\t\t<div class=\"previous\" title=\"Previous\">&#x27A4;</div>\n\t\t<div class=\"next\" title=\"Next\">&#x27A4;</div>\n\t\t<div class=\"month-year\" title=\"Select Month\" data-date=\"" + new Date() + "\">" + monthYear + "</div>\n\t</div>\n\t<div class=\"calendar-days\">\n\t\t<span title=\"Sunday\">SUN</span>\n\t\t<span title=\"Monday\">MON</span>\n\t\t<span title=\"Tuesday\">TUE</span>\n\t\t<span title=\"Wednesday\">WED</span>\n\t\t<span title=\"Thursday\">THU</span>\n\t\t<span title=\"Friday\">FRI</span>\n\t\t<span title=\"Saturday\">SAT</span>\n\t</div>\n\t<div class=\"calendar-cells\"></div>\n</div>\n";
    exports.setCalendarDays(element, new Date());
    if (opts.data && opts.data.events) {
        exports.setCalendarEvents(new Date(), element, opts);
    }
    query_1.bindAll(element)('.previous, .next', function (elem) {
        elem.onclick = function (e) {
            var date = new Date(query_1.query(element)('.month-year').dataset.date);
            if (e.target.className === 'previous') {
                date.setMonth(date.getMonth() - 1);
            }
            else {
                date.setMonth(date.getMonth() + 1);
            }
            query_1.query(element)('.month-year').dataset.date = date;
            query_1.query(element)('.month-year').innerHTML = exports.shortDate(date);
            exports.setCalendarDays(element, date);
            exports.setCalendarEvents(date, element, opts);
        };
    });
    return true;
};
exports.setCalendarEvents = function (date, element, opts) {
    var height = opts.height ? opts.height / 6 : 100;
    var cls = '';
    if (height < 50) {
        cls = 'hidden';
    }
    if (opts.data.events) {
        opts.data.events.forEach(function (event) {
            if (event.dateEnd) {
                // range
                if (event.date.getFullYear() === date.getFullYear() &&
                    event.date.getMonth() === date.getMonth()) {
                    query_1.query(element)(".calendar-cells .cell[data-day=\"" + event.date.getDate() + "\"]").innerHTML += "<div class=\"event " + cls + "\"><span title=\"" + (event.description ||
                        event.label) + "\">" + event.label + "</span></div>";
                    if (cls) {
                        query_1.query(element)(".calendar-cells .cell[data-day=\"" + event.date.getDate() + "\"]").classList.add('special');
                        query_1.query(element)(".calendar-cells .cell[data-day=\"" + event.date.getDate() + "\"]").title += event.label + '. ';
                    }
                    var d = new Date(event.date);
                    while (true) {
                        d = new Date(d);
                        d.setDate(d.getDate() + 1);
                        if (d.getMonth() === date.getMonth() &&
                            d.getDate() <= event.dateEnd.getDate()) {
                            query_1.query(element)(".calendar-cells .cell[data-day=\"" + d.getDate() + "\"]").innerHTML += "<div class=\"event " + cls + "\"><span title=\"" + (event.description ||
                                event.label) + "\">" + event.label + "</span></div>";
                        }
                        else {
                            break;
                        }
                        if (cls) {
                            query_1.query(element)(".calendar-cells .cell[data-day=\"" + d.getDate() + "\"]").classList.add('special');
                            query_1.query(element)(".calendar-cells .cell[data-day=\"" + d.getDate() + "\"]").title += event.label + '. ';
                        }
                    }
                }
            }
            else {
                if (event.date.getFullYear() === date.getFullYear() &&
                    event.date.getMonth() === date.getMonth()) {
                    query_1.query(element)(".calendar-cells .cell[data-day=\"" + event.date.getDate() + "\"]").innerHTML += "<div class=\"event " + cls + "\"><span title=\"" + (event.description ||
                        event.label) + "\">" + event.label + "</span></div>";
                    if (cls) {
                        query_1.query(element)(".calendar-cells .cell[data-day=\"" + event.date.getDate() + "\"]").classList.add('special');
                        query_1.query(element)(".calendar-cells .cell[data-day=\"" + event.date.getDate() + "\"]").title += event.label + '. ';
                    }
                }
            }
        });
    }
};
exports.setCalendarDays = function (element, date) {
    query_1.query(element)('.calendar-cells').innerHTML = '';
    var startDay = new Date(date);
    var lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
    startDay.setDate(1);
    var blankCells = startDay.getDay();
    for (var i = 0; i < blankCells; i++) {
        query_1.query(element)('.calendar-cells').innerHTML +=
            '<div class="cell prevMonth"></div>';
    }
    for (var i = 1; i < lastDay + 1; i++) {
        query_1.query(element)('.calendar-cells').innerHTML += "<div class=\"cell\" data-day=\"" + i + "\"><span>" + i + "</span></div>";
    }
};
