/**
 * Created by issi on 31.10.21
 */
import {
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
	Typography,
} from '@mui/material';
import { useI18n, useIoBrokerTheme } from 'iobroker-react/hooks';
import React, { useEffect, useState } from 'react';
import { AstroTimeSelect } from '../../../components/AstroTimeSelect';
import { BrightnessInput } from '../../../components/BrightnessInput';
import { HelperButton } from '../../../components/HelperButton';
import { ManualTimeInput } from '../../../components/ManualTimeInput';
import { NumberInput } from '../../../components/NumberInput';
import { clearBrightnessConfig, fullConfig } from '../../../lib/createConfig';

export interface BrightnessConfigProps {
	//props
	show: boolean;
	onClose: () => any;
}

const brightnessHelperLink = 'https://xxbjxx.github.io/language/en/Fully-Tablet-Control/04.brightness.html';
export const BrightnessConfig: React.FC<BrightnessConfigProps> = ({ show, onClose }): JSX.Element => {
	const { translate: _ } = useI18n();
	const [themeName] = useIoBrokerTheme();
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	const [brightnessActive, setBrightnessActive] = useState<boolean>(false);
	const [brightnessMode, setBrightnessMode] = useState<boolean>(true);
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	const [screenOn, setScreenOn] = useState<boolean>(true);
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	const [brightnessTimeMode, setBrightnessTimeMode] = useState<boolean>(true);
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	const [numberValue, setNumberValue] = useState<number>(0);

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

	const handleChange = (attr: string, event: SelectChangeEvent<string>): void => {
		switch (attr) {
			case 'active':
				if (event.target.value === 'true' || event.target.value == 'false') {
					fullConfig.config.brightness.brightnessActive = JSON.parse(event.target.value);
					setBrightnessActive(JSON.parse(event.target.value));
					if (!JSON.parse(event.target.value)) {
						clearBrightnessConfig();
					}
				}
				break;
			case 'screen_on':
				if (event.target.value === 'true' || event.target.value == 'false') {
					fullConfig.config.brightness.screen_on = JSON.parse(event.target.value);
					setScreenOn(JSON.parse(event.target.value));
				}
				break;
			case 'brightness_on':
				if (event.target.value === 'true' || event.target.value == 'false') {
					fullConfig.config.brightness.brightness_on = JSON.parse(event.target.value);
					setBrightnessMode(JSON.parse(event.target.value));
				}
				break;
			case 'timeMode':
				if (event.target.value === 'true' || event.target.value == 'false') {
					fullConfig.config.brightness.timeMode = JSON.parse(event.target.value);
					setBrightnessTimeMode(JSON.parse(event.target.value));
				}
				break;
		}
	};

	useEffect((): void => {
		if (fullConfig.config.brightness.brightnessActive) {
			setBrightnessActive(true);
		}
	}, [show]);

	const handleAdd = (): void => {
		console.log(`add Brightness configuration =>  ${JSON.stringify(fullConfig.config.brightness)}`);
		setBrightnessActive(false);
		onClose();
	};

	const handleClose = (): void => {
		setBrightnessActive(false);
		onClose();
		clearBrightnessConfig();
	};

	const handeleNumber = (attr: string, value: React.SetStateAction<number>): void => {
		setNumberValue(value);
		fullConfig.config.brightness[attr] = value;
	};

	return (
		<Dialog open={show} onClose={handleClose}>
			<DialogTitle sx={{ bgcolor: BgColor, textAlignLast: 'center', fontSize: '1.4rem' }}>
				{_('Brightness Config')}
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
							<InputLabel id="BrightnessActivate-select-label">Brightness Active</InputLabel>
							<Select
								labelId="BrightnessActivate-select-label"
								id="BrightnessActivate"
								value={fullConfig.config.brightness.brightnessActive.toString()}
								label="Brightness Active"
								onChange={(event) => {
									handleChange('active', event);
								}}
							>
								<MenuItem value={'true'}>Brightness On</MenuItem>
								<MenuItem value={'false'}>Brightness Off</MenuItem>
							</Select>
						</FormControl>
					</Box>
					<HelperButton helperLink={brightnessHelperLink} helperTooltipTitle="chargingHelper" />
				</Grid>
				{fullConfig.config.brightness.brightnessActive ? (
					<React.Fragment>
						<Typography>{_('Screen On Section')}</Typography>
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
								<FormControl fullWidth>
									<InputLabel id="ScreenActivate-select-label">{_('Screen Active')}</InputLabel>
									<Select
										labelId="ScreenActivate-select-label"
										id="ScreenActivate"
										value={fullConfig.config.brightness.screen_on.toString()}
										label="Screen Active"
										onChange={(event) => {
											handleChange('screen_on', event);
										}}
									>
										<MenuItem value={'true'}>{_('Screen on')}</MenuItem>
										<MenuItem value={'false'}>{_('Screen auto')}</MenuItem>
									</Select>
								</FormControl>
							</Box>
						</Grid>
						<Typography>{_('Brightness Section')}</Typography>
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
								<FormControl fullWidth>
									<InputLabel id="BrightnessControlMode-select-label">
										{_('brightness control mode')}
									</InputLabel>
									<Select
										labelId="BrightnessControlMode-select-label"
										id="BrightnessControlMode"
										value={fullConfig.config.brightness.brightness_on.toString()}
										label="Brightness Control Mode"
										onChange={(event) => {
											handleChange('brightness_on', event);
										}}
									>
										<MenuItem value={'true'}>{_('Brightness control via config page')}</MenuItem>
										<MenuItem value={'false'}>{_('Brightness control manually')}</MenuItem>
									</Select>
								</FormControl>
							</Box>
							{brightnessMode ? (
								<React.Fragment>
									<Box sx={{ minWidth: 120 }}>
										<FormControl fullWidth>
											<InputLabel id="BrightnessTimeMode-select-label">
												{_('time Mode')}
											</InputLabel>
											<Select
												labelId="BrightnessTimeMode-select-label"
												id="BrightnessTimeMode"
												value={fullConfig.config.brightness.timeMode.toString()}
												label="Time Mode"
												onChange={(event) => {
													handleChange('timeMode', event);
												}}
											>
												<MenuItem value={'true'}>{_('astro time')}</MenuItem>
												<MenuItem value={'false'}>{_('Manual time')}</MenuItem>
											</Select>
										</FormControl>
									</Box>
									<NumberInput
										min={1}
										max={120}
										label={'Check interval'}
										tooltip={'BrightnessIntervalTooltip'}
										defaultValue={20}
										sx={{ margin: 1, width: '110', textAlignLast: 'center' }}
										value={fullConfig.config.brightness.brightnessInterval}
										createNewConfig={(value) => handeleNumber('brightnessInterval', value)}
									/>
									{fullConfig.config.brightness.timeMode ? <AstroTimeSelect /> : null}
									{!fullConfig.config.brightness.timeMode ? <ManualTimeInput /> : null}
									<BrightnessInput mode={fullConfig.config.brightness.timeMode} show={show} />
								</React.Fragment>
							) : null}
						</Grid>
					</React.Fragment>
				) : null}
			</DialogContent>
			<DialogActions>
				<Button onClick={handleAdd}>{_('add')}</Button>
				<Button onClick={handleClose}>{_('Cancel')}</Button>
			</DialogActions>
		</Dialog>
	);
};
