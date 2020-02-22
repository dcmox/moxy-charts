"use strict";
exports.__esModule = true;
var IMoxyUI_1 = require("./IMoxyUI");
var accordian_1 = require("../components/accordian");
var barChart_1 = require("../components/barChart");
var calculator_1 = require("../components/calculator");
var calendar_1 = require("../components/calendar");
var dataTable_1 = require("../components/dataTable");
var dropdown_1 = require("../components/dropdown");
var imageGrid_1 = require("../components/imageGrid");
var lineChart_1 = require("../components/lineChart");
var loadingBar_1 = require("../components/loadingBar");
var loadingCircle_1 = require("../components/loadingCircle");
var pieChart_1 = require("../components/pieChart");
var pieChartCSS_1 = require("../components/pieChartCSS");
var progressScroll_1 = require("../components/progressScroll");
var radarChart_1 = require("../components/radarChart");
var rating_1 = require("../components/rating");
var subWay_1 = require("../components/subWay");
var table_1 = require("../components/table");
var treeMap_1 = require("../components/treeMap");
var treeView_1 = require("../components/treeView");
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
var MoxyUI = /** @class */ (function () {
    function MoxyUI(data, title, opts) {
        this._data = [];
        this._opts = IMoxyUI_1.MoxyUIDefaultOptions;
        this._data = data;
        if (opts) {
            this._opts = Object.assign(this._opts, opts);
            if (!this._opts.title && title) {
                this._opts.title = title;
            }
        }
    }
    MoxyUI.init = function (opts) {
        dropdown_1.dropdown(opts);
        table_1.table(opts);
        treeView_1.treeView(opts);
        accordian_1.accordian(opts);
        progressScroll_1.progressScroll(opts);
        rating_1.rating(opts);
        imageGrid_1.imageGrid(opts);
        subWay_1.subWay(opts);
    };
    MoxyUI.display = function (selector, elem, opts) {
        var element = document.querySelector(selector);
        if (!element) {
            return false;
        }
        if (elem === 'loadingCircle') {
            return loadingCircle_1.loadingCircle(element, opts);
        }
        else if (elem === 'calendar') {
            return calendar_1.calendar(element, opts);
        }
        else if (elem === 'loadingBar') {
            loadingBar_1.loadingBar(element, opts);
            return true;
        }
        else if (elem === 'calculator') {
            calculator_1.calculator(element, opts);
            return true;
        }
        return false;
    };
    MoxyUI.prototype.render = function (selector, style, opts, data) {
        if (style === void 0) { style = 'bar'; }
        var element = document.querySelector(selector);
        if (!element) {
            return;
        }
        if (!opts) {
            opts = this._opts;
        }
        var d = data ? data : this._data;
        if (style === 'bar' || style === 'bar-vert') {
            barChart_1.barChart(d, element, style, opts);
        }
        else if (style === 'pie-css') {
            pieChartCSS_1.pieCSSChart(d, element, opts);
        }
        else if (style === 'pie') {
            pieChart_1.pieChart(d, element, opts);
        }
        else if (style === 'dataTable') {
            dataTable_1.dataTable(d, element, opts);
        }
        else if (style === 'treemap') {
            treeMap_1.treeMap(d, element, opts);
        }
        else if (style === 'lineChart') {
            lineChart_1.lineChart(d, element, opts);
        }
        else if (style === 'radarChart') {
            radarChart_1.radarChart(d, element, opts);
        } // scatterChart
    };
    return MoxyUI;
}());
exports.MoxyUI = MoxyUI;
