import { rand } from "../helpers/helpers";

const chromeLauncher = require('chrome-launcher');

const uAgents = [
	'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/112.0.0.0 Safari/537.36',
	'Mozilla/5.0 (Macintosh; Intel Mac OS X 13_3_1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/112.0.0.0 Safari/537.36'
]

export const chromeConfig = (player?: string, login?: string) => {
	return async () => {
		return await chromeLauncher.launch({
			chromeFlags: [
				'--chromePath=/bin/google-chrome-stable',
				'--no-first-run',
				// '--disable-gpu',
				'--disable-features=Translate',
				'--no-sandbox',
				'--disable-prompt-on-repost',
				// `--user-agent=${uAgents[rand(uAgents.length - 1)]}`,
				player && login && '--user-data-dir=/root/puppet/puppet/' + player + login,
				// '--disable-setuid-sandbox',
				// '--remote-debugging-port=' + port,
			]
		});

		// if (!pid) {
		// 	console.log('CHROME ERROR'.red, c, player, login)
		// 	await wait(5000)
		// 	c = ;
		// }
	}
}
