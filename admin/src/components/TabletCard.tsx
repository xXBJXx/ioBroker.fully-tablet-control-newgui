import BatteryChargingFullIcon from '@mui/icons-material/BatteryChargingFull';
import CameraFrontIcon from '@mui/icons-material/CameraFront';
import DeleteIcon from '@mui/icons-material/Delete';
import DirectionsRunIcon from '@mui/icons-material/DirectionsRun';
import LeakAddIcon from '@mui/icons-material/LeakAdd';
import LeakRemoveIcon from '@mui/icons-material/LeakRemove';
import LoginIcon from '@mui/icons-material/Login';
import SettingsBrightnessIcon from '@mui/icons-material/SettingsBrightness';
import TelegramIcon from '@mui/icons-material/Telegram';
import VideoSettingsIcon from '@mui/icons-material/VideoSettings';
import { Box, Grid, IconButton, Tooltip } from '@mui/material';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { useI18n, useIoBrokerTheme } from 'iobroker-react/hooks';
import React, { useEffect, useState } from 'react';
import { tablets } from '../lib/supportedTablets';

interface configObj {
	device: string;
	deviceName: string;
	model: string;
	online: boolean;
}
interface TabletCardProps {
	config: configObj;
}

export const TabletCard: React.FC<TabletCardProps> = ({ config }) => {
	const { translate: _ } = useI18n();
	const [themeName, setTheme] = useIoBrokerTheme();
	const [image, setImage] = useState({
		defaultImage: '',
		img: '',
		alt: '',
	});
	const [online, setOnline] = useState(false);

	const BgColor = (): string => {
		switch (themeName) {
			case 'dark':
				return '#232323';
			case 'blue':
				return '#3e464a61';
			case 'light':
				return '#b7b7b7';
			case 'colored':
				return '#b7b7b7';
		}
	};

	useEffect(() => {
		const Tablets = tablets[config.device][config.model];
		setImage({ ...image, img: Tablets.picturePath, alt: Tablets.name });
		setOnline(config.online);
	}, [config]);

	return (
		<Card sx={{ width: '250', height: '400', marginBottom: 3, marginRight: 1, bgcolor: BgColor, borderRadius: 3 }}>
			<Tooltip title={_('Delete')} arrow>
				<IconButton aria-label="delete" size="small" sx={{ position: 'absolute', marginLeft: '222px' }}>
					<DeleteIcon fontSize="inherit" />
				</IconButton>
			</Tooltip>
			<CardMedia
				component="img"
				height="150"
				image={image.img}
				alt={image.alt}
				sx={{
					zIndex: 1,
					width: '47%',
					margin: 'auto',
					marginTop: '10px',
					height: 'auto',
					maxHeight: '255px',
				}}
			/>
			{online ? (
				<Tooltip title={_('TabletOnline')} arrow>
					<LeakAddIcon
						sx={{
							marginLeft: '5px',
							marginTop: '-21',
							position: 'absolute',
							color: 'green',
						}}
					/>
				</Tooltip>
			) : (
				<Tooltip title={_('TabletOffline')} arrow>
					<LeakRemoveIcon
						sx={{
							marginLeft: '5px',
							marginTop: '-21',
							position: 'absolute',
							color: 'red',
						}}
					/>
				</Tooltip>
			)}
			<CardContent
				sx={{
					display: 'flex',
					justifyContent: 'center',
					alignItems: 'center',
					paddingBottom: 0,
					marginTop: '10',
					minHeight: '45',
					maxHeight: '60',
					height: '60',
				}}
			>
				<Typography gutterBottom component="div" align={'center'}>
					{config.deviceName !== '' ? config.deviceName : _('Device Name not Available')}
				</Typography>
			</CardContent>
			<CardActions>
				<Box>
					<Grid
						container
						spacing={0}
						sx={{
							marginTop: '10px',
							alignItems: 'center',
							justifyContent: 'space-around',
							display: 'flex',
							flexWrap: 'wrap',
							flexDirection: 'row',
						}}
					>
						<Tooltip title={_('LoginEdit')} arrow placement="top">
							<IconButton aria-label="Login" size="large">
								<LoginIcon fontSize="inherit" />
							</IconButton>
						</Tooltip>
						<Tooltip title={_('BrightnessEdit')} arrow placement="top">
							<IconButton aria-label="Brightness" size="large">
								<SettingsBrightnessIcon fontSize="inherit" />
							</IconButton>
						</Tooltip>
						<Tooltip title={_('ChargingEdit')} arrow placement="top">
							<IconButton aria-label="Charging" size="large">
								<BatteryChargingFullIcon fontSize="inherit" />
							</IconButton>
						</Tooltip>
						<Tooltip title={_('ScreensaverEdit')} arrow placement="top">
							<IconButton aria-label="Screensaver" size="large">
								<VideoSettingsIcon fontSize="inherit" />
							</IconButton>
						</Tooltip>
						<Tooltip title={_('MotionEdit')} arrow>
							<IconButton aria-label="Motion" size="large">
								<DirectionsRunIcon fontSize="inherit" />
							</IconButton>
						</Tooltip>
						<Tooltip title={_('ImageShotEdit')} arrow>
							<IconButton aria-label="ImageShot" size="large">
								<CameraFrontIcon fontSize="inherit" />
							</IconButton>
						</Tooltip>
						<Tooltip title={_('TelegramEdit')} arrow>
							<IconButton aria-label="Telegram" size="large">
								<TelegramIcon fontSize="inherit" />
							</IconButton>
						</Tooltip>
					</Grid>
				</Box>
			</CardActions>
		</Card>
	);
};
