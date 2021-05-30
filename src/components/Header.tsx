import React from 'react';
import { Avatar, Card, CardActions, CardContent, CardHeader, Menu, MenuItem, Typography } from '@material-ui/core';
import SignOutButton from '../UI/SignOutButton';
import { useAuth0 } from '@auth0/auth0-react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import Toolbar from '@material-ui/core/Toolbar';
import SignInButton from '../UI/SignInButton';
import AppBar from '@material-ui/core/AppBar';
import { useHistory } from 'react-router';

const useStyles = makeStyles((theme: Theme) =>
	createStyles({
		large: {
			width: theme.spacing(7),
			height: theme.spacing(7),
		},
		avatarMenuStyles: {
			display: 'flex',
			flexDirection: 'column',
			justifyContent: 'center',
		},
		cardStyles: {
			display: 'flex',
			flexDirection: 'column',
			alignItems: 'center',
			padding: '20px'
		},
		toolBar: {
			display: 'flex',
			justifyContent: 'space-between',
		},
		labelStyles: {
			fontSize: 'large'
		}
	})
);

const Header = () => {
	const classes = useStyles();
	const { user, isAuthenticated } = useAuth0();
	const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
	const isMenuOpen = Boolean(anchorEl);
	const history = useHistory();

	const handleAvatarToggle = (event: React.MouseEvent<HTMLElement>) => {
		setAnchorEl(event.currentTarget);
	}

	const handleAvatarMenuClose = () => {
		setAnchorEl(null);
	};

	const renderMenu = (
		<Menu
			anchorEl={anchorEl}
			anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
			keepMounted
			transformOrigin={{ vertical: 'top', horizontal: 'right' }}
			open={isMenuOpen}
			onClose={handleAvatarMenuClose}
			onClick={() => setAnchorEl(null)}
		>
			<MenuItem className={classes.avatarMenuStyles}>
				{isAuthenticated && (
					<Card className={classes.cardStyles}>
						<CardHeader
							avatar={
								<Avatar src={user.picture} alt={user.name} className={classes.large}/>
							}
						/>
						<CardContent className={classes.cardStyles}>
							<Typography variant="h6" color="textSecondary" component="p">
								{user.name}
							</Typography>
							<Typography variant="body2" color="textSecondary" component="p">
								{user.email}
							</Typography>
						</CardContent>
					</Card>
				)}

				<CardActions>
					<SignOutButton/>
				</CardActions>
			</MenuItem>
		</Menu>
	);

	return (
		<div>
			<AppBar position="fixed">
				<Toolbar className={classes.toolBar}>

					<div className={classes.toolBar}>
						<MenuItem
							className={classes.labelStyles}
							onClick={() => history.push('/pet-account')}
						>
							Pet's Documents
						</MenuItem>
					</div>

					{isAuthenticated ?
						<MenuItem
							onClick={handleAvatarToggle}
						>
							<Avatar src={user.picture} alt={user.name}/>
						</MenuItem>
						:
						<SignInButton/>
					}
				</Toolbar>
			</AppBar>
			{renderMenu}
		</div>
	);
};

export default Header;
