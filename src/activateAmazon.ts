import { click, get, type, waitForSelector } from "./helpers/helpers"
import { openBrowser } from "./openBrowser"

const props = process.argv
const arg = props[2]
const address = props[3]
const card = '5354 5627 2150 9230'
const code = '677'
const date = '1027'

const go = async () => {
	const { chrome, protocol, ...browserProps } = await openBrowser(arg, Math.random().toString())


	// @ts-ignore
	const { N, P, R, D, B, I, T, S, socketEmit, player, login, check } = browserProps

	if (!protocol || !P) { return }

	const [email, password] = arg.split(':')

	await P.navigate({ url: 'https://www.amazon.fr/ap/signin?openid.return_to=https%3A%2F%2Fmusic.amazon.fr%2Funlimited%2Fsignup%3Fref_%3Ddmm_acq_mrn_d_br_z_5KYaMwzV-c_c_603803518763_g_101656084518%26notNowRedirectURL%3DL211c2ljL3VubGltaXRlZA%253D%253D&openid.identity=http%3A%2F%2Fspecs.openid.net%2Fauth%2F2.0%2Fidentifier_select&openid.assoc_handle=amzn_webamp_fr&openid.mode=checkid_setup&language=fr_FR&openid.claimed_id=http%3A%2F%2Fspecs.openid.net%2Fauth%2F2.0%2Fidentifier_select&pageId=amzn_cpweb&openid.ns=http%3A%2F%2Fspecs.openid.net%2Fauth%2F2.0' });
	// @ts-ignore
	P.loadEventFired();

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
	await type(R, 'Paris', '[name="ppw-city"]')
	await type(R, '75010', '[name="ppw-postalCode"]')
	await type(R, '0637827364', '[name="ppw-phoneNumber"]')

	await click(I, R, '[name="ppw-widgetEvent:AddAddressEvent"]')
	await click(I, R, '[name="ppw-widgetEvent:UseSuggestedAddressEvent"]')
}

go()