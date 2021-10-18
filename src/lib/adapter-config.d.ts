// This file extends the AdapterConfig type from "@types/iobroker"

// Augment the globally declared type ioBroker.AdapterConfig
declare global {
	namespace ioBroker {
		interface AdapterConfig {
			tablets: configItem[];
		}

		interface configItem {
			id: number;
			config: configObj;
		}

		interface configObj {
			active: boolean;
			interval: number;
			name: string;
			Login: Login;
			charger: Charger;
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
	}
}

// this is required so the above AdapterConfig is found by TypeScript / type checking
export {};
