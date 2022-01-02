/**
 * Created by issi on 31.10.21
 */
import {
	Box,
	Button,
	Chip,
	Dialog,
	DialogActions,
	DialogContent,
	DialogTitle,
	FormControl,
	Grid,
	InputLabel,
	MenuItem,
	OutlinedInput,
	Select,
} from '@mui/material';
import { Theme, useTheme } from '@mui/material/styles';
import { useI18n, useIoBrokerState, useIoBrokerTheme } from 'iobroker-react/hooks';
import React, { useEffect, useState } from 'react';
import { HelperButton } from '../../../components/HelperButton';
import { clearTelegramConfig, createNewConfig, fullConfig } from '../../../lib/createConfig';

export interface TelegramConfigProps {
	//props
	show: boolean;
	onClose: () => any;
}

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
	PaperProps: {
		style: {
			maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
			width: 250,
		},
	},
};

function getStyles(name: string, personName: readonly string[], theme: Theme) {
	return {
		fontWeight:
			personName.indexOf(name) === -1 ? theme.typography.fontWeightRegular : theme.typography.fontWeightMedium,
	};
}
let names: string[] = [];

const telegramHelperLink = 'https://xxbjxx.github.io/language/en/Fully-Tablet-Control/06.Telegram.html';
export const TelegramConfig: React.FC<TelegramConfigProps> = ({ show, onClose }) => {
	const theme = useTheme();
	const { translate: _ } = useI18n();
	const [themeName, setTheme] = useIoBrokerTheme();
	const [personName, setPersonName] = React.useState<string[]>([]);
	const [telegramUser] = useIoBrokerState({
		id: 'telegram.0.communicate.users',
		subscribe: true,
	});
	const [TelegramActive, setTelegramActive] = useState(false);
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

	useEffect(() => {
		if (names.length !== 0) names = [];
		let newUsers;
		if (typeof telegramUser === 'string') {
			newUsers = JSON.parse(telegramUser);
		}

		for (const key in newUsers) {
			names.push(newUsers[key].firstName);
		}
	}, [telegramUser]);

	// const handleChange = (event: SelectChangeEvent<typeof personName>) => {};

	const handleChange = (
		attr: string,
		event:
			| React.ChangeEvent<HTMLInputElement>
			| (Event & { target: { value: string; name: string } })
			| (Event & { target: { value: string[]; name: string } }),
	) => {
		switch (attr) {
			case 'active':
				createNewConfig('telegramActive', event.target.value);
				setTelegramActive(JSON.parse(event.target.value as string));
				if (!event.target.value) {
					clearTelegramConfig();
				}
				break;

			case 'user':
				const {
					target: { value },
				} = event;
				setPersonName(
					// On autofill we get a stringified value.
					typeof value === 'string' ? value.split(',') : value,
				);
				createNewConfig('multipleTelegramUserName', event.target.value);
				// console.log(fullConfig.config.telegram.multipleTelegramUserName);
				break;
		}
	};

	const handleAdd = () => {
		console.log(`add Telegram configuration =>  ${JSON.stringify(fullConfig.config.telegram)}`);
		onClose();
	};

	const handleClose = () => {
		onClose();
		setTelegramActive(false);
		clearTelegramConfig();
	};

	return (
		<Dialog open={show} onClose={handleClose}>
			<DialogTitle sx={{ bgcolor: BgColor, textAlignLast: 'center', fontSize: '1.4rem' }}>
				{_('Telegram Config')}
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
							<InputLabel id="telegramActive-select-label">Telegram Active</InputLabel>
							<Select
								labelId="telegramActive-select-label"
								id="telegramActive"
								value={fullConfig.config.telegram.telegramActive.toString()}
								label={_('Telegram Active')}
								onChange={(event) => {
									handleChange('active', event);
								}}
							>
								<MenuItem value={'true'}>{_('Telegram On')}</MenuItem>
								<MenuItem value={'false'}>{_('Telegram Off')}</MenuItem>
							</Select>
						</FormControl>
					</Box>
					<HelperButton helperLink={telegramHelperLink} helperTooltipTitle="TelegramHelper" />
				</Grid>
				{TelegramActive ? (
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
						<FormControl sx={{ m: 1 }} fullWidth>
							<InputLabel id="telegramUser-multiple-chip-label">{_('Telegram User')}</InputLabel>
							<Select
								labelId="telegramUser-multiple-chip-label"
								id="telegramUser-multiple-chip"
								multiple
								value={fullConfig.config.telegram.multipleTelegramUserName}
								onChange={(event) => {
									handleChange('user', event);
								}}
								input={<OutlinedInput id="select-multiple-chip" label="Telegram User" />}
								renderValue={(selected) => (
									<Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
										{selected.map((value) => (
											<Chip key={value} label={value} />
										))}
									</Box>
								)}
								MenuProps={MenuProps}
							>
								{names.map((name) => (
									<MenuItem key={name} value={name} style={getStyles(name, personName, theme)}>
										{name}
									</MenuItem>
								))}
							</Select>
						</FormControl>
					</Grid>
				) : null}
			</DialogContent>
			<DialogActions>
				<Button onClick={handleAdd}>{_('add')}</Button>
				<Button onClick={handleClose}>{_('Cancel')}</Button>
			</DialogActions>
		</Dialog>
	);
};
