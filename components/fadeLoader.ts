import { IMoxyUIOptions } from '../lib/IMoxyUI'
import { query, queryAll } from '../lib/MoxyUI.core'

export const fadeLoader = (opts: IMoxyUIOptions) => {
	queryAll('.fade-loader').forEach((el: any) => {
		if (el.dataset.theme) {
			el.style.setProperty('--theme', 'var(--' + el.dataset.theme + ')')
		} else {
			el.style.setProperty('--theme', 'var(--blue)')
		}
	})
}
