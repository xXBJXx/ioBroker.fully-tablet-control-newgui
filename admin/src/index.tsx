import React from 'react';
import ReactDOM from 'react-dom';

// UI elements are imported from Material-UI
// import { Checkbox } from '@material-ui/core/';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';

import { SettingsApp } from 'iobroker-react/app';
import { useSettings, useI18n } from 'iobroker-react/hooks';
import type { Translations } from 'iobroker-react/i18n';
import { AdapterHeader } from './components/AdapterHeader';
import { AddDeviceDialog } from './components/AddDeviceDialog';

// Components are imported here

const SettingsPageContent: React.FC = React.memo(() => {
	// settings is the current settings object, including the changes made in the UI
	// originalSettings is the original settings object, as it was loaded from ioBroker
	// setSettings is used to update the current settings object
	const { settings, originalSettings, setSettings } = useSettings<ioBroker.AdapterConfig>();
	const { translate: _ } = useI18n();

	// Updates the settings when the checkbox changes. The changes are not saved yet.
	const handleChange = <T extends keyof ioBroker.AdapterConfig>(option: T, value: ioBroker.AdapterConfig[T]) => {
		setSettings((s) => ({
			...s,
			[option]: value,
		}));
	};

	return (
		<React.Fragment>
			<AdapterHeader />
			<AddDeviceDialog onChange={(option, value) => handleChange(option, value)} />
			<FormControlLabel
				label={_('Enable option 1')}
				control={
					<Checkbox
						checked={settings.option1}
						onChange={(event, checked) => handleChange('option2', checked)}
					/>
				}
			/>
		</React.Fragment>
	);
});

const migrateSettings = (settings: ioBroker.AdapterConfig) => {
	// Here's an example for editing settings after they are loaded from the backend
	// In this case, option1 will be set to true by default
	if (settings.option1 === undefined) {
		settings.option1 = true;
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
		<SettingsApp name="my-adapter" afterLoad={migrateSettings} translations={translations}>
			<SettingsPageContent />
		</SettingsApp>
	);
};

ReactDOM.render(<Root />, document.getElementById('root'));
