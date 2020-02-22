import { IMoxyUIOptions } from '../lib/IMoxyUI'
import { queryAll } from '../lib/MoxyUI.core'

export const rating = (opts: IMoxyUIOptions) => {
	// 	background-position-x: 0px;
	queryAll('.moxy-stars').forEach((el: HTMLElement) => {
		el.innerHTML = '&#9733;&#9733;&#9733;&#9733;&#9733;'
		if (el.dataset && el.dataset.maxStars) {
			let stars: string = ''
			for (let i = 0; i < parseInt(el.dataset.maxStars, 10); i++) {
				stars += '&#9733;'
			}
			el.innerHTML = stars
		}
		el.onmousemove = (e: any) => {
			el.style.backgroundPositionX = e.clientX + 'px'
		}
		el.onmouseout = (e: any) => {
			if (el.dataset && el.dataset.stars) {
				const box = el.getClientRects()
				const maxStars =
					el.dataset && el.dataset.maxStars
						? parseInt(el.dataset.maxStars, 10)
						: 5
				const width = parseInt(
					window.getComputedStyle(el).width.replace('px', ''),
					10,
				)
				const starWidth = width / maxStars
				el.style.backgroundPositionX =
					box[0].x + starWidth * parseInt(el.dataset.stars, 10) + 'px'
			} else {
				el.style.backgroundPositionX = '0'
			}
		}
		el.onclick = (e: any) => {
			const box = el.getClientRects()
			const maxStars =
				el.dataset && el.dataset.maxStars
					? parseInt(el.dataset.maxStars, 10)
					: 5
			const width = parseInt(
				window.getComputedStyle(el).width.replace('px', ''),
				10,
			)
			const starWidth = width / maxStars
			if (
				el.dataset &&
				el.dataset.partial &&
				el.dataset.partial === 'true'
			) {
				el.dataset.stars = (
					maxStars -
					Math.round(
						((width - (e.clientX - box[0].x)) / starWidth) * 2,
					) /
						2
				).toString()
			} else {
				el.dataset.stars = (
					maxStars -
					Math.floor((width - (e.clientX - box[0].x)) / starWidth)
				).toString()
			}
		}
	})
}
