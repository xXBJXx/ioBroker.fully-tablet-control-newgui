/**
 * Created by issi on 01.11.21
 */
import React, { useEffect, useState } from 'react';
import { useI18n } from 'iobroker-react/hooks';
import { FormControl, IconButton, InputAdornment, InputLabel, OutlinedInput, Tooltip } from '@mui/material';
import { Ballot } from '@mui/icons-material';
import { createNewConfig, fullConfig } from '../../../lib/createConfig';

export interface ChargeIDProps {
	//props
}

//TODO: mit selectID ersetzen sobald verfügbar
export const ChargeID: React.FC<ChargeIDProps> = (): JSX.Element => {
	const [values, setValues] = useState({
		chargerId: '',
	});
	const { translate: _ } = useI18n();

	const handleChange = (prop: string) => (event: { target: { value: any } }) => {
		setValues({ ...values, [prop]: event.target.value });
		createNewConfig('chargerId', event.target.value);
		// passwordObj('chargerId', event.target.value);
	};

	const handleClickShowPassword = () => {
		// setValues({ ...values, showPassword: !values.showPassword });
	};

	const handleMouseDownPassword = (event: { preventDefault: () => void }) => {
		// event.preventDefault();
	};

	return (
		<React.Fragment>
			<FormControl sx={{ margin: 1, width: '65ch', marginBottom: 2 }} variant="outlined">
				<InputLabel htmlFor="outlined-adornment-chargerId">{_('chargerId')}</InputLabel>
				<Tooltip title={_('tooltipChargerId')} arrow>
					<OutlinedInput
						id="outlined-adornment-chargerId"
						value={fullConfig.config.charger.chargerId}
						onChange={handleChange('chargerId')}
						endAdornment={
							<InputAdornment position="end">
								<IconButton
									aria-label="toggle chargerId visibility"
									onClick={handleClickShowPassword}
									onMouseDown={handleMouseDownPassword}
									edge="end"
								>
									<Ballot />
								</IconButton>
							</InputAdornment>
						}
						label="chargerId"
					/>
				</Tooltip>
			</FormControl>
		</React.Fragment>
	);
};
