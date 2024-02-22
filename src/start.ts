import { shuffle } from 'lodash'
import { nbTracks } from "./config/albums"
import { click, clickOnText, get, getAlbums, getAppleTimePlayer, getTimePlayer, goToPage, press, pressedEnter, pressedSpace, rand, takeScreenshot, wait } from "./helpers/helpers"
import { userConnect } from "./userConnect"
const request = require('ajax-request');

export const start = (props: any, chrome: any, protocol: any) => new Promise(async (res) => {
	const { N, P, R, D, B, I, T, S, socketEmit, player, login, check, country } = props

	let error = false
	let currTime: number
	let next: boolean
	let countPlays = 0
	let pauseCount = 0
	let out: any = false
	let playLoop = 0
	let timeout: any
	let alb: string
	let playByLoop: number
	let album: any

	const userCallback: any = await userConnect(props)
		.catch((e) => error = e.error)

	const isError = () => out || error || userCallback.error

	if (isError()) {
		res(isError())
		return
	}

	const albums = shuffle(getAlbums(player, country).map((alb, idx) => ({ alb, nb: nbTracks[idx] })))
	const initLength = albums.length

	album = albums.shift() || {}

	alb = album.alb || ''
	playByLoop = rand(album.nb * 2, Math.ceil(album.nb / 2)) || 0

	alb && await goToPage(alb, P, R, I)

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

			const bodyHtml = await get(R, 'body', 'innerText')
			if (/Try Amazon/.test(bodyHtml)) {
				out = 'pause'
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
				socketEmit('plays', { next: false, currentAlbum: alb, countPlays })
			} else {
				socketEmit('playerInfos', { time, ok: true, countPlays })
			}
		} else if (time < currTime) {
			pauseCount = 0
			next = false
		} else {
			++pauseCount

			if (pauseCount > 1) {
				await wait(rand(5, 3) * 1000)
				await click(I, R, S.play, 60)

				const isPandoraAd = await get(R, 'body', 'innerText')

				if (player === 'pandora' && /Watch Ad/.test(isPandoraAd)) {
					console.log('need ad click')
					await press(I, 'Tab')
					await press(I, 'Tab')

					await wait(rand(5, 3) * 1000)
					await pressedEnter(I)
				}
			}

			socketEmit('playerInfos', { time, freeze: true, warn: pauseCount < 5, countPlays, playLoop })
		}

		if (albums.length < Math.ceil(initLength / 2) || check) {
			out = 'logout'
		} else if (pauseCount > 10) {
			await takeScreenshot(P, 'freeze', socketEmit, login)
			out = 'freeze'
		}
		else if (countPlays === playByLoop || pauseCount > 5) {
			await pressedSpace(I)
			await wait(rand(5, 3) * 1000)

			album = albums.shift() || {}

			alb = album.alb || ''
			playByLoop = rand(album.nb * 2, Math.ceil(album.nb / 2)) || 0

			alb && await goToPage(alb, P, R, I)

			await wait(rand(5, 3) * 1000)
			await click(I, R, S.play, 60)

			const isPandoraAd = await get(R, 'body', 'innerText')

			if (player === 'pandora' && /Watch Ad/.test(isPandoraAd)) {
				console.log('need ad click')
				await press(I, 'Tab')
				await press(I, 'Tab')

				await wait(rand(5, 3) * 1000)
				await pressedEnter(I)
			}

			if (pauseCount === 0) {
				countPlays = 0
				socketEmit('playerInfos', { time: 'PLAY', ok: true })
			}
		}

		currTime = time

		await wait(5000)

		if (out) {
			await pressedSpace(I)
			await wait(2000)
		}

		!out && await inter()
	}

	await inter()
	res(isError())
})