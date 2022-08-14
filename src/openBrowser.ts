import CDP from 'chrome-remote-interface'
import { chromeConfig } from "./config/chromeConfig";
import { wait } from "./helpers/helpers";

export const openBrowser = async (player: string, login: string) => {
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
	
	process.on('SIGINT', () => {
		console.log('SIGINT over browser')

		protocol.close()
		chrome.kill()
	})

	return { chrome, protocol, N, P, R, D, B, I, T }
}