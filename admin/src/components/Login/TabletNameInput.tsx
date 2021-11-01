import React, { useState } from 'react';
import { TextField, Tooltip } from '@mui/material';
import { useI18n } from 'iobroker-react/hooks';
import { createNewConfig } from '../../lib/createConfig';

export const TabletNameInput = (): JSX.Element => {
	const [name, setName] = useState('');
	const [error, setError] = useState(true);

	const { translate: _ } = useI18n();

	const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
		const newName = event.target.value;

		if (newName !== '') {
			setError(false);
			setName((prevState) => (prevState = newName));
			createNewConfig('name', newName);
			// onNameChange('name', newName);
		} else {
			setName((prevState) => (prevState = ''));
			createNewConfig('name', newName);
			setError(true);
		}
	};

	return (
		<React.Fragment>
			<Tooltip title={_('tooltipIp')} arrow>
				<TextField
					required
					error={error}
					label={_('tabletName')}
					color="success"
					value={name}
					placeholder="Samsung"
					onChange={(event) => {
						handleChange(event);
					}}
				/>
			</Tooltip>
		</React.Fragment>
	);
};
