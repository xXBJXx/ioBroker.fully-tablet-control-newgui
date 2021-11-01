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
			screenSaver: ScreenSaver;
			telegram: Telegram;
			motion: Motion;
		}

		interface Login {
			ip: string;
			port: number;
			password: string;
		}

		interface Charger {
			active: boolean;
			chargerId: string;
			powerMode: false | true | 'off';
			loadStart: number;
			loadStop: number;
		}

		interface Brightness {
			active: boolean;
			screen_on: boolean;
			timeMode: true;
			interval: number;
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

		interface ScreenSaver {
			active: boolean;
			screenSaverDeletion: boolean;
			screenSaverName: string;
			url: string;
			screenSaverMode: boolean;
			time: number;
		}

		interface Telegram {
			active: boolean;
			telegramSelectMode: boolean;
			telegramUserName: string;
			multipleTelegramUserName: string[];
		}

		interface Motion {
			active: boolean;
			motionId: string;
		}

		// interface image_capture {}
		//
		// interface vis_view {}
	}
}

// this is required so the above AdapterConfig is found by TypeScript / type checking
export {};
