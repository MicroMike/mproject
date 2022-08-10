
process.setMaxListeners(Infinity)

import CDP from 'chrome-remote-interface'
import socketIo from 'socket.io-client'
import shell from 'shelljs'

import { chromeConfig } from "./config/chromeConfig";
import { getConfig } from "./config/playerConfig";
import { TPlayer } from "./config/types";
import { click, wait } from "./helpers/helpers";
import { userConnect } from "./userConnect";
import { copyBack, getSession } from './helpers/copy';

const clientSocket = socketIo('http://216.158.239.199:3000', { transports: ['websocket'] });

const arg = process.argv[2]
const max = process.argv[3] || 1
const checkAccount = process.argv[4]

const check = !!checkAccount || /check/i.test(arg)
const checkLive = /checklive/i.test(arg)
const varPath = process.platform === 'darwin' ? '/Users/mike/Dev/puppet/puppet/' : '/root/puppet/puppet/'

let account = checkAccount || ''
let parentId = arg
let streamId: string
let back: boolean
let player: string
let login: string

const socketEmit = (event: any, params: any) => {
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

	process.exit(code)
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

	const returnCode: any = await go()

	console.log('returnCode', returnCode)

	exit(returnCode)
})

const go = async () => {
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

	const returnCode = await userConnect(protocol, S, account, socketEmit, check)
		.catch((e) => error = e)

	return error || returnCode
}
