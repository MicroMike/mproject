import { TS } from './config/playerConfig';
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
	clickOnText,
} from './helpers/helpers';
var colors = require('colors');

export const userConnect = async ({ P, R, I, S, account, check, socketEmit, country }: Record<any, any> & { S: TS }) => new Promise(async (res, rej) => {
	try {
		const [player, login, pass] = account.split(':')

		const isGmail = /@gmail/i.test(account)
		const isTidal = player === 'tidal'
		const isSpotify = player === 'spotify'
		const isSpotifyG = false // isSpotify && isGmail
		const isAmazon = player === 'amazon'
		const isNapster = player === 'napster'
		const isApple = player === 'apple'
		const isYoutube = player === 'youtube'
		const isPandora = player === 'pandora'

		const alb = album(player as TPlayer, country)
		await goToPage(alb, P, R, I)

		// if (isSpotifyG) {
		// 	await click(I, R, '[data-testid="login-button"]')
		// 	await click(I, R, '[data-testid="google-login"]')

		// 	await click(I, R, '#onetrust-accept-btn-handler', 5)
		// }

		if (isTidal || isPandora) {
			await click(I, R, '#onetrust-accept-btn-handler', 5)
		}

		if (isAmazon) {
			await click(I, R, '#dialogButton1', 5)
		}

		if (isYoutube) {
			res({ alb })
			return
		}

		const isLogged = !check && await waitForSelector(R, S.noNeedLog, 10)

		try {
			if (!isLogged) {
				// @ts-ignore
				check && console.log('need log'.green, player, login, S.gotoLog)

				// if (isAmazon) {
				// 	await P.navigate({ url: 'https://music.amazon.fr/forceSignIn?useHorizonte=true' });
				// 	P.loadEventFired();
				// } else 
				if (isNapster) {
					await P.navigate({ url: 'https://web.napster.com/auth/login' });
					await P.loadEventFired();
				} else {
					if (isTidal) {
						await click(I, R, '#onetrust-accept-btn-handler', 5)
						await wait(3000)
					}
					if (isApple) {
						await press(I, 'Tab')
						await press(I, 'Tab')
						await press(I, 'Tab')
						await press(I, 'Tab')
						await press(I, 'Tab')
						await press(I, 'Tab')
						await press(I, 'Tab')
						await press(I, 'Tab')

						await wait(rand(5, 3) * 1000)
						await pressedEnter(I)
					}
					if (isSpotifyG || isYoutube) {
						const canLog = await waitForSelector(R, S.gotoLog, 15)

						if (!canLog) {
							await clickOnText(I, R, 'span', 'Sign in|Se connecter')
						}
					}

					// await click(I, R, S.gotoLog, 10, false)
					// isSpotifyG && await click(I, R, S.gotoLogG, 10, false)
				}


				if (isApple) {
					await press(I, 'Tab')
					await press(I, 'Tab')
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

				if (isYoutube || isSpotifyG) {
					if (isYoutube) {
						await click(I, R, S.gotoLog, 15)
					} else {
						await goToPage(S.urlCo, P, R, I)
					}
					await wait(rand(5, 3) * 1000)

					const text = await get(R, 'body', 'innerText')
					const isSign = /Signed out|Déconnecté/i.test(text)

					if (isSign) {
						await press(I, 'Tab')

						await wait(rand(5, 3) * 1000)
						await pressedEnter(I)
					} else {
						await I.insertText({
							text: login,
						})

						await clickOnText(I, R, 'span', 'Next|Suivant')
					}

					await wait(rand(5, 3) * 1000)

					await I.insertText({
						text: pass,
					})

					await clickOnText(I, R, 'span', 'Next|Suivant')

					await wait(rand(5, 3) * 1000)

					await goToPage(alb, P, R, I)

					await wait(rand(5, 3) * 1000)

					if (isSpotifyG) {
						await click(I, R, '[data-testid="login-button"]')
						await click(I, R, '[data-testid="google-login"]')

						await click(I, R, '#onetrust-accept-btn-handler', 5)
					}
				}
				else {
					await click(I, R, S.gotoLog, 10, false)

					// const amazonReLog = isAmazon && await waitForSelector(R, '#ap_switch_account_link', 5)
					const amazonReLogBody = isAmazon && await get(R, 'body', 'innerText')
					const loginRegex = new RegExp(login)
					const amazonReLog = amazonReLogBody && loginRegex.test(amazonReLogBody)

					if (!amazonReLog) {
						await waitForSelector(R, S.email, 10)
						await click(I, R, S.email)
						await type(R, login, S.email)

						isTidal && await click(I, R, S.next)
						isAmazon && await click(I, R, '#continue', 5)

						const outNoLogging = await waitForSelector(R, S.loginError, 5)

						if (outNoLogging) {
							if (isTidal) {
								throw 'del'
							}
							await takeScreenshot(P, 'out_no_logging', socketEmit, login)
							throw 'out_no_logging'
						}
					} else {
						await click(I, R, '.cvf-account-switcher-profile-business-name')
					}

					await click(I, R, S.pass)
					await type(R, pass, S.pass)
					await click(I, R, S.connectBtn)

					await wait(rand(5, 3) * 1000)

					const amazonRobot = await get(R, 'body', 'innerText')

					if (/robot./i.test(amazonRobot)) {
						await wait(10 * 1000)
					}

					if (isAmazon) {
						await click(I, R, '#ap-account-fixup-phone-skip-link', 10)
					}

					if (amazonReLog) {
						await goToPage(alb, P, R, I)
					}

					const pandoraNoExist = await get(R, S.notExist, 'innerText')

					if (pandoraNoExist) {
						await click(I, R, S.goToSub)

						await click(I, R, S.email)
						await type(R, login, S.email)

						await click(I, R, S.pass)
						await type(R, pass, S.pass)

						await click(I, R, '[name="birthYear"]')
						await type(R, rand(2000, 1992).toString(), '[name="birthYear"]')

						await click(I, R, '[name="zipCode"]')
						await type(R, '90017', '[name="zipCode"]')

						await click(I, R, '[value="NONBINARY"]')

						await click(I, R, '.FormButtonSubmit button')
					}

					const outErrorConnect = !isAmazon && !isPandora && await waitForSelector(R, S.loginError, 10)

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
				console.log('SPOTIFY_LOG_ERROR')
				await takeScreenshot(P, 'out_log_error', socketEmit, login)
				throw 'out_log_error'
			}
		} catch (error) { console.log('loop error') }

		let logSuccess = await waitForSelector(R, S.noNeedLog, 10)

		if (!logSuccess && isTidal) {
			await takeScreenshot(P, 'tidalError', socketEmit, login)
			throw 'tidalError'
		}

		if (isAmazon) {
			await click(I, R, '#dialogButton1', 5)
		}

		if (!logSuccess) {
			await takeScreenshot(P, 'out_log_error', socketEmit, login)
			throw 'out_log_error'
		}

		if (logSuccess) {
			if (!isLogged) {
				// @ts-ignore
				console.log(login, 'log Success'.green)
			} else {
				// @ts-ignore
				console.log(login, 'log Success'.green, 'noNeedLog'.yellow)
			}
		}

		socketEmit('playerInfos', { time: 'CONNECT', other: true })

		if (isSpotify || isTidal) {
			await click(I, R, '#onetrust-accept-btn-handler', 5)
		}

		if (!isYoutube) {
			await goToPage(alb, P, R, I)

			await wait(rand(5, 3) * 1000)

			await I.dispatchMouseEvent({
				type: 'mousePressed',
				button: 'left',
				x: 315,
				y: 390
			})
		}

		await wait(rand(5, 3) * 1000)
		await click(I, R, S.play)

		// const isPandoraAd = await get(R, 'body', 'innerText')

		// if (isPandora && /Watch Ad/.test(isPandoraAd)) {
		// 	await clickOnText(I, R, 'button', 'Watch Ad')
		// 	await wait(1000 * 17)
		// 	await clickOnText(I, R, 'button', 'Start My Reward')
		// 	await click(I, R, S.play)
		// }

		socketEmit('playerInfos', { time: 'PLAY', ok: true })

		await wait(rand(5, 3) * 1000)

		copyBack(player, login)

		if (isTidal) {
			const delTidal = await get(R, '.ReactModal__Overlay', 'innerText')
			const freeTidal = await get(R, 'body', 'innerText')

			if (/expired/.test(delTidal) || /ad free/.test(freeTidal)) {
				throw 'del'
			}
		}

		res({ alb })
	} catch (error) {
		rej({ error })
	}
})