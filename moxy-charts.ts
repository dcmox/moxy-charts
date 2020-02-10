interface IKeyValuePair {
	[key: string]: any
}

interface IMoxyUIOptions {
	width: number
	height?: number
	color?: string
	animation?: string // forwards || infinite alternate
	text?: string
	textColor?: TMoxyColor
}

type TMoxyColor =
	| 'green'
	| 'blue'
	| 'yellow'
	| 'purple'
	| 'red'
	| 'teal'
	| 'lime'
	| 'banana'
	| 'skyblue'
	| 'tangerine'

class MoxyUI {
	public static display(
		selector: string,
		elem: 'loadingCircle' | 'calendar',
		opts: IMoxyUIOptions,
	): boolean {
		const element: HTMLElement | null = document.querySelector(selector)
		if (!element) {
			return false
		}
		if (elem === 'loadingCircle') {
			return MoxyUI.loadingCircle(element, opts)
		} else if (elem === 'calendar') {
			return MoxyUI.calendar(element, opts)
		}
		return false
	}
	public static calendar(
		element: HTMLElement,
		opts: IMoxyUIOptions,
	): boolean {
		if (!opts.height) {
			opts.height = opts.width
		}
		const div = document.createElement('div')
		div.className = 'inner-calendar'
		return true
	}
	public static loadingCircle(
		element: HTMLElement,
		opts: IMoxyUIOptions,
	): boolean {
		if (!opts.height) {
			opts.height = opts.width
		}
		const svg = document.createElementNS(
			'http://www.w3.org/2000/svg',
			'svg',
		)
		element.style.setProperty(
			'--circle-radius',
			(opts.width + 290).toString(),
		)
		element.style.setProperty(
			'--circle-animation',
			opts.animation || 'infinite alternate',
		)

		// infinite alternate
		svg.classList.add('progress_circle')
		svg.setAttribute('width', opts.width.toString())
		svg.setAttribute('height', opts.height.toString())
		svg.setAttribute('viewBox', `0 0 ${opts.width} ${opts.height}`)

		svg.innerHTML =
			`<circle cx="${(opts.width / 2).toString()}" cy="${(
				opts.height / 2
			).toString()}" r="${(
				opts.height / 2 -
				6
			).toString()}" fill="none" stroke="var(--light-grey)" stroke-width="12"></circle>` +
			`<circle class="progress_circle__value" cx="${(
				opts.width / 2
			).toString()}" cy="${(opts.height / 2).toString()}" r="${(
				opts.height / 2 -
				6
			).toString()}" fill="none" stroke="${opts.color ||
				'var(--green)'}" stroke-width="12"></circle>`
		if (opts.text) {
			svg.innerHTML += `<text class="progress_circle__complete" x="${(opts.width /
				2 +
				8) /
				2}" y="-${opts.height / 2 -
				6}" font-weight="bold" fill="var(--${opts.textColor ||
				'green'})" transform="rotate(90)">${opts.text}</text>`
		}
		element.append(svg)
		return true
	}
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
	private _opts: IMoxyUIOptions = {
		color: 'green',
		height: 300,
		width: 300,
	}
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
			this.barChart(element, style, opts)
		} else if (style === 'pie-css') {
			this.pieCSSChart(element, opts)
		} else if (style === 'pie') {
			this.pieChart(element, opts)
		} else if (style === 'table') {
			this.table(element, opts)
		} else if (style === 'treemap') {
			this.treeMap(element, opts)
		}
	}

	public table(element: HTMLElement, opts?: IMoxyUIOptions): void {
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
	public scatterChart(): void {
		//
	}
	public calendar(): void {
		// calendar widget
	}
	public datePicker(): void {
		// datePicker
	}
	public treeMap(element: HTMLElement, opts?: IMoxyUIOptions): void {
		this._normalizeData(-1)
		const inner = document.createElement('div')
		inner.className = 'chart-inner'
		inner.classList.add('chart-treemap')
		let html: string = ''
		let main: string = 'width'
		let alt: string = 'height'
		this._normalized.sort((a: any, b: any) => (a.value > b.value ? -1 : 1))
		let wr: number = 100
		let hr: number = 100
		let rv: number = -1
		this._normalized.forEach((ds: any, index: number) => {
			const carry = index % 1 === 0 ? wr : hr
			if (rv === -1) {
				rv = ds.value
			} else {
				rv = Math.ceil(ds.value * (100 / carry))
			}
			const remainder = main === 'height' ? wr : hr
			if (index === this._normalized.length - 1) {
				rv = wr
			}
			html += `<div style="float: left;${main}: ${rv}%; ${alt}: ${remainder}%; background-color: var(--${
				this._colors[this._normalized.length - 1 - index]
			})"><span>${ds.label} (${
				this._normalized[index].value
			})</span></div>`

			wr = main === 'width' ? wr - rv : wr
			hr = main === 'height' ? hr - rv : hr

			if (index % 1 === 0) {
				main = main === 'width' ? 'height' : 'width'
				alt = alt === 'height' ? 'width' : 'height'
			}
		})
		html += '</div>'
		inner.innerHTML = html
		element.append(inner)
	}
	public barChart(
		element: HTMLElement,
		style: string,
		opts?: IMoxyUIOptions,
	): void {
		if (!opts) {
			opts = this._opts
		}
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
	public pieChart(element: HTMLElement, opts?: IMoxyUIOptions): void {
		if (!opts) {
			opts = this._opts
		}
		this._normalizeData(-1)
		const inner = document.createElement('div')
		inner.className = 'chart-inner'
		inner.classList.add('pie-chart-svg')

		if (this._title) {
			const h3 = document.createElement('h3')
			h3.innerHTML = this._title
			inner.prepend(h3)
		}
		let legendHtml: string = ''
		let pieHtml: string = ''
		const width =
			opts.width - 120 ||
			parseInt(element.style.width.replace('px', ''), 10) - 120 ||
			280
		inner.style.setProperty('--circle-width', width.toString())
		const area = 2 * Math.PI * (width / 4)

		const pieInner = document.createElement('div')
		pieInner.className = 'pie-inner'

		let pieDeg: number = -90
		this._normalized.forEach((ds: any, index: number) => {
			pieHtml = `<circle stroke="var(--${
				this._colors[index]
			})" stroke-dasharray="calc(${Math.ceil((ds.value / 100) * area)})
            ${area}" r="${width / 4}" cx="${width / 2}" cy="${width / 2}" />`

			const pie = document.createElementNS(
				'http://www.w3.org/2000/svg',
				'svg',
			)
			pie.style.transform = `rotate(${pieDeg}deg)`
			pie.setAttribute('width', `${width}`)
			pie.setAttribute('height', `${width}`)
			pie.setAttribute(
				'title',
				`${this._normalized[index].value} - ${ds.label}`,
			)
			pie.innerHTML = `${pieHtml}`
			pieInner.append(pie)
			pieDeg += Math.floor(ds.value * 3.65)
			if (index === this._normalized.length - 1 && pieDeg < 360) {
				pieDeg = 360
				console.log('moo')
			}

			legendHtml += `<label><span style="background-color: var(--${this._colors[index]})" class="key"></span> ${ds.label}</label>`
		})

		const legend = document.createElement('div')
		legend.className = 'legend'
		legend.innerHTML = legendHtml

		inner.append(pieInner)
		inner.append(legend)
		if (element) {
			console.log('PIEEEE')
			element.prepend(inner)
		}
	}
	public pieCSSChart(element: HTMLElement, opts?: IMoxyUIOptions): void {
		if (!opts) {
			opts = this._opts
		}
		return // deprecated for now at least
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
					value: Math.round((ds.value / maxDataValue) * 100),
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
const chart = new MoxyUI(data, 'Weekly Downloads')
chart.render('#chart', 'pie')
chart.render('#chartTwo', 'bar')
chart.render('#chartThree', 'bar-vert')
chart.render('#chartFour', 'table')
chart.render('#chartFive', 'treemap')

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
