import { query, queryAll } from './query'
import { elem } from './svg'

export const treeView = (opts: IMoxyUIOptions) => {
	queryAll('.moxyTreeView').forEach((tv: HTMLElement) => {
		if (tv.dataset && tv.dataset.showToggle) {
			const el = elem('div', { class: 'moxyTreeViewOpts' })
			el.innerHTML =
				'<span class="expand">Expand</span> <span class="collapse">Collapse</span>'
			tv.parentNode?.insertBefore(el, tv.nextSibling)
			query(el)('.expand').onclick = () => {
				queryAll(tv, true)('li:not(.expanded)').click()
			}
			query(el)('.collapse').onclick = () => {
				queryAll(tv, true)('li.expanded').click()
			}
		}
		queryAll(tv)('li').forEach((node: HTMLElement, index: number) => {
			if (query(node)('ul')) {
				node.classList.add('expandable')
				node.onclick = e => {
					if (e.target.classList.contains('expandable')) {
						e.target.classList.toggle('expanded')
						e.stopPropagation()
					}
				}
			}
		})
	})
}

// const toggleNode = (node: HTMLElement) => {
// 	console.log('click!')
// 	query(node)('ul').classList.toggle('expanded')
// }
