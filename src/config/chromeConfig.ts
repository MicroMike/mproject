const chromeLauncher = require('chrome-launcher');

export const chromeConfig = (player?: string, login?: string) => {
	return async () => {
		return await chromeLauncher.launch({
			chromeFlags: [
				'--chromePath=/bin/google-chrome-stable',
				'--no-first-run',
				'--disable-gpu',
				'--disable-features=Translate',
				'--no-sandbox',
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
