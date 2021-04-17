import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { Button } from './Button';

const SignInButton = () => {
	const { loginWithRedirect } = useAuth0();

	return (
		<Button
			name={'Sign in'}
			type={'button'}
			onClick={() => loginWithRedirect()}
			backgroundColor={'#eee'}
			color={'teal'}
		/>
	);
};

export default SignInButton;
