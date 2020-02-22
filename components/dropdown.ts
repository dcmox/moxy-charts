import { IMoxyUIOptions } from '../lib/IMoxyUI'
import { elem, query, queryAll } from '../lib/MoxyUI.core'

// TODO: Add data-source with debounce
export const dropdown = (opts: IMoxyUIOptions) => {
	// Loop through each dropdown of class .moxy-dropdown
	queryAll('.moxy-dropdown').forEach((dd: HTMLElement) => {
		// Set properties to each of them
		dd.style.setProperty('--theme', `var(--${opts.theme || 'blue'})`)
		dd.style.setProperty(
			'--backgroundColor',
			`var(--${opts.backgroundColor || 'blue'})`,
		)

		// Create the elements necessary for our custom dropdown
		const select = query(dd)('select')
		const input = elem('input', { class: 'moxy-dropdown-input' })
		const list = elem('ul', { class: 'moxy-dropdown-list' })
		const span = elem('span', {
			class: 'moxy-dropdown-select',
		})
		input.onclick = (e: any) => {
			e.target.setSelectionRange(0, e.target.value.length)
		}
		span.innerHTML = '&#x1F893'
		span.onclick = () => input.focus()

		// Iterate through all optionsi n the select
		queryAll(dd)('option').forEach((opt: any, index: number) => {
			const option = elem('li', {
				'data-label': opt.innerText,
				'data-value': opt.value,
			})
			option.innerText = opt.innerText
			option.onclick = () => {
				input.value = option.dataset.label
				input.dataset.value = option.dataset.value
				queryAll(select, true)('option').removeAttribute('selected')
				query(select)(
					`option[value="${option.dataset.value}"]`,
				).setAttribute('selected', 'selected')
				list.classList.add('hidden')
			}
			list.append(option)
		})

		// Handle our search selection
		input.onkeyup = (e: any) => {
			// Handle return on selection, hide dropdown
			if (e.keyCode === 13) {
				const active = query(list)('li.active')
				if (active) {
					active.click()
				}
				input.blur()
				return
			}

			// Handle keycodes
			if (e.keyCode === 40 || e.keyCode === 38) {
				const previouslyActive = query(list)('li.active')
				if (e.keyCode === 38 && !previouslyActive) {
					return
				}

				const activeItem = previouslyActive
					? e.keyCode === 40
						? previouslyActive.nextSibling
						: previouslyActive.previousSibling
					: query(list)('li:not(.hidden):not(.active)')

				if (previouslyActive) {
					previouslyActive.classList.remove('active')
				}

				activeItem.classList.add('active')
				return
			}

			// Handle clearing out selection
			if (e.target.value.trim() === '') {
				queryAll(select, true)('option').removeAttribute('selected')
				input.dataset.value = ''
				return
			}

			// Handle filtering our list
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

		// Handle other input events
		input.onfocus = () => list.classList.remove('hidden')
		input.onblur = () =>
			setTimeout(() => {
				list.classList.add('hidden')
				queryAll(list, true)('li.active').removeClass('active')
			}, 150)

		// Initialize list to being hidden and append our custom elements
		list.classList.add('hidden')
		dd.append(input, list, span)
	})
}
