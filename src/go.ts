import CDP from 'chrome-remote-interface'
import shell from 'shelljs'
import { io } from "socket.io-client";

import { chromeConfig } from "./config/chromeConfig";
import { getConfig } from "./config/playerConfig";
import { TPlayer } from "./config/types";
import { click, getTimePlayer, wait } from "./helpers/helpers";
import { userConnect } from "./userConnect";
import { copyBack, getSession } from './helpers/copy';

export const go = (props: any) => new Promise((res) => {
	process.setMaxListeners(Infinity)

	const clientSocket = io('http://216.158.239.199:3000');

	const arg = props[2]
	const max = props[3] || 1
	const checkAccount = props[4]

	const check = !!checkAccount || /check/i.test(arg)
	const checkLive = /checklive/i.test(arg)
	const varPath = process.platform === 'darwin' ? '/Users/mike/Dev/puppet/puppet/' : '/root/puppet/puppet/'

	let account = checkAccount || ''
	let parentId = arg
	let streamId: string
	let back: boolean
	let player: string
	let login: string
	let out = false
	let inter: any
	let currTime: number
	let next: boolean
	let countPlays = 0
	let pauseCount = 0

	const socketEmit = (event: any, params = {}) => {
		clientSocket.emit(event, {
			parentId,
			streamId,
			account,
			...params,
		});
	}

	const exit = async (code = 0) => {
		console.log('EXIT', code)

		clientSocket.emit('checkok', { account })
		clientSocket && clientSocket.disconnect()

		res(code)
	}

	const goOut = () => {
		clearInterval(inter)
		out = true
	}

	const waitForOut = async () => {
		console.log('waitForOut')
		await wait(5 * 1000)
		!out && await waitForOut()
	}

	clientSocket.on('activate', async (socketId: any) => {
		console.log('activate')
		back = !!streamId
		streamId = socketId

		if (!back) {
			clientSocket.emit('isWaiting', { parentId, streamId, max })
		}
		else {
			clientSocket.emit('client', { parentId, streamId, account, max, back })
		}
	})

	clientSocket.on('canRun', async (a: any) => {
		console.log('canRun', a)
		account = a
		!checkLive && clientSocket.emit('client', { parentId, streamId, account, max })
	})

	clientSocket.on('mRun', async (props: any) => {
		console.log('mRun')
		const [p, a, pass] = account.split(':')
		player = p
		login = a

		try {
			shell.exec('rm -rf ' + varPath + player + login, { silent: false })
			!check && await getSession(player, login)
		} catch (e) {
			console.log(e)
		}

		if (check) {
			console.log(account);
		}

		const returnCode: any = await start()

		console.log('returnCode', returnCode)

		exit(returnCode)
	})

	const start = async () => {
		const [player, login, pass] = account.split(':')

		const appleGoToPage = async () => {
			if (player === 'apple') {
				await click(R, S.pauseBtn, 1, false)
			}
		}

		const S = getConfig(player as TPlayer)
		const launchChrome = chromeConfig(player, login)

		const chrome = await launchChrome()

		const options = {
			host: '127.0.0.1',
			port: chrome.port
		}

		await wait(5 * 1000)

		const protocol = await CDP(options);

		const { Network, Page, Runtime, DOM, Input, Browser, Target } = protocol;

		// extract domains
		const N = Network;
		const P = Page;
		const R = Runtime;
		const D = DOM;
		const B = Browser;
		const I = Input;
		const T = Target;

		let error = false

		const props = { P, R, I, S, account, check, socketEmit }

		const userCallback: any = await userConnect(props)
			.catch((e) => error = e)

		inter = setInterval(async () => {
			const time = await getTimePlayer(R, S)

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
				socketEmit('playerInfos', { time, freeze: true, warn: pauseCount < 3, countPlays })
			}

			if (countPlays > 1) {
				goOut()
			}

			currTime = time

			console.log('inter time', time)
		}, 5000)

		await waitForOut()

		protocol.close()
		chrome.kill()

		return error || userCallback.error
	}
})
