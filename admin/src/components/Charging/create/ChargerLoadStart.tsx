/**
 * Created by issi on 01.11.21
 */
import React, { useEffect, useState } from 'react';
import { useI18n } from 'iobroker-react/hooks';
import { Box, FormControl, InputLabel, MenuItem, Select, SelectChangeEvent } from '@mui/material';
import { createNewConfig, fullConfig } from '../../../lib/createConfig';

export const ChargerLoadStart = (): JSX.Element => {
	const { translate: _ } = useI18n();
	const [percent, setPercent] = useState('');

	const handleChange = (event: SelectChangeEvent) => {
		setPercent(event.target.value);
		createNewConfig('loadStart', Number(event.target.value));
	};

	const loadStartItem = () => {
		const menuItem = [];
		for (let i = 20; i < 50; i++) {
			// @ts-ignore
			menuItem.push(<MenuItem key={'loadStart' + i} value={i}>{`${i}%`}</MenuItem>);
		}
		return menuItem;
	};

	return (
		<Box sx={{ minWidth: 120 }}>
			<FormControl fullWidth>
				<InputLabel id="loadStart-select-label">{_('loadStart')}</InputLabel>
				<Select
					labelId="loadStart-select-label"
					id="loadStart-select"
					defaultValue={'20'}
					value={fullConfig.config.charger.loadStart.toString()}
					label="loadStart"
					onChange={handleChange}
				>
					{loadStartItem()}
				</Select>
			</FormControl>
		</Box>
	);
};
