/**
 * Created by issi on 01.11.21
 */
import React, { useEffect, useState } from 'react';
import { useI18n } from 'iobroker-react/hooks';
import { Box, FormControl, InputLabel, MenuItem, Select, SelectChangeEvent } from '@mui/material';
import { createNewConfig, fullConfig } from '../../../lib/createConfig';

export const ChargerMode = (): JSX.Element => {
	const { translate: _ } = useI18n();
	const [mode, setAMode] = useState('');

	const handleChange = (event: SelectChangeEvent) => {
		setAMode(event.target.value as string);

		if (event.target.value === 'true' || event.target.value == 'false') {
			createNewConfig('powerMode', JSON.parse(event.target.value));
		}
	};

	return (
		<Box sx={{ minWidth: 120 }}>
			<FormControl fullWidth>
				<InputLabel id="powerMode-select-label">{_('powerMode')}</InputLabel>
				<Select
					labelId="powerMode-select-label"
					id="powerMode-select"
					defaultValue={'false'}
					value={fullConfig.config.charger.powerMode.toString()}
					label="powerMode"
					onChange={handleChange}
				>
					<MenuItem value={'true'}>{_('Charge cycle')}</MenuItem>
					<MenuItem value={'false'}>{_('Continuous current')}</MenuItem>
				</Select>
			</FormControl>
		</Box>
	);
};
