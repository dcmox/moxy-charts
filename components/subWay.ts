import { IMoxyUIOptions } from '../lib/IMoxyUI'
import { queryAll, getTextWidth, elem } from '../lib/MoxyUI.core'

export const subWay = (opts: IMoxyUIOptions) => {
	queryAll('.moxy-subway').forEach((el: HTMLElement) => {
		let minSize: number = 0
		if (el.dataset && el.dataset.theme) {
			el.style.setProperty('--theme', 'var(--' + el.dataset.theme + ')')
		} else {
			el.style.setProperty('--theme', 'var(--blue)')
		}
		if (el.dataset && el.dataset.size) {
			minSize = parseInt(el.dataset.size)
		} else {
			queryAll(el)('span').forEach((span: HTMLElement) => {
				const font = window.getComputedStyle(span).fontFamily
				const sz = window.getComputedStyle(span).fontSize
				const width = getTextWidth(span.innerText, font, sz)
				if (minSize < width) {
					minSize = width
				}
			})
		}
		const rail = elem('div', {
			class: 'rail',
		})
		el.prepend(rail)
		const initialPercent = 100 / queryAll(el)('span').length
		const padding = initialPercent / 2
		queryAll(el)('span').forEach((span: HTMLElement, index: number) => {
			span.style.display = 'block'
			span.style.width = minSize * 2 + 'px'
			span.style.height = minSize * 2 + 'px'
			span.style.lineHeight = minSize * 2 + 'px'
			span.style.borderRadius = '50%'
			span.style.textAlign = 'center'
			span.style.color = '#fff'
			span.style.top = `-${minSize + 2}px`
			const calc = initialPercent * (index + 1) - padding
			span.style.left = 'calc(' + calc + '%' + ` - ${minSize}px)`
		})
	})
}
