import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Grid, Paper } from '@mui/material';
import React, { useCallback, useState } from 'react';
import { useConnection, useGlobals, useI18n } from 'iobroker-react/hooks';
import { clearConfig, fullConfig } from '../../lib/createConfig';
import { useIoBrokerTheme } from 'iobroker-react/hooks';
import { NewTabletConfig } from './NewTabletConfig';
import { ConfigButton } from '../../components/ConfigButton';

export interface AddDeviceDialogProps {
	onChange: (value: any) => void;
	native: ioBroker.AdapterConfig;
}

export const AddDeviceDialog: React.FC<AddDeviceDialogProps> = () => {
	const [open, setOpen] = React.useState(false);
	const [addButton, setAddButton] = useState(true);
	const [valideConfig, setValideConfig] = useState(false);

	const { translate: _ } = useI18n();
	const [themeName, setTheme] = useIoBrokerTheme();
	const connection = useConnection();
	const { namespace } = useGlobals();

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

	/**
	 *  config sendTo adapter
	 */
	const handleClickAdd = useCallback(async () => {
		// TODO add Device sendTo actived
		// const result = await connection.sendTo(namespace, 'newConfig', fullConfig);
		// if (!result) console.error('Nope!');
		// if (result) console.info(result);
		console.log(fullConfig);
		setAddButton(true);
		clearConfig();
		setOpen(false);
	}, [connection, namespace]);

	const handleClickOpen = (): void => {
		// console.log(fullConfig);
		clearConfig();
		setOpen(true);
	};

	const handleClose = (): void => {
		// console.log(fullConfig);
		clearConfig();
		setOpen(false);
		setAddButton(true);
		setValideConfig(false);
	};

	const handleValidConfig = (attr: string, value: boolean): void => {
		switch (attr) {
			case 'Login':
				setValideConfig(value);
				// console.log('handleValidConfig' + value);
				value ? setAddButton(false) : setAddButton(true);
				break;
		}
	};

	return (
		<React.Fragment>
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
					<NewTabletConfig validConfig={(attr, value) => handleValidConfig(attr, value)} />
					<ConfigButton />
				</DialogContent>
				<DialogActions>
					<Button onClick={handleClickAdd} disabled={addButton}>
						{_('add')}
					</Button>
					<Button onClick={handleClose}>{_('Cancel')}</Button>
				</DialogActions>
			</Dialog>
		</React.Fragment>
	);
};