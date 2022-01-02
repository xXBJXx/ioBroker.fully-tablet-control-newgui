interface tabletProps {
	name: string;
	picturePath: string;
}
interface modelsProps {
	[key: string]: tabletProps;
}
interface tabletsProps {
	[key: string]: modelsProps;
}

export const tablets: tabletsProps = {
	samsung: {
		'SM-T830': {
			name: 'Galaxy Tab S4 (WiFi)',
			picturePath: 'media/Samsung_Galaxy_Tab_S4.png',
		},
		'SM-T835': {
			name: 'Galaxy Tab S4 (LTE)',
			picturePath: 'media/Samsung_Galaxy_Tab_S4.png',
		},
		// 'SM-T820': {
		// 	name: 'Galaxy Tab S3 (WiFi)',
		// 	picturePath: 'media/Samsung_Galaxy_Tab_S3.png',
		// },
		// 'SM-T825': {
		// 	name: 'Galaxy Tab S3 (LTE)',
		// 	picturePath: 'media/Samsung_Galaxy_Tab_S3.png',
		// },
		// 'SM-T720': {
		// 	name: 'Galaxy Tab S5e (WiFi)',
		// 	picturePath: 'media/Samsung_Galaxy_Tab_S5e.png',
		// },
		// 'SM-T725': {
		// 	name: 'Galaxy Tab S5e (LTE)',
		// 	picturePath: 'media/Samsung_Galaxy_Tab_S5e.png',
		// },
		// 'SM-T860': {
		// 	name: 'Galaxy Tab S6 (WiFi)',
		// 	picturePath: 'media/Samsung_Galaxy_Tab_S6.png',
		// },
		// 'SM-T865': {
		// 	name: 'Galaxy Tab S6 (LTE)',
		// 	picturePath: 'media/Samsung_Galaxy_Tab_S6.png',
		// },
		// 'SM-P610': {
		// 	name: 'Galaxy Tab S6 lite (WiFi)',
		// 	picturePath: 'media/Samsung_Galaxy_Tab_S6_lite.png',
		// },
		// 'SM-P615': {
		// 	name: 'Galaxy Tab S6 lite (LTE)',
		// 	picturePath: 'media/Samsung_Galaxy_Tab_S6_lite.png',
		// },
		// 'SM-T870': {
		// 	name: 'Galaxy Tab S7 (WiFi)',
		// 	picturePath: 'media/Samsung_Galaxy_Tab_S7.png',
		// },
		// 'SM-T875': {
		// 	name: 'Galaxy Tab S7 (LTE)',
		// 	picturePath: 'media/Samsung_Galaxy_Tab_S7.png',
		// },
		// 'SM-T970': {
		// 	name: 'Galaxy Tab S7+ (WiFi)',
		// 	picturePath: 'media/Samsung_Galaxy_Tab_S7+.png',
		// },
		// 'SM-T976': {
		// 	name: 'Galaxy Tab S7+ (LTE)',
		// 	picturePath: 'media/Samsung_Galaxy_Tab_S7+.png',
		// },
		// 'SM-T733': {
		// 	name: 'Galaxy Tab S7 FE (WiFi)',
		// 	picturePath: 'media/Samsung_Galaxy_Tab_S7_FE.png',
		// },
		// 'SM-T736': {
		// 	name: 'Galaxy Tab S7 FE (LTE)',
		// 	picturePath: 'media/Samsung_Galaxy_Tab_S7_FE.png',
		// },
	},
};
