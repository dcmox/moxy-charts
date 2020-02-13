import {
	IKeyValuePair,
	IMoxyUIOptions,
	MoxyUIColors,
	MoxyUIDefaultOptions,
} from './lib/IMoxyUI'

import { barChart } from './components/barChart'
import { calendar } from './components/calendar'
import { loadingBar } from './components/loadingBar'
import { loadingCircle } from './components/loadingCircle'
import { pieChart } from './components/pieChart'
import { pieCSSChart } from './components/pieChartCSS'
import { table } from './components/table'
import { treeMap } from './components/treeMap'

class MoxyUI {
	public static display(
		selector: string,
		elem: 'loadingCircle' | 'calendar' | 'loadingBar',
		opts: IMoxyUIOptions,
	): boolean {
		const element: HTMLElement | null = document.querySelector(selector)
		if (!element) {
			return false
		}
		if (elem === 'loadingCircle') {
			return loadingCircle(element, opts)
		} else if (elem === 'calendar') {
			return calendar(element, opts)
		} else if (elem === 'loadingBar') {
			loadingBar(element, opts)
			return true
		}
		return false
	}

	private _data: IKeyValuePair[] = []
	private _normalized: IKeyValuePair = []

	private _opts: IMoxyUIOptions = MoxyUIDefaultOptions
	private _title: string = ''
	constructor(data: IKeyValuePair[], title?: string, opts?: IMoxyUIOptions) {
		this._data = data
		if (title) {
			this._title = title
		}
		if (opts) {
			this._opts = Object.assign(this._opts, opts)
		}
	}
	public render(
		selector: string,
		style:
			| 'bar'
			| 'bar-vert'
			| 'pie'
			| 'pie-css'
			| 'table'
			| 'donut'
			| 'calendar'
			| 'treemap' = 'bar',
		opts?: IMoxyUIOptions,
	): void {
		const element: HTMLElement | null = document.querySelector(selector)
		if (!element) {
			return
		}
		if (!opts) {
			opts = this._opts
		}
		if (style === 'bar' || style === 'bar-vert') {
			barChart(this._data, element, style, opts)
		} else if (style === 'pie-css') {
			pieCSSChart(this._data, element, opts)
		} else if (style === 'pie') {
			pieChart(this._data, element, opts)
		} else if (style === 'table') {
			table(this._data, element, opts)
		} else if (style === 'treemap') {
			treeMap(this._data, element, opts)
		}
	}

	public scatterChart(): void {
		//
	}
	// Make configurable axis for labels
	public lineChart(): void {
		//
	}
	public calendar(): void {
		// calendar widget
	}
	public datePicker(): void {
		// datePicker
	}
	// Calculator tool
}

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

const data = [
	{
		label: 'Monday',
		value: '25',
	},
	{
		label: 'Tuesday',
		value: '45',
	},
	{
		label: 'Wednesday',
		value: '60',
	},
	{
		label: 'Thursday',
		value: '80',
	},
	{
		label: 'Friday',
		value: '90',
	},
]

// add {width: 300, height: 300} option
const chart = new MoxyUI(data, 'Weekly Downloads')
chart.render('#chart', 'pie')
chart.render('#chartTwo', 'bar')
chart.render('#chartThree', 'bar-vert')
chart.render('#chartFour', 'table')
chart.render('#chartFive', 'treemap')

function timeout(ms: number): any {
	return new Promise((resolve: any) => setTimeout(resolve, ms))
}

async function sleep(
	ms: number,
	fn: (...args: any) => any,
	...args: any
): Promise<any> {
	await timeout(ms)
	return fn(...args)
}

MoxyUI.display('#loadingBar', 'loadingBar', {
	color: 'blue',
	fn: async () => {
		await sleep(15000, () => true)
	},
	maxTime: '10000', // ms
})

MoxyUI.display('#calendar', 'calendar', {
	height: 150,
	width: 150,
	text: 'Loading...',
	textColor: 'blue',
})

MoxyUI.display('#demo', 'loadingCircle', {
	height: 150,
	width: 150,
	text: 'Loading...',
	textColor: 'blue',
})
