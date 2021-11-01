import { v4 as uuidv4 } from 'uuid';

export let fullConfig: ioBroker.configItem = {
	id: uuidv4(),
	config: {
		active: false,
		interval: 30,
		name: '',
		Login: {
			ip: '',
			port: 2323,
			password: '',
		},
		charger: {
			chargerActive: false,
			chargerId: '',
			powerMode: false,
			loadStart: 20,
			loadStop: 85,
		},
		brightness: {
			active: false,
			screen_on: false,
			timeMode: true,
			interval: 5,
			astroSelectDay: 'sunrise',
			astroSelectNight: 'sunset',
			dayTime: 7,
			midTime: 13,
			nightTime: 22,
			dayBrightness: 20,
			midTimeBrightness: 20,
			nightBrightness: 0,
			loadingLowering: 10,
		},
		screenSaver: {
			active: false,
			screenSaverDeletion: false,
			screenSaverName: '',
			url: '',
			screenSaverMode: true,
			time: 2,
		},
		telegram: {
			active: false,
			telegramSelectMode: false,
			telegramUserName: '',
			multipleTelegramUserName: [],
		},
		motion: {
			active: false,
			motionId: '',
		},
		// image_capture: {},
		// vis_view: {},
	},
};

export const createNewConfig = (attr: string, value: any): any => {
	switch (attr) {
		case 'name':
			fullConfig.config.name = value;
			// console.log(fullConfig);
			break;
		case 'interval':
			fullConfig.config.interval = value;
			// console.log(fullConfig);
			break;
		case 'active':
			fullConfig.config.active = value;
			// console.log(fullConfig);
			break;
		case 'ip':
			fullConfig.config.Login.ip = value;
			// console.log(fullConfig);
			break;
		case 'port':
			fullConfig.config.Login.port = value;
			// console.log(fullConfig);
			break;
		case 'password':
			fullConfig.config.Login.password = value;
			// console.log(fullConfig);
			break;
		case 'chargerActive':
			fullConfig.config.charger.chargerActive = value;
			console.log(fullConfig);
			break;
		case 'chargerId':
			fullConfig.config.charger.chargerId = value;
			console.log(fullConfig);
			break;
		case 'powerMode':
			fullConfig.config.charger.powerMode = value;
			console.log(typeof value);
			// console.log(value);
			//
			// console.log(fullConfig);
			break;
		case 'loadStart':
			fullConfig.config.charger.loadStart = value;
			// console.log(typeof value);
			// console.log(`loadStart ${value}`);
			// console.log(fullConfig);
			break;
		case 'loadStop':
			fullConfig.config.charger.loadStop = value;
			// console.log(fullConfig);
			break;
	}
};

export const clearConfig = (): void => {
	console.log('config input was deleted');

	fullConfig = {
		id: uuidv4(),
		config: {
			active: false,
			interval: 30,
			name: '',
			Login: {
				ip: '',
				port: 2323,
				password: '',
			},
			charger: {
				chargerActive: false,
				chargerId: '',
				powerMode: false,
				loadStart: 20,
				loadStop: 85,
			},
			brightness: {
				active: false,
				screen_on: false,
				timeMode: true,
				interval: 5,
				astroSelectDay: 'sunrise',
				astroSelectNight: 'sunset',
				dayTime: 7,
				midTime: 13,
				nightTime: 22,
				dayBrightness: 20,
				midTimeBrightness: 20,
				nightBrightness: 0,
				loadingLowering: 10,
			},
			screenSaver: {
				active: false,
				screenSaverDeletion: false,
				screenSaverName: '',
				url: '',
				screenSaverMode: true,
				time: 2,
			},
			telegram: {
				active: false,
				telegramSelectMode: false,
				telegramUserName: '',
				multipleTelegramUserName: [],
			},
			motion: {
				active: false,
				motionId: '',
			},
			// image_capture: {},
			// vis_view: {},
		},
	};
};
export const clearChargerConfig = (): void => {
	console.log('Charger config input was deleted');

	fullConfig.config.charger.chargerId = '';
	fullConfig.config.charger.powerMode = false;
	fullConfig.config.charger.loadStart = 20;
	fullConfig.config.charger.loadStop = 85;
};
