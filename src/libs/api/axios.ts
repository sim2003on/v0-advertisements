import { authService } from '@/services/auth.service';
import { tokenService } from '@/services/token.service';
import axios, { AxiosInstance } from 'axios';

const createApiInstance = (baseURL: string): AxiosInstance => {
	return axios.create({
		baseURL,
		headers: {
			'Content-Type': 'application/json',
		},
	});
};

export const apiWithToken = createApiInstance(process.env.NEXT_PUBLIC_API_URL || '');
export const apiWithoutToken = createApiInstance(process.env.NEXT_PUBLIC_API_URL || '');

let isRefreshing = false;
let failedQueue: Array<{
	resolve: (token: string) => void;
	reject: (err: any) => void;
}> = [];

const processQueue = (error: any, token: string | null = null) => {
	failedQueue.forEach((prom) => {
		if (error) {
			prom.reject(error);
		} else {
			prom.resolve(token!);
		}
	});
	failedQueue = [];
};

apiWithToken.interceptors.request.use(async (config) => {
	const accessToken = tokenService.getAccessToken();
	if (!accessToken) {
		return Promise.reject(new Error('No access token available'));
	}

	config.headers.Authorization = `Bearer ${accessToken}`;
	return config;
});

apiWithToken.interceptors.response.use(
	(response) => response,
	async (error) => {
		const originalRequest = error.config;

		if (error.response?.status !== 401 || originalRequest._retry) {
			return Promise.reject(error);
		}

		if (isRefreshing) {
			return new Promise((resolve, reject) => {
				failedQueue.push({
					resolve: (token) => {
						originalRequest.headers.Authorization = `Bearer ${token}`;
						resolve(apiWithToken(originalRequest));
					},
					reject: (err) => reject(err),
				});
			});
		}

		originalRequest._retry = true;
		isRefreshing = true;

		try {
			const newTokens = await authService.refreshTokens();
			if (newTokens) {
				originalRequest.headers.Authorization = `Bearer ${newTokens.access_token}`;
				processQueue(null, newTokens.access_token);
				return apiWithToken(originalRequest);
			}
			return Promise.reject(error);
		} catch (err) {
			processQueue(err, null);
			return Promise.reject(err);
		} finally {
			isRefreshing = false;
		}
	}
);

export const apiWithUrlEncoded = axios.create({
	baseURL: process.env.NEXT_PUBLIC_KEYKLOAK_URL || '',
	headers: {
		'Content-Type': 'application/x-www-form-urlencoded',
	},
});
