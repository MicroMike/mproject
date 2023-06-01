import { go } from './go'
import { wait } from './helpers/helpers'
import shell from 'shelljs'

const props = process.argv
const arg = props[2]
const max = Number(props[3] || 1)
const checkAccount = props[4] || 'none'

// const clientSocket = io('http://216.158.239.199:3000');

const l = shell.exec('pidof node', { silent: true })
const nodePids = l.stdout.split(' ').map(p => String(Number(p)))

console.log('pid', nodePids)

shell.exec('rm -rf /root/puppet/puppet/', { async: true })
shell.exec('killall chrome')

const status = Array(max).fill(false)

const infiniteLoop = async (i: number) => {
	// await go(process.argv, String(i))
	// process.env[`pid${i}`] = ''
	shell.exec(`tsc && node build/go.js ${arg} ${max} ${checkAccount} ${i}`, async () => {
		// shell.exec('git reset --hard')
		shell.exec('git pull --rebase')
		status[i] = false
	})
}

for (let a = 0; a < max; a++) {
	process.env[`pid${a}`] = ''

	if (!status[a]) {
		// console.log('go a', a)
		status[a] = true
		infiniteLoop(a)
	}

	setInterval(() => {
		if (!status[a]) {
			status[a] = true
			infiniteLoop(a)
		}
	}, 1000 * 60 * 5)
}

setInterval(() => {
	const list = shell.exec('pidof node', { silent: true })
	const pids = list.stdout.split(' ').map(p => String(Number(p))).filter((p) => !nodePids.includes(p))

	shell.exec('rm -rf /root/puppet/puppet/', { async: true })
	shell.exec(`kill -9 ${pids.join(' ')}`, { silent: true })
	shell.exec('killall chrome')
	
	// clientSocket.emit('reset')
}, 1000 * 60 * 60 * 6)