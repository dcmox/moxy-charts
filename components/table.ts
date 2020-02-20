import { IMoxyUIOptions } from '../lib/IMoxyUI'
import { query, queryAll } from './query'
import { elem } from './svg'

/* Add ability to search, data-searchable, pagination */
export const table = (opts: IMoxyUIOptions) => {
	queryAll('.moxy-table').forEach((tbl: HTMLElement) => {
		tbl.style.setProperty('--theme', `var(--${opts.theme || 'grey'})`)
		queryAll(tbl)('thead th').forEach((th: HTMLElement, index: number) => {
			if (
				th.dataset &&
				th.dataset.sortable &&
				(th.dataset.sortable === 'true' || th.dataset.sortable === '1')
			) {
				th.onclick = e => {
					const rows = queryAll(tbl)('tbody tr')
					if (th.dataset.sortDir && th.dataset.sortDir === 'asc') {
						queryAll(tbl)('thead th').forEach(thh => {
							if (thh.dataset && thh.dataset.sortDir) {
								thh.dataset.sortDir = ''
							}
						})
						th.dataset.sortDir = 'desc'
					} else {
						queryAll(tbl)('thead th').forEach(thh => {
							if (thh.dataset && thh.dataset.sortDir) {
								thh.dataset.sortDir = ''
							}
						})
						th.dataset.sortDir = 'asc'
					}
					rows.sort((a: any, b: any) => {
						if (
							th.dataset.sortDir &&
							th.dataset.sortDir === 'asc'
						) {
							return query(a)(`td:nth-child(${index + 1})`)
								.innerText <
								query(b)(`td:nth-child(${index + 1})`).innerText
								? -1
								: 1
						} else {
							return query(a)(`td:nth-child(${index + 1})`)
								.innerText <
								query(b)(`td:nth-child(${index + 1})`).innerText
								? 1
								: -1
						}
					})
					query(tbl)('tbody').innerHTML = ''
					query(tbl)('tbody').append(...rows)
				}
			}
		})
		setResizable(tbl)
	})
}

const setResizable = (tbl: HTMLElement) => {
	const row = tbl.getElementsByTagName('tr')[0]
	const cols = row ? row.children : undefined
	if (!cols) {
		return
	}

	tbl.style.overflow = 'hidden'

	const tableHeight = tbl.offsetHeight

	for (let i = 0; i < cols.length; i++) {
		const div = elem('div', {
			style: `height:${tableHeight}px;`,
			class: 'resizer',
		})
		cols[i].appendChild(div)
		cols[i].style.position = 'relative'
		setListeners(div)
	}
}

const setListeners = (div: HTMLElement) => {
	let pageX: number | null
	let col: HTMLElement | null
	let nCol: HTMLElement | null
	let colWidth: number | null
	let nColWidth: number | null

	div.addEventListener('mousedown', e => {
		col = e.target.parentElement
		nCol = col.nextElementSibling
		pageX = e.pageX

		const padding = paddingDiff(col)
		colWidth = col.offsetWidth - padding
		if (nCol) {
			nColWidth = nCol.offsetWidth - padding
		}
	})

	div.addEventListener(
		'mouseover',
		e => (e.target.style.borderRight = '2px solid var(--theme)'),
	)

	div.addEventListener('mouseout', e => (e.target.style.borderRight = ''))

	document.addEventListener('mousemove', e => {
		if (col) {
			const diffX = e.pageX - pageX
			if (nCol) {
				nCol.style.width = nColWidth - diffX + 'px'
			}
			col.style.width = colWidth + diffX + 'px'
		}
	})

	document.addEventListener('mouseup', e => {
		col = null
		nCol = null
		pageX = null
		nColWidth = null
		colWidth = null
	})
}

const paddingDiff = (col: any) =>
	getStyleVal(col, 'box-sizing') === 'border-box'
		? 0
		: parseInt(getStyleVal(col, 'padding-left'), 10) +
		  parseInt(getStyleVal(col, 'padding-right'), 10)

const getStyleVal = (e: HTMLElement, prop: string) =>
	window.getComputedStyle(e, null).getPropertyValue(prop)
