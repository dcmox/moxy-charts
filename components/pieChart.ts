import {
	IKeyValuePair,
	IMoxyUIOptions,
	MoxyUIColors,
	MoxyUIDefaultOptions,
} from '../lib/IMoxyUI'
import { normalizeData } from '../lib/MoxyUI.util'
import { elem, svge } from './svg'

export const pieChart = (
	data: IKeyValuePair[],
	element: HTMLElement,
	opts?: IMoxyUIOptions,
): void => {
	if (!opts) {
		opts = MoxyUIDefaultOptions
	}
	const normalized = normalizeData(data, -1)

	const width =
		opts.width - 120 ||
		parseInt(element.style.width.replace('px', ''), 10) - 120 ||
		280

	const inner = elem('div', {
		class: 'chart-inner pie-chart-svg',
		style: `--circle-width: ${width}`,
	})

	if (opts?.title) {
		const h3 = elem('h3', { innerHTML: opts.title })
		inner.prepend(h3)
	}
	let legendHtml: string = ''
	const pieHtml: string = ''

	const area = 2 * Math.PI * (width / 4)

	const pieInner = elem('div', { class: 'pie-inner' })

	let pieDeg: number = -90
	normalized.forEach((ds: any, index: number) => {
		const pie = svge('svg', {
			width,
			height: width,
			title: `${normalized[index].value} - ${ds.label}`,
			style: `transform: rotate(${pieDeg}deg)`,
		})

		const circle = svge('circle', {
			cx: width / 2,
			cy: width / 2,
			r: width / 4,
			stroke: `var(--${MoxyUIColors[index]})`,
			'stroke-dasharray': `calc(${Math.ceil((ds.value / 100) * area)})
            ${area}`,
		})

		pie.append(circle)
		pieInner.append(pie)
		pieDeg += Math.floor(ds.value * 3.65)
		if (index === normalized.length - 1 && pieDeg < 360) {
			pieDeg = 360
		}

		legendHtml += `<label><span style="background-color: var(--${MoxyUIColors[index]})" class="key"></span> ${ds.label}</label>`
	})

	const legend = elem('div', { class: 'legend' }, { innerHTML: legendHtml })

	inner.append(pieInner)
	inner.append(legend)
	if (element) {
		element.prepend(inner)
	}
}
