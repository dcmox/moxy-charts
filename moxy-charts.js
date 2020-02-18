"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
var IMoxyUI_1 = require("./lib/IMoxyUI");
var barChart_1 = require("./components/barChart");
var calculator_1 = require("./components/calculator");
var calendar_1 = require("./components/calendar");
var dataTable_1 = require("./components/dataTable");
var dropdown_1 = require("./components/dropdown");
var lineChart_1 = require("./components/lineChart");
var loadingBar_1 = require("./components/loadingBar");
var loadingCircle_1 = require("./components/loadingCircle");
var pieChart_1 = require("./components/pieChart");
var pieChartCSS_1 = require("./components/pieChartCSS");
var radarChart_1 = require("./components/radarChart");
var table_1 = require("./components/table");
var treeMap_1 = require("./components/treeMap");
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
        // bindAll('.moxy-dropdown')
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
chart.render('#chartFour', 'dataTable');
chart.render('#chartFive', 'treemap');
chart.render('#radarChart', 'radarChart', {
    fillColor: 'blue',
    borderColor: 'darkblue',
    textColor: 'white',
    title: 'Weekly Downloads',
    captions: {
        strength: 'Strength',
        agility: 'Agility',
        stamina: 'Stamina',
        intelligence: 'Intelligence',
        wisdom: 'Wisdom'
    }
}, [
    {
        strength: 0.7,
        agility: 1,
        stamina: 0.9,
        intelligence: 0.67,
        wisdom: 0.8
    },
    {
        strength: 0.6,
        agility: 0.9,
        stamina: 0.8,
        intelligence: 0.7,
        wisdom: 0.6
    },
]);
chart.render('#graph', 'lineChart', {
    backgroundColor: 'blue',
    fillColor: 'darkblue',
    textColor: 'white',
    title: 'Weekly Downloads'
});
function timeout(ms) {
    return new Promise(function (resolve) { return setTimeout(resolve, ms); });
}
function sleep(ms, fn) {
    var args = [];
    for (var _i = 2; _i < arguments.length; _i++) {
        args[_i - 2] = arguments[_i];
    }
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, timeout(ms)];
                case 1:
                    _a.sent();
                    return [2 /*return*/, fn.apply(void 0, args)];
            }
        });
    });
}
MoxyUI.display('#loadingBar', 'loadingBar', {
    color: 'blue',
    fn: function () { return __awaiter(void 0, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, sleep(15000, function () { return true; })];
                case 1:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    }); },
    maxTime: '10000'
});
MoxyUI.display('#calculator', 'calculator', {
    theme: 'blue'
});
MoxyUI.display('#calendar', 'calendar', {
    height: 200,
    width: 150,
    text: 'Loading...',
    theme: 'blue',
    textColor: 'white',
    data: {
        events: [
            // tslint:disable: quotemark
            {
                date: new Date('February 14, 2020'),
                label: "Daniel's Birthday",
                description: "It's party time!"
            },
            { date: new Date('February 14, 2020'), label: "Valentine's Day" },
            {
                date: new Date('February 17, 2020'),
                dateEnd: new Date('February 21, 2020'),
                label: 'Vacation'
            },
        ]
    }
});
MoxyUI.display('#demo', 'loadingCircle', {
    height: 150,
    width: 150,
    text: 'Loading...',
    textColor: 'blue'
});
MoxyUI.init({ backgroundColor: 'blue', theme: 'blue' });
