import React from 'react';
import './App.css';
import {
	BrowserRouter as Router,
	Switch,
	Route
} from 'react-router-dom';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import WelcomePage from './components/WelcomePage';
import SignInButton from './UI/SignInButton';
import PetAccount from './containers/PetAccount/PetAccount';
import NavigationList from './components/NavigationList';
import AddNewPet from './containers/PetAccount/AddNewPet';
import { Hidden } from '@material-ui/core';

const drawerWidth = 240;

const useStyles = makeStyles((theme: Theme) =>
	createStyles({
		root: {
			display: 'flex'
		},
		drawer: {
			[theme.breakpoints.up('sm')]: {
				width: drawerWidth,
				flexShrink: 0
			}
		},
		appBar: {
			[theme.breakpoints.up('sm')]: {
				width: `calc(100% - ${drawerWidth}px)`,
				marginLeft: drawerWidth
			},
			backgroundColor: 'white'
		},
		menuButton: {
			marginRight: theme.spacing(2),
			[theme.breakpoints.up('sm')]: {
				display: 'none'
			},
			color: 'teal'
		},
		// necessary for content to be below app bar
		toolbar: theme.mixins.toolbar,
		toolBarEnd: {
			display: 'flex',
			justifyContent: 'space-between',
			[theme.breakpoints.up('sm')]: {
				justifyContent: 'flex-end'
			}
		},
		drawerPaper: {
			width: drawerWidth
		},
		content: {
			flexGrow: 1,
			padding: theme.spacing(3)
		}
	})
);

function App() {
	const classes = useStyles();
	const [mobileOpen, setMobileOpen] = React.useState(false);

	const handleDrawerToggle = () => {
		setMobileOpen(!mobileOpen);
	};

	const drawer = (
		<div>
			<div className={classes.toolbar}/>
			<Divider/>
			<NavigationList/>
		</div>
	);

	return (
		<Router>
			<div className={classes.root}>
				<CssBaseline/>
				<AppBar
					position="fixed"
					className={classes.appBar}
				>
					<Toolbar className={classes.toolBarEnd}>
						<IconButton
							color="inherit"
							aria-label="open drawer"
							onClick={handleDrawerToggle}
							className={classes.menuButton}
							edge="start"
						>
							<MenuIcon/>
						</IconButton>
						<SignInButton/>
					</Toolbar>
				</AppBar>
				<nav className={classes.drawer} aria-label="mailbox folders">
					<Hidden smUp implementation="css">
						<Drawer
							variant="temporary"
							anchor="left"
							className={classes.drawer}
							classes={{
								paper: classes.drawerPaper
							}}
							open={mobileOpen}
							onClose={handleDrawerToggle}
							ModalProps={{
								keepMounted: true
							}}
						>
							{drawer}
						</Drawer>
					</Hidden>
					<Hidden xsDown implementation="css">
						<Drawer
							classes={{ paper: classes.drawerPaper }}
							variant="permanent"
							open
						>
							{drawer}
						</Drawer>
					</Hidden>
				</nav>

				<main className={classes.content}>
					<div className={classes.toolbar}/>

					<Switch>
						<Route path="/" exact><WelcomePage/></Route>
						<Route path="/pet-account"><PetAccount/></Route>
						<Route path="/create-pet-form"><AddNewPet/></Route>
					</Switch>

				</main>
			</div>
		</Router>
	);
}

export default App;
