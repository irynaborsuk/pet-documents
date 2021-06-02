import React, { FC } from 'react';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import { CssBaseline } from '@material-ui/core';

const theme = createMuiTheme({
	palette: {
		type: 'light',
		primary: {
			main: '#008080',
			contrastText: '#fff'
		},
		secondary: {
			main: '#ffb74d',
			dark: '#f57c00',
		},
		error: {
			main: '#ff0000'
		}
	}
});

const withLocalTheme = (Component: FC) => {
	return () => (
		<ThemeProvider theme={theme}>
			<CssBaseline/>
			<Component/>
		</ThemeProvider>
	);
};

export default withLocalTheme;
