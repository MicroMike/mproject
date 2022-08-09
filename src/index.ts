
process.setMaxListeners(Infinity)

const CDP = require('chrome-remote-interface');
const socketIo = require('socket.io-client')

import { chromeConfig } from "./chromeConfig";
import { click, wait } from "./helpers";
import { getConfig } from "./playerConfig";
import { TPlayer } from "./types";
import { userConnect } from "./userConnect";

const clientSocket = socketIo('http://216.158.239.199:3000', { transports: ['websocket'] });

const arg = process.argv[2]
const max = process.argv[3] || 1
const checkAccount = process.argv[4]

const check = !!checkAccount || /check/i.test(arg)
let account = 'spotify:katie.williams@use.startmail.com:055625Ff'

const socketEmit = (event: any, params: any) => {
	// socket.emit(event, {
	// 	parentId,
	// 	streamId,
	// 	account,
	// 	...params,
	// });
}

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

	userConnect(protocol, S, account, socketEmit, check)

}

go()
