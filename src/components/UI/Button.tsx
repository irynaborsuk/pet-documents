import React from 'react';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';

const useStyles = makeStyles((theme: Theme) =>
	createStyles({
		root: {
			'& > *': {
				margin: theme.spacing(1),
			},
		},
	}),
);

type ButtonProps = {
	name: string
//	border: string;
//	color: string;
//	children?: React.ReactNode;
//	height: string;
	onClick: () => void;
//	radius: string
//	width: string;
}

export const Button: React.FC<ButtonProps> = ({name, onClick}) => {
	const classes = useStyles();

	return (
		<div className={classes.root}>
			<button
				onClick={onClick}
			>
				{name}
			</button>
		</div>
	);
}
