import {
	IKeyValuePair,
	IMoxyUIOptions,
	MoxyUIDefaultOptions,
} from './lib/IMoxyUI'

import { barChart } from './components/barChart'
import { calculator } from './components/calculator'
import { calendar } from './components/calendar'
import { dataTable } from './components/dataTable'
import { dropdown } from './components/dropdown'
import { lineChart } from './components/lineChart'
import { loadingBar } from './components/loadingBar'
import { loadingCircle } from './components/loadingCircle'
import { pieChart } from './components/pieChart'
import { pieCSSChart } from './components/pieChartCSS'
import { radarChart } from './components/radarChart'
import { table } from './components/table'
import { treeMap } from './components/treeMap'
class MoxyUI {
	public static init(opts: IMoxyUIOptions): void {
		dropdown(opts)
		table(opts)
		// bindAll('.moxy-dropdown')
	}
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
		} else if (elem === 'calculator') {
			calculator(element, opts)
			return true
		}
		return false
	}

	private _data: IKeyValuePair[] = []
	private _opts: IMoxyUIOptions = MoxyUIDefaultOptions
	constructor(data: IKeyValuePair[], title?: string, opts?: IMoxyUIOptions) {
		this._data = data
		if (opts) {
			this._opts = Object.assign(this._opts, opts)
			if (!this._opts.title && title) {
				this._opts.title = title
			}
		}
	}
	public render(
		selector: string,
		style:
			| 'bar'
			| 'bar-vert'
			| 'pie'
			| 'pie-css'
			| 'dataTable'
			| 'donut'
			| 'calendar'
			| 'lineChart'
			| 'radarChart'
			| 'treemap' = 'bar',
		opts?: IMoxyUIOptions,
		data?: IKeyValuePair[],
	): void {
		const element: HTMLElement | null = document.querySelector(selector)
		if (!element) {
			return
		}
		if (!opts) {
			opts = this._opts
		}
		const d = data ? data : this._data
		if (style === 'bar' || style === 'bar-vert') {
			barChart(d, element, style, opts)
		} else if (style === 'pie-css') {
			pieCSSChart(d, element, opts)
		} else if (style === 'pie') {
			pieChart(d, element, opts)
		} else if (style === 'dataTable') {
			dataTable(d, element, opts)
		} else if (style === 'treemap') {
			treeMap(d, element, opts)
		} else if (style === 'lineChart') {
			lineChart(d, element, opts)
		} else if (style === 'radarChart') {
			radarChart(d, element, opts)
		}
	}

	public scatterChart(): void {
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
chart.render('#chartFour', 'dataTable')
chart.render('#chartFive', 'treemap')

chart.render(
	'#radarChart',
	'radarChart',
	{
		fillColor: 'blue',
		borderColor: 'darkblue',
		textColor: 'white',
		title: 'Weekly Downloads',
		captions: {
			strength: 'Strength',
			agility: 'Agility',
			stamina: 'Stamina',
			intelligence: 'Intelligence',
			wisdom: 'Wisdom',
		},
	},
	[
		{
			strength: 0.7,
			agility: 1,
			stamina: 0.9,
			intelligence: 0.67,
			wisdom: 0.8,
		},
		{
			strength: 0.6,
			agility: 0.9,
			stamina: 0.8,
			intelligence: 0.7,
			wisdom: 0.6,
		},
	],
)

chart.render('#graph', 'lineChart', {
	backgroundColor: 'blue',
	fillColor: 'darkblue',
	textColor: 'white',
	title: 'Weekly Downloads',
})

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

MoxyUI.display('#calculator', 'calculator', {
	theme: 'blue',
})

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
				description: "It's party time!",
			},
			{ date: new Date('February 14, 2020'), label: "Valentine's Day" },
			{
				date: new Date('February 17, 2020'),
				dateEnd: new Date('February 21, 2020'),
				label: 'Vacation',
			},
		],
	},
})

MoxyUI.display('#demo', 'loadingCircle', {
	height: 150,
	width: 150,
	text: 'Loading...',
	textColor: 'blue',
})

MoxyUI.init({ backgroundColor: 'blue', theme: 'blue' })
