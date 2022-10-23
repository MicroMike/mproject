import { go } from './go'
import { wait } from './helpers/helpers'
import shell from 'shelljs'

const props = process.argv
const arg = props[2]
const max = Number(props[3] || 1)
const checkAccount = props[4] || 'none'

shell.exec('rm -rf /root/puppet/puppet/')
// shell.exec('killall chrome')

const status = Array(max).fill(false)

const infiniteLoop = async (i: number) => {
	if (!i) { return }

	await go(process.argv, String(i))
	// shell.exec(`node build/go.js ${arg} ${max} ${checkAccount} ${i}`, async () => {
	// shell.exec('git pull')
	status[i] = false
	process.env[`pid${i}`] = ''
	// })
}

Array(max).fill('').forEach((a, index) => {
	process.env[`pid${index}`] = ''

	if (!status[index]) {
		status[index] = true
		infiniteLoop(index)
	}

	setInterval(() => {
		if (!status[index]) {
			status[index] = true
			infiniteLoop(index)
		}
	}, 1000 * 60 * 5)
})
