import React from 'react';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';

const useStyles = makeStyles((theme: Theme) =>
	createStyles({
		root: {
			'& > *': {
				margin: theme.spacing(1),
			},
			display: 'flex',
			backgroundColor: 'white',
			color: 'teal',
			textTransform: 'uppercase',
			padding: '5px',
			borderRadius: '5px',
			border: '2px solid teal',
			boxShadow: '2px 2px 2px 1px rgb(34 103 74 / 61%)',
			'&:hover': {
				backgroundColor: '#00808082',
				color: 'black',
				textShadow: '0px 0px 6px rgb(255 255 255)'
			},
		},
	}),
);

type ButtonProps = {
	name: string
//	border: string;
//	children?: React.ReactNode;
//	height: string;
	onClick: () => void;
//	radius: string
//	width: string;
}

export const Button: React.FC<ButtonProps> = ({name, onClick}) => {
	const classes = useStyles();

	return (
		<button
			className={classes.root}
			onClick={onClick}
		>
			{name}
		</button>
	);
}
