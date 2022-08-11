import shell from 'shelljs'

const arg = process.argv[2]
const max = process.argv[3] || 1
const checkAccount = process.argv[4]

for (let i = 0; i < max; i++) {
	shell.exec(`node build/go.js ${arg} ${max} ${checkAccount}`)
}