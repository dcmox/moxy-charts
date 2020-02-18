export const query = (selector: string | HTMLElement) => {
	if (typeof selector !== 'string') {
		return (sel: string) => {
			return selector.querySelector(sel)
		}
	}
	return document.querySelector(selector) || false
}

export const queryAll = (
	selector: string | HTMLElement,
	proxy: boolean = false,
) => {
	const elements: any = []
	if (typeof selector !== 'string') {
		return (sel: string) => {
			selector
				.querySelectorAll(sel)
				.forEach((el: Element) => elements.push(el))
			if (proxy) {
				return new Proxy({ elements }, queryHandler)
			}
			return elements
		}
	}
	document
		.querySelectorAll(selector)
		.forEach((el: Element) => elements.push(el))
	if (proxy) {
		return new Proxy({ elements }, queryHandler)
	}
	return elements
}

export const bindAll = (
	selector: HTMLElement | string,
	fn?: (el: HTMLElement) => any,
) => {
	if (typeof selector !== 'string') {
		return (sel: string, fnn: (el: HTMLElement) => any) => {
			selector.querySelectorAll(sel).forEach((el: any) => {
				fnn(el)
			})
		}
	}
	document.querySelectorAll(selector).forEach((el: any) => {
		fn(el)
	})
}

const queryHandler = {
	get: (target: any, keyOrMethod: string) => {
		if (target.elements.length === 0) {
			return null
		} else if (typeof target.elements[0][keyOrMethod] !== 'function') {
			return target.elements.map((el: any) => el[keyOrMethod])
		}
		return (...args: any) => {
			const result = target.elements.forEach((el: any) => {
				el[keyOrMethod](args)
			})
			return result
		}
	},
}
