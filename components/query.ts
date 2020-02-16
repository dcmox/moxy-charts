export const query = (selector: string | HTMLElement) => {
	if (typeof selector !== 'string') {
		return (sel: string) => {
			return selector.querySelector(sel)
		}
	}
	return document.querySelector(selector) || false
}
export const queryAll = (selector: string | HTMLElement) => {
	const items: any = []
	if (typeof selector !== 'string') {
		return (sel: string) => {
			selector
				.querySelectorAll(sel)
				.forEach((item: Element) => items.push(item))
			return items
		}
	}
	document
		.querySelectorAll(selector)
		.forEach((item: Element) => items.push(item))
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
