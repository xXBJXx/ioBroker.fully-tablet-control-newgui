import theme from '@iobroker/adapter-react/Theme';
import { Grid, ThemeProvider } from '@mui/material';
import { useI18n, useIoBrokerTheme } from 'iobroker-react/hooks';
import React from 'react';
import { tablets } from '../../src/lib/supportedTablets';
import { TabletCard } from './components/TabletCard';
import { fullConfig } from './lib/createConfig';
import { AddDeviceDialog, result } from './modals/newConfigModal/AddDeviceDialog';

export const SettingPage = (): JSX.Element => {
	const { translate: _ } = useI18n();
	const [themeName] = useIoBrokerTheme();

	const handleTestConfig = (): JSX.Element[] => {
		const test: JSX.Element[] = [];
		for (const samsungKey in tablets.samsung) {
			test.push(
				<TabletCard
					key={samsungKey}
					config={{ device: 'samsung', deviceName: fullConfig.config.name, model: samsungKey, online: true }}
				/>,
			);
		}
		return test;
	};

	const handleAddDevice = (result: result): void => {
		console.log(result);
	};

	return (
		<React.Fragment>
			<ThemeProvider theme={theme(themeName)}>
				<AddDeviceDialog addDevice={(result) => handleAddDevice(result)} />
				<Grid
					container
					sx={{
						marginTop: '100',
						paddingBottom: '15px',
						alignItems: 'center',
						justifyContent: 'space-around',
						display: 'flex',
						flexWrap: 'wrap',
						flexDirection: 'row',
					}}
				>
					{handleTestConfig()}
				</Grid>
			</ThemeProvider>
		</React.Fragment>
	);
};
