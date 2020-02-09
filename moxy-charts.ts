interface IKeyValuePair {
	[key: string]: any
}
class MoxyChart {
	private _data: IKeyValuePair[] = []
	private _normalized: IKeyValuePair = []
	private _colors: string[] = [
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
	]
	private _title: string = ''
	constructor(data: IKeyValuePair[], title?: string) {
		this._data = data
		if (title) {
			this._title = title
		}
	}
	public render(
		selector: string,
		style: 'bar' | 'bar-vert' | 'pie' | 'table' | 'donut' = 'bar',
	): void {
		const element: HTMLElement | null = document.querySelector(selector)
		if (!element) {
			return
		}
		if (style === 'bar' || style === 'bar-vert') {
			this.barChart(element, style)
		} else if (style === 'pie') {
			this.pieChart(element)
		} else if (style === 'table') {
			this.table(element)
		}
	}
	public table(element: HTMLElement): void {
		let html = ''
		if (this._title) {
			html += `<h3>${this._title}</h3>`
		}
		html += `<table class="moxy-table">`
		html += `<thead><tr>`
		this._data.forEach((row: any) => {
			html += `<th>${row.label}</th>`
		})
		html += `</thead></tr>`

		html += `<tbody><tr>`
		this._data.forEach((row: any) => {
			html += `<td>${row.value}</td>`
		})
		html += `</tr></tbody>`

		if (element) {
			element.innerHTML = html
		}
	}
	public barChart(element: HTMLElement, style: string): void {
		this._normalizeData()
		let html: string = '<div class="chart-inner bar-chart">'
		if (this._title) {
			html += `<h3>${this._title}</h3>`
		}
		if (style === 'bar') {
			this._normalized.forEach((ds: any, index: number) => {
				html += `<div class="chart-row" title="${
					this._data[index].value
				} - ${
					ds.label
				}"><div class="chart-bar" style="background-color: var(--${
					this._colors[index % 7]
				}); width: ${ds.value}%;"></div><span>${
					this._data[index].value
				} <label>${ds.label}</label></span></div>`
			})
		} else {
			let legendHtml = ''
			this._normalized.forEach((ds: any, index: number) => {
				html += `<div class="chart-column" title="${
					this._data[index].value
				} - ${
					ds.label
				}"><div class="chart-bar" style="background-color: var(--${
					this._colors[index % 7]
				}); height: ${ds.value}%;"></div></div>`
				legendHtml += `<span><label>${ds.label}</label>${this._data[index].value}</span>`
			})
			html += `<div class="legend">${legendHtml}</legend>`
		}

		html += '</div>'
		if (element) {
			element.innerHTML = html
		}
	}
	public pieChart(element: HTMLElement): void {
		this._normalizeData(-1)
		const inner = document.createElement('div')
		inner.className = 'chart-inner'
		inner.classList.add('pie-chart')

		if (this._title) {
			const h3 = document.createElement('h3')
			h3.innerHTML = this._title
			inner.prepend(h3)
		}
		let backgroundImage: string = ''
		let legendHtml: string = ''
		this._normalized.forEach((ds: any, index: number) => {
			if (index === 0) {
				backgroundImage += `var(--${
					this._colors[index]
				}) calc(3.6deg * ${ds.value * 3.6}),\n`
			} else {
				backgroundImage += `var(--${
					this._colors[index]
				}) 0 calc(3.6deg * ${ds.value * 3.6}),\n`
			}
			legendHtml += `<label><span style="background-color: var(--${this._colors[index]})" class="key"></span> ${ds.label}</label>`
		})
		backgroundImage += `#fff 0\n`

		const pieInner = document.createElement('div')
		pieInner.className = 'pie-inner'

		const pie = document.createElement('div')
		pie.className = 'pie'

		const legend = document.createElement('div')
		legend.className = 'legend'
		legend.innerHTML = legendHtml
		pieInner.prepend(pie)
		inner.append(pieInner)
		inner.append(legend)
		if (element) {
			element.prepend(inner)
			pie.style.backgroundImage = `conic-gradient(${backgroundImage})`
			console.log(backgroundImage)
		}
	}
	private _normalizeData(maxValue: number = 80): void {
		this._normalized = []
		if (maxValue === -1) {
			const maxDataValue = this._data.reduce(
				(acc: any, current: any) => acc + parseInt(current.value, 10),
				0,
			)
			this._data.forEach((ds: any) => {
				this._normalized.push({
					label: ds.label,
					value: Math.floor((ds.value / maxDataValue) * 100),
				})
			})
			return
		}
		const maxDataValue = this._data.reduce(
			(acc: any, current: any) =>
				parseInt(current.value, 10) < acc
					? acc
					: parseInt(current.value, 10),
			0,
		)
		const ratio = maxDataValue / maxValue
		this._data.forEach((ds: any) => {
			this._normalized.push({
				label: ds.label,
				value: Math.round(ds.value / ratio),
			})
		})
	}
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

let data = [
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
const chart = new MoxyChart(data, 'Weekly Downloads')
chart.render('#chart', 'pie')
chart.render('#chartTwo', 'bar')
chart.render('#chartThree', 'bar-vert')
chart.render('#chartFour', 'table')
