import { albums } from '../config/albums'
import { TPlayer } from '../config/types';

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
			clearInterval(inter)
			clearTimeout(timeToWait)
			res(true)
		}
	}, 1000);
})

const click = (I: any, R: any, selector: string, time?: number, exitOnError = true, index = 0) => new Promise(async (res, rej) => {
	const wfs = R && await waitForSelector(R, selector, time)

	await wait(rand(5, 2) * 1000)

	const e = R && await R.evaluate({ expression: `document.querySelectorAll("${selector}")[${index}].getBoundingClientRect().left` })
	const f = R && await R.evaluate({ expression: `document.querySelectorAll("${selector}")[${index}].getBoundingClientRect().top` })

	const x = Number(e.result.value) + 10
	const y = Number(f.result.value) + 10

	if (!x || isNaN(x) || !y || isNaN(y)) {
		R && await R.evaluate({ expression: 'document.querySelectorAll(\'' + selector + '\')[0].click()' })
		res(wfs)
		return
	}

	// console.log('x, y', x, y)

	const option = {
		button: 'left',
		x,
		y,
		clickCount: 1,
	}

	await I.dispatchMouseEvent({
		...option,
		type: 'mousePressed',
	})

	await wait(rand(2, 1) * 100)

	await I.dispatchMouseEvent({
		...option,
		type: 'mouseReleased',
	})

	res(wfs)
})

const clickOnText = (I: any, R: any, selector: string, text: string, time?: number, exitOnError = true) => new Promise(async (res, rej) => {
	// const wfs = R && await waitForSelector(R, selector, time)
	try {
		await wait(rand(5, 2) * 1000)
		//	Object.values(document.querySelectorAll('span')).filter((e)=>/Se connecter/g.test(e.innerHTML))[0]

		const e = R && await R.evaluate({ expression: `Object.values(document.querySelectorAll('${selector}')).filter((e)=>/${text}/g.test(e.innerHTML))[0].getBoundingClientRect().left` })
		const f = R && await R.evaluate({ expression: `Object.values(document.querySelectorAll('${selector}')).filter((e)=>/${text}/g.test(e.innerHTML))[0].getBoundingClientRect().top` })

		const x = Number(e.result.value) + 10
		const y = Number(f.result.value) + 10

		console.log('clickOnText', text, x, y)

		if (!x || isNaN(x) || !y || isNaN(y)) {
			res(false)
			return
		}

		// console.log('x, y', x, y)

		const option = {
			button: 'left',
			x,
			y,
			clickCount: 1,
		}

		await I.dispatchMouseEvent({
			...option,
			type: 'mousePressed',
		})

		await wait(rand(2, 1) * 100)

		await I.dispatchMouseEvent({
			...option,
			type: 'mouseReleased',
		})

		res(true)
	}
	catch (e) {
		console.log('clickOnText', e)
		res(false)
	}
})

const clickOnCoord = (I: any, R: any, selector: string, time?: number, exitOnError = true) => new Promise(async (res, rej) => {
	// const wfs = R && await waitForSelector(R, selector, time)
	try {
		await wait(rand(5, 2) * 1000)

		const [x, y] = selector.split(',')

		const option = {
			button: 'left',
			x,
			y,
			clickCount: 1,
		}

		await I.dispatchMouseEvent({
			...option,
			type: 'mousePressed',
		})

		await wait(rand(2, 1) * 100)

		await I.dispatchMouseEvent({
			...option,
			type: 'mouseReleased',
		})

		res(true)
	}
	catch (e) {
		console.log('clickOnCoord', e)
		res(false)
	}
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

const select = async (R: any, selector: string, value: string) => {
	const e = R && await R.evaluate({ expression: `document.querySelector('${selector}').value = "${value}"` })
}

const getTimePlayer = async (R: any, S: any) => {
	const e = R && await R.evaluate({ expression: `document.querySelector('${S.timeLine}') && document.querySelector('${S.timeLine}').innerText.trim()` })
	const time = e.result.value && S.callback(e.result.value)

	return Number(time)
}

const getAppleTimePlayer = async (R: any, S: any) => {
	const e = R && await R.evaluate({ expression: `document.querySelector("#scrollable-page > div > div > amp-chrome-player > div:nth-child(1) > div > amp-lcd").shadowRoot.querySelector("amp-lcd-progress > div > div > time.lcd-progress__time.lcd-progress__time--elapsed").innerText` })
	const time = e.result.value && S.callback(e.result.value)

	return Number(time)
}

const goToPage = async (url: string, P: any, R: any, I: any) => {
	await wait(rand(5, 3) * 1000)

	try {
		await P.navigate({ url: url });
		P.loadEventFired();
	} catch (error) { console.log('navigate error') }

	await wait(rand(5, 3) * 1000)
}

const press = async (I: any, key: string) => {
	await wait(rand(3, 1) * 1000)

	await I.dispatchKeyEvent({
		type: 'keyDown',
		key: key,
		code: key.length === 1 ? 'Key' + key.toUpperCase() : key,
	})

	await wait(rand(500, 100))

	await I.dispatchKeyEvent({
		type: 'keyUp',
		key: key,
		code: key.length === 1 ? 'Key' + key.toUpperCase() : key,
	})

	await wait(rand(500, 100))
}

const pressedEnter = async (I: any) => {
	await I.dispatchKeyEvent({ "type": "rawKeyDown", "windowsVirtualKeyCode": 13, "unmodifiedText": "\r", "text": "\r" })
	await wait(rand(500, 100))
	await I.dispatchKeyEvent({ "type": "char", "windowsVirtualKeyCode": 13, "unmodifiedText": "\r", "text": "\r" })
	await wait(rand(500, 100))
	await I.dispatchKeyEvent({ "type": "keyUp", "windowsVirtualKeyCode": 13, "unmodifiedText": "\r", "text": "\r" })
}

const pressedKey = async (I: any, key: number) => {
	await I.dispatchKeyEvent({ "type": "rawKeyDown", "windowsVirtualKeyCode": key, "unmodifiedText": String.fromCharCode(key), "text": String.fromCharCode(key) })
	await wait(rand(500, 100))
	await I.dispatchKeyEvent({ "type": "char", "windowsVirtualKeyCode": key, "unmodifiedText": String.fromCharCode(key), "text": String.fromCharCode(key) })
	await wait(rand(500, 100))
	await I.dispatchKeyEvent({ "type": "keyUp", "windowsVirtualKeyCode": key, "unmodifiedText": String.fromCharCode(key), "text": String.fromCharCode(key) })
}

const pressedSpace = async (I: any) => {
	await I.dispatchKeyEvent({ "type": "rawKeyDown", "windowsVirtualKeyCode": 32, "unmodifiedText": "\r", "text": "\r" })
	await wait(rand(500, 100))
	await I.dispatchKeyEvent({ "type": "char", "windowsVirtualKeyCode": 32, "unmodifiedText": "\r", "text": "\r" })
	await wait(rand(500, 100))
	await I.dispatchKeyEvent({ "type": "keyUp", "windowsVirtualKeyCode": 32, "unmodifiedText": "\r", "text": "\r" })
}

const disableAlert = async (R: any) => {
	await R && R.evaluate({ expression: `window.alert = () => { }; ` })
}

const album = (player: TPlayer, country?: string) => {
	const als = albums(country)[player]
	const albumUrl = als[rand(als.length - 1)]

	return albumUrl
}

const getAlbums = (player: TPlayer, country?: string) => {
	return albums(country)[player]
}

const tidalSelect = (R: any) => new Promise(async (res, rej) => {
	const expression = `
const rand = (max, min = 0) => {
	return Math.floor(Math.random() * Math.floor(max) + min);
}

const artist = document.querySelectorAll('[class*="artistContainer"]')

if (artist?.length > 0) {
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

const get = async (R: any, selector: string, getter = 'innerHTML'): Promise<string> => {
	await wait(rand(5, 3) * 1000)

	const expression = `document.querySelector('${selector}') && document.querySelector('${selector}')['${getter}']`
	const e = R && await R.evaluate({ expression })

	return e.result.value
}

const takeScreenshot = async (P: any, e: string, socketEmit: any, login: string) => {
	try {
		const { data } = await P.captureScreenshot();
		socketEmit('screen', { img: data, log: login + ' => ' + e })
	}
	catch (e) {
		console.log('screenshot error', e)
	}
}

export {
	album,
	getAlbums,
	click,
	clickOnText,
	clickOnCoord,
	disableAlert,
	get,
	getTimePlayer,
	getAppleTimePlayer,
	goToPage,
	press,
	pressedEnter,
	pressedSpace,
	rand,
	takeScreenshot,
	tidalSelect,
	type,
	wait,
	waitForSelector,
	select,
	pressedKey,
}