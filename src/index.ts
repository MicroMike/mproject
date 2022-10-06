import { go } from './go'
import { wait } from './helpers/helpers'
import shell from 'shelljs'

const [a, arg, max = 1, checkAccount] = process.argv
const promises: Promise<unknown>[] = []

shell.exec('rm -rf /root/puppet/puppet/')

const infiniteLoop = async () => {
	// await go(process.argv)
	console.log('go start')
	shell.exec(`node go ${arg} ${max} ${checkAccount}`, { async: true })
	console.log('go end')
	await wait(5000)
	await infiniteLoop()
}

for (let i = 0; i < max; i++) {
	infiniteLoop()
}
