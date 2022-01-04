import { Description, GitHub } from '@mui/icons-material';
import { Fab, Grid, Tooltip } from '@mui/material';
import { useI18n } from 'iobroker-react/hooks';
import React from 'react';

const Url = {
	issues: 'https://github.com/xXBJXx/ioBroker.fully_react_test/issues',
	doc: 'https://xxbjxx.github.io/language/en/Fully-Tablet-Control/01.description.html',
};

export const AdapterHeader = (): JSX.Element => {
	const { translate: _ } = useI18n();

	return (
		<Grid container spacing={0}>
			<Grid item xs={4}>
				<img src="fully_react_test.png" alt="Adapter Icon" style={{ margin: 16, width: 150, height: 150 }} />
			</Grid>
			<Grid
				item
				xs={3}
				sx={{
					height: 85,
					top: '5px',
					right: 0,
					position: 'absolute',
					display: 'flex',
					alignItems: 'center',
				}}
			>
				<Tooltip title={_('GitHub_Issues')} sx={{ verticalAlign: 'middle' }} arrow>
					<Fab
						href={Url.issues}
						target="_blank"
						rel="noreferrer"
						variant="extended"
						size="medium"
						color="primary"
						aria-label="GitHub Issues"
						sx={{ margin: 1 }}
					>
						<GitHub sx={{ margin: 1, marginLeft: 0 }} />
						GitHub Issues
					</Fab>
				</Tooltip>
				<Tooltip title={_('doc')} sx={{ verticalAlign: 'middle' }} arrow>
					<Fab
						href={Url.doc}
						target="_blank"
						rel="noreferrer"
						variant="extended"
						size="medium"
						color="primary"
						aria-label="doc"
						sx={{ margin: 1 }}
					>
						<Description sx={{ margin: 1, marginLeft: 0 }} />
						Docu
					</Fab>
				</Tooltip>
			</Grid>
		</Grid>
	);
};
