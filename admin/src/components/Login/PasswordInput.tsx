/**
 * Created by issi on 31.10.21
 */
import React, { useState } from 'react';
import { useI18n } from 'iobroker-react/hooks';
import { createNewConfig } from '../../lib/createConfig';
import { FormControl, IconButton, InputAdornment, InputLabel, OutlinedInput, Tooltip } from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';

export interface PasswordInputProps {
	//props
}

export const PasswordInput: React.FC<PasswordInputProps> = (): JSX.Element => {
	const [values, setValues] = useState({
		password: '',
		showPassword: false,
	});
	const { translate: _ } = useI18n();

	const handleChange = (prop: string) => (event: { target: { value: any } }) => {
		setValues({ ...values, [prop]: event.target.value });
		createNewConfig('password', event.target.value);
		// passwordObj('password', event.target.value);
	};

	const handleClickShowPassword = () => {
		setValues({ ...values, showPassword: !values.showPassword });
	};

	const handleMouseDownPassword = (event: { preventDefault: () => void }) => {
		event.preventDefault();
	};

	return (
		<React.Fragment>
			<FormControl sx={{ m: 1, width: '20ch' }} variant="outlined">
				<InputLabel htmlFor="outlined-adornment-password">{_('Password')}</InputLabel>
				<Tooltip title={_('tooltipPassword')} arrow>
					<OutlinedInput
						id="outlined-adornment-password"
						type={values.showPassword ? 'text' : 'password'}
						value={values.password}
						onChange={handleChange('password')}
						endAdornment={
							<InputAdornment position="end">
								<IconButton
									aria-label="toggle password visibility"
									onClick={handleClickShowPassword}
									onMouseDown={handleMouseDownPassword}
									edge="end"
								>
									{values.showPassword ? <VisibilityOff /> : <Visibility />}
								</IconButton>
							</InputAdornment>
						}
						label="Password"
					/>
				</Tooltip>
			</FormControl>
		</React.Fragment>
	);
};
