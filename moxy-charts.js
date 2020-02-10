var MoxyUI = /** @class */ (function () {
    function MoxyUI(data, title, opts) {
        this._data = [];
        this._normalized = [];
        this._colors = [
            'green',
            'blue',
            'yellow',
            'purple',
            'red',
            'teal',
            'lime',
            'banana',
            'skyblue',
            'tangerine',
        ];
        this._opts = {
            color: 'green',
            height: 300,
            width: 300
        };
        this._title = '';
        this._data = data;
        if (title) {
            this._title = title;
        }
        if (opts) {
            this._opts = Object.assign(this._opts, opts);
        }
    }
    MoxyUI.display = function (selector, elem, opts) {
        var element = document.querySelector(selector);
        if (!element) {
            return false;
        }
        if (elem === 'loadingCircle') {
            return MoxyUI.loadingCircle(element, opts);
        }
        else if (elem === 'calendar') {
            return MoxyUI.calendar(element, opts);
        }
        return false;
    };
    MoxyUI.calendar = function (element, opts) {
        if (!opts.height) {
            opts.height = opts.width;
        }
        var div = document.createElement('div');
        div.className = 'inner-calendar';
        return true;
    };
    MoxyUI.loadingCircle = function (element, opts) {
        if (!opts.height) {
            opts.height = opts.width;
        }
        var svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
        element.style.setProperty('--circle-radius', (opts.width + 290).toString());
        element.style.setProperty('--circle-animation', opts.animation || 'infinite alternate');
        // infinite alternate
        svg.classList.add('progress_circle');
        svg.setAttribute('width', opts.width.toString());
        svg.setAttribute('height', opts.height.toString());
        svg.setAttribute('viewBox', "0 0 " + opts.width + " " + opts.height);
        svg.innerHTML =
            "<circle cx=\"" + (opts.width / 2).toString() + "\" cy=\"" + (opts.height / 2).toString() + "\" r=\"" + (opts.height / 2 -
                6).toString() + "\" fill=\"none\" stroke=\"var(--light-grey)\" stroke-width=\"12\"></circle>" +
                ("<circle class=\"progress_circle__value\" cx=\"" + (opts.width / 2).toString() + "\" cy=\"" + (opts.height / 2).toString() + "\" r=\"" + (opts.height / 2 -
                    6).toString() + "\" fill=\"none\" stroke=\"" + (opts.color ||
                    'var(--green)') + "\" stroke-width=\"12\"></circle>");
        if (opts.text) {
            svg.innerHTML += "<text class=\"progress_circle__complete\" x=\"" + (opts.width /
                2 +
                8) /
                2 + "\" y=\"-" + (opts.height / 2 -
                6) + "\" font-weight=\"bold\" fill=\"var(--" + (opts.textColor ||
                'green') + ")\" transform=\"rotate(90)\">" + opts.text + "</text>";
        }
        element.append(svg);
        return true;
    };
    MoxyUI.prototype.render = function (selector, style, opts) {
        if (style === void 0) { style = 'bar'; }
        var element = document.querySelector(selector);
        if (!element) {
            return;
        }
        if (!opts) {
            opts = this._opts;
        }
        if (style === 'bar' || style === 'bar-vert') {
            this.barChart(element, style, opts);
        }
        else if (style === 'pie-css') {
            this.pieCSSChart(element, opts);
        }
        else if (style === 'pie') {
            this.pieChart(element, opts);
        }
        else if (style === 'table') {
            this.table(element, opts);
        }
        else if (style === 'treemap') {
            this.treeMap(element, opts);
        }
    };
    MoxyUI.prototype.table = function (element, opts) {
        var html = '';
        if (this._title) {
            html += "<h3>" + this._title + "</h3>";
        }
        html += "<table class=\"moxy-table\">";
        html += "<thead><tr>";
        this._data.forEach(function (row) {
            html += "<th>" + row.label + "</th>";
        });
        html += "</thead></tr>";
        html += "<tbody><tr>";
        this._data.forEach(function (row) {
            html += "<td>" + row.value + "</td>";
        });
        html += "</tr></tbody>";
        if (element) {
            element.innerHTML = html;
        }
    };
    MoxyUI.prototype.scatterChart = function () {
        //
    };
    MoxyUI.prototype.calendar = function () {
        // calendar widget
    };
    MoxyUI.prototype.datePicker = function () {
        // datePicker
    };
    MoxyUI.prototype.treeMap = function (element, opts) {
        var _this = this;
        this._normalizeData(-1);
        var inner = document.createElement('div');
        inner.className = 'chart-inner';
        inner.classList.add('chart-treemap');
        var html = '';
        var main = 'width';
        var alt = 'height';
        this._normalized.sort(function (a, b) { return (a.value > b.value ? -1 : 1); });
        var wr = 100;
        var hr = 100;
        var rv = -1;
        this._normalized.forEach(function (ds, index) {
            var carry = index % 1 === 0 ? wr : hr;
            if (rv === -1) {
                rv = ds.value;
            }
            else {
                rv = Math.ceil(ds.value * (100 / carry));
            }
            var remainder = main === 'height' ? wr : hr;
            if (index === _this._normalized.length - 1) {
                rv = wr;
            }
            html += "<div style=\"float: left;" + main + ": " + rv + "%; " + alt + ": " + remainder + "%; background-color: var(--" + _this._colors[_this._normalized.length - 1 - index] + ")\"><span>" + ds.label + " (" + _this._normalized[index].value + ")</span></div>";
            wr = main === 'width' ? wr - rv : wr;
            hr = main === 'height' ? hr - rv : hr;
            if (index % 1 === 0) {
                main = main === 'width' ? 'height' : 'width';
                alt = alt === 'height' ? 'width' : 'height';
            }
        });
        html += '</div>';
        inner.innerHTML = html;
        element.append(inner);
    };
    MoxyUI.prototype.barChart = function (element, style, opts) {
        var _this = this;
        if (!opts) {
            opts = this._opts;
        }
        this._normalizeData();
        var html = '<div class="chart-inner bar-chart">';
        if (this._title) {
            html += "<h3>" + this._title + "</h3>";
        }
        if (style === 'bar') {
            this._normalized.forEach(function (ds, index) {
                html += "<div class=\"chart-row\" title=\"" + _this._data[index].value + " - " + ds.label + "\"><div class=\"chart-bar\" style=\"background-color: var(--" + _this._colors[index % 7] + "); width: " + ds.value + "%;\"></div><span>" + _this._data[index].value + " <label>" + ds.label + "</label></span></div>";
            });
        }
        else {
            var legendHtml_1 = '';
            this._normalized.forEach(function (ds, index) {
                html += "<div class=\"chart-column\" title=\"" + _this._data[index].value + " - " + ds.label + "\"><div class=\"chart-bar\" style=\"background-color: var(--" + _this._colors[index % 7] + "); height: " + ds.value + "%;\"></div></div>";
                legendHtml_1 += "<span><label>" + ds.label + "</label>" + _this._data[index].value + "</span>";
            });
            html += "<div class=\"legend\">" + legendHtml_1 + "</legend>";
        }
        html += '</div>';
        if (element) {
            element.innerHTML = html;
        }
    };
    MoxyUI.prototype.pieChart = function (element, opts) {
        var _this = this;
        if (!opts) {
            opts = this._opts;
        }
        this._normalizeData(-1);
        var inner = document.createElement('div');
        inner.className = 'chart-inner';
        inner.classList.add('pie-chart-svg');
        if (this._title) {
            var h3 = document.createElement('h3');
            h3.innerHTML = this._title;
            inner.prepend(h3);
        }
        var legendHtml = '';
        var pieHtml = '';
        var width = opts.width - 120 ||
            parseInt(element.style.width.replace('px', ''), 10) - 120 ||
            280;
        inner.style.setProperty('--circle-width', width.toString());
        var area = 2 * Math.PI * (width / 4);
        var pieInner = document.createElement('div');
        pieInner.className = 'pie-inner';
        var pieDeg = -90;
        this._normalized.forEach(function (ds, index) {
            pieHtml = "<circle stroke=\"var(--" + _this._colors[index] + ")\" stroke-dasharray=\"calc(" + Math.ceil((ds.value / 100) * area) + ")\n            " + area + "\" r=\"" + width / 4 + "\" cx=\"" + width / 2 + "\" cy=\"" + width / 2 + "\" />";
            var pie = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
            pie.style.transform = "rotate(" + pieDeg + "deg)";
            pie.setAttribute('width', "" + width);
            pie.setAttribute('height', "" + width);
            pie.setAttribute('title', _this._normalized[index].value + " - " + ds.label);
            pie.innerHTML = "" + pieHtml;
            pieInner.append(pie);
            pieDeg += Math.floor(ds.value * 3.65);
            if (index === _this._normalized.length - 1 && pieDeg < 360) {
                pieDeg = 360;
                console.log('moo');
            }
            legendHtml += "<label><span style=\"background-color: var(--" + _this._colors[index] + ")\" class=\"key\"></span> " + ds.label + "</label>";
        });
        var legend = document.createElement('div');
        legend.className = 'legend';
        legend.innerHTML = legendHtml;
        inner.append(pieInner);
        inner.append(legend);
        if (element) {
            console.log('PIEEEE');
            element.prepend(inner);
        }
    };
    MoxyUI.prototype.pieCSSChart = function (element, opts) {
        var _this = this;
        if (!opts) {
            opts = this._opts;
        }
        return; // deprecated for now at least
        this._normalizeData(-1);
        var inner = document.createElement('div');
        inner.className = 'chart-inner';
        inner.classList.add('pie-chart');
        if (this._title) {
            var h3 = document.createElement('h3');
            h3.innerHTML = this._title;
            inner.prepend(h3);
        }
        var backgroundImage = '';
        var legendHtml = '';
        this._normalized.forEach(function (ds, index) {
            if (index === 0) {
                backgroundImage += "var(--" + _this._colors[index] + ") calc(3.6deg * " + ds.value * 3.6 + "),\n";
            }
            else {
                backgroundImage += "var(--" + _this._colors[index] + ") 0 calc(3.6deg * " + ds.value * 3.6 + "),\n";
            }
            legendHtml += "<label><span style=\"background-color: var(--" + _this._colors[index] + ")\" class=\"key\"></span> " + ds.label + "</label>";
        });
        backgroundImage += "#fff 0\n";
        var pieInner = document.createElement('div');
        pieInner.className = 'pie-inner';
        var pie = document.createElement('div');
        pie.className = 'pie';
        var legend = document.createElement('div');
        legend.className = 'legend';
        legend.innerHTML = legendHtml;
        pieInner.prepend(pie);
        inner.append(pieInner);
        inner.append(legend);
        if (element) {
            element.prepend(inner);
            pie.style.backgroundImage = "conic-gradient(" + backgroundImage + ")";
        }
    };
    MoxyUI.prototype._normalizeData = function (maxValue) {
        var _this = this;
        if (maxValue === void 0) { maxValue = 80; }
        this._normalized = [];
        if (maxValue === -1) {
            var maxDataValue_1 = this._data.reduce(function (acc, current) { return acc + parseInt(current.value, 10); }, 0);
            this._data.forEach(function (ds) {
                _this._normalized.push({
                    label: ds.label,
                    value: Math.round((ds.value / maxDataValue_1) * 100)
                });
            });
            return;
        }
        var maxDataValue = this._data.reduce(function (acc, current) {
            return parseInt(current.value, 10) < acc
                ? acc
                : parseInt(current.value, 10);
        }, 0);
        var ratio = maxDataValue / maxValue;
        this._data.forEach(function (ds) {
            _this._normalized.push({
                label: ds.label,
                value: Math.round(ds.value / ratio)
            });
        });
    };
    return MoxyUI;
}());
/* Should have labelColumn, labelRow, valueColumn, valueRow */
/*
let data = [
    {
        xLabel: 'Monday',
        xValue: 25,
        yLabel: 'Day',
        yValue: '1',
    },
    {
        xLabel: 'Tuesday',
        xValue: 45,
        yLabel: 'Day',
        yValue: '1',
    },
]
*/
var data = [
    {
        label: 'Monday',
        value: '25'
    },
    {
        label: 'Tuesday',
        value: '45'
    },
    {
        label: 'Wednesday',
        value: '60'
    },
    {
        label: 'Thursday',
        value: '80'
    },
    {
        label: 'Friday',
        value: '90'
    },
];
// add {width: 300, height: 300} option
var chart = new MoxyUI(data, 'Weekly Downloads');
chart.render('#chart', 'pie');
chart.render('#chartTwo', 'bar');
chart.render('#chartThree', 'bar-vert');
chart.render('#chartFour', 'table');
chart.render('#chartFive', 'treemap');
MoxyUI.display('#calendar', 'calendar', {
    height: 150,
    width: 150,
    text: 'Loading...',
    textColor: 'blue'
});
MoxyUI.display('#demo', 'loadingCircle', {
    height: 150,
    width: 150,
    text: 'Loading...',
    textColor: 'blue'
});
