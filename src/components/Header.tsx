import React from 'react';
import LeftDrawerMenu from './LeftDrawerMenu';
import { Avatar, Card, CardActions, CardHeader, Menu, MenuItem } from '@material-ui/core';
import SignOutButton from '../UI/SignOutButton';
import { useAuth0 } from '@auth0/auth0-react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import Toolbar from '@material-ui/core/Toolbar';
import SignInButton from '../UI/SignInButton';
import AppBar from '@material-ui/core/AppBar';

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
		toolBar: {
			display: 'flex',
			justifyContent: 'space-between',
		},
		labelStyles: {
			fontSize: 'x-large'
		}
	})
);

const Header = () => {
	const classes = useStyles();
	const { user, isAuthenticated } = useAuth0();
	const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
	const isMenuOpen = Boolean(anchorEl);

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
					<Card>
						<CardHeader
							avatar={
								<Avatar src={user.picture} alt={user.name} className={classes.large}/>
							}
							title={user.name}
							subheader={user.email}
						/>
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
						<LeftDrawerMenu/>
						<div className={classes.labelStyles}>Pet's Documents</div>
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
