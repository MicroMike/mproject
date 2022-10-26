import { TPlayer } from './config/types';
import { copyBack } from './helpers/copy';
import {
	album,
	goToPage,
	disableAlert,
	rand,
	wait,
	waitForSelector,
	press,
	pressedEnter,
	type,
	click,
	tidalSelect,
	get,
	takeScreenshot,
} from './helpers/helpers';
var colors = require('colors');

export const userConnect = async ({ P, R, I, S, account, check, socketEmit }: any) => new Promise(async (res, rej) => {
	try {
		const [player, login, pass] = account.split(':')

		const isTidal = player === 'tidal'
		const isSpotify = player === 'spotify'
		const isAmazon = player === 'amazon'
		const isNapster = player === 'napster'
		const isApple = player === 'apple'

		const alb = album(player as TPlayer)
		await goToPage(alb, P)

		if (player === 'apple') {
			await disableAlert(R)
		}

		const isLogged = !check && await waitForSelector(R, S.noNeedLog, 30)

		if (!isLogged) {
			// @ts-ignore
			check && console.log('need log'.green, player, login)

			if (isAmazon) {
				await P.navigate({ url: 'https://music.amazon.fr/forceSignIn?useHorizonte=true' });
				P.loadEventFired();
			} else if (isNapster) {
				await P.navigate({ url: 'https://web.napster.com/auth/login' });
				await P.loadEventFired();
			} else {
				await click(R, S.gotoLog)
			}

			if (isApple) {
				await wait(rand(5, 3) * 1000)
				await press(I, 'Tab')

				await wait(rand(5, 3) * 1000)
				await press(I, 'Tab')

				await wait(rand(5, 3) * 1000)
				await I.insertText({
					text: login,
				})

				await wait(rand(5, 3) * 1000)
				await pressedEnter(I)

				await wait(rand(5, 3) * 1000)
				await I.insertText({
					text: pass,
				})

				await wait(rand(5, 3) * 1000)
				await pressedEnter(I)
			}
			else {
				// const amazonReLog = isAmazon && await waitForSelector(R, '#ap_switch_account_link', 5)
				const amazonReLogBody = isAmazon && await get(R, 'body', 'innerText')
				const loginRegex = new RegExp(login)
				const amazonReLog = amazonReLogBody && loginRegex.test(amazonReLogBody)

				if (amazonReLog) {
					console.log('amazonReLog')
				} else {
					await I.dispatchMouseEvent({
						type: 'mousePressed',
						button: 'left',
						x: 315,
						y: 390
					})

					await waitForSelector(R, S.email, 30)
					await type(R, login, S.email)

					isTidal && await click(R, S.next)

					const outNoLogging = await waitForSelector(R, S.loginError, 5)

					if (outNoLogging) {
						if (isTidal) {
							throw 'del'
						}
						await takeScreenshot(P, 'out_no_logging', socketEmit, login)
						throw 'out_no_logging'
					}
				}

				await type(R, pass, S.pass)

				await click(R, S.connectBtn)

				const outErrorConnect = await waitForSelector(R, S.loginError, 10)

				if (outErrorConnect) {
					if (isTidal) {
						throw 'del'
					}
					await takeScreenshot(P, 'out_error_connect', socketEmit, login)
					throw 'out_error_connect'
				}

				isTidal && await tidalSelect(R)
			}
		}

		await wait(rand(5, 3) * 1000)

		const spotifyLogError = await get(R, 'body', 'innerText')

		if (spotifyLogError && /Incorrect/.test(spotifyLogError)) {
			console.log('SPOTIFY_LOG_ERROR', spotifyLogError)
			await takeScreenshot(P, 'out_log_error', socketEmit, login)
			throw 'out_log_error'
		}

		const logSuccess = await waitForSelector(R, S.noNeedLog, 120)

		if (!logSuccess) {
			if (isTidal) {
				throw 'tidalError'
			}
			await takeScreenshot(P, 'out_log_error', socketEmit, login)
			throw 'out_log_error'
		}

		if (!isLogged) {
			// @ts-ignore
			console.log(login, 'log Success'.green)
		} else {
			// @ts-ignore
			console.log(login, 'log Success'.green, 'noNeedLog'.yellow)
		}

		socketEmit('playerInfos', { time: 'CONNECT', other: true })

		if (isSpotify || isTidal) {
			await click(R, '#onetrust-accept-btn-handler', 5)
		}

		await goToPage(alb, P)

		await wait(rand(5, 3) * 1000)

		await I.dispatchMouseEvent({
			type: 'mousePressed',
			button: 'left',
			x: 315,
			y: 390
		})

		await wait(rand(5, 3) * 1000)
		await click(R, S.play)
		await wait(rand(5, 3) * 1000)

		socketEmit('playerInfos', { time: 'PLAY', ok: true })

		await wait(rand(5, 3) * 1000)

		copyBack(player, login)

		if (isTidal) {
			const delTidal = await get(R, '.ReactModal__Overlay', 'innerText')
			if (/expired/.test(delTidal)) {
				throw 'del'
			}
		}

		res({ alb })
	} catch (error) {
		rej({ error })
	}
})