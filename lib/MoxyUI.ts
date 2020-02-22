import { IKeyValuePair, IMoxyUIOptions, MoxyUIDefaultOptions } from './IMoxyUI'

import { accordian } from '../components/accordian'
import { barChart } from '../components/barChart'
import { calculator } from '../components/calculator'
import { calendar } from '../components/calendar'
import { dataTable } from '../components/dataTable'
import { dropdown } from '../components/dropdown'
import { imageGrid } from '../components/imageGrid'
import { lineChart } from '../components/lineChart'
import { loadingBar } from '../components/loadingBar'
import { loadingCircle } from '../components/loadingCircle'
import { pieChart } from '../components/pieChart'
import { pieCSSChart } from '../components/pieChartCSS'
import { progressScroll } from '../components/progressScroll'
import { radarChart } from '../components/radarChart'
import { rating } from '../components/rating'
import { subWay } from '../components/subWay'
import { table } from '../components/table'
import { treeMap } from '../components/treeMap'
import { treeView } from '../components/treeView'

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

export class MoxyUI {
	public static init(opts: IMoxyUIOptions): void {
		dropdown(opts)
		table(opts)
		treeView(opts)
		accordian(opts)
		progressScroll(opts)
		rating(opts)
		imageGrid(opts)
		subWay(opts)
	}
	public static display(
		selector: string,
		elem: 'loadingCircle' | 'calendar' | 'loadingBar' | 'calculator',
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
		} // scatterChart
	}
}
