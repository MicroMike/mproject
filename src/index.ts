import { go } from './go'
import { wait } from './helpers/helpers'
import shell from 'shelljs'

const props = process.argv
const arg = props[2]
const max = Number(props[3] || 1)
const checkAccount = props[4] || 'none'

shell.exec('rm -rf /root/puppet/puppet/', { async: true })
// shell.exec('killall chrome')

const status = Array(Number(max) + 1).fill(false)

const infiniteLoop = async (i: number) => {
	await go(process.argv, i)
	// shell.exec(`node build/go.js ${arg} ${max} ${checkAccount} ${i}`, async () => {
	// shell.exec('git pull')
	status[i] = false
	process.env[`pid${i}`] = ''
	// })
}

Array(max).fill('').forEach((a, index) => {
	const idx = index + 1

	if (index === 0) { return }

	process.env[`pid${idx}`] = ''

	if (!status[idx]) {
		console.log('go idx', idx)
		status[idx] = true
		infiniteLoop(idx)
	}

	setInterval(() => {
		if (!status[idx]) {
			status[idx] = true
			infiniteLoop(idx)
		}
	}, 1000 * 60 * 5)
})
