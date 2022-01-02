import { Grid, TextField, Tooltip, Typography } from '@mui/material';
import { useI18n } from 'iobroker-react/hooks';
import React, { useState } from 'react';
import { HelperButton } from '../../components/HelperButton';
import { NumberInput } from '../../components/NumberInput';
import { createNewConfig, fullConfig } from '../../lib/createConfig';
import { LoginConfig } from './Login/LoginConfig';

const LoginHelperLink = 'https://xxbjxx.github.io/language/en/Fully-Tablet-Control/02.Login.html';

interface LoginConfigProps {
	validConfig: (attr: string, value: boolean) => any;
}

let nameValid = false;
let configValid = false;

export const NewTabletConfig: React.FC<LoginConfigProps> = ({ validConfig }): JSX.Element => {
	const [name, setName] = useState('');
	const [error, setError] = useState(true);
	const [numberValue, setNumberValue] = useState(0);
	const { translate: _ } = useI18n();

	const handleValid = (attr: string, value: boolean): void => {
		if (attr === 'name') {
			nameValid = value;
			value
				? configValid
					? validConfig('Login', true)
					: validConfig('Login', false)
				: validConfig('Login', false);
		}
		if (attr === 'login') {
			configValid = value;
			value
				? nameValid
					? validConfig('Login', true)
					: validConfig('Login', false)
				: validConfig('Login', false);
		}
	};

	const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
		// event.target.value = Math.max(0, parseInt(event.target.value)).toString().slice(0, 12);
		const newName = event.target.value;

		if (newName !== '') {
			setName(newName);
			// if (event.target.value.length < 20) {
			// if (fullConfig.config.name.length < 20) {
			// setName(newName);
			createNewConfig('name', newName);
			handleValid('name', true);
			setError(false);
			// } else {
			// 	handleValid('name', false);
			// 	setError(true);
			// }
		} else {
			setName('');
			createNewConfig('name', '');
			handleValid('name', false);
			setError(true);
		}
	};

	const handeleNumber = (attr: string, value: number) => {
		setNumberValue(value);
		createNewConfig(attr, value);
	};

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
				<Tooltip title={_('tooltipTabletName')} arrow>
					<TextField
						required
						error={error}
						label={_('tabletName')}
						color="success"
						value={name}
						type={'text'}
						placeholder="Samsung"
						inputProps={{
							maxLength: 20,
						}}
						onChange={(event) => {
							handleChange(event);
						}}
					/>
				</Tooltip>
				<NumberInput
					min={30}
					max={999}
					label={'interval'}
					tooltip={'screensaverTimeTooltip'}
					defaultValue={30}
					sx={{ margin: 1, width: '110', textAlignLast: 'center' }}
					value={fullConfig.config.interval}
					createNewConfig={(value) => handeleNumber('interval', value)}
				/>
				<HelperButton helperLink={LoginHelperLink} helperTooltipTitle="LoginHelper" />
			</Grid>
			<Typography sx={{ textAlign: 'center', paddingBottom: '10px' }}>{_('FullyLogin')}</Typography>
			<LoginConfig valid={(attr, valid) => handleValid(attr, valid)} />
		</React.Fragment>
	);
};
