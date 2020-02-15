import { IKeyValuePair, IMoxyUIOptions } from '../lib/IMoxyUI'
import { svge } from './svg'

const scale = (value: number, sz: number) => {
	const circle = svge('circle', {
		cx: 0,
		cy: 0,
		r: ((value / 4) * sz) / 2,
		fill: '#FAFAFA',
		stroke: '#999',
		strokeWidth: '0.2',
		opacity: '0.3',
	})
	return circle
}

const polarToX = (angle: number, distance: number) =>
	Math.cos(angle - Math.PI / 2) * distance
const polarToY = (angle: number, distance: number) =>
	Math.sin(angle - Math.PI / 2) * distance

const pathDefinition = (points: any) => {
	let d = 'M' + points[0][0].toFixed(4) + ',' + points[0][1].toFixed(4)
	for (let i = 1; i < points.length; i++) {
		d += 'L' + points[i][0].toFixed(4) + ',' + points[i][1].toFixed(4)
	}
	return d + 'z'
}

const caption = (sz: number) => (col: any) => {
	const text = svge(
		'text',
		{
			x: polarToX(col.angle, (sz / 2) * 0.95).toFixed(4),
			y: polarToY(col.angle, (sz / 2) * 0.95).toFixed(4),
			dy: 10 / 2,
			fill: '#444',
			style: 'font-weight: bold; text-shadow: 1px 1px 1px #fff',
			'text-anchor': 'middle',
		},
		{ innerHTML: col.caption },
	)
	return text
}

// tutorial courtesy of: https://itnext.io/react-svg-radar-chart-a89d15760e8
const shape = (columns: any, opts: IMoxyUIOptions) => (
	chartData: any,
	i: number,
) => {
	const data = chartData
	const path = svge('path', {
		d: pathDefinition(
			columns.map((col: any) => {
				const value = data[col.key]
				return [
					polarToX(col.angle, (value / 2) * opts.width),
					polarToY(col.angle, (value / 2) * opts.width),
				]
			}),
		),
		stroke: `var(--${opts.borderColor})`,
		fill: `var(--${opts.fillColor})`,
		opacity: '.5',
	})
	return path
}

const points = (points: any) => {
	return points
		.map((point: any) => point[0].toFixed(4) + ',' + point[1].toFixed(4))
		.join(' ')
}

const axis = (sz: number) => (col: any, i: number) => {
	const polyline = svge('polyline', {
		points: points([
			[0, 0],
			[polarToX(col.angle, sz / 2), polarToY(col.angle, sz / 2)],
		]),
		stroke: '#555',
		strokeWidth: '0.2',
		opacity: '0.3',
	})
	return polyline
}

export const radarChart = (
	data: IKeyValuePair[],
	element: HTMLElement,
	opts: IMoxyUIOptions,
): void => {
	if (!opts.width) {
		opts.width = 400
	}
	if (!opts.height) {
		opts.height = 400
	}

	const svg = svge('svg', {
		class: 'moxy-radarchart',
		width: opts.width,
		height: opts.height,
		viewBox: `-20 0 ${opts.width + 40} ${opts.width}`,
	})

	const group = svge('g')
	for (let i = 4; i > 0; i--) {
		group.append(scale(i, opts.width))
	}
	const middleOfChart = (opts.width / 2).toFixed(4)
	const slices = []
	const normalized = data

	const keys = Object.keys(normalized[0])
	const captions = opts.captions ? opts.captions : keys
	const columns = keys.map((key, i, all) => ({
		angle: (Math.PI * 2 * i) / all.length,
		caption: captions[key] || captions[i],
		key,
	}))

	const shp = svge('g')
	const shapes = shape(columns, opts)
	shp.append(...normalized.map(shapes))
	group.append(shp)

	const ax = svge('g')
	ax.append(...columns.map(axis(opts.width)))
	group.append(ax)

	const labels = svge('g')
	labels.append(...columns.map(caption(opts.width)))
	group.append(labels)
	for (let i = 4; i > 0; i--) {
		slices[slices.length] = svge('g', {
			transform: `translate(${middleOfChart},${middleOfChart})`,
		})
		slices[slices.length - 1].append(group)
	}

	svg.append(...slices)

	element.append(svg)
}
