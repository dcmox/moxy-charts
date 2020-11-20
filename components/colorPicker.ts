import { query } from './query'
import { elem } from './svg'

export const colorPicker = () => {
	const element = query('.moxy-color-picker')
	const html = ''
	const elements = []
	for (let r = 0; r < 255; r++) {
		for (let g = 0; g < 5; g++) {
			for (let b = 0; b < 1; b++) {
				const el = elem('span', {
					style: `background-color: rgb(${r}, ${g}, ${b})`,
				})
				elements.push(el)
			}
		}
	}
	element.append(...elements)
}
