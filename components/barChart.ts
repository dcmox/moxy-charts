import {
	IKeyValuePair,
	IMoxyUIOptions,
	MoxyUIColors,
	MoxyUIDefaultOptions,
} from '../lib/IMoxyUI'
import { normalizeData } from '../lib/MoxyUI.util'

export const barChart = (
	data: IKeyValuePair[],
	element: HTMLElement,
	style: string,
	opts?: IMoxyUIOptions,
): void => {
	if (!opts) {
		opts = MoxyUIDefaultOptions
	}
	const normalized = normalizeData(data)
	let html: string = '<div class="chart-inner bar-chart">'
	if (opts?.title) {
		html += `<h3>${opts.title}</h3>`
	}
	if (style === 'bar') {
		normalized.forEach((ds: any, index: number) => {
			html += `<div class="chart-row" title="${data[index].value} - ${
				ds.label
			}"><div class="chart-bar" style="background-color: var(--${
				MoxyUIColors[index % 7]
			}); width: ${ds.value}%;"></div><span>${data[index].value} <label>${
				ds.label
			}</label></span></div>`
		})
	} else {
		let legendHtml = ''
		normalized.forEach((ds: any, index: number) => {
			html += `<div class="chart-column" title="${data[index].value} - ${
				ds.label
			}"><div class="chart-bar" style="background-color: var(--${
				MoxyUIColors[index % 7]
			}); height: ${ds.value}%;"></div></div>`
			legendHtml += `<span><label>${ds.label}</label>${data[index].value}</span>`
		})
		html += `<div class="legend">${legendHtml}</legend>`
	}

	html += '</div>'
	if (element) {
		element.innerHTML = html
	}
}
