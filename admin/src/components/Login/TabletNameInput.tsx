import I18n from '@iobroker/adapter-react/i18n';
import React, { useState } from 'react';
import { FormControl, TextField, Tooltip } from '@material-ui/core';
import { useI18n } from 'iobroker-react/hooks';
import { createLoginConfig, fullConfig } from '../../lib/createConfig';

export const TabletNameInput = ({ onNameChange }) => {
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
						value={fullConfig.config.name ? fullConfig.config.name : name}
						focused
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
