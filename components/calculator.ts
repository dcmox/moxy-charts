import { IMoxyUIOptions } from '../lib/IMoxyUI'
import { queryAll } from '../lib/MoxyUI.core'

export const calculator = (element: HTMLElement, opts: IMoxyUIOptions) => {
	if (!opts.width) {
		opts.width = element.style.width
			? parseInt(element.style.width.replace('px', ''), 10)
			: element.clientWidth
	}
	if (!opts.height) {
		opts.height = element.style.height
			? parseInt(element.style.height.replace('px', ''), 10)
			: element.clientHeight
	}
	element.innerHTML = `
        <div class="moxy-calculator" tabindex="0" style="--theme: var(--${opts.theme ||
			'blue'})">
            <div class="calc-window">
                <div class="current">0</div>
                <div class="history"></div>
            </div>
            <div>
                <div class="numbers">
                    <div class="operator sqr" data-op="sqr" tabindex="3">x<sup>2</sup></div>
                    <div class="operator" data-op="del" tabindex="2">del</div>
                    <div class="operator" data-op="clr" tabindex="1">C</div>
                    <div class="number" data-op="9" tabindex="15">9</div>
                    <div class="number" data-op="8" tabindex="14">8</div>
                    <div class="number" data-op="7" tabindex="13">7</div>
                    <div class="number" data-op="6" tabindex="12">6</div>
                    <div class="number" data-op="5" tabindex="11">5</div>
                    <div class="number" data-op="4" tabindex="10">4</div>
                    <div class="number" data-op="3" tabindex="9">3</div>
                    <div class="number" data-op="2" tabindex="8">2</div>
                    <div class="number" data-op="1" tabindex="7">1</div>
                    <div class="operator" data-op="." tabindex="16">.</div>
                    <div class="number" data-op="0" tabindex="6">0</div>
                    <div class="operator" data-op="posneg" tabindex="17">+/-</div>
                </div>
                <div class="operators">
                    <div class="operator" data-op="/" tabindex="3">/</div>
                    <div class="operator" data-op="*" tabindex="3">x</div>
                    <div class="operator" data-op="+" tabindex="4">+</div>
                    <div class="operator" data-op="-" tabindex="4">-</div>
                    <div class="operator" data-op="=" tabindex="5">=</div>
                </div>
            </div>
        </div>
    `
	const win: any = element.querySelector('.calc-window .current')
	const history: any = element.querySelector('.calc-window .history')
	const calc: any = element.querySelector('.moxy-calculator')
	let lastAction: string = ''
	let lastOp: string = ''
	let isLocked: boolean = false
	if (calc && history && win) {
		/* TODO - Fix SQR, fix subtracting using = over and over when not 0 */
		calc.onkeypress = (e: any) => {
			const key = String.fromCharCode(e.which)
			if (calc && calc.querySelector(`div[data-op='${key}']`)) {
				calc.querySelector(`div[data-op='${key}']`).click()
				calc.querySelector(`div[data-op='${key}']`).focus()
				setTimeout(() => calc.focus(), 50)
			}
		}
		calc.onkeyup = (e: any) => {
			let key: string = ''
			if (e.which === 46 || e.which === 8) {
				key = 'del'
				calc.querySelector(`div[data-op='${key}']`).click()
				calc.querySelector(`div[data-op='${key}']`).focus()
				setTimeout(() => calc.focus(), 50)
			}
		}
		element.querySelectorAll('.number').forEach((n: any) => {
			n.onkeypress = (e: any) => {
				if (e.which === 13 && !isLocked) {
					isLocked = true
					e.target.click()
					isLocked = false
				}
			}
			n.onclick = (e: any) => {
				if (isLocked) {
					return
				}
				isLocked = true
				if ((win && win.innerHTML === '0') || lastAction === 'op') {
					win.innerHTML = e.target.innerHTML
				} else if (win) {
					win.innerHTML += e.target.innerHTML
					win.innerHTML = Number(
						win.innerHTML.replace(/,/g, ''),
					).toLocaleString()
				}
				lastAction = 'num'
				isLocked = false
			}
		})
		let memory: string = ''
		let lastMemory: string = ''
		/* TODO - cleanup code */
		element.querySelectorAll('.operator').forEach((n: any) => {
			n.onkeypress = (e: any) => {
				if (e.which === 13 && !isLocked) {
					isLocked = true
					e.target.click()
					isLocked = false
				}
			}
			n.onclick = (e: any) => {
				if (isLocked) {
					return
				}
				isLocked = true
				const operator = e.target.dataset.op
				if (operator === 'clr') {
					win.innerHTML = '0'
					memory = ''
					history.innerHTML = ''
					lastMemory = ''
					lastAction = ''
					lastOp = ''
					isLocked = false
					return
				} else if (operator === 'posneg') {
					if (win?.innerHTML.indexOf('-') === -1) {
						win.innerHTML = '-' + win.innerHTML
					} else if (win) {
						win.innerHTML = win.innerHTML.slice(1)
					}
					isLocked = false
					return
				} else if (operator === '.' && win) {
					if (win && lastAction === 'op') {
						win.innerHTML = '0.'
						lastAction = 'num'
					} else if (win.innerHTML.indexOf('.') === -1) {
						win.innerHTML += '.'
					}
					isLocked = false
					return
				} else if (operator === 'del') {
					if (lastOp === '=') {
						memory = ''
						history.innerHTML = memory
						isLocked = false
						return
					} else if (lastAction === 'num') {
						win.innerHTML = Number(
							win.innerHTML
								.slice(0, win.innerHTML.length - 1)
								.replace(/,/g, ''),
						)
						isLocked = false
						return
					} else {
						isLocked = false
						return
					}
				} else if (lastAction === 'op' && operator === '=') {
					if (lastOp === '=' && win) {
						memory =
							win.innerHTML.replace(/,/g, '') +
							' ' +
							lastMemory
								.split(' ')
								.slice(-4)
								.join(' ')
						history.innerHTML = memory
						const v = eval(memory.slice(0, memory.length - 2))
						if (v) {
							if (v.toString().length > 20) {
								win.innerHTML = Number(v).toPrecision()
							} else {
								win.innerHTML = Number(v).toLocaleString()
							}
						}
						isLocked = false
						return
					}
					memory = memory.slice(0, memory.length - 2) + operator + ' '
					history.innerHTML = memory
					isLocked = false
					return
				} else if (lastOp === '=') {
					memory = memory
						.split('=')
						.slice(1)
						.join('')
				} else if (lastOp === operator && lastAction === 'op') {
					isLocked = false
					return
				} else if (lastOp !== operator && lastAction === 'op') {
					memory =
						memory.slice(0, memory.length - 2) +
						' ' +
						operator +
						' '
					history.innerHTML = memory
					isLocked = false
					return
				}
				lastAction = 'op'

				memory +=
					win?.innerHTML.replace(/,/g, '') + ' ' + operator + ' '
				if (history) {
					history.innerHTML = memory
				}
				if (win) {
					const v = eval(memory.slice(0, memory.length - 2))
					if (v !== undefined) {
						if (v.toString().length > 20) {
							win.innerHTML = Number(v).toPrecision()
						} else {
							win.innerHTML = Number(v).toLocaleString()
						}
					}
				}
				if (operator === '=') {
					lastMemory = memory
					memory = ''
				}
				lastOp = operator
				isLocked = false
			}
		})
	}
}
