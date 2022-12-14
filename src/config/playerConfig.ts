import { TPlayer } from "./types"

export const getConfig = (player: TPlayer) => {
	const S = {
		noNeedLog: '[class*="badgeContainer"]',
		gotoLog: '#login-button',
		loginError: '.box-error',
		email: '#email',
		pass: '#password',
		next: '.btn-client-primary',
		connectBtn: '.btn-success.btn-client-primary',
		play: '[data-test="shuffle-all"]',
		pauseBtn: '',
		shuffleBtn: '',
		timeLine: '[data-test="current-time"]',
		callback: (a: any) => (a.split(':').reduce((a: any, b: any) => a * 60 + Number(b))),
		nextBtn: '[data-test="next"]'
	}

	if (player === 'spotify') {
		S.noNeedLog = '[data-testid="user-widget-link"]'
		S.gotoLog = '[data-testid="login-button"]'
		S.loginError = '.alert.alert-warning'
		S.email = '#login-username'
		S.pass = '#login-password'
		S.connectBtn = '#login-button'
		S.play = '[data-testid="action-bar-row"] [data-testid="play-button"]'
		S.timeLine = '[data-testid="playback-position"]'
		S.shuffleBtn = '[aria-checked="false"][data-testid="control-button-shuffle"]'

		// S.repeatBtn = '[class*="spoticon-repeat"]'
		// S.repeatBtnOk = '.spoticon-repeat-16.control-button--active'
		// S.shuffleBtn = '.spoticon-shuffle-16:not(.control-button--active)'
		// S.nextBtn = '.spoticon-skip-forward-16'
		// S.usedDom = '.ConnectBar'
	}

	if (player === 'apple') {
		S.noNeedLog = '.web-navigation__auth-button--sign-out'
		S.gotoLog = '.web-navigation__auth-button--sign-in'
		S.loginError = '.alert.alert-warning'
		S.email = '#account_name_text_field'
		S.pass = '#password_text_field'
		S.connectBtn = '#sign-in'
		// S.play = '.shuffle-button'
		S.shuffleBtn='[aria-label="Lecture aléatoire"][aria-disabled="false"]'
		S.play = '.play-button'
		S.pauseBtn = '.web-chrome-playback-controls__playback-btn[aria-label="Pause"]'
		S.timeLine = '.web-chrome-playback-lcd__playback-time'
	}

	if (player === 'amazon') {
		S.noNeedLog = '#accountSetting'
		S.gotoLog = '#signInButton'
		S.loginError = '.upsellButton'
		S.email = '#ap_email'
		S.pass = '#ap_password'
		S.connectBtn = '#signInSubmit'
		S.play = '#detailHeaderButton2'
		S.timeLine = '#transport > :last-child > :last-child span'

		// remember = '[name="rememberMe"]'
		// usedDom = '.concurrentStreamsPopover'
	}

	if (player === 'napster') {
		// url = 'https://app.napster.com/login/'
		// S.gotoLog = '#nav-login-btn'
		// S.loginError = '.login-error'
		S.noNeedLog = '[data-testid="top-navigation-dropdown"]'
		S.email = '[data-testid="username"]'
		S.pass = '[data-testid="password"]'
		S.connectBtn = '[data-testid="login-button"]'
		S.play = '[data-testid="box"] [type="button"]'
		S.timeLine = '[data-testid="mini-player"] [data-testid="box"] span'
	}

	return S
}
