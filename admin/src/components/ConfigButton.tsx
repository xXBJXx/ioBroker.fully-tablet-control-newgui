/**
 * Created by issi on 31.10.21
 */
import { Button, Grid } from '@mui/material';
import React, { useState } from 'react';
import { BrightnessConfig } from '../modals/newConfigModal/Brightness/BrightnessConfig';
import { ChargingConfig } from '../modals/newConfigModal/Charging/ChargingConfig';
import { ImageShotConfig } from '../modals/newConfigModal/ImageShot/ImageShotConfig';
import { MotionConfig } from '../modals/newConfigModal/Motion/MotionConfig';
import { ScreensaverConfig } from '../modals/newConfigModal/Screensaver/ScreensaverConfig';
import { TelegramConfig } from '../modals/newConfigModal/Telegram/TelegramConfig';

export const ConfigButton = (): JSX.Element => {
	const [showChargingConfig, setShowChargingConfig] = useState<boolean>(false);
	const [showBrightnessConfig, setShowBrightnessConfig] = useState<boolean>(false);
	const [showScreensaverConfig, setShowScreensaverConfig] = useState<boolean>(false);
	const [showTelegramConfig, setShowTelegramConfig] = useState<boolean>(false);
	const [showMotionConfig, setShowMotionConfig] = useState<boolean>(false);
	const [showImageShotConfig, setShowImageShotConfig] = useState<boolean>(false);

	const handleShowChargingConfig = () => setShowChargingConfig(true);
	const handleCloseChargingConfig = () => setShowChargingConfig(false);

	const handleShowBrightnessConfig = () => setShowBrightnessConfig(true);
	const handleCloseBrightnessConfig = () => setShowBrightnessConfig(false);

	const handleShowScreensaverConfig = () => setShowScreensaverConfig(true);
	const handleCloseScreensaverConfig = () => setShowScreensaverConfig(false);

	const handleShowTelegramConfig = () => setShowTelegramConfig(true);
	const handleCloseTelegramConfig = () => setShowTelegramConfig(false);

	const handleShowMotionConfig = () => setShowMotionConfig(true);
	const handleCloseMotionConfig = () => setShowMotionConfig(false);

	const handleShowImageShotConfig = () => setShowImageShotConfig(true);
	const handleCloseImageShotConfig = () => setShowImageShotConfig(false);

	return (
		<React.Fragment>
			<Grid sx={{ paddingTop: 2, justifyContent: 'space-evenly' }} container spacing={2}>
				<Button sx={{ margin: 2 }} onClick={handleShowChargingConfig}>
					Charging
				</Button>
				<Button sx={{ margin: 2 }} onClick={handleShowBrightnessConfig}>
					Brightness
				</Button>
				<Button sx={{ margin: 2 }} onClick={handleShowScreensaverConfig}>
					Screensaver
				</Button>
				<Button sx={{ margin: 2 }} onClick={handleShowMotionConfig}>
					Motion
				</Button>
				<Button sx={{ margin: 2 }} onClick={handleShowImageShotConfig}>
					ImageShot
				</Button>
				<Button sx={{ margin: 2 }} onClick={handleShowTelegramConfig}>
					Telegram
				</Button>
			</Grid>
			<ChargingConfig show={showChargingConfig} onClose={handleCloseChargingConfig} />
			<BrightnessConfig show={showBrightnessConfig} onClose={handleCloseBrightnessConfig} />
			<ScreensaverConfig show={showScreensaverConfig} onClose={handleCloseScreensaverConfig} />
			<TelegramConfig show={showTelegramConfig} onClose={handleCloseTelegramConfig} />
			<MotionConfig show={showMotionConfig} onClose={handleCloseMotionConfig} />
			<ImageShotConfig show={showImageShotConfig} onClose={handleCloseImageShotConfig} />
		</React.Fragment>
	);
};
