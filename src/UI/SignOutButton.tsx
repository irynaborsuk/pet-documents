import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { Button } from './Button';

const SignOutButton = () => {
	const { logout } = useAuth0();

	return (
		<Button
			name={'Sign Out'}
			type={'button'}
			onClick={() => logout({ returnTo: window.location.origin })}
			backgroundColor={'#eee'}
			color={'teal'}
		/>
	);
}

export default SignOutButton;
