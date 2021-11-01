/**
 * Created by issi on 31.10.21
 */
import React, { useEffect, useState } from 'react';
import { useI18n } from 'iobroker-react/hooks';
import { Button, Grid } from '@mui/material';
import { BrightnessConfig } from './Brightness/BrightnessConfig';
import { ScreensaverConfig } from './Screensaver/ScreensaverConfig';
import { ImageShotConfig } from './ImageShot/ImageShotConfig';
import { MotionConfig } from './Motion/MotionConfig';
import { TelegramConfig } from './Telegram/TelegramConfig';
import { ViewConfig } from './VisView/ViewConfig';
import { ChargingConfig } from './Charging/create/ChargingConfig';

export interface ConfigButtonProps {
	//props
}

export const ConfigButton: React.FC<ConfigButtonProps> = (): JSX.Element => {
	const { translate: _ } = useI18n();
	const [showChargingConfig, setShowChargingConfig] = useState(false);
	const [showBrightnessConfig, setShowBrightnessConfig] = useState(false);
	const [showScreensaverConfig, setShowScreensaverConfig] = useState(false);
	const [showTelegramConfig, setShowTelegramConfig] = useState(false);
	const [showMotionConfig, setShowMotionConfig] = useState(false);
	const [showImageShotConfig, setShowImageShotConfig] = useState(false);
	const [showViewConfig, setShowViewConfig] = useState(false);

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

	const handleShowViewConfig = () => setShowViewConfig(true);
	const handleCloseViewConfig = () => setShowViewConfig(false);

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
				<Button sx={{ margin: 2 }} onClick={handleShowTelegramConfig}>
					Telegram
				</Button>
				<Button sx={{ margin: 2 }} onClick={handleShowMotionConfig}>
					Motion
				</Button>
				<Button sx={{ margin: 2 }} onClick={handleShowImageShotConfig}>
					ImageShot
				</Button>
				<Button sx={{ margin: 2 }} onClick={handleShowViewConfig}>
					View
				</Button>
			</Grid>
			<ChargingConfig show={showChargingConfig} onClose={handleCloseChargingConfig} />
			<BrightnessConfig show={showBrightnessConfig} onClose={handleCloseBrightnessConfig} />
			<ScreensaverConfig show={showScreensaverConfig} onClose={handleCloseScreensaverConfig} />
			<TelegramConfig show={showTelegramConfig} onClose={handleCloseTelegramConfig} />
			<MotionConfig show={showMotionConfig} onClose={handleCloseMotionConfig} />
			<ImageShotConfig show={showImageShotConfig} onClose={handleCloseImageShotConfig} />
			<ViewConfig show={showViewConfig} onClose={handleCloseViewConfig} />
		</React.Fragment>
	);
};
