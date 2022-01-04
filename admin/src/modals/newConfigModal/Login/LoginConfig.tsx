/**
 * Created by issi on 31.10.21
 */
import { Visibility, VisibilityOff } from '@mui/icons-material';
import {
	FormControl,
	Grid,
	IconButton,
	InputAdornment,
	InputLabel,
	OutlinedInput,
	Switch,
	TextField,
	Tooltip,
} from '@mui/material';
import { useI18n } from 'iobroker-react/hooks';
import React, { useState } from 'react';
import { NumberInput } from '../../../components/NumberInput';
import { createNewConfig, fullConfig } from '../../../lib/createConfig';

export interface LoginInputsProps {
	valid: (attr: string, valid: boolean) => void;
}
interface valuesProps {
	ip: string | any[];
	password: string;
	showPassword: boolean;
}

const configValid = { ip: false, port: true, password: false, active: false };

const allowedInputRegex = /^\d*\.?\d*\.?\d*\.?\d*$/;
const ipRegex = /^(?:(?:25[0-5]|2[0-4]\d|1?\d?\d)(?:\.(?!$)|$)){4}$/; //regex from https://regex101.com/library/ChFXjy
export const LoginConfig: React.FC<LoginInputsProps> = ({ valid }): JSX.Element => {
	const { translate: _ } = useI18n();
	const [valide, setValide] = useState<boolean>(true);
	// const [ipValue, setIpValue] = useState:string | any[]  ('');
	const [values, setValues] = useState<valuesProps>({
		ip: '',
		password: '',
		showPassword: false,
	});
	const [checked, setChecked] = useState<boolean>(false);
	const [numberValue, setNumberValue] = useState<number>(0);

	const configVerification = (attr: string, value: boolean): void => {
		if (attr === 'ip') {
			configValid.ip = value;
		}
		if (attr === 'port') {
			configValid.port = value;
		}
		if (attr === 'password') {
			configValid.password = value;
		}
		if (attr === 'active') {
			configValid.active = value;
		}

		if (configValid.ip && configValid.port && configValid.password && configValid.active) {
			setChecked(true);
			createNewConfig('active', true);
			valid('login', true);
		} else {
			setChecked(false);
			createNewConfig('active', false);
			valid('login', false);
		}
	};

	/**
	 * ip verification
	 */
	function ValidateIpAddress(ipAddress: string | any[]): void {
		if (ipAddress !== undefined || ipAddress !== '') {
			if (typeof ipAddress !== 'string' || ipAddress?.match(ipRegex)) {
				// valid
				setValide(false);
				configVerification('ip', true);
				// console.log('ip is a valid IP address');
				createNewConfig('ip', ipAddress);
			} else {
				// invalid
				// console.log('ip is not a valid IP address');
				configVerification('ip', false);
				setValide(true);
			}
		}
	}

	/**
	 * Password
	 */
	const handleChangePW =
		(prop: string) =>
		(event: { target: { value: any } }): void => {
			setValues({ ...values, [prop]: event.target.value });

			createNewConfig('password', event.target.value);
			if (event.target.value !== '') {
				configVerification('password', true);
				// console.log('password true');
			} else {
				configVerification('password', false);
				// console.log('password false');
			}
		};

	const handleClickShowPassword = (): void => {
		setValues({ ...values, showPassword: !values.showPassword });
	};

	/**
	 * Switch
	 */
	const handleSwitchChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
		setChecked(event.target.checked);
		if (
			fullConfig.config.name !== '' &&
			fullConfig.config.Login.ip !== '' &&
			fullConfig.config.Login.port !== 0 &&
			fullConfig.config.Login.password !== ''
		) {
			if (event.target.checked) {
				configVerification('active', true);
			} else {
				configVerification('active', false);
			}
		} else {
			setChecked(false);
			configVerification('active', false);
		}
	};

	const handeleNumber = (attr: string, value: React.SetStateAction<number>): void => {
		setNumberValue(value);
		createNewConfig(attr, value);
		if (value !== 0) {
			configVerification('port', true);
		} else {
			configVerification('port', false);
		}
	};

	const handleIpAddress = (
		event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>,
		newValue: string | any[],
	): void => {
		const length = newValue.length;
		const index = newValue.lastIndexOf('.') + 1;
		let noOfDots = 0;
		if (typeof newValue === 'string') {
			noOfDots = newValue.split('.').length - 1;
		}
		let updatedVal: string | any[] = '';
		if (length !== index && noOfDots < 3 && values.ip.length < length && (length - index) % 3 == 0) {
			console.log('1');
			updatedVal = newValue + '.';
		} else if (noOfDots > 3 || length - index > 3) {
			console.log('2');
			if (typeof newValue === 'string') {
				updatedVal = newValue.substring(0, length - 1);
			}
		} else {
			console.log('3');
			updatedVal = newValue;
		}
		setValues({ ...values, ip: updatedVal });
		ValidateIpAddress(updatedVal);
	};

	return (
		<Grid
			container
			spacing={3}
			sx={{
				marginTop: '0',
				paddingBottom: '15px',
				alignItems: 'center',
				justifyContent: 'space-around',
				display: 'flex',
				flexWrap: 'nowrap',
				flexDirection: 'row',
			}}
		>
			<React.Fragment>
				<FormControl variant="outlined">
					<Tooltip title={_('tooltipIp')} arrow>
						<TextField
							required
							variant="outlined"
							error={valide}
							color="success"
							label={_('ipAddress')}
							value={values.ip}
							type="text"
							placeholder="192.168.1.1"
							sx={{ width: '22ch', margin: 1 }}
							inputProps={{
								maxLength: 15,
							}}
							onChange={(e) => {
								const newValue = e.target.value;

								if (allowedInputRegex.test(newValue)) {
									handleIpAddress(e, newValue);
								}
							}}
						/>
					</Tooltip>
				</FormControl>
				<NumberInput
					min={0}
					max={9999}
					label={'port'}
					tooltip={'tooltipPort'}
					defaultValue={2323}
					sx={{ width: '12ch', margin: 1, textAlignLast: 'center' }}
					value={fullConfig.config.Login.port}
					createNewConfig={(value) => handeleNumber('port', value)}
				/>
				<FormControl sx={{ m: 1, width: '20ch' }} variant="outlined">
					<InputLabel htmlFor="outlined-adornment-password">{_('Password')}</InputLabel>
					<Tooltip title={_('tooltipPassword')} arrow>
						<OutlinedInput
							id="outlined-adornment-password"
							type={values.showPassword ? 'text' : 'password'}
							value={values.password}
							onChange={handleChangePW('password')}
							endAdornment={
								<InputAdornment position="end">
									<IconButton
										aria-label="toggle password visibility"
										onClick={handleClickShowPassword}
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
				<Tooltip title={_('active')} arrow>
					<Switch
						checked={checked}
						onChange={(e) => {
							handleSwitchChange(e);
							createNewConfig('active', e.target.checked);
						}}
						color="primary"
						inputProps={{ 'aria-label': 'controlled' }}
					/>
				</Tooltip>
			</React.Fragment>
		</Grid>
	);
};
