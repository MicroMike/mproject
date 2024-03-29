import CDP from 'chrome-remote-interface'
import { chromeConfig } from "./config/chromeConfig";
import { wait } from "./helpers/helpers";

export const openBrowser = async (player?: string, login?: string) => {
	const launchChrome = chromeConfig(player, login)

	const chrome = await launchChrome()

	const options = {
		host: '127.0.0.1',
		port: chrome.port
	}

	await wait(5 * 1000)

	let protocol

	try {
		protocol = await CDP(options);
	} catch (error) {
		console.log('browser error')
		protocol = {}
	}

	const { Network, Page, Runtime, DOM, Input, Browser, Target } = protocol as CDP.Client;

	// extract domains
	const N = Network;
	const P = Page;
	const R = Runtime;
	const D = DOM;
	const B = Browser;
	const I = Input;
	const T = Target;

	const targets = await T.getTargets()
	targets.targetInfos.forEach((target, idx) => {
		if (idx > 0) {
			Target.closeTarget({ targetId: target.targetId })
		}
	});

	return { chrome, protocol, N, P, R, D, B, I, T }
}