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
		nextBtn: '[data-test="next"]',
		urlCo: '',
	}

	if (player === 'tidal') {
		S.urlCo = 'https://listen.tidal.com'
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
		S.urlCo = 'https://accounts.google.com/v3/signin/identifier?dsh=S-2113571280%3A1683052535225871&access_type=offline&client_id=1046568431490-ij1gi5shcp2gtorls09frkc56d4mjbe2.apps.googleusercontent.com&o2v=2&redirect_uri=https%3A%2F%2Faccounts.spotify.com%2Flogin%2Fgoogle%2Fredirect&response_type=code&scope=profile+email+openid&service=lso&state=AQCALm%2BbKr%2BcrBr7l9J2TzkeHHkE34eQC6nDttPKSJ1bhQIOD%2B3ldusyMcw%2BS%2BOF43uWXmq9ooNt%2BNHs9Go1TZO%2BuAo7%2BMITIyYs4FWvj4CDH5LoW4LRoz82MeejElIOxk%2BO6X9XQXenhwr4FFrilf63wtd8zWz1ADar2FxLySxIUkH%2FcYUxYaORNaWz5Rhk4ynnK2o61nU4OD0UHfiNJKgMzog5wSH5CEpqmawGU0i17TxGmbPCGs6chLwq%2FRBwyZuRRdWW0G6oQeV1xQ1PafJgZyCud7n4wcshPbzQ55J05wBcekFIft7mx9x2SDDGoWyBVp%2FjqVyb850Fe4vCfYZCdEFK&flowName=GeneralOAuthFlow&continue=https%3A%2F%2Faccounts.google.com%2Fsignin%2Foauth%2Fconsent%3Fauthuser%3Dunknown%26part%3DAJi8hANEa21D-X_qvHjhFDQLbDYvzwatGY4qN7p9Di_m4t0juY4a2vq24bIbE593b-cFQEBIK4MKfgYhmw2HVnNt49qEc8y5jbWn9Ue3wHWtar7fvpRKGEYsfZZ55cX_5q3lLjhAjEsWefN-vHorox0j_BVq5kxGOZ5UHm6YnHHqD4vIHgR-7Uimc-RupqunVP5XUrMjPRXu_s-Ly7nBz5BBpN6kWklwXuLfTY6bmit7EyNX_HXRuYL9vXRTyrGl8BvDLqhwiXm16CdhonDF8IehamHZ6rkpDWlCT9wx3OBOYvRBlVZd9dFnT9e2BJn7mXCcoOE1bfBnfmuByTJWc0BKnA01buTWN6GDCYI8KtOkJRPF6ImrLwhiMFJX_3Wp7hfGatnJHHzpZzg1tcHH1OOx9fmAcBGB4zC7cq_gxzZZLwnJnG5kc6RpCh-4FtGqGoobeQKZJc0Rkliph7fhZ5d2ig0zRonJ0j4C_7KW4NTNt937uCVBWCM%26as%3DS-2113571280%253A1683052535225871%26client_id%3D1046568431490-ij1gi5shcp2gtorls09frkc56d4mjbe2.apps.googleusercontent.com%23&app_domain=https%3A%2F%2Faccounts.spotify.com&rart=ANgoxceI9FXGa1PsI46X5hmevf1ETfJDarnOFkfXPFQFN6CLFTiPCWFAzrrmQP4fFaend-ij_8-EjuWcQ2jR8sHMiJNmqGuxNw'
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
