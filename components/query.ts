export const query = (selector: string | HTMLElement) => {
	if (typeof selector !== 'string') {
		return (sel: string) => {
			return selector.querySelector(sel)
		}
	}
	return document.querySelector(selector) || false
}

const queryMethods = {
	items: [],
	remove() {
		this.items.forEach((item: any) => item.remove())
	},
	hide() {
		this.items.forEach((item: any) => (item.style.display = 'none'))
	},
	show() {
		this.items.forEach((item: any) => {
			item.style.display = 'block'
			item.style.opacity = 1
		})
	},
	append(...children: any) {
		this.items.forEach((item: any) => {
			item.append(...children)
		})
	},
	removeClass(cls: string) {
		this.items.forEach((item: any) => {
			item.classList.remove(cls)
		})
	},
	addClass(cls: string) {
		this.items.forEach((item: any) => {
			item.classList.add(cls)
		})
	},
	attr(attr: string, value: string) {
		this.items.forEach((item: any) => {
			item.setAttribute(attr, value)
		})
	},
	removeAttr(attr: string) {
		this.items.forEach((item: any) => {
			item.removeAttribute(attr)
		})
	},
	removeProp(prop: string) {
		this.items.forEach((item: any) => {
			item.removeProperty(prop)
		})
	},
	prop(prop: string, value: string) {
		this.items.forEach((item: any) => {
			item.setProperty(prop, value)
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
