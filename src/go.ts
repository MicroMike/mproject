import shell from 'shelljs'
import { io } from "socket.io-client";

import { getConfig } from "./config/playerConfig";
import { TPlayer } from "./config/types";
import { wait } from "./helpers/helpers";
import { getSession } from './helpers/copy';
import { openBrowser } from './openBrowser';
import { start } from './start';

export const go = () => new Promise((res) => {
	process.setMaxListeners(Infinity)
	const props = process.argv

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
	let S: any
	let chro: any
	let proto: any
	let pid: any

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

		try {
			proto.close()
			chro.kill()
		} catch (error) { }

		if (/out_error_connect|tidalError|out_log_error/.test(code.toString())) {
			socketEmit('errorcheck', { account })
		} else {
			socketEmit('checkok', { account })
		}

		socketEmit('over')

		code !== 500 && res(code)
		process.exit()
	}

	setTimeout(() => {
		exit(400)
	}, 60 * 60 * 1000);

	process.on('SIGINT', async () => {
		console.log('SIGINT over go')
		await exit(500)
		shell.exec('killall chrome')
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
			!check && getSession(player, login)
		} catch (e) {
			console.log(e)
		}

		if (check) {
			console.log(account);
		}

		S = getConfig(player as TPlayer)

		const { chrome, protocol, ...browserProps } = await openBrowser(player, login)
		chro = chrome
		proto = protocol
		pid = chrome.pid

		const returnCode: any = await start({ ...browserProps, S, account, check, player, login, socketEmit }, chrome, protocol)

		console.log('returnCode', returnCode)

		exit(returnCode)
	})

	clientSocket.on('forceOut', async (props: any) => {
		// shell.exec(`kill -9 ${pid}`, { silent: true })
		exit(200)
	})
})

go()