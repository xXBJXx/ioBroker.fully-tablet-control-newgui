/**
 * Created by issi on 01.11.21
 */

import { Ballot } from '@mui/icons-material';
import {
	Alert,
	AlertTitle,
	Button,
	FormControl,
	Grid,
	IconButton,
	InputAdornment,
	InputLabel,
	OutlinedInput,
	Stack,
	Tooltip,
} from '@mui/material';
import { useI18n } from 'iobroker-react/hooks';
import React, { useState } from 'react';
import { fullConfig } from '../lib/createConfig';

interface ChargeIDProps {
	valid: (value: boolean) => void;
}

//TODO: mit selectID ersetzen sobald verfügbar
export const ChargeID: React.FC<ChargeIDProps> = ({ valid }): JSX.Element => {
	const [values, setValues] = useState({
		chargerId: '',
		showSelectId: false,
	});
	const { translate: _ } = useI18n();

	const handleChange =
		(attr: string) =>
		(event: { target: { value: any } }): void => {
			setValues({ ...values, [attr]: event.target.value });
			fullConfig.config.charger[attr] = event.target.value;
			if (event.target.value !== '') {
				valid(false);
			} else {
				valid(true);
			}
		};

	const handleClickShow = (value: boolean): void => {
		setValues({ ...values, showSelectId: value });
	};

	return (
		<React.Fragment>
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
				<FormControl sx={{ margin: 1, width: '65ch', marginBottom: 2 }} variant="outlined">
					<InputLabel htmlFor="outlined-adornment-chargerId">{_('chargerId')}</InputLabel>
					<Tooltip title={_('tooltipChargerId')} arrow>
						<OutlinedInput
							id="outlined-adornment-chargerId"
							value={fullConfig.config.charger.chargerId}
							onChange={handleChange('chargerId')}
							label="chargerId"
							endAdornment={
								<InputAdornment position="end">
									<IconButton
										aria-label="toggle motionId visibility"
										onClick={() => {
											handleClickShow(true);
										}}
										edge="end"
									>
										<Ballot />
									</IconButton>
								</InputAdornment>
							}
						/>
					</Tooltip>
					{values.showSelectId ? (
						//TODO entfernen sobald SelectId verfügbar ist
						<Stack sx={{ width: '100%' }} spacing={2}>
							<Alert
								variant="filled"
								severity="warning"
								action={
									<Button
										color="inherit"
										size="small"
										onClick={() => {
											handleClickShow(false);
										}}
									>
										close
									</Button>
								}
							>
								<AlertTitle>{_('SelectId will be available soon.')} </AlertTitle>
								{_('Until then, please use Copy & Paste')}
							</Alert>
						</Stack>
					) : null}
				</FormControl>
			</Grid>
		</React.Fragment>
	);
};
