import React from 'react';
import ReactDOM from 'react-dom';

// UI elements are imported from Material-UI
// import { Checkbox } from '@material-ui/core/';
// import Checkbox from '@mui/material/Checkbox';
// import FormControlLabel from '@mui/material/FormControlLabel';
import { ThemeProvider } from '@mui/material/styles';
import { SettingsApp } from 'iobroker-react/app';
import { useSettings, useI18n } from 'iobroker-react/hooks';
import type { Translations } from 'iobroker-react/i18n';
import theme from '@iobroker/adapter-react/Theme';
import Utils from '@iobroker/adapter-react/Components/Utils';
// Components are imported here
import { AdapterHeader } from './components/AdapterHeader';
import { AddDeviceDialog } from './components/AddDeviceDialog';

const themeName = Utils.getThemeName();

const SettingsPageContent: React.FC = React.memo(() => {
	// settings is the current settings object, including the changes made in the UI
	// originalSettings is the original settings object, as it was loaded from ioBroker
	// setSettings is used to update the current settings object
	const { settings, originalSettings, setSettings } = useSettings<ioBroker.AdapterConfig>();

	// Updates the settings when the checkbox changes. The changes are not saved yet.
	// const handleChange = <T extends keyof ioBroker.AdapterConfig>(option: T, value: ioBroker.AdapterConfig[T]) => {
	const handleChange = <T extends keyof ioBroker.AdapterConfig>(value: ioBroker.AdapterConfig[T]) => {
		setSettings((s) => ({
			...s,
			tablets: value,
		}));
	};

	return (
		<React.Fragment>
			<AdapterHeader />
			{/*<TestHook />*/}
			<AddDeviceDialog native={settings} onChange={(value) => handleChange(value)} />
		</React.Fragment>
	);
});

const migrateSettings = (settings: ioBroker.AdapterConfig) => {
	// Here's an example for editing settings after they are loaded from the backend
	// In this case, option1 will be set to true by default
	if (settings.tablets === undefined) {
		settings.tablets = [];
	}
};

// Load your translations
const translations: Translations = {
	en: require('./i18n/en.json'),
	de: require('./i18n/de.json'),
	ru: require('./i18n/ru.json'),
	pt: require('./i18n/pt.json'),
	nl: require('./i18n/nl.json'),
	fr: require('./i18n/fr.json'),
	it: require('./i18n/it.json'),
	es: require('./i18n/es.json'),
	pl: require('./i18n/pl.json'),
	'zh-cn': require('./i18n/zh-cn.json'),
};

const Root: React.FC = () => {
	return (
		<ThemeProvider theme={theme(themeName)}>
			<SettingsApp name="fully-adapter" afterLoad={migrateSettings} translations={translations}>
				<SettingsPageContent />
			</SettingsApp>
		</ThemeProvider>
	);
};

ReactDOM.render(<Root />, document.getElementById('root'));
