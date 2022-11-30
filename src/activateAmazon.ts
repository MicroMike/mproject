import { click, get, type, waitForSelector, rand } from "./helpers/helpers"
import { openBrowser } from "./openBrowser"

const props = process.argv
const arg = props[2]
const address = props[3]
const city = props[4]
const card = '5354 5627 2150 9230'
const code = '766'
const date = '1027'

const go = async () => {
	const { chrome, protocol, ...browserProps } = await openBrowser(arg, Math.random().toString())


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
	}

	await type(R, password, '#ap_password')
	await click(I, R, '#signInSubmit')

	const skip = await waitForSelector(R, '#ap-account-fixup-phone-skip-link', 5)
	skip && await click(I, R, '#ap-account-fixup-phone-skip-link')

	// await waitForSelector(R, '[title="AMÉLIORER OFFRE"]', 60 * 1000 * 10)
	// await click(I, R, '[title="AMÉLIORER OFFRE"]')
	// await click(I, R, '#dialogButton1')

	await click(I, R, '[value="modifier"]')
	await click(I, R, '[data-action="a-expander-toggle"]')

	await type(R, 'Micro', '[name="ppw-accountHolderName"]')
	await type(R, card, '[name="addCreditCardNumber"]')
	await type(R, code, '[name="addCreditCardVerificationNumber"]')

	await waitForSelector(R, '[name="ppw-line1"]', 60 * 1000 * 10)
	await type(R, address, '[name="ppw-line1"]')
	await type(R, city, '[name="ppw-city"]')
	await type(R, '75010', '[name="ppw-postalCode"]')
	await type(R, '06' + rand(99999999, 11111111), '[name="ppw-phoneNumber"]')

	await click(I, R, '[name="ppw-widgetEvent:AddAddressEvent"]')
	await click(I, R, '[name="ppw-widgetEvent:UseSuggestedAddressEvent"]')
}

go()