import shell from 'shelljs'
import { io } from "socket.io-client";

import { getConfig } from "./config/playerConfig";
import { TPlayer } from "./config/types";
import { wait } from "./helpers/helpers";
import { getSession } from './helpers/copy';
import { openBrowser } from './openBrowser';
import { start } from './start';

export const go = (propsPass?: any, indexNb?: string) => new Promise((res) => {
	process.setMaxListeners(Infinity)
	const props = propsPass || process.argv

	const arg = props[2]
	const max = Number(props[3] || 1)
	const checkAccount = props[4] !== 'none' ? props[4] : ''
	const nb = indexNb || props[5]

	if (!nb) { return }
	// console.log('go ', nb)

	const clientSocket = io('http://149.102.132.27:3000');

	const check = !!checkAccount || /check/i.test(arg)
	const checkLive = /checklive/i.test(arg)
	const varPath = process.platform === 'darwin' ? '/Users/mike/Dev/puppet/puppet/' : '/root/puppet/puppet/'

	let account = ''
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
		try {
			clientSocket.emit(event, {
				parentId,
				streamId,
				account,
				...params,
			});
		} catch (error) {
			console.log('socket already out')
		}
	}

	const exit = async (code = 0) => {
		console.log('EXIT', code)

		// shell.exec(`kill -9 ${process.env[`pid${nb}`]?.split(',').join(' ')}`, { silent: true })

		try {
			proto.close()
			chro.kill()
		} catch (error) { }

		if (/out_error_connect|tidalError|out_log_error/.test(code.toString())) {
			socketEmit('errorcheck', { account })
		} if (code.toString() === 'del') {
			socketEmit('del', { account })
		} else {
			socketEmit('checkok', { account })
		}

		socketEmit('over')

		code !== 500 && res(code)
		// process.exit()
	}

	process.on('SIGINT', async () => {
		console.log('SIGINT over go')
		await exit(500)
		shell.exec('killall chrome')
		process.exit()
	})

	clientSocket.on('activate', async (socketId: any) => {
		back = !!streamId

		if (!back && account === '') {
			streamId = socketId
			try {
				clientSocket.emit('isWaiting', { parentId, streamId, max, checkAccount })
			} catch (error) {
				console.log('socket error isWaiting')
			}
		}
		else if (account && account !== '') {
			try {
				clientSocket.emit('client', { parentId, streamId, account, max, back })
			} catch (error) {
				console.log('socket error client')
			}
		}
	})

	clientSocket.on('loaded', async () => {
		await wait(5 * 1000)
		try {
			clientSocket.emit('isWaiting', { parentId, streamId, max, checkAccount })
		} catch (error) {
			console.log('socket error isWaiting')
		}
	})

	clientSocket.on('canRun', async (a: any) => {
		account = a
		try {
			!checkLive && clientSocket.emit('client', { parentId, streamId, account, max })
		} catch (error) {
			console.log('socket error client')
		}
	})

	clientSocket.on('mRun', async (country: any) => {
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

		if (!protocol) {
			exit(123)
			return
		}

		// const list = shell.exec('pidof chrome', { silent: true })
		// const pids = list.stdout.split(' ').map(p => String(Number(p)))
		// const all = Array(max).fill('').map((a, index) => (process.env[`pid${index}`] || '')?.split(',')).flat()
		// const filtredPid = pids.filter(p => !all.includes(p))
		// process.env[`pid${nb}`] = filtredPid.join(',')

		const returnCode: any = await start({ ...browserProps, S, account, check, player, login, country, socketEmit }, chrome, protocol)

		console.log('returnCode', returnCode)

		exit(returnCode)
	})

	clientSocket.on('forceOut', async (props: any) => {
		// shell.exec(`kill -9 ${pid}`, { silent: true })
		exit(200)
	})
})

go()