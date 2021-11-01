/**
 * Created by issi on 31.10.21
 */
import React, { useEffect, useState } from 'react';
import { useI18n } from 'iobroker-react/hooks';
import { Button, Grid } from '@mui/material';
import { ChargingConfig } from './Charging/ChargingConfig';

export interface ConfigButtonProps {
	//props
}

export const ConfigButton: React.FC<ConfigButtonProps> = (): JSX.Element => {
	const { translate: _ } = useI18n();
	const [showChargingConfig, setShowChargingConfig] = useState(false);
	const handleShowChargingConfig = () => setShowChargingConfig(true);
	const handleCloseChargingConfig = () => setShowChargingConfig(false);

	return (
		<React.Fragment>
			<Grid sx={{ paddingTop: 2, justifyContent: 'space-evenly' }} container spacing={2}>
				<Button sx={{ margin: 2 }} onClick={handleShowChargingConfig}>
					Charging
				</Button>
				<Button sx={{ margin: 2 }}>Brightness</Button>
				<Button sx={{ margin: 2 }}>Screensaver</Button>
				<Button sx={{ margin: 2 }}>Telegram</Button>
				<Button sx={{ margin: 2 }}>Motion</Button>
				<Button sx={{ margin: 2 }}>ImageShot</Button>
				<Button sx={{ margin: 2 }}>view</Button>
			</Grid>
			<ChargingConfig show={showChargingConfig} onClose={handleCloseChargingConfig} />
		</React.Fragment>
	);
};
