import React, { useEffect, useState } from 'react';
import { TabletNameInput } from './TabletNameInput';
import { IntervalInput } from './IntervalInput';
import { Alert, Grid, Typography } from '@mui/material';
import { useI18n } from 'iobroker-react/hooks';
import { HelperButton } from '../HelperButton';
import { IpAdresse } from './IpAdresse';
import { PortInput } from './PortInput';
import { PasswordInput } from './PasswordInput';
import { TabletActivate } from './TabletActivate';
import { fullConfig } from '../../lib/createConfig';

const LoginHelperLink = 'https://xxbjxx.github.io/language/en/Fully-Tablet-Control/02.Login.html';
let AlertTimeout: NodeJS.Timeout;

interface LoginConfigProps {
	valideConfig: (attr: string, value: boolean) => any;
}

export const LoginConfig: React.FC<LoginConfigProps> = ({ valideConfig }): JSX.Element => {
	const { translate: _ } = useI18n();
	const [showAlert, setShowAlert] = useState(false);
	const [alertTimeout, setAlertTimeout] = useState(false);

	const handleActivate = (active: boolean) => {
		if (active) {
			setShowAlert(false);
			if (AlertTimeout) clearTimeout(AlertTimeout);
			valideConfig('Login', true);
		} else {
			setShowAlert(true);
			setAlertTimeout(true);
		}
	};

	const handleAlert = () => {
		if (fullConfig.config.name === '') {
			console.log('name');
			return (
				<Alert variant="filled" severity="error">
					{_('alertName')}
				</Alert>
			);
		} else if (fullConfig.config.Login.ip === '') {
			console.log('Ip');
			return (
				<Alert variant="filled" severity="error">
					{_('alertIp')}
				</Alert>
			);
		} else if (fullConfig.config.Login.password === '') {
			console.log('Password');
			return (
				<Alert variant="filled" severity="error">
					{_('alertPassword')}
				</Alert>
			);
		}
	};
	useEffect(() => {
		if (alertTimeout) {
			if (AlertTimeout) clearTimeout(AlertTimeout);
			AlertTimeout = setTimeout(() => {
				setShowAlert(false);
				setAlertTimeout(false);
			}, 4000);
		}
		return () => clearTimeout(AlertTimeout);
	}, [alertTimeout]);

	return (
		<React.Fragment>
			<Grid
				container
				spacing={3}
				sx={{
					marginTop: '10px',
					paddingBottom: '15px',
					alignItems: 'center',
					justifyContent: 'space-around',
					display: 'flex',
					flexWrap: 'nowrap',
					flexDirection: 'row',
				}}
			>
				<TabletNameInput />
				<IntervalInput />
				<HelperButton helperLink={LoginHelperLink} helperTooltipTitle="LoginHelper" />
			</Grid>
			<Typography sx={{ textAlign: 'center', paddingBottom: '10px' }}>{_('FullyLogin')}</Typography>
			<Grid
				container
				spacing={3}
				sx={{
					marginTop: '0',
					paddingBottom: '15px',
					alignItems: 'center',
					justifyContent: 'space-around',
					display: 'flex',
					flexWrap: 'nowrap',
					flexDirection: 'row',
				}}
			>
				<IpAdresse />
				<PortInput />
				<PasswordInput />
				<TabletActivate active={(active) => handleActivate(active)} />
			</Grid>
			{showAlert ? handleAlert() : ''}
		</React.Fragment>
	);
};
