import { go } from './go'
import { wait } from './helpers/helpers'

const max = process.argv[3] || 1
const promises: Promise<unknown>[] = []

const infiniteLoop = async () => {
	await go(process.argv)
	await wait(5000)
	await infiniteLoop()
}

for (let i = 0; i < max; i++) {
	infiniteLoop()
}
