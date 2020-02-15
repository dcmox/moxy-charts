import { IKeyValuePair } from '../lib/IMoxyUI'

type TSVGElement = 'svg' | 'g' | 'circle' | 'text' | 'path' | 'line'

export const elem = (
	type: string,
	attributes?: IKeyValuePair,
	props?: IKeyValuePair,
) => {
	const elem = document.createElement(type)
	if (attributes) {
		Object.keys(attributes).forEach((attr: string) =>
			elem.setAttribute(attr, attributes[attr].toString()),
		)
	}
	if (props) {
		Object.keys(props).forEach(
			(prop: string) => (elem[prop] = props[prop].toString()),
		)
	}
	return elem
}

export const svge = (
	type: TSVGElement,
	attributes?: IKeyValuePair,
	props?: IKeyValuePair,
) => {
	const elem = document.createElementNS('http://www.w3.org/2000/svg', type)
	if (attributes) {
		Object.keys(attributes).forEach((attr: string) =>
			elem.setAttribute(attr, attributes[attr].toString()),
		)
	}
	if (props) {
		Object.keys(props).forEach(
			(prop: string) => (elem[prop] = props[prop].toString()),
		)
	}
	return elem
}
