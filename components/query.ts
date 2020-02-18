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
	remove(elements: HTMLElement[]) {
		elements.forEach((el: any) => el.remove())
	},
	hide(elements: HTMLElement[]) {
		elements.forEach((el: any) => (el.style.display = 'none'))
	},
	show(elements: HTMLElement[]) {
		elements.forEach((el: any) => {
			el.style.display = 'block'
			el.style.opacity = 1
		})
	},
	append(elements: HTMLElement[], ...children: any) {
		elements.forEach((el: any) => {
			el.append(...children)
		})
	},
	removeClass(elements: HTMLElement[], cls: string) {
		elements.forEach((el: any) => {
			el.classList.remove(cls)
		})
	},
	addClass(elements: HTMLElement[], cls: string) {
		elements.forEach((el: any) => {
			el.classList.add(cls)
		})
	},
	attr(elements: HTMLElement[], attr: string, value: string) {
		elements.forEach((el: any) => {
			el.setAttribute(attr, value)
		})
	},
	removeAttr(elements: HTMLElement[], attr: string) {
		elements.forEach((el: any) => {
			el.removeAttribute(attr)
		})
	},
	removeProp(elements: HTMLElement[], prop: string) {
		elements.forEach((el: any) => {
			el.removeProperty(prop)
		})
	},
	prop(elements: HTMLElement[], prop: string, value: string) {
		elements.forEach((el: any) => {
			el.setProperty(prop, value)
		})
	},
}

const queryHandler = {
	get: (target: any, keyOrMethod: string) => {
		if (target.elements.length === 0) {
			return (...args: any) => null
		} else if (
			typeof target.elements[0][keyOrMethod] !== 'function' &&
			!queryMethods[keyOrMethod]
		) {
			return target.elements.map((el: any) => el[keyOrMethod])
		}
		return (...args: any) => {
			const result = target.elements.forEach((el: any) => {
				if (el[keyOrMethod]) {
					el[keyOrMethod](...args)
				} else if (queryMethods[keyOrMethod]) {
					queryMethods[keyOrMethod](el, ...args)
				}
			})
			return result
		}
	},
}
