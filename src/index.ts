// import { go } from './go'
import { wait } from './helpers/helpers'
import shell from 'shelljs'

const props = process.argv
const arg = props[2]
const max = Number(props[3] || 1)
const checkAccount = props[4] || ''

shell.exec('rm -rf /root/puppet/puppet/')

const infiniteLoop = async () => {
	// await go(process.argv)
	await shell.exec(`node build/go.js ${arg} ${max} ${checkAccount}`)
	await wait(5000)
	await infiniteLoop()
}

for (let i = 0; i < (max || 1); i++) {
	infiniteLoop()
}
