/**
 * Created by issi on 31.10.21
 */
import React, { useEffect, useState } from 'react';
import { useI18n } from 'iobroker-react/hooks';
import { Alert, Switch, Tooltip } from '@mui/material';
import { createLoginConfig, fullConfig } from '../../lib/createConfig';

export interface TabletActivateProps {
	active: (active: boolean) => any;
}

export const TabletActivate: React.FC<TabletActivateProps> = ({ active }): JSX.Element => {
	const { translate: _ } = useI18n();
	const [checked, setChecked] = useState(false);

	const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		setChecked(event.target.checked);
		if (
			fullConfig.config.name !== '' &&
			fullConfig.config.Login.ip !== '' &&
			fullConfig.config.Login.port !== 0 &&
			fullConfig.config.Login.password !== ''
		) {
			if (event.target.checked) {
				active(true);
			} else {
				active(false);
			}
		} else {
			setChecked(false);
			active(false);
		}
	};

	return (
		<React.Fragment>
			<Tooltip title={_('active')} arrow>
				<Switch
					checked={checked}
					onChange={(e) => {
						handleChange(e);
						createLoginConfig('active', e.target.checked);
					}}
					color="primary"
					inputProps={{ 'aria-label': 'controlled' }}
				/>
			</Tooltip>
		</React.Fragment>
	);
};
