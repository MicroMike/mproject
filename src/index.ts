import { go } from './go'

process.on('SIGINT', () => {
	console.log('SIGINT over index')
	process.exit()
})

const max = process.argv[3] || 1
const promises: Promise<unknown>[] = []

for (let i = 0; i < max; i++) {
	promises.push(go(process.argv))
}

Promise.all(promises).then(() => console.log('over'))
