import axios from 'axios';
import { useAuth0 } from '@auth0/auth0-react';


const authorizedAxios = axios.create({
	baseURL:
		'http://localhost:3000/api/v1'
})

export const useAxiosInterceptors = () => {
	const { getAccessTokenSilently, loginWithRedirect } = useAuth0();

	authorizedAxios.interceptors.request.use(async config => {
		config.headers = {
			Authorization: `Bearer ${await getAccessTokenSilently()}`
		}
		return config;
	}, function (error) {
		// Do something with request error
		return Promise.reject(error);
	});

	authorizedAxios.interceptors.response.use(
		response => {
			return response;
		}, function (error) {
			if (error?.response?.status === 401) {
				loginWithRedirect();
			}
			return Promise.reject(error?.response ?? error);
		}
	)
};

export default authorizedAxios;
