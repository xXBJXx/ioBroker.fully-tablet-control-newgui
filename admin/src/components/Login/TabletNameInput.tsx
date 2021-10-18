import React, { useState } from 'react';
import { FormControl, TextField, Tooltip } from '@mui/material';
import { useI18n } from 'iobroker-react/hooks';
import { createLoginConfig, fullConfig } from '../../lib/createConfig';

export const TabletNameInput = () => {
	const [name, setName] = useState('');
	const [error, setError] = useState(true);

	const { translate: _ } = useI18n();

	const handleChange = (event) => {
		const newName = event.target.value;
		// setName(newName);
		if (newName !== '') {
			setError(false);
			setName((prevState) => (prevState = newName));
			createLoginConfig('name', newName);
			// onNameChange('name', newName);
		} else {
			setName((prevState) => (prevState = ''));
			createLoginConfig('name', newName);
			console.log(name);
			setError(true);
		}
	};

	return (
		<React.Fragment>
			<FormControl variant="outlined">
				<Tooltip title={_('tooltipIp')} arrow>
					<TextField
						required
						error={error}
						label={_('tabletName')}
						color="success"
						value={fullConfig.config.name ? fullConfig.config.name : name}
						placeholder="Samsung"
						onChange={(event) => {
							handleChange(event);
						}}
					/>
				</Tooltip>
			</FormControl>
		</React.Fragment>
	);
};
