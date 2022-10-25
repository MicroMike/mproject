import { click, type } from "./helpers/helpers"
import { openBrowser } from "./openBrowser"

const props = process.argv
const arg = props[2]

const go = async () => {
	const { chrome, protocol, ...browserProps } = await openBrowser(arg, '')
	// @ts-ignore
	const { N, P, R, D, B, I, T, S, socketEmit, player, login, check } = browserProps

	const password = arg.split('@')[0]
	const name = password.replace('.',' ')

	await P.navigate({ url: 'https://www.amazon.fr/ap/register?openid.pape.max_auth_age=0&openid.return_to=https%3A%2F%2Fwww.amazon.fr%2F%3F_encoding%3DUTF8%26ref_%3Dnav_custrec_newcust&openid.identity=http%3A%2F%2Fspecs.openid.net%2Fauth%2F2.0%2Fidentifier_select&openid.assoc_handle=frflex&openid.mode=checkid_setup&openid.claimed_id=http%3A%2F%2Fspecs.openid.net%2Fauth%2F2.0%2Fidentifier_select&openid.ns=http%3A%2F%2Fspecs.openid.net%2Fauth%2F2.0&' });
	// @ts-ignore
	P.loadEventFired();

	await type(R, name, '#ap_customer_name')
	await type(R, arg, '#ap_email')
	await type(R, password, '#ap_password')
	await type(R, password, '#ap_password_check')
	await click(R, '#continue')

}

go()