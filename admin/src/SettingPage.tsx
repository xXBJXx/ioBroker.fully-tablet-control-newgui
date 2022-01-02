import theme from '@iobroker/adapter-react/Theme';
import { Grid, ThemeProvider } from '@mui/material';
import { useI18n, useIoBrokerTheme } from 'iobroker-react/hooks';
import React from 'react';
import { TabletCard } from './components/TabletCard';
import { fullConfig } from './lib/createConfig';
import { tablets } from './lib/supportedTablets';
import { AddDeviceDialog } from './modals/newConfigModal/AddDeviceDialog';
export interface SettingPageProps {
	onChange: (value: any) => void;
	native: ioBroker.AdapterConfig;
}

export const SettingPage: React.FC<SettingPageProps> = ({ native, onChange }) => {
	const { translate: _ } = useI18n();
	const [themeName, setTheme] = useIoBrokerTheme();

	const handleTestConfig = () => {
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

	return (
		<React.Fragment>
			<ThemeProvider theme={theme(themeName)}>
				<AddDeviceDialog onChange={onChange} native={native} />
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
