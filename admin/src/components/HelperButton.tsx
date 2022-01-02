import React from 'react';
import { IconButton, Tooltip } from '@mui/material';
import { LiveHelp } from '@mui/icons-material';
import { useI18n } from 'iobroker-react/hooks';

interface HelperButtonProps {
	helperLink: string;
	helperTooltipTitle: string;
}

export const HelperButton: React.FC<HelperButtonProps> = ({ helperLink, helperTooltipTitle }): JSX.Element => {
	const { translate: _ } = useI18n();
	return (
		<Tooltip title={_(helperTooltipTitle)} arrow>
			<IconButton
				href={helperLink}
				target="_blank"
				rel="noreferrer"
				color="primary"
				aria-label="add to shopping cart"
				sx={{ cursor: 'help' }}
			>
				<LiveHelp />
			</IconButton>
		</Tooltip>
	);
};
