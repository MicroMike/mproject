import { go } from './go'

const max = process.argv[3] || 1
const promises: Promise<unknown>[] = []

for (let i = 0; i < max; i++) {
	promises.push(go(process.argv))
}

Promise.all(promises).then(() => console.log('over'))
