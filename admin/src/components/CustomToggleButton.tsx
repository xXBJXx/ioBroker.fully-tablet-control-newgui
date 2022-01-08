/**
 * Created by alex-issi on 08.01.22
 */
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import { useI18n, useIoBrokerTheme } from 'iobroker-react/hooks';
import React, { useEffect, useState } from 'react';

export interface CustomToggleButtonProps {
	leftSide: string;
	rightSide: string;
	leftSideColor?: string;
	rightSideColor?: string;
	width?: string;
	borderRadius?: string;
	size?: 'small' | 'medium' | 'large';
	attr?: string;
	setValue: boolean;
	onChange: (value: boolean) => void;
}

/**
 * ToggleButton with true / false value
 *
 *  Properties:
 *
 *  leftSide = On // if necessary with translation for this only enter in the I18n
 *
 *  rightSide = Off // if necessary with translation for this only enter in the I18n
 *
 *  leftSideColor = green
 *
 *  rightSideColor = red
 *
 *  width = 43
 *
 *  borderRadius = 10
 *
 *  size = 'small' | 'medium' | 'large'
 *
 *  setValue = true | false
 *
 *  onChange = () => void
 *
 */
export const CustomToggleButton: React.FC<CustomToggleButtonProps> = ({
	leftSide,
	rightSide,
	leftSideColor,
	rightSideColor,
	width,
	borderRadius,
	size,
	setValue,
	onChange,
}): JSX.Element => {
	const [alignment, setAlignment] = useState(false);

	const { translate: _ } = useI18n();
	const [themeName] = useIoBrokerTheme();

	const Color = (): { Bd: string; color: string } => {
		switch (themeName) {
			case 'dark':
				return { Bd: 'rgba(124,124,124,0.4)', color: 'rgb(0,0,0)' };
			case 'blue':
				return { Bd: 'rgba(124,124,124,0.4)', color: 'rgb(0,0,0)' };
			case 'light':
				return { Bd: 'rgba(65,65,65,0.4)', color: 'rgb(255,255,255)' };
			case 'colored':
				return { Bd: 'rgba(65,65,65,0.4)', color: 'rgb(255,255,255)' };
		}
	};

	useEffect(() => {
		setAlignment(setValue);
	}, [setValue]);

	const handleChange = (event: React.MouseEvent<HTMLElement>, newAlignment: string) => {
		if (newAlignment !== null) {
			setAlignment(JSON.parse(newAlignment));
			onChange(JSON.parse(newAlignment));
		}
	};

	return (
		<React.Fragment>
			<ToggleButtonGroup
				value={alignment.toString}
				size={size ? size : 'small'}
				exclusive
				onChange={handleChange}
			>
				<ToggleButton
					sx={{
						bgcolor: alignment ? (leftSideColor ? leftSideColor : 'green') : Color().Bd,
						color: Color().color,
						'&:hover': {
							backgroundColor: alignment ? (leftSideColor ? leftSideColor : 'green') : Color().Bd,
						},
						width: width ? `${width}px` : 'auto',
						borderRadius: borderRadius ? `${borderRadius}px` : '10px',
					}}
					value="true"
				>
					{_(leftSide)}
				</ToggleButton>
				<ToggleButton
					sx={{
						bgcolor: !alignment ? (rightSideColor ? rightSideColor : 'red') : Color().Bd,
						color: Color().color,
						'&:hover': {
							backgroundColor: !alignment ? (rightSideColor ? rightSideColor : 'red') : Color().Bd,
						},
						width: width ? `${width}px` : 'auto',
						borderRadius: borderRadius ? `${borderRadius}px` : '10px',
					}}
					value="false"
				>
					{_(rightSide)}
				</ToggleButton>
			</ToggleButtonGroup>
		</React.Fragment>
	);
};
