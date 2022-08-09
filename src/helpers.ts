import { albums } from './albums'
import { TPlayer } from './types';

const wait = (time: number) => new Promise(async (res, rej) => {
	setTimeout(async () => {
		res(true)
	}, time);
})

const rand = (max: number, min = 0) => {
	return Math.floor(Math.random() * Math.floor(max + 1 - min)) + min;
}

const waitForSelector = (R: any, selector: string, time = 60) => new Promise((res, rej) => {
	let inter: any

	const timeToWait = setTimeout(() => {
		clearInterval(inter)
		res(false)
	}, time * 1000);

	inter = setInterval(async () => {
		const el = R && await R.evaluate({ expression: 'document.querySelector(\'' + selector + '\')' })

		if (el.result.objectId) {
			res(true)
			clearInterval(inter)
			clearTimeout(timeToWait)
		}
	}, 500);
})

const click = (R: any, selector: string, time?: number, exitOnError = true) => new Promise(async (res, rej) => {
	const wfs = R && await waitForSelector(R, selector, time)

	await wait(rand(5, 1) * 1000)
	R && await R.evaluate({ expression: 'document.querySelectorAll(\'' + selector + '\')[0].click()' })

	res(wfs)
})

const type = (R: any, value: string, selector: string) => new Promise(async (res, rej) => {
	await waitForSelector(R, selector)

	await wait(rand(3, 1) * 1000)

	const randVar = rand(10000)

	const typeExpression = `
			const setValue${randVar} = Object.getOwnPropertyDescriptor(HTMLInputElement.prototype, 'value').set;
			const event${randVar} = new Event('input', { bubbles: true });

			setValue${randVar}.call(document.querySelector('${selector}'), '${value}');
			document.querySelector('${selector}').dispatchEvent(event${randVar});
		`

	R && await R.evaluate({ expression: typeExpression })

	res(true)
})

const getTimePlayer = async (R: any, S: any) => {
	const e = R && await R.evaluate({ expression: `document.querySelector('${S.timeLine}') && document.querySelector('${S.timeLine}').innerText` })
	const time = e.result.value && S.callback(e.result.value)

	return time
}

const goToPage = async (url: string, P: any, S: any) => {

	await wait(rand(5, 3) * 1000)

	await P.navigate({ url: url });
	await P.loadEventFired();

	await wait(rand(5, 3) * 1000)
}

const press = async (I: any, key: string) => {
	if (closed) { return }

	await wait(rand(5, 3) * 1000)

	await I.dispatchKeyEvent({
		type: 'keyDown',
		key: key,
		code: key,
	})

	await wait(rand(500, 100))

	await I.dispatchKeyEvent({
		type: 'keyUp',
		key: key,
		code: key,
	})
}

const pressedEnter = async (I: any) => {
	await I.dispatchKeyEvent({ "type": "rawKeyDown", "windowsVirtualKeyCode": 13, "unmodifiedText": "\r", "text": "\r" })
	await wait(rand(500, 100))
	await I.dispatchKeyEvent({ "type": "char", "windowsVirtualKeyCode": 13, "unmodifiedText": "\r", "text": "\r" })
	await wait(rand(500, 100))
	await I.dispatchKeyEvent({ "type": "keyUp", "windowsVirtualKeyCode": 13, "unmodifiedText": "\r", "text": "\r" })
}

const disableAlert = async (R: any) => {
	await R && R.evaluate({ expression: `window.alert = () => { };` })
}

const album = (player: TPlayer) => {
	const als = albums[player]
	const albumUrl = als[rand(als.length - 1)]

	return albumUrl
}

const tidalSelect = (R: any) => new Promise(async (res, rej) => {
	const expression = `
		const rand = (max, min = 0) => {
			return Math.floor(Math.random() * Math.floor(max) + min);
		}

		const artist = document.querySelectorAll('[class*="artistContainer"]')

		if(artist?.length > 0) {
			setTimeout(() => {
				artist[rand(artist.length)].click()
			}, 1000 * 1);
			setTimeout(() => {
				artist[rand(artist.length)].click()
			}, 1000 * 2);
			setTimeout(() => {
				artist[rand(artist.length)].click()
			}, 1000 * 3);

			setTimeout(() => {
				document.querySelector('[class*="continueButtonContainer"] button').click()
			}, 1000 * 4);
		}
		`

	R && await R.evaluate({ expression })
	res(true)
})

const get = async (R: any, selector: string, getter = 'innerHTML') => {
	await wait(rand(5, 3) * 1000)

	const expression = `document.querySelector('${selector}') && document.querySelector('${selector}')['${getter}']`
	const e = R && await R.evaluate({ expression })

	return e.result.value
}

export {
	album,
	click,
	disableAlert,
	get,
	getTimePlayer,
	goToPage,
	press,
	pressedEnter,
	rand,
	tidalSelect,
	type,
	wait,
	waitForSelector,
}