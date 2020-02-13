import {
	IKeyValuePair,
	IMoxyUIOptions,
	MoxyUIColors,
	MoxyUIDefaultOptions,
} from '../lib/IMoxyUI'
import { normalizeData } from '../lib/MoxyUI.util'

export const pieChart = (
	data: IKeyValuePair[],
	element: HTMLElement,
	opts?: IMoxyUIOptions,
): void => {
	if (!opts) {
		opts = MoxyUIDefaultOptions
	}
	const normalized = normalizeData(data, -1)
	const inner = document.createElement('div')
	inner.className = 'chart-inner'
	inner.classList.add('pie-chart-svg')

	if (opts?.title) {
		const h3 = document.createElement('h3')
		h3.innerHTML = opts.title
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
	normalized.forEach((ds: any, index: number) => {
		pieHtml = `<circle stroke="var(--${
			MoxyUIColors[index]
		})" stroke-dasharray="calc(${Math.ceil((ds.value / 100) * area)})
        ${area}" r="${width / 4}" cx="${width / 2}" cy="${width / 2}" />`

		const pie = document.createElementNS(
			'http://www.w3.org/2000/svg',
			'svg',
		)
		pie.style.transform = `rotate(${pieDeg}deg)`
		pie.setAttribute('width', `${width}`)
		pie.setAttribute('height', `${width}`)
		pie.setAttribute('title', `${normalized[index].value} - ${ds.label}`)
		pie.innerHTML = `${pieHtml}`
		pieInner.append(pie)
		pieDeg += Math.floor(ds.value * 3.65)
		if (index === normalized.length - 1 && pieDeg < 360) {
			pieDeg = 360
		}

		legendHtml += `<label><span style="background-color: var(--${MoxyUIColors[index]})" class="key"></span> ${ds.label}</label>`
	})

	const legend = document.createElement('div')
	legend.className = 'legend'
	legend.innerHTML = legendHtml

	inner.append(pieInner)
	inner.append(legend)
	if (element) {
		element.prepend(inner)
	}
}
