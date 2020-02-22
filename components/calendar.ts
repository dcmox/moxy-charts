import { IMoxyUIOptions } from '../lib/IMoxyUI'
import { bindAll, query, queryAll } from '../lib/MoxyUI.core'

/* Todo - enable date picker option, show previous month and following month dates but grayed out. */
export const shortDate = (date: Date) =>
	date
		.toLocaleDateString('en-US', {
			month: 'short',
			year: 'numeric',
		})
		.toUpperCase()

export const calendar = (
	element: HTMLElement,
	opts: IMoxyUIOptions,
): boolean => {
	if (!opts.height) {
		opts.height = opts.width
	}
	const monthYear = shortDate(new Date())
	const height = opts.height ? opts.height / 6 : 100
	let fontSize = '14px'
	if (opts.height < 200) {
		fontSize = '10px'
	}
	element.innerHTML = `<div class="moxy-calendar" style="--theme: var(--${opts.theme ||
		'blue'}); --textColor: var(--${opts.textColor ||
		'white'}); --cellHeight: ${height + 'px'}; --fontSize: ${fontSize}">
	<div class="calendar-header">
		<div class="previous" title="Previous">&#x27A4;</div>
		<div class="next" title="Next">&#x27A4;</div>
		<div class="month-year" title="Select Month" data-date="${new Date()}">${monthYear}</div>
	</div>
	<div class="calendar-days">
		<span title="Sunday">SUN</span>
		<span title="Monday">MON</span>
		<span title="Tuesday">TUE</span>
		<span title="Wednesday">WED</span>
		<span title="Thursday">THU</span>
		<span title="Friday">FRI</span>
		<span title="Saturday">SAT</span>
	</div>
	<div class="calendar-cells"></div>
</div>
`
	setCalendarDays(element, new Date())

	if (opts.data && opts.data.events) {
		setCalendarEvents(new Date(), element, opts)
	}
	bindAll(element)('.previous, .next', (elem: HTMLElement) => {
		elem.onclick = (e: any) => {
			const date = new Date(query(element)('.month-year').dataset.date)
			if (e.target.className === 'previous') {
				date.setMonth(date.getMonth() - 1)
			} else {
				date.setMonth(date.getMonth() + 1)
			}
			query(element)('.month-year').dataset.date = date
			query(element)('.month-year').innerHTML = shortDate(date)
			setCalendarDays(element, date)
			setCalendarEvents(date, element, opts)
		}
	})
	return true
}

export const setCalendarEvents = (
	date: Date,
	element: HTMLElement,
	opts: IMoxyUIOptions,
) => {
	const height = opts.height ? opts.height / 6 : 100
	let cls: string = ''
	if (height < 50) {
		cls = 'hidden'
	}
	if (opts.data.events) {
		opts.data.events.forEach((event: any) => {
			if (event.dateEnd) {
				// range
				if (
					event.date.getFullYear() === date.getFullYear() &&
					event.date.getMonth() === date.getMonth()
				) {
					query(element)(
						`.calendar-cells .cell[data-day="${event.date.getDate()}"]`,
					).innerHTML += `<div class="event ${cls}"><span title="${event.description ||
						event.label}">${event.label}</span></div>`
					if (cls) {
						query(element)(
							`.calendar-cells .cell[data-day="${event.date.getDate()}"]`,
						).classList.add('special')
						query(element)(
							`.calendar-cells .cell[data-day="${event.date.getDate()}"]`,
						).title += event.label + '. '
					}
					let d = new Date(event.date)
					while (true) {
						d = new Date(d)
						d.setDate(d.getDate() + 1)
						if (
							d.getMonth() === date.getMonth() &&
							d.getDate() <= event.dateEnd.getDate()
						) {
							query(element)(
								`.calendar-cells .cell[data-day="${d.getDate()}"]`,
							).innerHTML += `<div class="event ${cls}"><span title="${event.description ||
								event.label}">${event.label}</span></div>`
						} else {
							break
						}
						if (cls) {
							query(element)(
								`.calendar-cells .cell[data-day="${d.getDate()}"]`,
							).classList.add('special')
							query(element)(
								`.calendar-cells .cell[data-day="${d.getDate()}"]`,
							).title += event.label + '. '
						}
					}
				}
			} else {
				if (
					event.date.getFullYear() === date.getFullYear() &&
					event.date.getMonth() === date.getMonth()
				) {
					query(element)(
						`.calendar-cells .cell[data-day="${event.date.getDate()}"]`,
					).innerHTML += `<div class="event ${cls}"><span title="${event.description ||
						event.label}">${event.label}</span></div>`
					if (cls) {
						query(element)(
							`.calendar-cells .cell[data-day="${event.date.getDate()}"]`,
						).classList.add('special')
						query(element)(
							`.calendar-cells .cell[data-day="${event.date.getDate()}"]`,
						).title += event.label + '. '
					}
				}
			}
		})
	}
}

export const setCalendarDays = (element: HTMLElement, date: Date) => {
	query(element)('.calendar-cells').innerHTML = ''
	const startDay = new Date(date)
	const lastDay = new Date(
		date.getFullYear(),
		date.getMonth() + 1,
		0,
	).getDate()
	startDay.setDate(1)
	const blankCells = startDay.getDay()
	for (let i = 0; i < blankCells; i++) {
		query(element)('.calendar-cells').innerHTML +=
			'<div class="cell prevMonth"></div>'
	}
	for (let i = 1; i < lastDay + 1; i++) {
		query(element)(
			'.calendar-cells',
		).innerHTML += `<div class="cell" data-day="${i}"><span>${i}</span></div>`
	}
}
