import {
	IKeyValuePair,
	IMoxyUIOptions,
	MoxyUIColors,
	MoxyUIDefaultOptions,
} from '../lib/IMoxyUI'
import { normalizeData } from '../lib/MoxyUI.util'

export const pieCSSChart = (
	data: IKeyValuePair[],
	element: HTMLElement,
	opts?: IMoxyUIOptions,
): void => {
	if (!opts) {
		opts = MoxyUIDefaultOptions
	}
	throw new Error('Deprecated in favor of SVG')
	return // deprecated for now
	const normalized = normalizeData(data, -1)
	const inner = document.createElement('div')
	inner.className = 'chart-inner'
	inner.classList.add('pie-chart')

	if (opts?.title) {
		const h3 = document.createElement('h3')
		h3.innerHTML = opts.title
		inner.prepend(h3)
	}
	let backgroundImage: string = ''
	let legendHtml: string = ''
	normalized.forEach((ds: any, index: number) => {
		if (index === 0) {
			backgroundImage += `var(--${
				MoxyUIColors[index]
			}) calc(3.6deg * ${ds.value * 3.6}),\n`
		} else {
			backgroundImage += `var(--${
				MoxyUIColors[index]
			}) 0 calc(3.6deg * ${ds.value * 3.6}),\n`
		}
		legendHtml += `<label><span style="background-color: var(--${MoxyUIColors[index]})" class="key"></span> ${ds.label}</label>`
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
