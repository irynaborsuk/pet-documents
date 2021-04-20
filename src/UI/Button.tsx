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
			padding: '5px 10px',
			borderRadius: '5px',
			border: '1px solid rgba(0,0,0,0.3)',
			borderBottomWidth: '3px',
			'&:hover': {
				backgroundColor: 'var(--color-hover-grey)',
				borderColor: 'var(--color-black-rgba)'
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
}

export const Button: React.FC<ButtonProps> = (
	{
		name,
		type,
		onClick,
		backgroundColor,
		color,
		height,
		width
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
				width: width
			}}
		>
			{name}
		</button>
	);
};
