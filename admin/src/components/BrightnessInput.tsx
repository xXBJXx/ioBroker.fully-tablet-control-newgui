/**
 * Created by issi on 31.10.21
 */
import React, { useEffect, useState } from 'react';
import { useI18n } from 'iobroker-react/hooks';
import {
	Box,
	FormControl,
	Grid,
	InputLabel,
	MenuItem,
	Select,
	SelectChangeEvent,
	TextField,
	Tooltip,
	Typography,
} from '@mui/material';
import { createNewConfig, fullConfig } from '../lib/createConfig';
import { NumberInput } from './NumberInput';

interface BrightnessInputProps {
	mode: boolean;
	show: boolean;
}

export const BrightnessInput: React.FC<BrightnessInputProps> = ({ mode, show }): JSX.Element => {
	const { translate: _ } = useI18n();
	const [valueDay, setNumberValue] = useState(20);
	const [loadingLoweringMode, setLoadingLoweringMode] = useState(false);

	const handleChange = (event: SelectChangeEvent<string>) => {
		console.log(event.target.value);
		setLoadingLoweringMode(JSON.parse(event.target.value));
		createNewConfig('loadingLoweringMode', JSON.parse(event.target.value));
		console.log(fullConfig.config.brightness);
	};

	useEffect(() => {
		if (fullConfig.config.brightness.loadingLoweringMode) {
			setLoadingLoweringMode(true);
		}
	}, [show]);

	const handeleNumber = (attr: string, value: React.SetStateAction<number>) => {
		setNumberValue(value);
		createNewConfig(attr, value);
	};

	return (
		<React.Fragment>
			<Typography>{_('day Brightness Section')}</Typography>
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
				<NumberInput
					min={0}
					max={100}
					label={'day Brightness'}
					tooltip={'BrightnessDayTooltip'}
					defaultValue={20}
					sx={{ margin: 1, width: '110', textAlignLast: 'center' }}
					value={fullConfig.config.brightness.dayBrightness}
					createNewConfig={(value) => handeleNumber('dayBrightness', value)}
				/>
				{!mode ? (
					<NumberInput
						min={0}
						max={100}
						label={'afternoon Brightness'}
						tooltip={'BrightnessMidTimeTooltip'}
						defaultValue={20}
						sx={{ margin: 1, width: '110', textAlignLast: 'center' }}
						value={fullConfig.config.brightness.midTimeBrightness}
						createNewConfig={(value) => handeleNumber('midTimeBrightness', value)}
					/>
				) : (
					''
				)}
				<NumberInput
					min={0}
					max={100}
					label={'night Brightness'}
					tooltip={'BrightnessNightTimeTooltip'}
					defaultValue={20}
					sx={{ margin: 1, width: '110', textAlignLast: 'center' }}
					value={fullConfig.config.brightness.nightBrightness}
					createNewConfig={(value) => handeleNumber('nightBrightness', value)}
				/>
			</Grid>
			<Typography>{_('loading Lowering Section')}</Typography>
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
						<Tooltip title={_('loadingLoweringModeTooltip')} arrow placement={'left'}>
							<FormControl fullWidth>
								<InputLabel id="loadingLoweringMode-select-label">
									{_('loading Lowering Mode')}
								</InputLabel>
								<Select
									labelId="loadingLoweringMode-select-label"
									id="loadingLoweringMode"
									value={fullConfig.config.brightness.loadingLoweringMode.toString()}
									label="loading Lowering Mode"
									onChange={(event) => {
										handleChange(event);
									}}
								>
									<MenuItem value={'true'}>{_('lowering when loading On')}</MenuItem>
									<MenuItem value={'false'}>{_('lowering when loading Off')}</MenuItem>
								</Select>
							</FormControl>
						</Tooltip>
					</Box>
					{loadingLoweringMode ? (
						<NumberInput
							min={0}
							max={100}
							label={'loading Lowering'}
							tooltip={'loadingLoweringBrightnessTooltip'}
							defaultValue={20}
							sx={{ margin: 1, width: '110', textAlignLast: 'center' }}
							value={fullConfig.config.brightness.loadingLowering}
							createNewConfig={(value) => handeleNumber('loadingLowering', value)}
						/>
					) : (
						''
					)}
				</React.Fragment>
			</Grid>
		</React.Fragment>
	);
};
