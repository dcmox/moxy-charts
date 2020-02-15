import { IKeyValuePair, IMoxyUIOptions } from '../lib/IMoxyUI'
import { normalizeData } from '../lib/MoxyUI.util'
import { svge } from './svg'

export const lineChart = (
	data: IKeyValuePair[],
	element: HTMLElement,
	opts: IMoxyUIOptions,
): void => {
	if (!opts.width) {
		opts.width = 500
	}
	if (!opts.height) {
		opts.height = 400
	}

	const svg = svge('svg', {
		class: 'moxy-lineChart',
		width: opts.width + 'px',
		height: opts.height + 'px',
		style: `background-color: var(--${opts.backgroundColor})`,
	})

	// console.log(opts)
	const xGrid = svge('g', {
		class: 'grid x-grid',
		id: 'xGrid',
	})

	const max = data.reduce(
		(acc: any, cur: any) => (cur.value > acc ? cur.value : acc),
		0,
	)

	const yPadding = 60

	const xOffset = (opts.width - 113) / data.length
	const y2 = opts.height - 113 + yPadding

	const yOrigin = ((opts.height - 113) / 7) * 6 + yPadding
	const normalized = normalizeData(data, 100)

	const yMax = yOrigin

	let sPath: string = `M113,${yOrigin} `

	const gPoints = svge('g', {
		fill: `var(--${opts.fillColor})`,
		class: 'set points',
	})

	const gxLabels = svge('g', {
		class: 'labels x-labels',
		fill: `var(--${opts.textColor || 'dark'})`,
	})

	const gyLabels = svge('g', {
		class: 'labels y-labels',
		fill: `var(--${opts.textColor || 'dark'})`,
	})

	for (let i = 0; i < data.length; i++) {
		const yPos = yMax - (normalized[i].value / 100) * yMax + yPadding
		sPath += `L${xOffset * i + 113},${yPos} `

		const circle = svge('circle', {
			cx: xOffset * i + 113,
			cy: yMax - (normalized[i].value / 100) * yMax + yPadding,
			'data-value': data[i].value,
			r: 5,
		})

		gPoints.append(circle)

		const xLabel = svge(
			'text',
			{
				x: xOffset * i + 113,
				y: y2 + 15,
			},
			{ innerHTML: data[i].label },
		)

		gxLabels.append(xLabel)

		const line = svge('line', {
			x1: xOffset * i + 113,
			x2: xOffset * i + 113,
			y1: yPadding,
			y2,
		})

		xGrid.append(line)
	}

	sPath += `L${xOffset * (data.length - 1) + 113},${yOrigin} Z`

	svg.append(xGrid)

	const yGrid = svge('g', {
		class: 'grid y-grid',
		id: 'yGrid',
	})

	const yOffset = (opts.height - 113) / 7
	const x2 = xOffset * (data.length - 1) + 113
	for (let i = 0; i < 7; i++) {
		const line = svge('line', {
			x1: 86,
			x2,
			y1: yPadding + yOffset * i,
			y2: yPadding + yOffset * i,
		})
		yGrid.append(line)

		const yLabel = svge(
			'text',
			{
				x: 80,
				y: (yPadding + 5 + yOffset * i).toString(),
			},
			{ innerHTML: Math.round(max - i * (max / 6)) },
		)

		gyLabels.append(yLabel)
	}

	const yLabel = svge(
		'text',
		{
			y: 35,
			'text-anchor': 'middle',
			x: opts.width / 2,
		},
		{ innerHTML: opts.title || '' },
	)

	gyLabels.append(yLabel)

	svg.append(yGrid)

	const surfaces = svge('g', { class: 'surfaces' })
	const path = svge('path', {
		class: 'set',
		fill: `var(--${opts.fillColor})`,
		d: sPath,
	})

	surfaces.append(path)
	svg.append(surfaces, gPoints, gxLabels, gyLabels)
	element.append(svg)
}
