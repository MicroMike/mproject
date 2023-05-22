const shell = require('shelljs');
var colors = require('colors');

const serverIp = '149.102.132.27'

export const getSession = (player: string, login: string) => new Promise((res, rej) => {
	const remoteFolder = /@gmail/.test(login) ? login : player + login
	const folder = player + login
	const isYoutube = player === 'youtube'
	const isTidal = player === 'tidal'
	const isSpotify = player === 'spotify'

	// @ts-ignore
	console.log('getSession'.green, player, login)

	// if (player === 'tidal') {
	// 	shell.exec(`mkdir -p /root/puppet/puppet/${folder}/Default`,{silent:true})
	// 	shell.exec(`scp -r root@${serverIp}:"/root/puppet/${folder}/Default/Session\\ Storage" /root/puppet/puppet/${folder}/Default/`,{silent:true})
	// 	shell.exec(`scp -r root@${serverIp}:"/root/puppet/${folder}/Default/Local\\ Storage" /root/puppet/puppet/${folder}/Default/`,{silent:true})
	// }

	// if (isYoutube || isTidal || isSpotify) {
	// 	shell.exec(`mkdir -p /root/puppet/puppet/${folder}`, { silent: true })
	// 	shell.exec(`scp -r root@${serverIp}:"/root/puppet/${remoteFolder}/*" /root/puppet/puppet/${folder}/`, { silent: true })
	// } else {
		shell.exec(`mkdir -p /root/puppet/puppet/${folder}/Default`, { silent: true })
		shell.exec(`scp -r root@${serverIp}:"/root/puppet/${remoteFolder}/Default/Session\\ Storage" /root/puppet/puppet/${folder}/Default/`, { silent: true })
		shell.exec(`scp -r root@${serverIp}:"/root/puppet/${remoteFolder}/Default/Local\\ Storage" /root/puppet/puppet/${folder}/Default/`, { silent: true })
		shell.exec(`scp -r root@${serverIp}:"/root/puppet/${remoteFolder}/Default/Login\\ Data\\ For\\ Account" /root/puppet/puppet/${folder}/Default/`, { silent: true })
		shell.exec(`scp -r root@${serverIp}:"/root/puppet/${remoteFolder}/Default/Login\\ Data" /root/puppet/puppet/${folder}/Default/`, { silent: true })
		shell.exec(`scp -r root@${serverIp}:"/root/puppet/${remoteFolder}/Default/Cookies" /root/puppet/puppet/${folder}/Default/`, { silent: true })
		shell.exec(`scp -r root@${serverIp}:"/root/puppet/${remoteFolder}/Default/Accounts" /root/puppet/puppet/${folder}/Default/`, { silent: true })
		shell.exec(`scp -r root@${serverIp}:"/root/puppet/${remoteFolder}/Default/Sessions" /root/puppet/puppet/${folder}/Default/`, { silent: true })
		shell.exec(`scp -r root@${serverIp}:"/root/puppet/${remoteFolder}/Default/*.*" /root/puppet/puppet/${folder}/Default/`, { silent: true })
	// }

	// @ts-ignore
	console.log('END getSession'.green, player, login)

	res(true)
})

export const copyBack = (player: string, login: string) => new Promise((res, rej) => {
	const remoteFolder = /@gmail/.test(login) ? login : player + login
	const folder = player + login
	const isYoutube = player === 'youtube'
	const isTidal = player === 'tidal'
	const isSpotify = player === 'spotify'

	// @ts-ignore
	console.log('copyBack'.green, player, login)

	// if (player === 'tidal') {
	// 	shell.exec(`ssh root@${serverIp} mkdir -p /root/puppet/${folder}/Default`,{silent:true})
	// 	shell.exec(`scp -r /root/puppet/puppet/${folder}/Default/Session\\ Storage root@${serverIp}:"/root/puppet/${folder}/Default/"`,{silent:true})
	// 	shell.exec(`scp -r /root/puppet/puppet/${folder}/Default/Local\\ Storage root@${serverIp}:"/root/puppet/${folder}/Default/"`,{silent:true})
	// }

	// if (isYoutube || isTidal || isSpotify) {
	// 	// shell.exec(`ssh root@${serverIp} mkdir -p /root/puppet/${folder}`, { silent: true })
	// 	shell.exec(`scp -r /root/puppet/puppet/${folder}/* root@${serverIp}:"/root/puppet/${remoteFolder}"`, { silent: true })
	// } else {
		shell.exec(`ssh root@${serverIp} mkdir -p /root/puppet/${remoteFolder}/Default`, { silent: true })
		shell.exec(`scp -r /root/puppet/puppet/${folder}/Default/Session\\ Storage root@${serverIp}:"/root/puppet/${folder}/Default/"`, { silent: true })
		shell.exec(`scp -r /root/puppet/puppet/${folder}/Default/Local\\ Storage root@${serverIp}:"/root/puppet/${folder}/Default/"`, { silent: true })
		shell.exec(`scp -r /root/puppet/puppet/${folder}/Default/Login\\ Data\\ For\\ Account root@${serverIp}:"/root/puppet/${folder}/Default/"`, { silent: true })
		shell.exec(`scp -r /root/puppet/puppet/${folder}/Default/Login\\ Data root@${serverIp}:"/root/puppet/${folder}/Default/"`, { silent: true })
		shell.exec(`scp -r /root/puppet/puppet/${folder}/Default/Cookies root@${serverIp}:"/root/puppet/${folder}/Default/"`, { silent: true })
		shell.exec(`scp -r /root/puppet/puppet/${folder}/Default/Accounts root@${serverIp}:"/root/puppet/${folder}/Default/"`, { silent: true })
		shell.exec(`scp -r /root/puppet/puppet/${folder}/Default/Sessions root@${serverIp}:"/root/puppet/${folder}/Default/"`, { silent: true })
		shell.exec(`scp -r /root/puppet/puppet/${folder}/Default/*.* root@${serverIp}:"/root/puppet/${folder}/Default/"`, { silent: true })
	// }

	// @ts-ignore
	console.log('END copyBack'.green, player, login)

	res(true)
})
