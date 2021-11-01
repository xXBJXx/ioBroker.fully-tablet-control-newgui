import React from 'react';
import { IconButton, Tooltip } from '@mui/material';
import { LiveHelp } from '@mui/icons-material';
import { useI18n } from 'iobroker-react/hooks';

interface HelperButtonProps {
	loginHelperLink: string;
	helperTooltipTitle: string;
}

export const HelperButton: React.FC<HelperButtonProps> = ({ loginHelperLink, helperTooltipTitle }): JSX.Element => {
	const { translate: _ } = useI18n();
	return (
		<Tooltip title={_(helperTooltipTitle)} arrow>
			<IconButton
				href={loginHelperLink}
				target="_blank"
				rel="noreferrer"
				color="primary"
				aria-label="add to shopping cart"
			>
				<LiveHelp />
			</IconButton>
		</Tooltip>
	);
};
