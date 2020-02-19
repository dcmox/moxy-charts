import { bindAll, query, queryAll } from './query'
import { elem } from './svg'

export const accordian = (opts: IMoxyUIOptions) => {
	queryAll('.moxy-accordian').forEach((el: HTMLElement) => {
		queryAll(el)('h1, h2, h3, h4').forEach((node: HTMLElement) => {
			node.onclick = e => {
				if (
					el.dataset &&
					el.dataset.dynamic &&
					el.dataset.dynamic === 'true'
				) {
					bindAll(el)('h1, h2, h3, h4', (h: any) => {
						h.nextElementSibling.style.maxHeight = null
						h.nextElementSibling.classList.remove('expanded')
					})
				}
				e.target.classList.toggle('expanded')
				const content = e.target.nextElementSibling
				content.style.maxHeight = content.style.maxHeight
					? null
					: content.scrollHeight + 'px'
			}
		})
	})
}
