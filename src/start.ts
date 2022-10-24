import { TPlayer } from "./config/types"
import { album, click, getTimePlayer, goToPage, rand, takeScreenshot, wait } from "./helpers/helpers"
import { userConnect } from "./userConnect"

export const start = (props: any, chrome: any, protocol: any) => new Promise(async (res) => {
	const { N, P, R, D, B, I, T, S, socketEmit, player, login, check } = props

	let error = false
	let currTime: number
	let next: boolean
	let countPlays = 0
	let pauseCount = 0
	let out: any = false
	let playByLoop = rand(7, 2)
	let playlLoop = 0
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

		const time = await getTimePlayer(R, S)

		S.shuffleBtn !== '' && await click(R, S.shuffleBtn)

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
			await click(R, S.play, 60)

			socketEmit('playerInfos', { time, freeze: true, warn: pauseCount < 5, countPlays })
		}

		if (pauseCount > 10) {
			await takeScreenshot(P, 'freeze', socketEmit, login)
			out = 'freeze'
		}
		else if (countPlays > playByLoop || pauseCount > 5) {
			if (player === 'apple') {
				await click(R, S.pauseBtn)
				await wait(rand(5, 3) * 1000)
			}

			const alb = album(player as TPlayer)
			await goToPage(alb, P)

			await I.dispatchMouseEvent({
				type: 'mousePressed',
				button: 'left',
				x: 315,
				y: 390
			})

			await wait(rand(5, 3) * 1000)
			await click(R, S.play, 60)

			if (pauseCount === 0) {
				++playlLoop
				countPlays = 0
				socketEmit('playerInfos', { time: 'PLAY', ok: true })
			}
		} else if (playlLoop === 5 || check) {
			out = 'logout'
		}

		currTime = time

		await wait(5000)
		!out && await inter()
	}

	await inter()
	res(isError())
})