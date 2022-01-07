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
	TextField,
	Tooltip,
	Typography,
} from '@mui/material';
import { useI18n } from 'iobroker-react/hooks';
import React, { useState } from 'react';
import { HelperButton } from '../../../components/HelperButton';
import { NumberInput } from '../../../components/NumberInput';
import { fullConfig } from '../../../lib/createConfig';

export interface validProps {
	valid: (value: boolean) => void;
}

interface valuesProps {
	ip: string | any[];
	password: string;
	showPassword: boolean;
}

const allowedInputRegex = /^\d*\.?\d*\.?\d*\.?\d*$/;
const ipRegex = /^(?:(?:25[0-5]|2[0-4]\d|1?\d?\d)(?:\.(?!$)|$)){4}$/; //regex from https://regex101.com/library/ChFXjy
const LoginHelperLink = 'https://xxbjxx.github.io/language/en/Fully-Tablet-Control/02.Login.html';

export const LoginConfig: React.FC<validProps> = ({ valid }): JSX.Element => {
	const { translate: _ } = useI18n();
	const [valide, setValide] = useState<boolean>(true);
	const [values, setValues] = useState<valuesProps>({
		ip: '',
		password: '',
		showPassword: false,
	});

	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	const [numberValue, setNumberValue] = useState<number>(0);
	const [name, setName] = useState<string>('');
	const [error, setError] = useState<boolean>(true);

	const configVerification = (): void => {
		const name = fullConfig.config.name;
		const ip4 = fullConfig.config.Login.ip;
		const port = fullConfig.config.Login.port;
		const password = fullConfig.config.Login.password;
		if (name !== '' && ip4 !== '' && port !== 0 && password !== '') {
			valid(false);
		} else {
			valid(true);
		}
	};

	/**
	 * Password
	 */
	const handleChangePW =
		(attr: string) =>
		(event: { target: { value: any } }): void => {
			setValues({ ...values, [attr]: event.target.value });
			fullConfig.config.Login.password = event.target.value;
			configVerification();
		};

	const handleClickShowPassword = (): void => {
		setValues({ ...values, showPassword: !values.showPassword });
	};

	const handeleNumber = (attr: string, value: React.SetStateAction<number>): void => {
		setNumberValue(value);
		if (typeof value === 'number') {
			switch (attr) {
				case 'interval': {
					fullConfig.config.interval = value;
					configVerification();
					break;
				}
				case 'port': {
					fullConfig.config.Login.port = value;
					configVerification();
					break;
				}
			}
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
			updatedVal = newValue + '.';
		} else if (noOfDots > 3 || length - index > 3) {
			if (typeof newValue === 'string') {
				updatedVal = newValue.substring(0, length - 1);
			}
		} else {
			updatedVal = newValue;
		}
		setValues({ ...values, ip: updatedVal });

		if (updatedVal !== undefined || updatedVal !== '') {
			if (typeof updatedVal !== 'string' || updatedVal?.match(ipRegex)) {
				// valid
				if (typeof updatedVal === 'string') {
					fullConfig.config.Login.ip = updatedVal;
					configVerification();
				}
				setValide(false);
			} else {
				// invalid
				setValide(true);
			}
		}
	};

	const handleChangeName = (event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>): void => {
		const newName: string = event.target.value;

		if (newName !== '') {
			setName(newName);
			fullConfig.config.name = newName;
			configVerification();
			setError(false);
		} else {
			setName('');
			fullConfig.config.name = '';
			configVerification();
			setError(true);
		}
	};

	return (
		<React.Fragment>
			<Grid
				container
				spacing={3}
				sx={{
					marginTop: '10px',
					paddingBottom: '15px',
					alignItems: 'center',
					justifyContent: 'space-around',
					display: 'flex',
					flexWrap: 'nowrap',
					flexDirection: 'row',
				}}
			>
				<Tooltip title={_('tooltipTabletName')} arrow>
					<TextField
						required
						error={error}
						label={_('tabletName')}
						color="success"
						value={name}
						type={'text'}
						placeholder="Samsung"
						inputProps={{
							maxLength: 20,
						}}
						onChange={(event) => {
							handleChangeName(event);
						}}
					/>
				</Tooltip>
				<NumberInput
					min={30}
					max={999}
					label={'interval'}
					tooltip={'screensaverTimeTooltip'}
					defaultValue={30}
					sx={{ margin: 1, width: '110', textAlignLast: 'center' }}
					value={fullConfig.config.interval}
					createNewConfig={(value) => handeleNumber('interval', value)}
				/>
				<HelperButton helperLink={LoginHelperLink} helperTooltipTitle="LoginHelper" />
			</Grid>
			<Typography sx={{ textAlign: 'center', paddingBottom: '10px' }}>{_('FullyLogin')}</Typography>
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
								sx={{ width: '23ch', margin: 1 }}
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
				</React.Fragment>
			</Grid>
		</React.Fragment>
	);
};
