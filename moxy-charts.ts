import { MoxyUI } from './lib/MoxyUI'

const data = [
	{
		label: 'Monday',
		value: '25',
	},
	{
		label: 'Tuesday',
		value: '45',
	},
	{
		label: 'Wednesday',
		value: '60',
	},
	{
		label: 'Thursday',
		value: '80',
	},
	{
		label: 'Friday',
		value: '90',
	},
]

// add {width: 300, height: 300} option
const chart = new MoxyUI(data, 'Weekly Downloads')
chart.render('#chart', 'pie')
chart.render('#chartTwo', 'bar')
chart.render('#chartThree', 'bar-vert')
chart.render('#chartFour', 'dataTable')
chart.render('#chartFive', 'treemap')

chart.render(
	'#radarChart',
	'radarChart',
	{
		borderColor: 'darkblue',
		captions: {
			agility: 'Agility',
			intelligence: 'Intelligence',
			stamina: 'Stamina',
			strength: 'Strength',
			wisdom: 'Wisdom',
		},
		fillColor: 'blue',
		textColor: 'white',
		title: 'Weekly Downloads',
	},
	[
		{
			agility: 1,
			intelligence: 0.67,
			stamina: 0.9,
			strength: 0.7,
			wisdom: 0.8,
		},
		{
			agility: 0.9,
			intelligence: 0.7,
			stamina: 0.8,
			strength: 0.6,
			wisdom: 0.6,
		},
	],
)

chart.render('#graph', 'lineChart', {
	backgroundColor: 'blue',
	fillColor: 'darkblue',
	textColor: 'white',
	title: 'Weekly Downloads',
})

function timeout(ms: number): any {
	return new Promise((resolve: any) => setTimeout(resolve, ms))
}

async function sleep(
	ms: number,
	fn: (...args: any) => any,
	...args: any
): Promise<any> {
	await timeout(ms)
	return fn(...args)
}

MoxyUI.display('#loadingBar', 'loadingBar', {
	color: 'blue',
	fn: async () => {
		await sleep(15000, () => true)
	},
	maxTime: '10000', // ms
})

MoxyUI.display('#calculator', 'calculator', {
	theme: 'blue',
})

MoxyUI.display('#calendar', 'calendar', {
	data: {
		events: [
			// tslint:disable: quotemark
			{
				date: new Date('February 14, 2020'),
				description: "It's party time!",
				label: "Daniel's Birthday",
			},
			{
				date: new Date('February 14, 2020'),
				label: "Valentine's Day",
			},
			{
				date: new Date('February 17, 2020'),
				dateEnd: new Date('February 21, 2020'),
				label: 'Vacation',
			},
		],
	},
	height: 200,
	text: 'Loading...',
	textColor: 'white',
	theme: 'blue',
	width: 150,
})

MoxyUI.display('#demo', 'loadingCircle', {
	height: 150,
	text: 'Loading...',
	textColor: 'blue',
	width: 150,
})

MoxyUI.init({ backgroundColor: 'blue', theme: 'blue' })

// colorPicker()
