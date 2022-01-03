/**
 * Created by issi on 31.10.21
 */
import { Box, FormControl, Grid, InputLabel, MenuItem, Select, Typography } from '@mui/material';
import { useI18n } from 'iobroker-react/hooks';
import React, { useState } from 'react';
import { createNewConfig, fullConfig } from '../lib/createConfig';

const astro: string[] = [
	'sunrise',
	'sunriseEnd',
	'goldenHourEnd',
	'solarNoon',
	'goldenHour',
	'sunsetStart',
	'sunset',
	'dusk',
	'nauticalDusk',
	'night',
	'nadir',
	'nightEnd',
	'nauticalDawn',
	'dawn',
];

export const AstroTimeSelect = (): JSX.Element => {
	const { translate: _ } = useI18n();
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	const [brightnessAstroDay, setBrightnessAstroDay] = useState<string>('sunrise');
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	const [brightnessAstroNight, setBrightnessAstroNight] = useState<string>('sunset');

	const handleChangeNight = (event: { target: { value: React.SetStateAction<string> } }) => {
		createNewConfig('astroSelectNight', event.target.value);
		setBrightnessAstroNight(event.target.value);
	};

	const handleChangeDay = (event: { target: { value: React.SetStateAction<string> } }) => {
		createNewConfig('astroSelectDay', event.target.value);
		setBrightnessAstroDay(event.target.value);
	};

	const astroSelect = (key: string): JSX.Element[] => {
		const menuItem: JSX.Element[] = [];
		for (const astroKey in astro) {
			menuItem.push(
				<MenuItem key={key + astro[astroKey]} value={astro[astroKey]}>{`${_(astro[astroKey])}`}</MenuItem>,
			);
		}
		return menuItem;
	};

	return (
		<React.Fragment>
			<Typography>{_('AstroTime Section')}</Typography>
			<Grid
				container
				spacing={1}
				sx={{
					marginTop: '10px',
					paddingBottom: '15px',
					alignItems: 'center',
					justifyContent: 'space-around',
					display: 'flex',
					flexWrap: 'wrap',
					flexDirection: 'row',
				}}
			>
				<React.Fragment>
					<Box sx={{ minWidth: 120 }}>
						<FormControl fullWidth>
							<InputLabel id="BrightnessAstroDay-select-label">{_('astro time day')}</InputLabel>
							<Select
								labelId="BrightnessAstroDay-select-label"
								id="BrightnessAstroDay"
								value={fullConfig.config.brightness.astroSelectDay}
								label="astro time day"
								onChange={handleChangeDay}
							>
								{astroSelect('astroSelectDay')}
							</Select>
						</FormControl>
					</Box>
					<Box sx={{ minWidth: 120 }}>
						<FormControl fullWidth>
							<InputLabel id="BrightnessAstroNight-select-label">{_('astro time Night')}</InputLabel>
							<Select
								labelId="BrightnessAstroNight-select-label"
								id="BrightnessAstroNight"
								value={fullConfig.config.brightness.astroSelectNight}
								label="astro time night"
								onChange={handleChangeNight}
							>
								{astroSelect('astroSelectNight')}
							</Select>
						</FormControl>
					</Box>
				</React.Fragment>
			</Grid>
		</React.Fragment>
	);
};
