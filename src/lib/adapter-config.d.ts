// This file extends the AdapterConfig type from "@types/iobroker"

// Augment the globally declared type ioBroker.AdapterConfig
declare global {
	namespace ioBroker {
		interface AdapterConfig {
			tablets: configItem[];
		}

		interface configItem {
			id: string;
			config: configObj;
		}

		interface configObj {
			active: boolean;
			interval: number;
			name: string;
			Login: Login;
			charger: Charger;
			brightness: Brightness;
			screensaver: screensaver;
			motion: Motion;
			telegram: Telegram;
			imageCapture: imageCapture;
		}

		interface Login {
			ip: string;
			port: number;
			password: string;
		}

		interface Charger {
			chargerActive: boolean;
			chargerId: string;
			powerMode: false | true | 'off';
			loadStart: number;
			loadStop: number;
		}

		interface Brightness {
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
		}

		interface screensaver {
			screensaverActive: boolean;
			screensaverDeletion: boolean;
			screensaverYouTubeName: string;
			screensaverWallpaperName: string;
			screensaverYoutubeUrl: string;
			screensaverWallpaperUrl: string;
			screensaverMode: boolean;
			screensaverTime: number;
		}

		interface Motion {
			motionActive: boolean;
			motionId: string;
		}

		interface imageCapture {
			autoMotionDetection: boolean;
			recordMode: boolean;
			seriesShotCount: number;
			singleShotSafe: number;
			seriesShotSafe: number;
			imageTimeout: number;
		}

		interface Telegram {
			telegramActive: boolean;
			multipleTelegramUserName: string[];
		}
	}
}

// this is required so the above AdapterConfig is found by TypeScript / type checking
export {};
