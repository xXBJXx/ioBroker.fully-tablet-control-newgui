export let fullConfig: ioBroker.configItem = {
	id: 0,
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
			active: false,
			chargerId: '',
			powerMode: false,
			loadStart: 20,
			loadStop: 85,
		},
	},
};

export const createLoginConfig = (attr: string, value: any): any => {
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
	}
};

export const clearConfig = (): void => {
	console.log('config input was deleted');

	fullConfig = {
		id: 0,
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
				active: false,
				chargerId: '',
				powerMode: false,
				loadStart: 20,
				loadStop: 85,
			},
		},
	};
};
