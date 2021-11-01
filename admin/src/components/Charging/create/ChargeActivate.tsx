/**
 * Created by issi on 31.10.21
 */
import React, { useEffect, useState } from 'react';
import { useI18n } from 'iobroker-react/hooks';
import { Box, FormControl, InputLabel, MenuItem, Select, SelectChangeEvent } from '@mui/material';
import { createNewConfig, fullConfig } from '../../../lib/createConfig';

export interface ChargeActivateProps {
	active: (active: boolean) => any;
}

export const ChargeActivate: React.FC<ChargeActivateProps> = ({ active }): JSX.Element => {
	const { translate: _ } = useI18n();

	const handleChange = (event: SelectChangeEvent) => {
		if (event.target.value === 'true' || event.target.value == 'false') {
			createNewConfig('chargerActive', JSON.parse(event.target.value));
			active(JSON.parse(event.target.value));
		}
	};

	return (
		<Box sx={{ minWidth: 120 }}>
			<FormControl fullWidth>
				<InputLabel id="chargerActive-select-label">charger Active</InputLabel>
				<Select
					labelId="chargerActive-select-label"
					id="chargerActive"
					value={fullConfig.config.charger.chargerActive.toString()}
					label="charger Active"
					onChange={handleChange}
				>
					<MenuItem value={'true'}>Charging On</MenuItem>
					<MenuItem value={'false'}>Charging Off</MenuItem>
				</Select>
			</FormControl>
		</Box>
	);
};
