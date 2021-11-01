/**
 * Created by issi on 21.10.21
 */
import React from 'react';
import { useI18n } from 'iobroker-react/hooks';
import { useIoBrokerTheme } from 'iobroker-react/hooks';
import { Button, Theme, ThemeProvider } from '@mui/material';
import { useDialogs } from 'iobroker-react/hooks';
import { createStyles, makeStyles } from '@mui/styles';

export interface testHookProps {
	//props
}

const useStyles = makeStyles((theme: Theme) =>
	createStyles({
		CustemDialog: {
			width: '500px',
		},
		Text: {
			textAlignLast: 'center',
			fontSize: '1.4rem',
			color: '#f80000',
			backgroundColor: '#795353',
		},
		CustemContend: {
			backgroundColor: '#e81313',
		},
		CustemButton: {
			Color: '#ff0000',
		},
	}),
);

export const TestHook: React.FC<testHookProps> = () => {
	const { translate: _ } = useI18n();
	const [themeName, setTheme] = useIoBrokerTheme();
	const classes = useStyles();
	const { showModal } = useDialogs();

	// This will be called when the button is clicked and ask the user if they want to do this
	const askUser = React.useCallback(async () => {
		if (
			await showModal('My modal', 'Do you want to do this?', {
				classNames: {
					dialog: classes.CustemDialog,
					dialogTitle: classes.Text,
					dialogContent: classes.CustemContend,
				},
			})
		) {
			console.log('yes');
		} else {
			console.log('no');
		}
	}, [showModal]);

	return (
		<Button className={classes.CustemButton} variant="contained" size="large" onClick={askUser}>
			Click me!
		</Button>
	);
};
