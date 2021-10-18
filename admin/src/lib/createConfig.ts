interface Config {
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
}

export let fullConfig: Config = {
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
		},
	},
};

export const createLoginConfig = (attr: string, value: any) => {
	switch (attr) {
		case 'name':
			fullConfig.config.name = value;
			console.log(fullConfig);
			break;
		case 'interval':
			fullConfig.config.interval = value;
			console.log(fullConfig);
			break;
		case 'active':
			fullConfig.config.active = value;
			console.log(fullConfig);
			break;
		case 'ip':
			fullConfig.config.Login.ip = value;
			console.log(fullConfig);
			break;
		case 'port':
			fullConfig.config.Login.port = value;
			console.log(fullConfig);
			break;
		case 'password':
			fullConfig.config.Login.password = value;
			console.log(fullConfig);
			break;
	}
	//console.log(JSON.stringify(config));
};

export const clearConfig = () => {
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
			},
		},
	};
};
