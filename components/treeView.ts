import { IMoxyUIOptions } from '../lib/IMoxyUI'
import { elem, query, queryAll } from '../lib/MoxyUI.core'

export const treeView = (opts: IMoxyUIOptions) => {
	queryAll('.moxyTreeView').forEach((tv: HTMLElement) => {
		if (
			tv.dataset &&
			tv.dataset.showToggle &&
			tv.dataset.showToggle === 'true'
		) {
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
				node.onclick = (e: any) => {
					if (e.target.classList.contains('expandable')) {
						e.target.classList.toggle('expanded')
						e.stopPropagation()
					}
				}
			}
		})
	})
}
