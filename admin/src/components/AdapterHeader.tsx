import { Fab, Grid, makeStyles, Tooltip } from '@material-ui/core/';
import React from 'react';
import { GitHub, Description } from '@material-ui/icons';
import { useI18n } from 'iobroker-react/hooks';

const Url = {
	issues: 'https://github.com/xXBJXx/ioBroker.fully_react_test/issues',
	docu: 'https://xxbjxx.github.io/language/en/Fully-Tablet-Control/01.description.html',
};
const useStyles = makeStyles((theme) => ({
	tooltip: {
		verticalAlign: 'middle',
	},
	helperButton: {
		height: '90px',
		justifyContent: 'right',
		display: 'flex',
		alignItems: 'center',
	},
}));
export const AdapterHeader = () => {
	const classes = useStyles();
	const { translate: _ } = useI18n();

	return (
		<Grid container spacing={0}>
			<Grid item xs={4}>
				<img src="fully_react_test.png" alt="Adapter Icon" style={{ margin: 16, width: 150, height: 150 }} />
			</Grid>
			<Grid className={classes.helperButton} item xs={8}>
				<Tooltip title={_('GitHub_Issues')} className={classes.tooltip} arrow>
					<Fab
						href={Url.issues}
						target="_blank"
						rel="noreferrer"
						variant="extended"
						size="medium"
						color="primary"
						aria-label="GitHub Issues"
					>
						<GitHub />
						GitHub Issues
					</Fab>
				</Tooltip>
				<Tooltip title={_('docu')} className={classes.tooltip} arrow>
					<Fab
						href={Url.docu}
						target="_blank"
						rel="noreferrer"
						variant="extended"
						size="medium"
						color="primary"
						aria-label="docu"
					>
						<Description />
						Docu
					</Fab>
				</Tooltip>
			</Grid>
		</Grid>
	);
};
