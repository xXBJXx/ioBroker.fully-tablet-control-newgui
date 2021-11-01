/**
 * Created by issi on 31.10.21
 */
import React, { useEffect, useState } from 'react';
import { useI18n } from 'iobroker-react/hooks';
import { useIoBrokerTheme } from 'iobroker-react/hooks';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Grid } from '@mui/material';
import { ChargeID } from './ChargeID';
import { ChargeActivate } from './ChargeActivate';
import { clearChargerConfig } from '../../../lib/createConfig';
import { ChargerMode } from './ChargerMode';
import { HelperButton } from '../../HelperButton';
import { ChargerLoadStart } from './ChargerLoadStart';
import { ChargerLoadStop } from './ChargerLoadStop';

export interface ChargingConfigProps {
	//props
	show: boolean;
	onClose: () => any;
}

const chargingHelperLink = 'https://xxbjxx.github.io/language/en/Fully-Tablet-Control/03.Ladegeraet.html';
export const ChargingConfig: React.FC<ChargingConfigProps> = ({ show, onClose }) => {
	const { translate: _ } = useI18n();
	const [themeName, setTheme] = useIoBrokerTheme();
	const [chargerActive, setChargerActive] = useState(false);

	const BgColor = (): string => {
		switch (themeName) {
			case 'dark':
				return '#3b3b3b66';
			case 'blue':
				return '#3e464a61';
			case 'light':
				return '#b7b7b7';
			case 'colored':
				return '#b7b7b7';
		}
	};
	const handleChargeActivate = (active: boolean | ((prevState: boolean) => boolean)) => {
		setChargerActive(active);
		if (!active) {
			clearChargerConfig();
		}
	};

	return (
		<Dialog open={show} onClose={onClose}>
			<DialogTitle sx={{ bgcolor: BgColor, textAlignLast: 'center', fontSize: '1.4rem' }}>
				{_('Charging Config')}
			</DialogTitle>
			<DialogContent
				sx={{
					display: 'flex',
					flexWrap: 'wrap',
					flexDirection: 'row',
					justifyContent: 'center',
				}}
			>
				<Grid
					container
					spacing={0}
					sx={{
						marginTop: '10px',
						alignItems: 'center',
						justifyContent: 'space-around',
						display: 'flex',
						flexWrap: 'nowrap',
						flexDirection: 'row',
					}}
				>
					<ChargeActivate active={(active) => handleChargeActivate(active)} />
					<HelperButton helperLink={chargingHelperLink} helperTooltipTitle="chargingHelper" />
				</Grid>
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
					{chargerActive ? <ChargeID /> : ''}
					{chargerActive ? <ChargerMode /> : ''}
					{chargerActive ? <ChargerLoadStart /> : ''}
					{chargerActive ? <ChargerLoadStop /> : ''}
				</Grid>
			</DialogContent>
			<DialogActions>
				<Button onClick={onClose}>{_('add')}</Button>
				<Button onClick={onClose}>{_('Cancel')}</Button>
			</DialogActions>
		</Dialog>
	);
};
