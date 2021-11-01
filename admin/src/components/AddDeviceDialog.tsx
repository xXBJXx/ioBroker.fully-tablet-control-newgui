import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Grid, Paper, ThemeProvider } from '@mui/material';
import React, { useState } from 'react';
import { useI18n } from 'iobroker-react/hooks';
import { clearConfig, fullConfig } from '../lib/createConfig';
import { useIoBrokerTheme } from 'iobroker-react/hooks';
import { LoginConfig } from './Login/LoginConfig';
import theme from '@iobroker/adapter-react/Theme';
import { TestHook } from './testHook';
import { ConfigButton } from './ConfigButton';

export interface AddDeviceDialogProps {
	onChange: (value: any) => void;
	native: ioBroker.AdapterConfig;
}

export const AddDeviceDialog: React.FC<AddDeviceDialogProps> = ({ native, onChange }) => {
	const [open, setOpen] = React.useState(false);

	const { translate: _ } = useI18n();
	const [themeName, setTheme] = useIoBrokerTheme();
	const [addButton, setAddButton] = useState(true);
	const [valideConfig, setValideConfig] = useState(false);

	const BgColor = (): string => {
		switch (themeName) {
			case 'dark':
				return '#3b3b3b66';
			case 'blue':
				return '#3e464a61';
			case 'light':
				return '#b7b7b7';
			case 'colored':
				return '#b7b7b7';
		}
	};

	const handleClickOpen = (): void => {
		console.log(fullConfig);
		clearConfig();
		setOpen(true);
	};
	const handleClickAdd = (): void => {
		const newNative = native.tablets;
		newNative.push(fullConfig);
		console.log(newNative);
		setAddButton(true);
		clearConfig();
		setOpen(false);
	};

	const handleClose = (): void => {
		console.log(fullConfig);
		clearConfig();
		setOpen(false);
		setAddButton(true);
	};

	const handleValideConfig = (attr: string, value: boolean): void => {
		switch (attr) {
			case 'Login':
				setValideConfig(value);
				setAddButton(false);
				break;
		}
	};

	return (
		<React.Fragment>
			<ThemeProvider theme={theme(themeName)}>
				<Grid container spacing={0} sx={{ display: 'flex', justifyContent: 'center' }}>
					<Paper
						elevation={24}
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
						<Button
							variant="contained"
							size="large"
							color={'primary'}
							sx={{ mr: 4, ml: 4 }}
							onClick={handleClickOpen}
						>
							{_('addDevice')}
						</Button>
					</Paper>
				</Grid>

				<Dialog open={open} onClose={handleClose}>
					<DialogTitle sx={{ bgcolor: BgColor, textAlignLast: 'center', fontSize: '1.4rem' }}>
						{_('Tablet Config')}
					</DialogTitle>
					<DialogContent
						sx={{
							display: 'flex',
							flexWrap: 'wrap',
							flexDirection: 'row',
							justifyContent: 'center',
						}}
					>
						<LoginConfig valideConfig={(attr, value) => handleValideConfig(attr, value)} />
						{valideConfig ? <ConfigButton /> : ''}
					</DialogContent>
					<DialogActions>
						<Button onClick={handleClickAdd} disabled={addButton}>
							{_('add')}
						</Button>
						<Button onClick={handleClose}>{_('Cancel')}</Button>
					</DialogActions>
				</Dialog>
			</ThemeProvider>
		</React.Fragment>
	);
};
