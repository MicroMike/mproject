import { TPlayer } from "./types"

export const getConfig = (player: TPlayer) => {
	const S = {
		noNeedLog: '[class*="badgeContainer"]',
		gotoLog: '#signInButton',
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
		nextBtn: '[data-test="next"]',
		urlCo: '',
		gotoLogG: '',
		signUp: '',
	}

	if (player === 'tidal') {
		S.urlCo = 'https://listen.tidal.com'
	}

	if (player === 'spotify') {
		S.noNeedLog = '[data-testid="user-widget-avatar"]'
		S.gotoLog = '[data-testid="login-button"]'
		S.gotoLogG = '[data-testid="google-login"]'
		S.loginError = '.alert.alert-warning'
		S.email = '#login-username'
		S.pass = '#login-password'
		S.connectBtn = '#login-button'
		S.play = '[data-testid="action-bar-row"] [data-testid="play-button"]'
		S.timeLine = '[data-testid="playback-position"]'
		S.shuffleBtn = '[aria-checked="false"][data-testid="control-button-shuffle"]'
		S.urlCo = 'https://gmail.com'
		S.signUp = '[data-encore-id="buttonTertiary"]'
		// S.repeatBtn = '[class*="spoticon-repeat"]'
		// S.repeatBtnOk = '.spoticon-repeat-16.control-button--active'
		// S.shuffleBtn = '.spoticon-shuffle-16:not(.control-button--active)'
		// S.nextBtn = '.spoticon-skip-forward-16'
		// S.usedDom = '.ConnectBar'
	}

	if (player === 'apple') {
		S.noNeedLog = '.context-menu-container .user'
		S.gotoLog = '.signin'
		S.loginError = '.alert.alert-warning'
		S.email = '#account_name_text_field'
		S.pass = '#password_text_field'
		S.connectBtn = '#sign-in'
		// S.play = '.shuffle-button'
		// S.shuffleBtn = '[aria-label="Lecture aléatoire"][aria-disabled="false"]'
		S.play = '.primary-actions__button--shuffle button.click-action'
		S.pauseBtn = '.playback-play__pause'
		S.timeLine = '#playback-progress'
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

	if (player === 'youtube') {
		S.noNeedLog = '.settings-button'
		S.gotoLog = '.sign-in-link'
		S.loginError = '.upsellButton'
		S.email = '#identifierId'
		S.pass = '#ap_password'
		S.connectBtn = '#signInSubmit'
		S.play = '.watch-button'
		S.pauseBtn = '#play-pause-button'
		S.timeLine = '.time-info'
		S.urlCo = 'https://gmail.com'
		S.callback = (a: any) => (a.split(' /')[0].split(':').reduce((a: any, b: any) => a * 60 + Number(b)))

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
