import React from 'react';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';

const useStyles = makeStyles((theme: Theme) =>
	createStyles({
		root: {
			'& > *': {
				margin: theme.spacing(1),
			},
			display: 'flex',
			textTransform: 'uppercase',
			letterSpacing: '2px',
			fontSize: '12px',
			padding: '5px 10px',
			borderRadius: '5px',
			border: '1px solid rgba(0 0 0 / 25%)',
			boxShadow: '0px 2px 4px -1px rgb(0 0 0 / 20%), 0px 4px 5px 0px rgb(0 0 0 / 14%), 0px 1px 0px 0px rgb(0 0 0 / 12%)',
			borderBottomWidth: '3px',
			'&:hover': {
				backgroundColor: '#e3e3e3',
				borderColor: 'rgba(0 0 0 / 40%)',
			}
		},
	}),
);

type ButtonProps = {
	name: string
	onClick: () => void;
	backgroundColor: string;
	color: string;
}

export const Button: React.FC<ButtonProps> = ({name, onClick, backgroundColor, color}) => {
	const classes = useStyles();

	return (
		<button
			className={classes.root}
			onClick={onClick}
			style={{
				backgroundColor: backgroundColor,
				color: color,
			}}
		>
			{name}
		</button>
	);
}
