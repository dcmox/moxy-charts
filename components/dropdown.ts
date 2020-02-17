import { query, queryAll } from './query'
import { elem } from './svg'

export const dropdown = (opts: IMoxyUIOpts) => {
	queryAll('.moxy-dropdown').forEach((dd: HTMLElement) => {
		dd.style.setProperty('--theme', `var(--${opts.theme || 'blue'})`)
		dd.style.setProperty(
			'--backgroundColor',
			`var(--${opts.backgroundColor || 'blue'})`,
		)

		const select = query(dd)('select')
		const input = elem('input', { class: 'moxy-dropdown-input' })
		const list = elem('ul', { class: 'moxy-dropdown-list' })
		const span = elem('span', {
			class: 'moxy-dropdown-select',
		})
		input.onclick = e => {
			e.target.setSelectionRange(0, e.target.value.length)
		}
		span.innerHTML = '&#x1F893'
		span.onclick = () => input.focus()
		queryAll(dd)('option').forEach((opt: any, index: number) => {
			const option = elem('li', {
				'data-value': opt.value,
				'data-label': opt.innerText,
			})
			option.innerText = opt.innerText
			option.onclick = () => {
				input.value = option.dataset.label
				input.dataset.value = option.dataset.value
				query(select)(
					`option[value="${option.dataset.value}"]`,
				).setAttribute('selected', 'selected')
				list.classList.add('hidden')
			}
			list.append(option)
		})
		input.onkeyup = e => {
			queryAll(list)('li').forEach((li: any) => {
				if (
					li.dataset.value
						.toLowerCase()
						.startsWith(e.target.value.toLowerCase()) ||
					li.dataset.label
						.toLowerCase()
						.startsWith(e.target.value.toLowerCase()) ||
					e.target.value.trim() === ''
				) {
					li.classList.remove('hidden')
				} else {
					li.classList.add('hidden')
				}
			})
		}
		input.onfocus = () => list.classList.remove('hidden')
		input.onblur = () => setTimeout(() => list.classList.add('hidden'), 100)
		list.classList.add('hidden')
		dd.append(input, list, span)
	})
}
