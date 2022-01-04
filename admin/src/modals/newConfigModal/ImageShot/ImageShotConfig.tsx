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
	Tooltip,
	Typography,
} from '@mui/material';
import { useI18n, useIoBrokerTheme } from 'iobroker-react/hooks';
import React, { useState } from 'react';
import { HelperButton } from '../../../components/HelperButton';
import { NumberInput } from '../../../components/NumberInput';
import { clearImageCaptureConfig, createNewConfig, fullConfig } from '../../../lib/createConfig';

export interface ImageShotConfigProps {
	//props
	show: boolean;
	onClose: () => any;
}
interface imageShotValues {
	autoMotionDetection: boolean;
	recordMode: boolean;
	seriesShotCount: number;
	singleShotSafe: number;
	seriesShotSafe: number;
	imageTimeout: number;
}
const motionDetectionHelperLink = 'https://xxbjxx.github.io/language/en/Fully-Tablet-Control/09.camera_shot.html';
export const ImageShotConfig: React.FC<ImageShotConfigProps> = ({ show, onClose }): JSX.Element => {
	const { translate: _ } = useI18n();
	const [themeName] = useIoBrokerTheme();
	const [imageShotValues, setImageShotValues] = useState<imageShotValues>({
		autoMotionDetection: false,
		recordMode: false,
		seriesShotCount: 2,
		singleShotSafe: 1,
		seriesShotSafe: 2,
		imageTimeout: 1,
	});
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

	const handleChange = (
		attr: string,
		event:
			| (Event & { target: { value: string; name: string } })
			| React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
	): void => {
		switch (attr) {
			case 'autoMotionDetection':
				createNewConfig('autoMotionDetection', JSON.parse(event.target.value));
				setImageShotValues({ ...imageShotValues, autoMotionDetection: JSON.parse(event.target.value) });
				if (!JSON.parse(event.target.value)) {
					clearImageCaptureConfig();
				}
				break;

			case 'recordMode':
				createNewConfig('recordMode', JSON.parse(event.target.value));
				setImageShotValues({ ...imageShotValues, recordMode: JSON.parse(event.target.value) });
				break;
		}
	};

	const handleAdd = (): void => {
		console.log(`add Motion configuration =>  ${JSON.stringify(fullConfig.config.imageCapture)}`);
		onClose();
	};

	const handleClose = (): void => {
		onClose();
		clearImageCaptureConfig();
	};

	const handeleNumber = (attr: string, value: React.SetStateAction<number>): void => {
		setNumberValue(value);
		createNewConfig(attr, value);
	};

	return (
		<Dialog open={show} onClose={handleClose}>
			<DialogTitle sx={{ bgcolor: BgColor, textAlignLast: 'center', fontSize: '1.4rem' }}>
				{_('ImageShot Config')}
				<HelperButton helperLink={motionDetectionHelperLink} helperTooltipTitle="motionDetectionHelper" />
			</DialogTitle>
			<DialogContent
				sx={{
					display: 'flex',
					flexWrap: 'wrap',
					flexDirection: 'row',
					justifyContent: 'center',
				}}
			>
				<Typography sx={{ margin: '10 25 5 0', fontSize: '1.8em', color: '#4dabf5' }}>
					{_('Activate Automatic the motionDetection')}
				</Typography>
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
					<Tooltip title={_('tooltipMotionDetection')} arrow placement={'right'}>
						<Box sx={{ minWidth: 150, marginRight: 1 }}>
							<FormControl fullWidth>
								<InputLabel id="motionDetection-select-label">{_('Motion detection')}</InputLabel>
								<Select
									labelId="motionDetection-select-label"
									id="motionDetection"
									value={fullConfig.config.imageCapture.autoMotionDetection.toString()}
									label={_('motion Detection')}
									onChange={(event) => {
										handleChange('autoMotionDetection', event);
									}}
								>
									<MenuItem value={'true'}>{_('Automatic')}</MenuItem>
									<MenuItem value={'false'}>{_('Manuell')}</MenuItem>
								</Select>
							</FormControl>
						</Box>
					</Tooltip>
				</Grid>
				<Typography sx={{ margin: '10 0 10 0', fontSize: '1.8em', color: '#4dabf5' }}>
					{_('Selection of the type of recording mode')}
				</Typography>
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
					<Tooltip title={_('tooltipRecordMode')} arrow placement={'right'}>
						<Box sx={{ minWidth: 150, marginRight: 1 }}>
							<FormControl fullWidth>
								<InputLabel id="recordMode-select-label">{_('record Mode')}</InputLabel>
								<Select
									labelId="recordMode-select-label"
									id="recordMode"
									value={fullConfig.config.imageCapture.recordMode.toString()}
									label={_('recordMode')}
									onChange={(event) => {
										handleChange('recordMode', event);
									}}
								>
									<MenuItem value={'true'}>{_('series recording')}</MenuItem>
									<MenuItem value={'false'}>{_('single shot')}</MenuItem>
								</Select>
							</FormControl>
						</Box>
					</Tooltip>
				</Grid>
				<Typography sx={{ margin: '10 0 10 0', fontSize: '1.4em', color: '#4dabf5', textAlignLast: 'center' }}>
					{!fullConfig.config.imageCapture.recordMode ? _('singleShotsCount') : _('serialShotsCount')}
				</Typography>
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
					{!fullConfig.config.imageCapture.recordMode ? (
						<NumberInput
							min={1}
							max={30}
							label={'singleShotSafe'}
							tooltip={'tooltipSingleShotSafe'}
							defaultValue={1}
							sx={{ width: '15ch', margin: 1, textAlignLast: 'center' }}
							value={fullConfig.config.imageCapture.singleShotSafe}
							createNewConfig={(value) => handeleNumber('singleShotSafe', value)}
						/>
					) : (
						<React.Fragment>
							<NumberInput
								min={1}
								max={30}
								label={'seriesShotCount'}
								tooltip={'tooltipSeriesShotCount'}
								defaultValue={2}
								sx={{ width: '15ch', margin: 1, textAlignLast: 'center' }}
								value={fullConfig.config.imageCapture.seriesShotCount}
								createNewConfig={(value) => handeleNumber('seriesShotCount', value)}
							/>
							<NumberInput
								min={1}
								max={30}
								label={'seriesShotSafe'}
								tooltip={'tooltipSeriesShotSafe'}
								defaultValue={2}
								sx={{ width: '15ch', margin: 1, textAlignLast: 'center' }}
								value={fullConfig.config.imageCapture.seriesShotSafe}
								createNewConfig={(value) => handeleNumber('seriesShotSafe', value)}
							/>
							<NumberInput
								min={1}
								max={5}
								label={'imageTimeout'}
								tooltip={'tooltipImageTimeout'}
								defaultValue={1}
								sx={{ width: '15ch', margin: 1, textAlignLast: 'center' }}
								value={fullConfig.config.imageCapture.imageTimeout}
								createNewConfig={(value) => handeleNumber('imageTimeout', value)}
							/>
						</React.Fragment>
					)}
				</Grid>
			</DialogContent>
			<DialogActions>
				<Button onClick={handleAdd}>{_('add')}</Button>
				<Button onClick={handleClose}>{_('Cancel')}</Button>
			</DialogActions>
		</Dialog>
	);
};
