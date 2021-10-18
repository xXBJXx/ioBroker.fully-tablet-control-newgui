import { Button, Fab, Grid, makeStyles, Paper, Tooltip } from '@material-ui/core/';
import React, { useState } from 'react';
import { useI18n, useDialogs } from 'iobroker-react/hooks';
import { TabletNameInput } from './Login/TabletNameInput';
import { clearConfig } from '../lib/createConfig';

const useStyles = makeStyles((theme) => ({
	buttonGrid: {
		display: 'flex',
		justifyContent: 'center',
	},
	buttonPaper: {
		height: '110px',
		padding: '32px',
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'center',
		flexWrap: 'nowrap',
		flexDirection: 'column',
	},
}));

export const AddDeviceDialog = ({ onChange }) => {
	const classes = useStyles();
	const { translate: _ } = useI18n();
	const { showModal } = useDialogs();

	const Config = () => {
		return (
			<React.Fragment>
				<TabletNameInput onNameChange={(options, value) => onChange(options, value)} />
			</React.Fragment>
		);
	};

	const askUser = React.useCallback(async () => {
		if (await showModal('Tablet Config', Config())) {
			console.log(open);
			console.log('yes');
		} else {
			clearConfig();
			console.log('no');
		}
	}, [showModal]);

	return (
		<React.Fragment>
			<Grid className={classes.buttonGrid} container spacing={0}>
				<Paper className={classes.buttonPaper} elevation={24}>
					<Button variant="contained" size="large" color={'primary'} onClick={askUser}>
						{_('addDevice')}
					</Button>
				</Paper>
			</Grid>
		</React.Fragment>
	);
};
