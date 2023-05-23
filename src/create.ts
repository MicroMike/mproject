import { openBrowser } from "./openBrowser"
import shell from 'shelljs'
import { getConfig } from './config/playerConfig'
import { TPlayer } from "./config/types";
import { press, wait, rand, pressedEnter, album, goToPage, click, type, pressedSpace } from "./helpers/helpers";
const request = require('ajax-request');

const props = process.argv
const arg = props[2]
const address = props[3]
const city = props[4]

const go = async () => {
	shell.exec('rm -rf /root/puppet/puppet/', { async: true })

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
	// await click(I, R, '#onetrust-accept-btn-handler', 5)

	await press(I, 'Tab')
	await press(I, 'Tab')
	await wait(rand(5, 3) * 1000)
	await press(I, 'Enter')

	if (player === 'spotify') {
		await type(R, rand(25, 1).toString(), '#day')

		await press(I, 'Tab')
		await press(I, 'ArrowDown')
		await press(I, 'ArrowDown')
		await press(I, 'ArrowDown')

		await press(I, 'Tab')
		await I.insertText({
			text: '1992',
		})

		await press(I, 'Tab')
		await press(I, 'ArrowUp')

		await press(I, 'Tab')
		await press(I, 'Tab')
		await press(I, 'Tab')

		await pressedEnter(I)

		await press(I, 'Tab')
		await press(I, 'Tab')
		await press(I, 'Tab')
		await press(I, 'Tab')

		await pressedEnter(I)
	}
}

go()