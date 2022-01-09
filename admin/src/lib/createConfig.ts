import { v4 as uuidv4 } from 'uuid';

interface fullConfigProps {
	id: string;
	[key: string]: string | object;
	config: {
		[key: string]: object | string | number;
		interval: number;
		name: string;
		Login: { ip: string; port: number; password: string; [key: string]: boolean | string | number };
		charger: {
			chargerActive: boolean;
			chargerId: string;
			powerMode: false | true | 'off';
			loadStart: number;
			loadStop: number;
			[key: string]: string | boolean | number;
		};
		brightness: {
			brightnessActive: boolean;
			screen_on: boolean;
			brightness_on: boolean;
			timeMode: boolean;
			loadingLoweringMode: boolean;
			brightnessInterval: number;
			astroSelectDay: string;
			astroSelectNight: string;
			dayTime: number;
			midTime: number;
			nightTime: number;
			dayBrightness: number;
			midTimeBrightness: number;
			nightBrightness: number;
			loadingLowering: number;
			[key: string]: boolean | string | number;
		};
		screensaver: {
			screensaverActive: boolean;
			screensaverDeletion: boolean;
			screensaverYouTubeName: string;
			screensaverWallpaperName: string;
			screensaverYoutubeUrl: string;
			screensaverWallpaperUrl: string;
			screensaverMode: boolean;
			screensaverTime: number;
			[key: string]: boolean | string | number;
		};
		motion: { motionActive: boolean; motionId: string; [key: string]: boolean | string };
		telegram: {
			telegramActive: boolean;
			multipleTelegramUserName: string | string[];
			[key: string]: boolean | string | string[];
		};
		imageCapture: {
			autoMotionDetection: boolean;
			recordMode: boolean;
			seriesShotCount: number;
			singleShotSafe: number;
			seriesShotSafe: number;
			imageTimeout: number;
			[key: string]: boolean | string | number;
		};
	};
}

export let fullConfig: fullConfigProps = {
	id: uuidv4(),
	config: {
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
			brightnessActive: false,
			screen_on: true,
			brightness_on: true,
			timeMode: true,
			loadingLoweringMode: false,
			brightnessInterval: 5,
			astroSelectDay: 'sunrise',
			astroSelectNight: 'sunset',
			dayTime: 7,
			midTime: 13,
			nightTime: 22,
			dayBrightness: 20,
			midTimeBrightness: 20,
			nightBrightness: 0,
			loadingLowering: 0,
		},
		screensaver: {
			screensaverActive: false,
			screensaverDeletion: false,
			screensaverYouTubeName: '',
			screensaverWallpaperName: '',
			screensaverYoutubeUrl: '',
			screensaverWallpaperUrl: '',
			screensaverMode: true,
			screensaverTime: 2,
		},
		motion: {
			motionActive: false,
			motionId: '',
		},
		imageCapture: {
			autoMotionDetection: false,
			recordMode: false,
			seriesShotCount: 2,
			singleShotSafe: 1,
			seriesShotSafe: 2,
			imageTimeout: 1,
		},
		telegram: {
			telegramActive: false,
			multipleTelegramUserName: [],
		},
	},
};

export const clearConfig = (): void => {
	console.log('config input was deleted');

	fullConfig = {
		id: uuidv4(),
		config: {
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
				brightnessActive: false,
				screen_on: true,
				brightness_on: true,
				timeMode: true,
				loadingLoweringMode: false,
				brightnessInterval: 5,
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
			screensaver: {
				screensaverActive: false,
				screensaverDeletion: false,
				screensaverYouTubeName: '',
				screensaverWallpaperName: '',
				screensaverYoutubeUrl: '',
				screensaverWallpaperUrl: '',
				screensaverMode: true,
				screensaverTime: 2,
			},
			motion: {
				motionActive: false,
				motionId: '',
			},
			imageCapture: {
				autoMotionDetection: false,
				recordMode: false,
				seriesShotCount: 2,
				singleShotSafe: 1,
				seriesShotSafe: 2,
				imageTimeout: 1,
			},
			telegram: {
				telegramActive: false,
				multipleTelegramUserName: [],
			},
		},
	};
};

export const clearChargerConfig = (): void => {
	console.log('Charger config input was cleared');

	fullConfig.config.charger.chargerActive = false;
	fullConfig.config.charger.chargerId = '';
	fullConfig.config.charger.powerMode = false;
	fullConfig.config.charger.loadStart = 20;
	fullConfig.config.charger.loadStop = 85;
};

export const clearBrightnessConfig = (): void => {
	console.log('Brightness config input was cleared');

	fullConfig.config.brightness.brightnessActive = false;
	fullConfig.config.brightness.screen_on = true;
	fullConfig.config.brightness.brightness_on = true;
	fullConfig.config.brightness.timeMode = true;
	fullConfig.config.brightness.loadingLoweringMode = false;
	fullConfig.config.brightness.brightnessInterval = 5;
	fullConfig.config.brightness.astroSelectDay = 'sunrise';
	fullConfig.config.brightness.astroSelectNight = 'sunset';
	fullConfig.config.brightness.dayTime = 7;
	fullConfig.config.brightness.midTime = 13;
	fullConfig.config.brightness.nightTime = 22;
	fullConfig.config.brightness.dayBrightness = 20;
	fullConfig.config.brightness.midTimeBrightness = 20;
	fullConfig.config.brightness.nightBrightness = 0;
	fullConfig.config.brightness.loadingLowering = 10;
};

export const clearScreensaverConfig = (): void => {
	console.log('Screensaver config input was cleared');

	fullConfig.config.screensaver.screensaverActive = false;
	fullConfig.config.screensaver.screensaverDeletion = false;
	fullConfig.config.screensaver.screensaverYouTubeName = '';
	fullConfig.config.screensaver.screensaverWallpaperName = '';
	fullConfig.config.screensaver.screensaverYoutubeUrl = '';
	fullConfig.config.screensaver.screensaverWallpaperUrl = '';
	fullConfig.config.screensaver.screensaverMode = true;
	fullConfig.config.screensaver.screensaverTime = 2;
};

export const clearMotionConfig = (): void => {
	console.log('Motion config input was cleared');

	fullConfig.config.motion.motionActive = false;
	fullConfig.config.motion.motionId = '';
};

export const clearImageCaptureConfig = (): void => {
	console.log('ImageCapture config input was cleared');

	fullConfig.config.imageCapture.autoMotionDetection = false;
	fullConfig.config.imageCapture.recordMode = false;
	fullConfig.config.imageCapture.singleShotSafe = 1;
	fullConfig.config.imageCapture.seriesShotCount = 2;
	fullConfig.config.imageCapture.seriesShotSafe = 2;
	fullConfig.config.imageCapture.imageTimeout = 1;
};

export const clearTelegramConfig = (): void => {
	console.log('Telegram config input was cleared');

	fullConfig.config.telegram.telegramActive = false;
	fullConfig.config.telegram.multipleTelegramUserName = [];
};
