import { Button, Grid, Paper } from '@mui/material';
import React from 'react';
import { useI18n, useDialogs } from 'iobroker-react/hooks';
import { TabletNameInput } from './Login/TabletNameInput';
import { clearConfig, fullConfig } from '../lib/createConfig';
import { useIoBrokerTheme } from 'iobroker-react/hooks';

export interface AddDeviceDialogProps {
	onChange: (value: any) => void;
	native: ioBroker.AdapterConfig;
}

export const AddDeviceDialog: React.FC<AddDeviceDialogProps> = ({ native, onChange }) => {
	const { translate: _ } = useI18n();
	const { showModal } = useDialogs();
	const [themeName, setTheme] = useIoBrokerTheme();

	const BgColor = () => {
		switch (themeName) {
			case 'dark':
				return '#3b3b3b66';
			case 'blue':
				return '#3e464a61';
			case 'light':
				return '#fff';
			case 'colored':
				return '#fff';
		}
	};

	const Config = () => {
		return (
			<React.Fragment>
				<TabletNameInput />
			</React.Fragment>
		);
	};

	const askUser = React.useCallback(async () => {
		if (await showModal('Tablet Config', Config())) {
			const newNative = native.tablets;
			newNative.push(fullConfig);

			onChange(newNative);
			clearConfig();
			console.log('yes');
		} else {
			clearConfig();
			console.log('no');
		}
	}, [showModal]);

	return (
		<React.Fragment>
			<Grid container spacing={0} sx={{ display: 'flex', justifyContent: 'center' }}>
				<Paper
					elevation={10}
					sx={{
						height: 110,
						padding: 4,
						borderRadius: 5,
						display: 'flex',
						justifyContent: 'center',
						alignItems: 'center',
						flexWrap: 'nowrap',
						flexDirection: 'column',
						bgcolor: BgColor,
					}}
				>
					<Button variant="contained" size="large" color={'primary'} sx={{ mr: 4, ml: 4 }} onClick={askUser}>
						{_('addDevice')}
					</Button>
				</Paper>
			</Grid>
		</React.Fragment>
	);
};
