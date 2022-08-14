import shell from 'shelljs'
import { io } from "socket.io-client";

import { getConfig } from "./config/playerConfig";
import { TPlayer } from "./config/types";
import { click, getTimePlayer, wait } from "./helpers/helpers";
import { userConnect } from "./userConnect";
import { copyBack, getSession } from './helpers/copy';
import { openBrowser } from './openBrowser';
import { start } from './start';

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
	let S: any

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
		socketEmit('over')

		res(code)
	}

	process.on('SIGINT', () => {
		console.log('SIGINT over go')
		shell.exec('killall chrome')
		socketEmit('over')
		process.exit()
	})

	clientSocket.on('activate', async (socketId: any) => {
		console.log('activate')
		back = !!streamId

		if (!back) {
			streamId = socketId
			clientSocket.emit('isWaiting', { parentId, streamId, max })
		}
		else if (account && account !== '') {
			clientSocket.emit('client', { parentId, streamId, account, max, back })
		}
	})

	clientSocket.on('loaded', async () => {
		await wait(5 * 1000)
		clientSocket.emit('isWaiting', { parentId, streamId, max })
	})

	clientSocket.on('canRun', async (a: any) => {
		console.log('canRun', a)
		account = a
		!checkLive && clientSocket.emit('client', { parentId, streamId, account, max })
	})

	clientSocket.on('mRun', async (props: any) => {
		console.log('mRun')
		const [p, a] = account.split(':')
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

		S = getConfig(player as TPlayer)

		const { chrome, protocol, ...browserProps } = await openBrowser(player, login)

		const returnCode: any = await start({ ...browserProps, S, account, check, player, socketEmit }, chrome, protocol)

		console.log('returnCode', returnCode)

		exit(returnCode)
	})
})
