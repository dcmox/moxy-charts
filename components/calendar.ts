import { IMoxyUIOptions } from '../lib/IMoxyUI'

export const calendar = (
	element: HTMLElement,
	opts: IMoxyUIOptions,
): boolean => {
	if (!opts.height) {
		opts.height = opts.width
	}
	const div = document.createElement('div')
	div.className = 'inner-calendar'
	return true
}
