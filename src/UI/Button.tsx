import React from 'react';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';

const useStyles = makeStyles((theme: Theme) =>
	createStyles({
		root: {
			'& > *': {
				margin: theme.spacing(1)
			},
			display: 'flex',
			justifyContent: 'center',
			alignItems: 'center',
			textTransform: 'uppercase',
			letterSpacing: '2px',
			fontSize: '12px',
			padding: 'theme.spacing(1) theme.spacing(1.5)',
			borderRadius: theme.spacing(1),
			border: '1px solid rgba(0,0,0,0.3)',
			borderBottomWidth: '3px',
			boxShadow: '2px 1px 2px gray',
			margin: 'theme.spacing(0.5), theme.spacing(1.5)',
			cursor: 'pointer',
			'&:hover': {
				backgroundColor: 'var(--color-hover-grey)',
				borderColor: 'var(--color-black-rgba)'
			},
			'&:active': {
				boxShadow: '0 0 0 white',
				margin: 'theme.spacing(1), theme.spacing(2)'
			}
		}
	})
);

type ButtonProps = {
	name: string;
	type: "button" | "reset" | "submit" | undefined;
	onClick?: () => void;
	backgroundColor: string;
	color: string;
	height?: string;
	width?: string;
	margin?: string;
	padding?: string;
}

export const Button: React.FC<ButtonProps> = (
	{
		name,
		type,
		onClick,
		backgroundColor,
		color,
		height,
		width,
		margin,
		padding
	}) => {

	const classes = useStyles();

	return (
		<button
			className={classes.root}
			type={type}
			onClick={onClick}
			style={{
				backgroundColor: backgroundColor,
				color: color,
				height: height,
				width: width,
				margin: margin,
				padding: padding
			}}
		>
			{name}
		</button>
	);
};
