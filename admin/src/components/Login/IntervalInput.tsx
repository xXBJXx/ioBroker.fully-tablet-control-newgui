import React, { useState } from 'react';
import { TextField, Tooltip } from '@mui/material';
import { useI18n } from 'iobroker-react/hooks';
import { createNewConfig } from '../../lib/createConfig';

const min = 30;
const max = 999;
export const IntervalInput = (): JSX.Element => {
	const [value, setValue] = useState(30);
	const { translate: _ } = useI18n();
	return (
		<React.Fragment>
			<Tooltip title={_('intervalTooltip')} arrow>
				<TextField
					variant="outlined"
					type="number"
					label={_('interval')}
					value={value}
					color={'success'}
					sx={{ margin: 1, width: '110', textAlignLast: 'center' }}
					onChange={(e) => {
						let newValue = parseInt(e.target.value, 10);
						if (newValue > max) newValue = max;
						if (newValue < min) newValue = min;
						setValue(newValue);
						createNewConfig('interval', newValue);
					}}
				/>
			</Tooltip>
		</React.Fragment>
	);
};
