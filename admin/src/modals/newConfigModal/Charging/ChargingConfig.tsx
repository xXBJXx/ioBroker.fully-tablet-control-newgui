/**
 * Created by issi on 31.10.21
 */
import React, { useEffect, useState } from 'react';
import { useI18n } from 'iobroker-react/hooks';
import { useIoBrokerTheme } from 'iobroker-react/hooks';
import {
	Alert,
	AlertTitle,
	Box,
	Button,
	Dialog,
	DialogActions,
	DialogContent,
	DialogTitle,
	FormControl,
	Grid,
	InputLabel,
	MenuItem,
	Select,
	SelectChangeEvent,
	Stack,
	Tooltip,
} from '@mui/material';
import { ChargeID } from '../../../components/ChargeID';
import { clearChargerConfig, createNewConfig, fullConfig } from '../../../lib/createConfig';
import { HelperButton } from '../../../components/HelperButton';

export interface ChargingConfigProps {
	//props
	show: boolean;
	onClose: () => any;
}

interface valuesProps {
	mode: boolean;
	percentStart: number;
	percentStop: number;
	modeActive: boolean;
	chargerActive: boolean;
}

const chargingHelperLink = 'https://xxbjxx.github.io/language/en/Fully-Tablet-Control/03.Ladegeraet.html';
export const ChargingConfig: React.FC<ChargingConfigProps> = ({ show, onClose }) => {
	const { translate: _ } = useI18n();
	const [themeName, setTheme] = useIoBrokerTheme();
	const [chargerValues, setChargerValues] = useState<valuesProps>({
		mode: false,
		percentStart: 20,
		percentStop: 85,
		modeActive: false,
		chargerActive: false,
	});

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

	const handleChange = (attr: string, event: SelectChangeEvent<string>) => {
		switch (attr) {
			case 'active':
				if (event.target.value === 'true' || event.target.value == 'false') {
					createNewConfig('chargerActive', JSON.parse(event.target.value));
					setChargerValues({ ...chargerValues, chargerActive: JSON.parse(event.target.value) });
					if (!JSON.parse(event.target.value)) {
						clearChargerConfig();
					}
				}
				break;
			case 'mode':
				if (event.target.value === 'true' || event.target.value == 'false') {
					setChargerValues({
						...chargerValues,
						modeActive: JSON.parse(event.target.value),
						mode: JSON.parse(event.target.value),
					});
					createNewConfig('powerMode', JSON.parse(event.target.value));
				}
				break;
		}
	};

	const handleChangeLoadPercent = (event: SelectChangeEvent<string>, attr: string) => {
		switch (attr) {
			case 'loadStart':
				setChargerValues({ ...chargerValues, percentStart: JSON.parse(event.target.value) });
				break;
			case 'loadStop':
				setChargerValues({ ...chargerValues, percentStop: JSON.parse(event.target.value) });
				break;
		}
		createNewConfig(attr, Number(event.target.value));
	};

	const loadItem = (start: number, end: number, key: string) => {
		const menuItem: JSX.Element[] = [];
		for (let i = start; i < end; i++) {
			menuItem.push(<MenuItem key={`${key}${i}`} value={i}>{`${i}%`}</MenuItem>);
		}
		return menuItem;
	};

	useEffect(() => {
		if (fullConfig.config.charger.chargerActive) {
			setChargerValues({ ...chargerValues, chargerActive: true, modeActive: true });
		}
	}, [show]);

	const handleAdd = () => {
		// console.log(`add charger configuration =>  ${JSON.stringify(fullConfig.config.charger)}`);
		onClose();
		setChargerValues({ ...chargerValues, chargerActive: false, modeActive: false });
	};

	const handleClose = () => {
		onClose();
		setChargerValues({ ...chargerValues, chargerActive: false, modeActive: false });
		clearChargerConfig();
	};

	return (
		<Dialog open={show} onClose={handleClose}>
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
					<Box sx={{ minWidth: 120 }}>
						<FormControl fullWidth>
							<InputLabel id="chargerActive-select-label">charger Active</InputLabel>
							<Select
								labelId="chargerActive-select-label"
								id="chargerActive"
								value={fullConfig.config.charger.chargerActive.toString()}
								label="charger Active"
								onChange={(event) => {
									handleChange('active', event);
								}}
							>
								<MenuItem value={'true'}>Charging On</MenuItem>
								<MenuItem value={'false'}>Charging Off</MenuItem>
							</Select>
						</FormControl>
					</Box>
					<HelperButton helperLink={chargingHelperLink} helperTooltipTitle="chargingHelper" />
				</Grid>
				{chargerValues.chargerActive ? (
					<React.Fragment>
						<ChargeID />
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
							<Box sx={{ minWidth: 120 }}>
								<Tooltip title={_('powerModeTooltip')} arrow placement="right">
									<FormControl fullWidth>
										<InputLabel id="powerMode-select-label">{_('powerMode')}</InputLabel>
										<Select
											labelId="powerMode-select-label"
											id="powerMode-select"
											defaultValue={'false'}
											value={fullConfig.config.charger.powerMode.toString()}
											label="powerMode"
											onChange={(event) => {
												handleChange('mode', event);
											}}
										>
											<MenuItem value={'true'}>{_('Charge cycle')}</MenuItem>
											<MenuItem value={'false'}>{_('Continuous current')}</MenuItem>
										</Select>
									</FormControl>
								</Tooltip>
							</Box>
						</Grid>
					</React.Fragment>
				) : (
					''
				)}
				{chargerValues.chargerActive ? (
					chargerValues.modeActive ? (
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
							<React.Fragment>
								<Box sx={{ minWidth: 120 }}>
									<Tooltip title={_('loadStartTooltip')} arrow placement="right">
										<FormControl fullWidth>
											<InputLabel id="loadStart-select-label">{_('loadStart')}</InputLabel>
											<Select
												labelId="loadStart-select-label"
												id="loadStart-select"
												value={fullConfig.config.charger.loadStart.toString()}
												label="loadStart"
												onChange={(event) => {
													handleChangeLoadPercent(event, 'loadStart');
												}}
											>
												{loadItem(20, 50, 'loadStart')}
											</Select>
										</FormControl>
									</Tooltip>
								</Box>
								<Box sx={{ minWidth: 120 }}>
									<Tooltip title={_('loadStopTooltip')} arrow placement="right">
										<FormControl fullWidth>
											<InputLabel id="loadStop-select-label">{_('loadStop')}</InputLabel>
											<Select
												labelId="loadStop-select-label"
												id="loadStop-select"
												value={fullConfig.config.charger.loadStop.toString()}
												label="loadStop"
												onChange={(event) => {
													handleChangeLoadPercent(event, 'loadStop');
												}}
											>
												{loadItem(55, 101, 'loadStop')}
											</Select>
										</FormControl>
									</Tooltip>
								</Box>
							</React.Fragment>
						</Grid>
					) : (
						''
					)
				) : (
					''
				)}
			</DialogContent>
			<DialogActions>
				<Button onClick={handleAdd}>{_('add')}</Button>
				<Button onClick={handleClose}>{_('Cancel')}</Button>
			</DialogActions>
		</Dialog>
	);
};
