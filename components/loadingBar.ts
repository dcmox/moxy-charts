import { IMoxyUIOptions, MoxyUIDefaultOptions } from '../lib/IMoxyUI'

export const loadingBar = async (
	element: HTMLElement,
	opts?: IMoxyUIOptions,
): Promise<any> => {
	if (!opts) {
		opts = MoxyUIDefaultOptions
	}
	const bar = document.createElement('div')
	bar.className = 'moxy-loading-bar'
	const track = document.createElement('div')
	track.style.setProperty(
		'background-color',
		opts.color ? 'var(--' + opts.color + ')' : 'var(--green)',
	)
	track.className = 'track'
	bar.append(track)
	element.prepend(bar)
	const FPS = 60
	const ETA = (opts.maxTime / 1000) * FPS
	let isDone: boolean = false
	let progress: number = 0
	function step(): any {
		if (progress < 95) {
			progress += 100 / ETA
		} else {
			const remainder = Math.floor((100 - progress) / 4)
			progress += 100 / ETA / (10 - remainder)
		}
		if (progress > 99.5 && !isDone) {
			window.requestAnimationFrame(step)
			return
		}
		track.style.width = progress + '%'
		if (progress < 100) {
			window.requestAnimationFrame(step)
		}
	}

	window.requestAnimationFrame(step)
	await opts.fn()
	isDone = true
	progress = 100
	bar.classList.add('moxy-fade')
	setTimeout(() => {
		bar.remove()
	}, 2000)
	return true
}
