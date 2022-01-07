/**
 * Created by issi on 31.10.21
 */
import { Grid, Typography } from '@mui/material';
import { useI18n } from 'iobroker-react/hooks';
import React, { useState } from 'react';
import { fullConfig } from '../lib/createConfig';
import { NumberInput } from './NumberInput';

export const ManualTimeInput = (): JSX.Element => {
	const { translate: _ } = useI18n();
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	const [numberValue, setNumberValue] = useState<number>(0);

	const handeleNumber = (attr: string, value: React.SetStateAction<number>) => {
		setNumberValue(value);
		fullConfig.config.brightness[attr] = value;
	};

	return (
		<React.Fragment>
			<Typography>{_('ManualTime Section')}</Typography>
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
					max={23}
					label={'In the morning'}
					tooltip={'BrightnessMorningManualTimeTooltip'}
					defaultValue={20}
					sx={{ margin: 1, width: '110', textAlignLast: 'center' }}
					value={fullConfig.config.brightness.dayTime}
					createNewConfig={(value) => handeleNumber('dayTime', value)}
				/>
				<NumberInput
					min={0}
					max={23}
					label={'afternoon'}
					tooltip={'BrightnessAfternoonManualTimeTooltip'}
					defaultValue={20}
					sx={{ margin: 1, width: '110', textAlignLast: 'center' }}
					value={fullConfig.config.brightness.midTime}
					createNewConfig={(value) => handeleNumber('midTime', value)}
				/>
				<NumberInput
					min={0}
					max={23}
					label={'At night'}
					tooltip={'BrightnessNightManualTimeTooltip'}
					defaultValue={20}
					sx={{ margin: 1, width: '110', textAlignLast: 'center' }}
					value={fullConfig.config.brightness.nightTime}
					createNewConfig={(value) => handeleNumber('nightTime', value)}
				/>
			</Grid>
		</React.Fragment>
	);
};
