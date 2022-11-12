import { click, type, waitForSelector } from "./helpers/helpers"
import { openBrowser } from "./openBrowser"

const props = process.argv
const arg = props[2]
const address = props[3]
const card = '5354562719087009'
const date = '1027'
const code = '191'

const go = async () => {
	const { chrome, protocol, ...browserProps } = await openBrowser(arg, '')

	
	// @ts-ignore
	const { N, P, R, D, B, I, T, S, socketEmit, player, login, check } = browserProps

	if (!protocol || !P) { return }

	const password = arg.split('@')[0]
	const name = password.replace('.', ' ')

	await P.navigate({ url: 'https://www.amazon.fr/ap/register?openid.pape.max_auth_age=0&openid.return_to=https%3A%2F%2Fwww.amazon.fr%2F%3F_encoding%3DUTF8%26ref_%3Dnav_custrec_newcust&openid.identity=http%3A%2F%2Fspecs.openid.net%2Fauth%2F2.0%2Fidentifier_select&openid.assoc_handle=frflex&openid.mode=checkid_setup&openid.claimed_id=http%3A%2F%2Fspecs.openid.net%2Fauth%2F2.0%2Fidentifier_select&openid.ns=http%3A%2F%2Fspecs.openid.net%2Fauth%2F2.0&' });
	// @ts-ignore
	P.loadEventFired();

	await type(R, name, '#ap_customer_name')
	await type(R, arg, '#ap_email')
	await type(R, password, '#ap_password')
	await type(R, password, '#ap_password_check')
	await click(I, R, '#continue')

	await waitForSelector(R, '[url-type="SUBSCRIPTION_BUTTON_URL_OVERRIDE"]', 60 * 1000 * 10)
	await click(I, R, '[url-type="SUBSCRIPTION_BUTTON_URL_OVERRIDE"]')

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