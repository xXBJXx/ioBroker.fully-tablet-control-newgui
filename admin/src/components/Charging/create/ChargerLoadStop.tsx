/**
 * Created by issi on 01.11.21
 */
import React, { useEffect, useState } from 'react';
import { useI18n } from 'iobroker-react/hooks';
import { Box, FormControl, InputLabel, MenuItem, Select, SelectChangeEvent } from '@mui/material';
import { createNewConfig, fullConfig } from '../../../lib/createConfig';

export const ChargerLoadStop = (): JSX.Element => {
	const { translate: _ } = useI18n();
	const [percent, setPercent] = useState('');

	const handleChange = (event: SelectChangeEvent) => {
		setPercent(event.target.value);
		createNewConfig('loadStop', Number(event.target.value));
	};

	const loadStopItem = () => {
		const menuItem = [];
		for (let i = 55; i < 101; i++) {
			// @ts-ignore
			menuItem.push(<MenuItem key={'loadStop' + i} value={i}>{`${i}%`}</MenuItem>);
		}
		return menuItem;
	};

	return (
		<Box sx={{ minWidth: 120 }}>
			<FormControl fullWidth>
				<InputLabel id="loadStop-select-label">{_('loadStop')}</InputLabel>
				<Select
					labelId="loadStop-select-label"
					id="loadStop-select"
					defaultValue={'85'}
					value={fullConfig.config.charger.loadStop.toString()}
					label="loadStop"
					onChange={handleChange}
				>
					{loadStopItem()}
				</Select>
			</FormControl>
		</Box>
	);
};
