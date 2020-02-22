import { IMoxyUIOptions } from '../lib/IMoxyUI'
import { elem, queryAll } from '../lib/MoxyUI.core'

export const imageGrid = (opts: IMoxyUIOptions) => {
	queryAll('.moxy-grid').forEach((el: HTMLElement) => {
		let columns: number = 2
		if (el.dataset && el.dataset.columns) {
			columns = parseInt(el.dataset.columns, 10)
		}
		const len = queryAll(el)('img').length
		if (columns > len) {
			columns = 2
		}
		el.style.setProperty('--columns', 100 / columns + '%')
		el.style.setProperty('--nColumns', columns * 8 + 'px')
		const div = elem('div', { class: 'row' })
		const columnElements: any = []
		const columnSizes: number[] = []
		for (let i = 0; i < columns; i++) {
			columnElements.push(elem('div', { class: 'column' }))
			columnSizes[i] = 0
		}
		/* Todo - calculation so that there are no gaps */
		queryAll(el)('img').forEach((img: any, index: number) => {
			if (index === len - 1) {
				const smallest = Math.min.apply(Math, columnSizes)
				const si = columnSizes.indexOf(smallest)
				columnElements[si].append(img)
			} else {
				columnElements[index % columns].append(img)
				columnSizes[index % columns] += img.naturalHeight
			}
		})
		el.innerHTML = ''
		div.append(...columnElements)
		el.append(div)
	})
}
