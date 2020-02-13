import { IKeyValuePair } from './IMoxyUI'

export const normalizeData = (
	data: IKeyValuePair[],
	maxValue: number = 80,
): IKeyValuePair[] => {
	const normalized: IKeyValuePair[] = []
	if (maxValue === -1) {
		const maxDataValue = data.reduce(
			(acc: any, current: any) => acc + parseInt(current.value, 10),
			0,
		)
		data.forEach((ds: any) => {
			normalized.push({
				label: ds.label,
				value: Math.round((ds.value / maxDataValue) * 100),
			})
		})
		return normalized
	}
	const maxDataValue = data.reduce(
		(acc: any, current: any) =>
			parseInt(current.value, 10) < acc
				? acc
				: parseInt(current.value, 10),
		0,
	)
	const ratio = maxDataValue / maxValue
	data.forEach((ds: any) => {
		normalized.push({
			label: ds.label,
			value: Math.round(ds.value / ratio),
		})
	})
	return normalized
}
