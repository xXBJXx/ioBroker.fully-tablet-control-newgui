/**
 * Created by issi on 31.10.21
 */
import React, { useState } from 'react';
import { useI18n } from 'iobroker-react/hooks';
import { FormControl, TextField, Tooltip } from '@mui/material';
import { createLoginConfig } from '../../lib/createConfig';

const allowedInputRegex = /^\d*\.?\d*\.?\d*\.?\d*$/;
const ipRegex = /^(?:(?:25[0-5]|2[0-4]\d|1?\d?\d)(?:\.(?!$)|$)){4}$/; //regex from https://regex101.com/library/ChFXjy

export const IpAdresse = (): JSX.Element => {
	const { translate: _ } = useI18n();
	const [valide, setValide] = useState(true);
	const [IpValue, setIpValue] = useState('');

	function ValidateIpAddress(ipAddress: string) {
		if (ipAddress !== undefined || ipAddress !== '') {
			if (ipAddress.match(ipRegex)) {
				// valid
				setValide(false);
				console.log('ip is a valid IP address');
				createLoginConfig('ip', ipAddress);
			} else {
				// invalid
				console.log('ip is not a valid IP address');
				setValide(true);
			}
		}
	}

	return (
		<React.Fragment>
			<FormControl variant="outlined">
				<Tooltip title={_('tooltipIp')} arrow>
					<TextField
						required
						variant="outlined"
						error={valide}
						color="success"
						label={_('ipAddress')}
						value={IpValue}
						type="text"
						placeholder="192.168.1.1"
						sx={{ width: '18ch', margin: 1 }}
						onChange={(e) => {
							const newValue = e.target.value;
							// console.log(`onChange ${newValue}`);
							if (allowedInputRegex.test(newValue)) {
								// console.log(`onChange ${newValue}`);
								setIpValue(newValue);
								ValidateIpAddress(newValue);
							}
						}}
					/>
				</Tooltip>
			</FormControl>
		</React.Fragment>
	);
};
