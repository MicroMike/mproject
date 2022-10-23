import { go } from './go'
import { wait } from './helpers/helpers'
import shell from 'shelljs'

const props = process.argv
const arg = props[2]
const max = Number(props[3] || 1)
const checkAccount = props[4] || ''

shell.exec('rm -rf /root/puppet/puppet/')
shell.exec('killall chrome')

const status = Array(max).fill(false)
const pids = Array(max).fill([])

// @ts-ignore
process.pids = pids

const infiniteLoop = async (i: number) => {
	// await go(process.argv)
	shell.exec(`node build/go.js ${arg} ${max} ${checkAccount} ${i}`, async () => {
		shell.exec('git pull')
		status[i] = false
		// @ts-ignore
		process.pids[i] = []
	})
}

for (let i = 0; i < max; i++) {
	if (!status[i]) {
		status[i] = true
		infiniteLoop(i)
	}

	setInterval(() => {
		if (!status[i]) {
			status[i] = true
			infiniteLoop(i)
		}
	}, 1000 * 60 * 5)
}
