/**
 * Created by issi on 31.10.21
 */
import React, { useEffect, useState } from 'react';
import { useI18n } from 'iobroker-react/hooks';
import { useIoBrokerTheme } from 'iobroker-react/hooks';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';

export interface ScreensaverConfigProps {
	//props
	show: boolean;
	onClose: () => any;
}

export const ScreensaverConfig: React.FC<ScreensaverConfigProps> = ({ show, onClose }) => {
	const { translate: _ } = useI18n();
	const [themeName, setTheme] = useIoBrokerTheme();

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

	return (
		<Dialog open={show} onClose={onClose}>
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
				<h1>Screensaver</h1>
			</DialogContent>
			<DialogActions>
				<Button onClick={onClose}>{_('add')}</Button>
				<Button onClick={onClose}>{_('Cancel')}</Button>
			</DialogActions>
		</Dialog>
	);
};
