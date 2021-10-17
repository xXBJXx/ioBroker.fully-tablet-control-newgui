// import React from 'react';
// import ReactDOM from 'react-dom';
//
// import { IoBrokerApp } from 'iobroker-react/app';
// import { useAdapter, useGlobals, useI18n } from 'iobroker-react/hooks';
// import type { Translations } from 'iobroker-react/i18n';
//
// // Load your translations
// const translations: Translations = {
// 	en: require('./i18n/en.json'),
// 	de: require('./i18n/de.json'),
// 	ru: require('./i18n/ru.json'),
// 	pt: require('./i18n/pt.json'),
// 	nl: require('./i18n/nl.json'),
// 	fr: require('./i18n/fr.json'),
// 	it: require('./i18n/it.json'),
// 	es: require('./i18n/es.json'),
// 	pl: require('./i18n/pl.json'),
// };
//
// // This is the main component of your adapter/UI
// // In this example, it renders an information if your adapter process is currently running.
// const Root: React.FC = React.memo(() => {
// 	// The alive variable is synchronized with the state `system.adapter.my-adapter.0.alive`
// 	const { alive } = useAdapter();
// 	const { namespace } = useGlobals();
// 	const { translate: _ } = useI18n();
//
// 	return (
// 		<>
// 			<h1>{_('Hello World!')}</h1>
// 			The adapter {namespace} is {alive ? 'running' : 'not running'}.
// 		</>
// 	);
// });
//
// // Render the main component in an ioBroker app wrapper, which provides everything needed to communicate with ioBroker
// ReactDOM.render(
// 	<IoBrokerApp name="my-adapter" translations={translations}>
// 		<Root />
// 	</IoBrokerApp>,
// 	document.getElementById('root'),
// );

import React from 'react';
import ReactDOM from 'react-dom';
import { ThemeProvider } from '@mui/material/styles';
import theme from '@iobroker/adapter-react/Theme';
import Utils from '@iobroker/adapter-react/Components/Utils';
import App from './app';

let themeName = Utils.getThemeName();

function build(): void {
	ReactDOM.render(
		<ThemeProvider theme={theme(themeName)}>
			<App
				adapterName="fully_react_test"
				onThemeChange={(_theme) => {
					themeName = _theme;
					build();
				}}
			/>
		</ThemeProvider>,
		document.getElementById('root'),
	);
}

build();
