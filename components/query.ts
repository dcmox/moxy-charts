export const query = (selector: string | HTMLElement) => {
	if (typeof selector !== 'string') {
		return (sel: string) => {
			return selector.querySelector(sel)
		}
	}
	return document.querySelector(selector) || false
}

const queryMethods = {
	elements: [],
	remove() {
		this.elements.forEach((el: any) => el.remove())
	},
	hide() {
		this.elements.forEach((el: any) => (el.style.display = 'none'))
	},
	show() {
		this.elements.forEach((el: any) => {
			el.style.display = 'block'
			el.style.opacity = 1
		})
	},
	append(...children: any) {
		this.elements.forEach((el: any) => {
			el.append(...children)
		})
	},
	removeClass(cls: string) {
		this.elements.forEach((el: any) => {
			el.classList.remove(cls)
		})
	},
	addClass(cls: string) {
		this.elements.forEach((el: any) => {
			el.classList.add(cls)
		})
	},
	attr(attr: string, value: string) {
		this.elements.forEach((el: any) => {
			el.setAttribute(attr, value)
		})
	},
	removeAttr(attr: string) {
		this.elements.forEach((el: any) => {
			el.removeAttribute(attr)
		})
	},
	removeProp(prop: string) {
		this.elements.forEach((el: any) => {
			el.removeProperty(prop)
		})
	},
	prop(prop: string, value: string) {
		this.elements.forEach((el: any) => {
			el.setProperty(prop, value)
		})
	},
}

export const queryAll = (
	selector: string | HTMLElement,
	wrap: boolean = false,
) => {
	const items: any = []
	if (typeof selector !== 'string') {
		return (sel: string) => {
			selector
				.querySelectorAll(sel)
				.forEach((item: Element) => items.push(item))
			if (wrap) {
				return Object.assign({}, queryMethods, { items })
			}
			return items
		}
	}
	document
		.querySelectorAll(selector)
		.forEach((item: Element) => items.push(item))
	if (wrap) {
		return Object.assign({}, queryMethods, { items })
	}
	return items
}

export const bindAll = (
	selector: HTMLElement | string,
	fn?: (elem: HTMLElement) => any,
) => {
	if (typeof selector !== 'string') {
		return (sel: string, fnn: (elem: HTMLElement) => any) => {
			selector.querySelectorAll(sel).forEach((elem: any) => {
				fnn(elem)
			})
		}
	}
	document.querySelectorAll(selector).forEach((elem: any) => {
		fn(elem)
	})
}
// const queryAll = function (selector) {
//     var items = [];
//     if (typeof selector !== 'string') {
//         return function (sel) {
//             selector
//                 .querySelectorAll(sel)
//                 .forEach(function (item) { return items.push(item); });
//             return items;
//         };
//     }
//     document
//         .querySelectorAll(selector)
//         .forEach(function (item) { return items.push(item); });
//     return new Proxy({items}, queryHandler);
// };

// const queryHandler = {
//     get: (target, objectKey) => {
//         console.log('getter')
//         target.items.forEach((item) => {
//             item[objectKey]()
//         })
//         return { remove: () => {} }
//     },
//     apply: (target, thisArg, args) => {
//         console.log(target, thisArgs, args)
//         return target(...args)
//     }
// }

// console.log(queryAll('li').remove());
