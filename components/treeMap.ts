import { IKeyValuePair, IMoxyUIOptions, MoxyUIColors } from '../lib/IMoxyUI'
import { normalizeData } from '../lib/MoxyUI.util'

export const treeMap = (
	data: IKeyValuePair[],
	element: HTMLElement,
	opts?: IMoxyUIOptions,
): void => {
	const normalized = normalizeData(data, -1)
	const inner = document.createElement('div')
	inner.className = 'chart-inner'
	inner.classList.add('chart-treemap')
	let html: string = ''
	let main: string = 'width'
	let alt: string = 'height'
	normalized.sort((a: any, b: any) => (a.value > b.value ? -1 : 1))
	let wr: number = 100
	let hr: number = 100
	let rv: number = -1
	normalized.forEach((ds: any, index: number) => {
		const carry = index % 1 === 0 ? wr : hr
		if (rv === -1) {
			rv = ds.value
		} else {
			rv = Math.ceil(ds.value * (100 / carry))
		}
		const remainder = main === 'height' ? wr : hr
		if (index === normalized.length - 1) {
			rv = wr
		}
		html += `<div style="float: left;${main}: ${rv}%; ${alt}: ${remainder}%; background-color: var(--${
			MoxyUIColors[normalized.length - 1 - index]
		})"><span>${ds.label} (${normalized[index].value})</span></div>`

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
