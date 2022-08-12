import { getTimePlayer, wait } from "./helpers/helpers"
import { userConnect } from "./userConnect"

export const start = (props: any, chrome: any, protocol: any) => new Promise(async (res) => {
	const { N, P, R, D, B, I, T, S, socketEmit } = props

	let error = false
	let currTime: number
	let next: boolean
	let countPlays = 0
	let pauseCount = 0
	let out = false

	const userCallback: any = await userConnect(props)
		.catch((e) => error = e)

	const inter = async () => {
		const time = await getTimePlayer(R, S)

		if (time > currTime) {
			pauseCount = 0

			if (!next && time > 30) {
				next = true
				++countPlays
				socketEmit('plays', { next: false, currentAlbum: userCallback.alb, countPlays })
			} else {
				socketEmit('playerInfos', { time, ok: true, countPlays })
			}
		} else if (time < currTime) {
			pauseCount = 0
			next = false
		} else {
			++pauseCount
			socketEmit('playerInfos', { time, freeze: true, warn: pauseCount < 3, countPlays })
		}

		if (countPlays > 5) {
			out = true
		}
		else if (pauseCount > 5) {
			out = true
		}

		currTime = time

		await wait(5000)
		!out && await inter()
	}

	await inter()

	protocol.close()
	chrome.kill()

	res(error || userCallback.error)
})