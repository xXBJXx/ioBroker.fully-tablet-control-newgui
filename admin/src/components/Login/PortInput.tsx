/**
 * Created by issi on 31.10.21
 */
import React, { useState } from 'react';
import { useI18n } from 'iobroker-react/hooks';
import { FormControl, TextField, Tooltip } from '@mui/material';
import { createNewConfig } from '../../lib/createConfig';

export const PortInput = (): JSX.Element => {
	const { translate: _ } = useI18n();
	const [port, setPort] = useState(2323);

	return (
		<React.Fragment>
			<FormControl variant="outlined">
				<Tooltip title={_('tooltipPort')} arrow>
					<TextField
						required
						variant="outlined"
						label={_('port')}
						value={port}
						color="success"
						type="number"
						sx={{ width: '11ch', margin: 1 }}
						onChange={(e) => {
							const value = e.target.value;
							if (value !== '') {
								const value = parseInt(e.target.value, 10);
								setPort(value);
								// console.log(value);
								createNewConfig('port', value);
							} else {
								const value = 0;
								setPort(value);
								createNewConfig('port', value);
							}
						}}
					/>
				</Tooltip>
			</FormControl>
		</React.Fragment>
	);
};
