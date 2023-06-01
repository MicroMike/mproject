import { openBrowser } from "./openBrowser"
import shell from 'shelljs'
import { getConfig } from './config/playerConfig'
import { TPlayer } from "./config/types";
import { press, wait, rand, pressedEnter, album, goToPage, click, type, pressedSpace, pressedKey } from "./helpers/helpers";
const request = require('ajax-request');

const props = process.argv
const arg = props[2]
const code = props[3]

const go = async () => {
	shell.exec('rm -rf /Users/mike/puppet/puppet/', { async: true })

	const [player, login, pass] = arg.split(':')
	const { chrome, protocol, ...browserProps } = await openBrowser(player, login)
	const S = getConfig(player as TPlayer)


	// @ts-ignore
	const { N, P, R, D, B, I, T, socketEmit } = browserProps

	if (!protocol || !P) { return }

	await P.navigate({ url: 'https://gmail.com' });
	// @ts-ignore
	P.loadEventFired();

	// await press(I, 'Tab')
	// await press(I, 'Tab')
	// await press(I, 'Tab')
	// await press(I, 'Tab')
	// await press(I, 'Tab')

	// await wait(rand(5, 3) * 1000)
	// await pressedEnter(I)
	await wait(rand(5, 3) * 1000)

	await I.insertText({
		text: login,
	})

	await press(I, 'Tab')
	await press(I, 'Tab')
	await press(I, 'Tab')

	await wait(rand(5, 3) * 1000)
	await pressedEnter(I)


	await wait(rand(5, 3) * 1000)
	await I.insertText({
		text: pass,
	})

	await press(I, 'Tab')
	await press(I, 'Tab')

	await wait(rand(5, 3) * 1000)
	await pressedEnter(I)

	const alb = album(player as TPlayer)
	await goToPage(alb, P, R, I)

	await click(I, R, S.signUp)
	await click(I, R, '#onetrust-accept-btn-handler', 5)

	await click(I, R, S.signEmail)
	const months = ['j', 'f', 'm', 'a', 's', 'o', 'n', 'd']

	if (player === 'spotify') {
		await type(R, rand(25, 1).toString(), '#day')
		await click(I, R, '#day')

		await press(I, 'Tab')
		await pressedKey(I, months[rand(months.length-1, 0)].charCodeAt(0))

		await press(I, 'Tab')
		await I.insertText({
			text: '199' + rand(9, 0),
		})

		await press(I, 'Tab')
		await press(I, 'ArrowUp')

		await press(I, 'Tab')
		await press(I, 'Tab')
		await press(I, 'Tab')

		await pressedEnter(I)

		await click(I, R, S.signSubmit)

		await wait(rand(5, 3) * 1000)
		await goToPage(`https://www.spotify.com/fr/family/join/confirm/${code}/`, P, R, I)
		await wait(rand(5, 3) * 1000)
		await goToPage(`https://www.spotify.com/fr/family/join/address/${code}/`, P, R, I)
		await wait(rand(5, 3) * 1000)

		await type(R, '37 rue du coq saint marceau', '#address')
		await click(I, R, '#address')
		await pressedEnter(I)
		await pressedEnter(I)
		await wait(rand(5, 3) * 1000)

		await goToPage(`http://149.102.132.27:3000/addAccount?${arg}`, P, R, I)
		await wait(rand(5, 3) * 1000)
	}
}

go()