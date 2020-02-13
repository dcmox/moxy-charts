import { IKeyValuePair, IMoxyUIOptions } from '../lib/IMoxyUI'

export const table = (
	data: IKeyValuePair[],
	element: HTMLElement,
	opts?: IMoxyUIOptions,
): void => {
	let html = ''
	if (opts?.title) {
		html += `<h3>${opts.title}</h3>`
	}
	html += `<table class="moxy-table">`
	html += `<thead><tr>`
	data.forEach((row: any) => {
		html += `<th>${row.label}</th>`
	})
	html += `</thead></tr>`

	html += `<tbody><tr>`
	data.forEach((row: any) => {
		html += `<td>${row.value}</td>`
	})
	html += `</tr></tbody>`

	if (element) {
		element.innerHTML = html
	}
}
