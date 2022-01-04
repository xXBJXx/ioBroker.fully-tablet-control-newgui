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
	TextField,
	Tooltip,
} from '@mui/material';
import { useI18n, useIoBrokerTheme } from 'iobroker-react/hooks';
import React, { useEffect, useState } from 'react';
import { HelperButton } from '../../../components/HelperButton';
import { NumberInput } from '../../../components/NumberInput';
import { clearScreensaverConfig, createNewConfig, fullConfig } from '../../../lib/createConfig';

export interface ScreensaverConfigProps {
	//props
	show: boolean;
	onClose: () => any;
}

interface screensaverValues {
	active: boolean;
	deletion: boolean;
	mode: boolean;
	youtubeName: string;
	wallpaperName: string;
	youtubeUrl: string;
	wallpaperUrl: string;
	time: number;
}
const screensaverHelperLink = 'https://xxbjxx.github.io/language/en/Fully-Tablet-Control/05.Bildschirmschoner.html';
export const ScreensaverConfig: React.FC<ScreensaverConfigProps> = ({ show, onClose }): JSX.Element => {
	const [screensaverValues, setScreensaverValues] = useState<screensaverValues>({
		active: false,
		deletion: false,
		mode: true,
		youtubeName: '',
		wallpaperName: '',
		youtubeUrl: '',
		wallpaperUrl: '',
		time: 2,
	});

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

	const handleChange = (
		attr: string,
		event:
			| (Event & { target: { value: string; name: string } })
			| React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
			| number,
	): void => {
		switch (attr) {
			case 'active':
				if (typeof event !== 'number') {
					createNewConfig('screensaverActive', JSON.parse(event.target.value));
					setScreensaverValues({ ...screensaverValues, active: JSON.parse(event.target.value) });
					if (!JSON.parse(event.target.value)) {
						clearScreensaverConfig();
					}
				}
				break;

			case 'deletion':
				if (typeof event !== 'number') {
					createNewConfig('screensaverDeletion', JSON.parse(event.target.value));
					setScreensaverValues({ ...screensaverValues, deletion: JSON.parse(event.target.value) });
				}
				break;

			case 'mode':
				if (typeof event !== 'number') {
					createNewConfig('screensaverMode', JSON.parse(event.target.value));
					setScreensaverValues({ ...screensaverValues, mode: JSON.parse(event.target.value) });
				}
				break;

			case 'screensaverYoutubeUrl':
				if (typeof event !== 'number') {
					createNewConfig('screensaverYoutubeUrl', event.target.value);
					setScreensaverValues({ ...screensaverValues, youtubeUrl: event.target.value });
				}
				break;

			case 'screensaverWallpaperUrl':
				if (typeof event !== 'number') {
					createNewConfig('screensaverWallpaperUrl', event.target.value);
					setScreensaverValues({ ...screensaverValues, wallpaperUrl: event.target.value });
				}
				break;

			case 'screensaverYouTubeName':
				if (typeof event !== 'number') {
					createNewConfig('screensaverYouTubeName', event.target.value);
					setScreensaverValues({ ...screensaverValues, youtubeName: event.target.value });
				}
				break;

			case 'screensaverWallpaperName':
				if (typeof event !== 'number') {
					createNewConfig('screensaverWallpaperName', event.target.value);
					setScreensaverValues({ ...screensaverValues, wallpaperName: event.target.value });
				}
				break;

			case 'time':
				if (typeof event === 'number') {
					const value = event;
					setScreensaverValues({ ...screensaverValues, time: value });
					createNewConfig('screensaverTime', value);
				}
				break;
		}
	};

	useEffect((): void => {
		if (fullConfig.config.charger.chargerActive) {
			setScreensaverValues({ ...screensaverValues, active: true });
		}
	}, [show]);

	const handleAdd = (): void => {
		console.log(`add Screensaver configuration =>  ${JSON.stringify(fullConfig.config.screensaver)}`);
		setScreensaverValues({ ...screensaverValues, active: false });
		onClose();
		// clearScreensaverConfig();
	};

	const handleClose = (): void => {
		setScreensaverValues({ ...screensaverValues, active: false });
		onClose();
		clearScreensaverConfig();
	};

	return (
		<Dialog open={show} onClose={handleClose}>
			<DialogTitle sx={{ bgcolor: BgColor, textAlignLast: 'center', fontSize: '1.4rem' }}>
				{_('Screensaver Config')}
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
							<InputLabel id="screensaverActive-select-label">Screensaver Active</InputLabel>
							<Select
								labelId="screensaverActive-select-label"
								id="screensaverActive"
								value={fullConfig.config.screensaver.screensaverActive.toString()}
								label={_('Screensaver Active')}
								onChange={(event) => {
									handleChange('active', event);
								}}
							>
								<MenuItem value={'true'}>{_('Screensaver On')}</MenuItem>
								<MenuItem value={'false'}>{_('Screensaver Off')}</MenuItem>
							</Select>
						</FormControl>
					</Box>
					{!fullConfig.config.screensaver.screensaverActive ? (
						<Tooltip
							title={_('Automatic deletion of screensaver configuration from FullyBrowser')}
							arrow
							placement="right"
						>
							<Box sx={{ minWidth: 120 }}>
								<FormControl fullWidth>
									<InputLabel id="screensaverDeletion-select-label">
										{_('screensaverDeletion')}
									</InputLabel>
									<Select
										labelId="screensaverDeletion-select-label"
										id="screensaverDeletion"
										value={fullConfig.config.screensaver.screensaverDeletion.toString()}
										label="screensaver Deletion"
										onChange={(event) => {
											handleChange('deletion', event);
										}}
									>
										<MenuItem value={'true'}>{_('Automatic deletion')}</MenuItem>
										<MenuItem value={'false'}>{_('Manual deletion')}</MenuItem>
									</Select>
								</FormControl>
							</Box>
						</Tooltip>
					) : null}
					<HelperButton helperLink={screensaverHelperLink} helperTooltipTitle="screensaverHelper" />
				</Grid>
				{fullConfig.config.screensaver.screensaverActive ? (
					<React.Fragment>
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
							<Tooltip title={_('tooltipTabletName')} arrow>
								<TextField
									label={screensaverValues.mode ? _('Screensaver YouTube Name') : _('Wallpaper Name')}
									color="success"
									sx={{ minWidth: 250 }}
									value={
										screensaverValues.mode
											? fullConfig.config.screensaver.screensaverYouTubeName
											: fullConfig.config.screensaver.screensaverWallpaperName
									}
									placeholder="Aquarium"
									onChange={(event) => {
										screensaverValues.mode
											? handleChange('screensaverYouTubeName', event)
											: handleChange('screensaverWallpaperName', event);
									}}
								/>
							</Tooltip>
							<FormControl>
								<InputLabel id="screensaverMode-select-label">Screensaver Mode</InputLabel>
								<Select
									labelId="screensaverMode-select-label"
									id="screensaverMode"
									value={fullConfig.config.screensaver.screensaverMode.toString()}
									label={_('Screensaver Mode')}
									onChange={(event) => {
										handleChange('mode', event);
									}}
								>
									<MenuItem value={'true'}>{_('YouTube Url')}</MenuItem>
									<MenuItem value={'false'}>{_('Wallpaper Url')}</MenuItem>
								</Select>
							</FormControl>
							<NumberInput
								min={1}
								max={30}
								label={'ScreensaverTime'}
								tooltip={'screensaverTimeTooltip'}
								defaultValue={2}
								sx={{ margin: 1, width: '110', textAlignLast: 'center' }}
								value={fullConfig.config.screensaver.screensaverTime}
								createNewConfig={(value) => handleChange('time', value)}
							/>
						</Grid>
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
							<Tooltip title={_('tooltipUrl')} arrow>
								<TextField
									label={screensaverValues.mode ? _('YouTube URL') : _('Wallpaper URL')}
									color="success"
									fullWidth
									value={
										screensaverValues.mode
											? fullConfig.config.screensaver.screensaverYoutubeUrl
											: fullConfig.config.screensaver.screensaverWallpaperUrl
									}
									placeholder={
										screensaverValues.mode
											? 'https://youtu.be/9jHwwJgSTR4'
											: 'https://wallpapercave.com/wp/DiGsmzd.jpg'
									}
									onChange={(event) => {
										screensaverValues.mode
											? handleChange('screensaverYoutubeUrl', event)
											: handleChange('screensaverWallpaperUrl', event);
									}}
								/>
							</Tooltip>
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
