export interface IKeyValuePair {
	[key: string]: any
}

export interface IMoxyUIOptions {
	title?: string
	width?: number
	height?: number
	color?: string
	animation?: string // forwards || infinite alternate
	text?: string
	textColor?: TMoxyColor
	fn?: any
	maxTime?: any
}

export type TMoxyColor =
	| 'green'
	| 'blue'
	| 'yellow'
	| 'purple'
	| 'red'
	| 'teal'
	| 'lime'
	| 'banana'
	| 'skyblue'
	| 'tangerine'

export const MoxyUIColors = [
	'green',
	'blue',
	'yellow',
	'purple',
	'red',
	'teal',
	'lime',
	'banana',
	'skyblue',
	'tangerine',
]

export const MoxyUIDefaultOptions = {
	color: 'green',
	height: 300,
	width: 300,
}
