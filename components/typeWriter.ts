import { IMoxyUIOptions } from '../lib/IMoxyUI'
import { queryAll } from '../lib/MoxyUI.core'

export const typeWriter = (opts: IMoxyUIOptions) => {
	queryAll('.moxy-typewriter').forEach((el: any) => {
		let i: number = 0
		let text: string = ''
		const speed: number =
			el.dataset && el.dataset.speed ? parseInt(el.dataset.speed, 10) : 50

		let adjustedSpeed: number = speed
		let blinker: any = null
		const typeAway = () => {
			clearInterval(blinker)
			if (i < text.length) {
				if (text.charAt(i + 1) === ' ') {
					if (Math.floor(Math.random() * 3) === 1) {
						adjustedSpeed += Math.random() * 100 + 20
					}
				} else if (
					// tslint:disable-next-line: quotemark
					['!', '.', '?', ':', "'"].indexOf(text.charAt(i + 1)) > -1
				) {
					if (Math.floor(Math.random() * 2) === 1) {
						adjustedSpeed += Math.random() * 400 + 20
					} else {
						adjustedSpeed += Math.random() * 100 + 20
					}
				} else {
					adjustedSpeed = speed + Math.random() * 20
				}
				el.innerHTML += text.charAt(i)
				i++
				setTimeout(typeAway, adjustedSpeed)
			}
		}
		text = el.innerHTML
		el.innerHTML = ''
		blinker = setInterval(() => {
			el.classList.toggle('blink')
		}, 500)
		setTimeout(typeAway, 3000)
	})
}
