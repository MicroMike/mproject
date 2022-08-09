"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.copyBack = exports.getSession = void 0;
var shell = require('shelljs');
var colors = require('colors');
var getSession = function (player, login) { return new Promise(function (res, rej) {
    var folder = player + login;
    // @ts-ignore
    console.log('getSession'.green, player, login);
    // if (player === 'tidal') {
    // 	shell.exec(`mkdir -p /root/puppet/puppet/${folder}/Default`,{silent:true})
    // 	shell.exec(`scp -r root@216.158.239.199:"/root/puppet/${folder}/Default/Session\\ Storage" /root/puppet/puppet/${folder}/Default/`,{silent:true})
    // 	shell.exec(`scp -r root@216.158.239.199:"/root/puppet/${folder}/Default/Local\\ Storage" /root/puppet/puppet/${folder}/Default/`,{silent:true})
    // }
    // if (player === 'amazon' || player === 'spotify') {
    shell.exec("mkdir -p /root/puppet/puppet/".concat(folder, "/Default"), { silent: true });
    shell.exec("scp -r root@216.158.239.199:\"/root/puppet/".concat(folder, "/Default/Session\\ Storage\" /root/puppet/puppet/").concat(folder, "/Default/"), { silent: true });
    shell.exec("scp -r root@216.158.239.199:\"/root/puppet/".concat(folder, "/Default/Local\\ Storage\" /root/puppet/puppet/").concat(folder, "/Default/"), { silent: true });
    shell.exec("scp -r root@216.158.239.199:\"/root/puppet/".concat(folder, "/Default/Login\\ Data\\ For\\ Account\" /root/puppet/puppet/").concat(folder, "/Default/"), { silent: true });
    shell.exec("scp -r root@216.158.239.199:\"/root/puppet/".concat(folder, "/Default/Login\\ Data\" /root/puppet/puppet/").concat(folder, "/Default/"), { silent: true });
    shell.exec("scp -r root@216.158.239.199:\"/root/puppet/".concat(folder, "/Default/Cookies\" /root/puppet/puppet/").concat(folder, "/Default/"), { silent: true });
    // }
    // @ts-ignore
    console.log('END getSession'.green, player, login);
    res(true);
}); };
exports.getSession = getSession;
var copyBack = function (player, login) { return new Promise(function (res, rej) {
    var folder = player + login;
    // @ts-ignore
    console.log('copyBack'.green, player, login);
    // if (player === 'tidal') {
    // 	shell.exec(`ssh root@216.158.239.199 mkdir -p /root/puppet/${folder}/Default`,{silent:true})
    // 	shell.exec(`scp -r /root/puppet/puppet/${folder}/Default/Session\\ Storage root@216.158.239.199:"/root/puppet/${folder}/Default/"`,{silent:true})
    // 	shell.exec(`scp -r /root/puppet/puppet/${folder}/Default/Local\\ Storage root@216.158.239.199:"/root/puppet/${folder}/Default/"`,{silent:true})
    // }
    // if (player === 'amazon' || player === 'spotify') {
    shell.exec("ssh root@216.158.239.199 mkdir -p /root/puppet/".concat(folder, "/Default"), { silent: true });
    shell.exec("scp -r /root/puppet/puppet/".concat(folder, "/Default/Session\\ Storage root@216.158.239.199:\"/root/puppet/").concat(folder, "/Default/\""), { silent: true });
    shell.exec("scp -r /root/puppet/puppet/".concat(folder, "/Default/Local\\ Storage root@216.158.239.199:\"/root/puppet/").concat(folder, "/Default/\""), { silent: true });
    shell.exec("scp -r /root/puppet/puppet/".concat(folder, "/Default/Login\\ Data\\ For\\ Account root@216.158.239.199:\"/root/puppet/").concat(folder, "/Default/\""), { silent: true });
    shell.exec("scp -r /root/puppet/puppet/".concat(folder, "/Default/Login\\ Data root@216.158.239.199:\"/root/puppet/").concat(folder, "/Default/\""), { silent: true });
    shell.exec("scp -r /root/puppet/puppet/".concat(folder, "/Default/Cookies root@216.158.239.199:\"/root/puppet/").concat(folder, "/Default/\""), { silent: true });
    // }
    // @ts-ignore
    console.log('END copyBack'.green, player, login);
    res(true);
}); };
exports.copyBack = copyBack;
