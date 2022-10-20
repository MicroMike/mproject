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

const infiniteLoop = async (i: number) => {
	// await go(process.argv)
	shell.exec(`node build/go.js ${arg} ${max} ${checkAccount}`, async () => {
		shell.exec('git pull')
		status[i] = false
	})
}

for (let i = 0; i < max; i++) {
	setInterval(() => {
		if (!status[i]) {
			status[i] = true
			infiniteLoop(i)
		}
	}, 1000 * 60 * 5)
}
