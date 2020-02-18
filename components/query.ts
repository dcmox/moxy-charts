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

const queryMethods = {
	remove(el: HTMLElement) {
		el.remove()
	},
	hide(el: HTMLElement) {
		el.style.display = 'none'
	},
	show(el: HTMLElement) {
		el.style.display = 'block'
		el.style.opacity = 1
	},
	append(el: HTMLElement, ...children: any) {
		el.append(...children)
	},
	removeClass(el: HTMLElement, cls: string) {
		el.classList.remove(cls)
	},
	addClass(el: HTMLElement, cls: string) {
		el.classList.add(cls)
	},
	attr(el: HTMLElement, attr: string, value: string) {
		el.setAttribute(attr, value)
	},
	removeAttr(el: HTMLElement, attr: string) {
		el.removeAttribute(attr)
	},
	removeProp(el: HTMLElement, prop: string) {
		el.style.removeProperty(prop)
	},
	prop(el: HTMLElement, prop: string, value: string) {
		el.style.setProperty(prop, value)
	},
}

const queryHandler = {
	get: (target: any, keyOrMethod: string) => {
		if (target.elements.length === 0) {
			return (...args: any) => []
		} else if (
			typeof target.elements[0][keyOrMethod] !== 'function' &&
			!queryMethods[keyOrMethod]
		) {
			return target.elements.map((el: any) => el[keyOrMethod])
		}
		return (...args: any) => {
			const result: any = []
			target.elements.forEach((el: any) => {
				if (el[keyOrMethod]) {
					el[keyOrMethod](...args)
				} else if (queryMethods[keyOrMethod]) {
					result.push(queryMethods[keyOrMethod](el, ...args))
				}
			})
			return result
		}
	},
}
