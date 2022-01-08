/**
 * Created by issi on 31.10.21
 */
import { Ballot } from '@mui/icons-material';
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
	IconButton,
	InputAdornment,
	InputLabel,
	MenuItem,
	OutlinedInput,
	Select,
	Stack,
	Tooltip,
} from '@mui/material';
import { useI18n, useIoBrokerTheme } from 'iobroker-react/hooks';
import React, { useEffect, useState } from 'react';
import { HelperButton } from '../../../components/HelperButton';
import { clearMotionConfig, fullConfig } from '../../../lib/createConfig';

export interface MotionConfigProps {
	//props
	show: boolean;
	onClose: () => any;
}

interface motionValues {
	motionActive: boolean;
	motionId: string;
	selectIdInfo: boolean;
}

const motionHelperLink = 'https://xxbjxx.github.io/language/en/Fully-Tablet-Control/07.Bewegungsmelder.html';
export const MotionConfig: React.FC<MotionConfigProps> = ({ show, onClose }): JSX.Element => {
	const [motionValues, setMotionValues] = useState<motionValues>({
		motionActive: false,
		motionId: '',
		selectIdInfo: false,
	});
	const [buttonActive, setButtonActive] = useState(true);

	const { translate: _ } = useI18n();
	const [themeName] = useIoBrokerTheme();

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

	const handleVerification = () => {
		if (fullConfig.config.motion.motionActive && fullConfig.config.motion.motionId !== '') {
			setButtonActive(false);
		} else {
			console.log('buttonActive true');
			setButtonActive(true);
		}
	};

	const handleChange = (
		attr: string,
		event:
			| (Event & { target: { value: string; name: string } })
			| React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
	): void => {
		switch (attr) {
			case 'active':
				fullConfig.config.motion.motionActive = JSON.parse(event.target.value);
				setMotionValues({ ...motionValues, motionActive: JSON.parse(event.target.value) });
				handleVerification();
				break;

			case 'motionId':
				fullConfig.config.motion.motionId = event.target.value;
				setMotionValues({ ...motionValues, motionId: event.target.value });
				handleVerification();
				break;
		}
	};

	const handleClickShow = (value: boolean): void => {
		setMotionValues({ ...motionValues, selectIdInfo: value });
	};

	useEffect((): void => {
		if (fullConfig.config.charger.chargerActive) {
			setMotionValues({ ...motionValues, motionActive: true });
		}
	}, [show]);

	const handleAdd = (): void => {
		console.log(`add Motion configuration =>  ${JSON.stringify(fullConfig.config.motion)}`);
		setMotionValues({ ...motionValues, motionActive: false });
		onClose();
	};

	const handleClose = (): void => {
		setMotionValues({ ...motionValues, motionActive: false });
		onClose();
		clearMotionConfig();
	};

	return (
		<Dialog open={show} onClose={handleClose}>
			<DialogTitle sx={{ bgcolor: BgColor, textAlignLast: 'center', fontSize: '1.4rem' }}>
				{_('Motion Config')}
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
					<Box sx={{ minWidth: 120, marginRight: 1 }}>
						<FormControl fullWidth>
							<InputLabel id="motionActive-select-label">Motion Active</InputLabel>
							<Select
								labelId="motionActive-select-label"
								id="motionActive"
								value={fullConfig.config.motion.motionActive.toString()}
								label={_('Motion Active')}
								onChange={(event) => {
									handleChange('active', event);
								}}
							>
								<MenuItem value={'true'}>{_('Motion On')}</MenuItem>
								<MenuItem value={'false'}>{_('Motion Off')}</MenuItem>
							</Select>
						</FormControl>
					</Box>
					<HelperButton helperLink={motionHelperLink} helperTooltipTitle="MotionHelper" />
				</Grid>
				{fullConfig.config.motion.motionActive ? (
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
						<FormControl sx={{ margin: 1, width: '65ch', marginBottom: 2 }} variant="outlined">
							<InputLabel htmlFor="outlined-adornment-motionId" error={buttonActive} color={'success'}>
								{_('motionId *')}
							</InputLabel>
							<Tooltip title={_('tooltipMotionId')} arrow>
								<OutlinedInput
									required
									id="outlined-adornment-motionId"
									value={fullConfig.config.motion.motionId}
									color={'success'}
									error={buttonActive}
									onChange={(event) => {
										handleChange('motionId', event);
									}}
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
									label="motionId"
								/>
							</Tooltip>
							{motionValues.selectIdInfo ? (
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
				) : null}
			</DialogContent>
			<DialogActions>
				<Button onClick={handleAdd} disabled={fullConfig.config.motion.motionActive ? buttonActive : false}>
					{_('add')}
				</Button>
				<Button onClick={handleClose}>{_('Cancel')}</Button>
			</DialogActions>
		</Dialog>
	);
};
