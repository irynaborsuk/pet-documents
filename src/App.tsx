import React from 'react';
import './App.css';
import {
	BrowserRouter as Router,
	Switch,
	Route
} from 'react-router-dom';
import clsx from 'clsx';
import { makeStyles, useTheme, Theme, createStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import WelcomePage from './components/WelcomePage';
import SignInButton from './UI/SignInButton';
import PetAccount from './containers/PetAccount/PetAccount';
import NavigationList from './components/NavigationList';
import AddNewPet from './containers/PetAccount/AddNewPet';

const drawerWidth = 240;

const useStyles = makeStyles((theme: Theme) =>
	createStyles({
		root: {
			display: 'flex'
		},
		toolBar: {
			display: 'flex',
			justifyContent: 'space-between'
		},
		toolBarEnd: {
			display: 'flex',
			alignSelf: 'flex-end'
		},
		appBar: {
			transition: theme.transitions.create(['margin', 'width'], {
				easing: theme.transitions.easing.sharp,
				duration: theme.transitions.duration.leavingScreen
			}),
			backgroundColor: 'white'
		},
		appBarShift: {
			width: `calc(100% - ${drawerWidth}px)`,
			marginLeft: drawerWidth,
			transition: theme.transitions.create(['margin', 'width'], {
				easing: theme.transitions.easing.easeOut,
				duration: theme.transitions.duration.enteringScreen
			})
		},
		menuButton: {
			marginRight: theme.spacing(2),
			color: 'teal'
		},
		hide: {
			display: 'none'
		},
		drawer: {
			width: drawerWidth,
			flexShrink: 0
		},
		drawerPaper: {
			width: drawerWidth
		},
		drawerHeader: {
			display: 'flex',
			alignItems: 'center',
			padding: theme.spacing(0, 1),
			// necessary for content to be below app bar
			...theme.mixins.toolbar,
			justifyContent: 'flex-end'
		},
		content: {
			flexGrow: 1,
			padding: theme.spacing(3),
			transition: theme.transitions.create('margin', {
				easing: theme.transitions.easing.sharp,
				duration: theme.transitions.duration.leavingScreen
			}),
			marginLeft: -drawerWidth
		},
		contentShift: {
			transition: theme.transitions.create('margin', {
				easing: theme.transitions.easing.easeOut,
				duration: theme.transitions.duration.enteringScreen
			}),
			marginLeft: 0
		}
	})
);

function App() {
	const classes = useStyles();
	const theme = useTheme();
	const [open, setOpen] = React.useState(false);

	const handleDrawerOpen = () => {
		setOpen(true);
	};

	const handleDrawerClose = () => {
		setOpen(false);
	};

	return (
		<Router>
			<div className={classes.root}>
				<CssBaseline/>
				<AppBar
					position="fixed"
					className={clsx(classes.appBar, {
						[classes.appBarShift]: open
					})}
				>
					<Toolbar className={clsx(classes.toolBar, open && classes.toolBarEnd)}>
						<IconButton
							color="inherit"
							aria-label="open drawer"
							onClick={handleDrawerOpen}
							edge="start"
							className={clsx(classes.menuButton, open && classes.hide)}
						>
							<MenuIcon/>
						</IconButton>
						<SignInButton/>
					</Toolbar>
				</AppBar>
				<Drawer
					className={classes.drawer}
					variant="persistent"
					anchor="left"
					open={open}
					classes={{
						paper: classes.drawerPaper
					}}
				>
					<div className={classes.drawerHeader}>
						<IconButton onClick={handleDrawerClose}>
							{theme.direction === 'ltr' ? <ChevronLeftIcon/> : <ChevronRightIcon/>}
						</IconButton>
					</div>
					<Divider/>

					<NavigationList/>

				</Drawer>
				<main
					className={clsx(classes.content, {
						[classes.contentShift]: open
					})}
				>
					<div className={classes.drawerHeader}/>


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
