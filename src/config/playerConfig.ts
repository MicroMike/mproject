import { TPlayer } from "./types"

export const getConfig = (player: TPlayer) => {
	const S = {
		noNeedLog: '[class*="badgeContainer"]',
		gotoLog: '#login-button',
		loginError: '.box-error',
		email: '#email',
		pass: '#password',
		next: '[ui-test-id="check-user-continue-button"]',
		connectBtn: '[ui-test-id="login-user-login-button"]',
		play: '[data-test="shuffle-all"]',
		pauseBtn: '',
		shuffleBtn: '',
		timeLine: '[data-test="current-time"]',
		callback: (a: any) => (a.split(':').reduce((a: any, b: any) => a * 60 + Number(b))),
		nextBtn: '[data-test="next"]',
		urlCo: '',
		gotoLogG: '',
		signUp: '',
		signEmail: '',
		signSubmit: '',
		notExist: '',
		goToSub: '',
		like: '',
	}

	if (player === 'tidal') {
		S.urlCo = 'https://listen.tidal.com'
		S.like = '[data-track--button-id="favorite"][aria-checked="false"]'
	}

	if (player === 'pandora') {
		S.gotoLog = '[href="/account/sign-in"]'
		S.noNeedLog = '[data-qa="header_profile_image"]'
		S.email = '[name="email"]'
		S.pass = '[name="password"]'
		S.connectBtn = '[name="login"]'
		S.notExist = "#email-password.Form--serverError"
		S.goToSub = '[href="/account/register"]'
		S.play = '.ButtonRow__button--play'
		S.timeLine = 'span[data-qa="elapsed_time"]'
	}

	if (player === 'spotify') {
		S.noNeedLog = '[data-testid="user-widget-link"]'
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
		S.signEmail = 'div[class^="GoogleSignup"] a'
		S.signSubmit = 'div[class^="SignupButton"] button'
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
		S.timeLine = '#transport div:nth-child(4) div:nth-child(2) span'

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
		S.play = '[aria-label="PLAY ALL"]'
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

export type TS = ReturnType<typeof getConfig>