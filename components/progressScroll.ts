import { IMoxyUIOptions } from '../lib/IMoxyUI'
import { elem, query, queryAll } from '../lib/MoxyUI.core'

export const progressScroll = (opts: IMoxyUIOptions) => {
	queryAll('.moxy-progress-scroll').forEach((el: HTMLElement) => {
		if (el.dataset && el.dataset.target) {
			const track = elem('div', { class: 'moxy-scroll-progress-track' })
			const progress = elem('div', {
				class: 'moxy-scroll-progress-percent',
			})
			track.append(progress)
			el.append(track)
			let target = el.dataset.target
			if (
				!el.dataset.target.startsWith('#') &&
				!el.dataset.target.startsWith('.')
			) {
				target = '#' + target
			}
			query(target).onscroll = (e: any) => {
				const winScroll = e.target.scrollTop || e.target.scrollTop
				const height = e.target.scrollHeight - e.target.clientHeight
				const scrolled = (winScroll / height) * 100
				query(track)('div').style.width = scrolled + '%'
			}
		}
	})
}
