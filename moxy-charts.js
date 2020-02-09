var MoxyChart = /** @class */ (function () {
    function MoxyChart(data, title) {
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
        this._title = '';
        this._data = data;
        if (title) {
            this._title = title;
        }
    }
    MoxyChart.prototype.render = function (selector, style) {
        if (style === void 0) { style = 'bar'; }
        var element = document.querySelector(selector);
        if (!element) {
            return;
        }
        if (style === 'bar' || style === 'bar-vert') {
            this.barChart(element, style);
        }
        else if (style === 'pie') {
            this.pieChart(element);
        }
        else if (style === 'table') {
            this.table(element);
        }
    };
    MoxyChart.prototype.table = function (element) {
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
    MoxyChart.prototype.barChart = function (element, style) {
        var _this = this;
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
    MoxyChart.prototype.pieChart = function (element) {
        var _this = this;
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
            console.log(backgroundImage);
        }
    };
    MoxyChart.prototype._normalizeData = function (maxValue) {
        var _this = this;
        if (maxValue === void 0) { maxValue = 80; }
        this._normalized = [];
        if (maxValue === -1) {
            var maxDataValue_1 = this._data.reduce(function (acc, current) { return acc + parseInt(current.value, 10); }, 0);
            this._data.forEach(function (ds) {
                _this._normalized.push({
                    label: ds.label,
                    value: Math.floor((ds.value / maxDataValue_1) * 100)
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
    return MoxyChart;
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
var chart = new MoxyChart(data, 'Weekly Downloads');
chart.render('#chart', 'pie');
chart.render('#chartTwo', 'bar');
chart.render('#chartThree', 'bar-vert');
chart.render('#chartFour', 'table');
