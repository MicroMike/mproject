export const albums = (country?: string) => ({
	napster: [
		'https://web.napster.com/album/alb.390623666',//He Knows She Knows
		'https://web.napster.com/album/alb.706846102', // take it easy
	],
	amazon: [
		`https://music.amazon.${country}/albums/B07MTV7JYS`,//red Beast
		`https://music.amazon.${country}/albums/B07VC9S3JM`,//He Knows She Knows
		`https://music.amazon.${country}/albums/B09PF7R5H1`,// fresh mix
		`https://music.amazon.${country}/albums/B0BHFGDMKS`,// take it easy
		`https://music.amazon.${country}/albums/B0BZQFL22N`,// ashbadger
		`https://music.amazon.${country}/albums/B0CVNNGP4H`,// elements djmke
		`https://music.amazon.${country}/albums/B0CZXY6J5Q`,// redevoxy liberation
	],
	tidal: [
		'https://listen.tidal.com/album/102503463',//red beast
		'https://listen.tidal.com/album/113608807',// He Knows She Knows
		'https://listen.tidal.com/album/210703692', // fresh mix
		'https://listen.tidal.com/album/252505614', // ordhn take it easy
		'https://listen.tidal.com/album/285840150', // ashbadger
		'https://listen.tidal.com/album/345514451',// elements djmke
		'https://listen.tidal.com/album/355555834', // redevoxy liberation
	],
	spotify: [
		'https://open.spotify.com/intl-fr/album/0Tt1ldQ8b4zn5LRcM706ll',//red beast
		'https://open.spotify.com/intl-fr/album/4griwLkxXcEjmW1gIHDFRf',//He Knows She Knows
		'https://open.spotify.com/intl-fr/album/4szjKFxbsHKpqpxhrm7H6L',// fresh mix
		'https://open.spotify.com/intl-fr/album/3YZrjrJjUYOmrmFqqv3EMA',// take it easy
		'https://open.spotify.com/intl-fr/album/7AQBjg9oZDT60aTArciBW8',// ashbadger
		'https://open.spotify.com/intl-fr/album/1CWvkrqiSMsSQutfirOUu2',// elements djmke
		'https://open.spotify.com/intl-fr/album/5WwE73XUhQ7m5i93nrMsBD',// redevoxy liberation
	],
	heart: [
		'https://www.iheart.com/artist/yokem-32334534/albums/boombeats-60010808',
		'https://www.iheart.com/artist/lenitap-33087636/albums/above-everybody-wind-75190189',
		'https://www.iheart.com/artist/erati-33145722/albums/he-knows-she-knows-76470160',
		'https://www.iheart.com/artist/benriam-33203186/albums/the-gift-give-77322266',
		// 'https://www.iheart.com/artist/john-millson-33246171/albums/my-stash-77992029',
		'https://www.iheart.com/artist/yonne-32474174/albums/loser-62529736',
	],
	apple: [
		// `https://music.apple.com/${country}/album/marching-smile/1472877269`,
		`https://music.apple.com/${country}/album/red-beast/1449459227`,
		// `https://music.apple.com/${country}/album/my-stash/1476078813`,
		`https://music.apple.com/${country}/album/he-knows-she-knows/1472572875`,
		`https://music.apple.com/${country}/album/fresh-mix-ep/1602522645`,
		`https://music.apple.com/${country}/album/take-it-easy-ep/1648559520`,
		`https://music.apple.com/${country}/album/party-mix-vol-1-ep/1679369537`,
		// 'https://music.apple.com/fr/album/good-memories-single/1596423159',
		// 'https://music.apple.com/tr/album/lunar-january/1596985047',
		// 'https://music.apple.com/tr/album/boombeats/1383283815',
		// 'https://music.apple.com/tr/album/house-of-beats/1380210761',
		// 'https://music.apple.com/tr/album/stone-distraction/1448967982',
		// 'https://music.apple.com/tr/album/satisfaction-spell/1455114950',
		// 'https://music.apple.com/tr/album/above-everybody-wind/1469335241',
		// 'https://music.apple.com/tr/album/blue-gun/1462971089',
		// 'https://music.apple.com/tr/album/loser/1421807206',
	],
	youtube: [
		'https://music.youtube.com/playlist?list=OLAK5uy_mRQymmHf2WE1VF5rTSrfhi4NeApk5ve8k', // red beast
		'https://music.youtube.com/playlist?list=OLAK5uy_n2vh4Z_2con4v5n_zRI5-B_2x_yGQzjb4', // He Knows She Knows
		// 'https://music.youtube.com/playlist?list=OLAK5uy_ncO3_KViomsWKfWvhbwafOU2uA-xLhOYY', // my stash
		'https://music.youtube.com/playlist?list=OLAK5uy_nXWitqEOdlkDZHj3i11N_vb6zjPLd-Ofg', // fresh mix
		'https://music.youtube.com/playlist?list=OLAK5uy_lJNbLVhAKyWd-NnerMMuiobEWsSXuN0pw', // take it easy
		'https://music.youtube.com/playlist?list=OLAK5uy_l_qZepk2ZTkXQl7ifquJOJzftlhXpLuJc', // ashbadger
		'https://music.youtube.com/playlist?list=OLAK5uy_m-dMp6z1Xkbk8epF5l6X1CnMoxjWUwMaM', // elements djmke
		'https://music.youtube.com/playlist?list=OLAK5uy_kgfRs1VqJ8wQX9pUOuzyH9hEH7oId2ti4', // redevoxy liberation
	],
	pandora: [
		'https://www.pandora.com/artist/djmke/elements/ALJlgcvrb5KPmh9', // djmke elements
		'https://www.pandora.com/artist/ordhn/take-it-easy/ALxzm2hklwk3fX9', // ordhn takeit easy
		'https://www.pandora.com/artist/ashbadger/party-mix-vol-1/ALvb3pdKbxrwbj9', // ashbadger party-mix-vol-1
		// 'https://music.youtube.com/playlist?list=OLAK5uy_mRQymmHf2WE1VF5rTSrfhi4NeApk5ve8k', // red beast
		// 'https://music.youtube.com/playlist?list=OLAK5uy_n2vh4Z_2con4v5n_zRI5-B_2x_yGQzjb4', // He Knows She Knows
		// 'https://music.youtube.com/playlist?list=OLAK5uy_ncO3_KViomsWKfWvhbwafOU2uA-xLhOYY', // my stash
		// 'https://music.youtube.com/playlist?list=OLAK5uy_nXWitqEOdlkDZHj3i11N_vb6zjPLd-Ofg', // fresh mix
		// 'https://music.youtube.com/playlist?list=OLAK5uy_l_qZepk2ZTkXQl7ifquJOJzftlhXpLuJc', // ashbadger
	]
})

export const nbTracks = [
	13,
	7,
	5,
	5,
	5,
	5,
	3,
]

export const artists = {
	'amazon': [
		'https://music.amazon.fr/artists/B0CVNN95TT/djmke',
		'https://music.amazon.fr/artists/B07VF87DDT/erati'
	],
	'tidal': [
		'https://listen.tidal.com/artist/45739131',
		'https://listen.tidal.com/artist/16333012',
	],
	'youtube': [
		'https://music.youtube.com/channel/UCrqEUr355x5waWx3rhuJ1Rg',
		'https://music.youtube.com/channel/UCOTC7KJC9QxH4Bh1vRuvZkA',
		'https://music.youtube.com/channel/UCrTm5Xk7dMiCi93hvAooquw',
		'https://music.youtube.com/channel/UCoH970kJNYxh7Y7oMtzmccw',
	]
}