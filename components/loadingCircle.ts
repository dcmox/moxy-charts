import { IMoxyUIOptions } from '../lib/IMoxyUI'
import { svge } from '../lib/MoxyUI.core'

export const loadingCircle = (
	element: HTMLElement,
	opts: IMoxyUIOptions,
): boolean => {
	if (!opts.width) {
		opts.width = 300
	}
	if (!opts.height) {
		opts.height = opts.width
	}

	element.style.setProperty('--circle-radius', (opts.width + 290).toString())
	element.style.setProperty(
		'--circle-animation',
		opts.animation || 'infinite alternate',
	)
	const svg = svge(
		'svg',
		{
			class: 'moxy-progress-circle',
			height: opts.height,
			viewBox: `0 0 ${opts.width} ${opts.height}`,
			width: opts.width,
		},
		{
			innerHTML:
				`<circle cx="${(opts.width / 2).toString()}" cy="${(
					opts.height / 2
				).toString()}" r="${(
					opts.height / 2 -
					6
				).toString()}" fill="none" stroke="var(--light-grey)" stroke-width="12"></circle>` +
				`<circle class="moxy-progress-circle_value" cx="${(
					opts.width / 2
				).toString()}" cy="${(opts.height / 2).toString()}" r="${(
					opts.height / 2 -
					6
				).toString()}" fill="none" stroke="${opts.color ||
					'var(--green)'}" stroke-width="12"></circle>`,
		},
	)

	if (opts.text) {
		svg.innerHTML += `<text class="moxy-progress-circle_complete" x="${(opts.width /
			2 +
			8) /
			2}" y="-${opts.height / 2 -
			6}" font-weight="bold" fill="var(--${opts.textColor ||
			'green'})" transform="rotate(90)">${opts.text}</text>`
	}
	element.append(svg)
	return true
}
