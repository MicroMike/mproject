import { TPlayer } from "./config/types"
import { album, click, get, getAppleTimePlayer, getTimePlayer, goToPage, rand, takeScreenshot, wait } from "./helpers/helpers"
import { userConnect } from "./userConnect"

export const start = (props: any, chrome: any, protocol: any) => new Promise(async (res) => {
	const { N, P, R, D, B, I, T, S, socketEmit, player, login, check, country } = props

	let error = false
	let currTime: number
	let next: boolean
	let countPlays = 0
	let pauseCount = 0
	let out: any = false
	let playByLoop = rand(7, 2)
	let playLoop = 0
	let timeout: any

	const userCallback: any = await userConnect(props)
		.catch((e) => error = e.error)

	const isError = () => out || error || userCallback.error

	if (isError()) {
		res(isError())
		return
	}

	const inter = async () => {
		clearTimeout(timeout)

		timeout = setTimeout(() => {
			out = true
		}, 5 * 60 * 1000);

		const time = await (player !== 'apple' ? getTimePlayer : getAppleTimePlayer)(R, S)
		// S.shuffleBtn !== '' && await click(I, R, S.shuffleBtn, 10)

		if (player === 'amazon') {
			const dialogHeader = await get(R, '#dialog', 'innerText')
			if (/Share|Partager/.test(dialogHeader)) {
				out = 'del'
			}
		}

		if (player === 'tidal') {
			const dialogHeader = await get(R, '[data-test="notification"]', 'innerText')
			if (/quota|exceeded/i.test(dialogHeader)) {
				out = 'del'
			}
		}

		if (time > currTime) {
			pauseCount = 0

			if (!next && time > 30) {
				next = true
				++countPlays
				socketEmit('plays', { next: false, currentAlbum: userCallback.alb, countPlays })
			} else {
				socketEmit('playerInfos', { time, ok: true, countPlays })
			}
		} else if (time < currTime) {
			pauseCount = 0
			next = false
		} else {
			++pauseCount

			await I.dispatchMouseEvent({
				type: 'mousePressed',
				button: 'left',
				x: 315,
				y: 390
			})

			await wait(rand(5, 3) * 1000)
			await click(I, R, S.play, 60)

			socketEmit('playerInfos', { time, freeze: true, warn: pauseCount < 5, countPlays, playLoop })
		}

		if (pauseCount > 10) {
			await takeScreenshot(P, 'freeze', socketEmit, login)
			out = 'freeze'
		}
		else if (countPlays > playByLoop || pauseCount > 5) {
			if (player === 'apple') {
				await click(I, R, S.pauseBtn)
				await wait(rand(5, 3) * 1000)
			}

			const alb = album(player as TPlayer, country)
			await goToPage(alb, P, R, I)

			await I.dispatchMouseEvent({
				type: 'mousePressed',
				button: 'left',
				x: 315,
				y: 390
			})

			await wait(rand(5, 3) * 1000)
			await click(I, R, S.play, 60)

			if (pauseCount === 0) {
				++playLoop
				countPlays = 0
				socketEmit('playerInfos', { time: 'PLAY', ok: true })
			}
		} else if (playLoop === 5 || check) {
			out = 'logout'
		}

		currTime = time

		await wait(5000)

		if (out && player === 'apple') {
			await click(I, R, S.pauseBtn, 10)
			await wait(2000)
		}

		!out && await inter()
	}

	await inter()
	res(isError())
})