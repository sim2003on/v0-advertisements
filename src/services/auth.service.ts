import { apiWithoutToken, apiWithUrlEncoded } from '@/libs/api/axios';
import { tokenService } from '@/services/token.service';
import {
	LoginResponse,
	RegisterCredentials,
	RegisterResponse
} from '@/types/auth.types';
import { AxiosError } from 'axios';

const KEYCLOAK_CONFIG = {
	client_id: 'buy-and-sell-client-fe',
	realm: 'buy-and-sell',
	token_endpoint: '/realms/buy-and-sell/protocol/openid-connect/token',
	grant_types: {
		password: 'password',
		refresh_token: 'refresh_token',
	},
};

export class AuthService {
	public async register(credentials: RegisterCredentials): Promise<RegisterResponse> {
		try {
			const response = await apiWithoutToken.post<RegisterResponse>(
				'/api/v1/public/users/signup',
				credentials
			);
			return response.data;
		} catch (error) {
			throw this.handleError(error);
		}
	}

	public async login(email: string, password: string): Promise<LoginResponse> {
		const formData = new URLSearchParams();
		formData.append('username', email);
		formData.append('password', password);
		formData.append('grant_type', 'password');
		formData.append('client_id', KEYCLOAK_CONFIG.client_id);

		const response = await apiWithUrlEncoded.post<LoginResponse>(
			KEYCLOAK_CONFIG.token_endpoint,
			formData
		);

		// Сохраняем токены
		tokenService.setAccessToken(response.data.access_token);
		tokenService.setRefreshToken(response.data.refresh_token);

		return response.data;
	}

	public async refreshTokens(): Promise<LoginResponse | null> {
		const refreshToken = tokenService.getRefreshToken();
		if (!refreshToken) return null;

		try {
			const formData = new URLSearchParams();
			formData.append('grant_type', KEYCLOAK_CONFIG.grant_types.refresh_token);
			formData.append('client_id', KEYCLOAK_CONFIG.client_id);
			formData.append('refresh_token', refreshToken);

			const response = await apiWithUrlEncoded.post<LoginResponse>(
				KEYCLOAK_CONFIG.token_endpoint,
				formData
			);

			// Обновляем токены
			tokenService.setAccessToken(response.data.access_token);
			tokenService.setRefreshToken(response.data.refresh_token);

			return response.data;
		} catch (error) {
			console.error('Ошибка при обновлении токена:', error);
			// При ошибке очищаем токены
			tokenService.clearTokens();
			return null;
		}
	}

	public logout(): void {
		tokenService.clearTokens();
	}

	public isAuthenticated(): boolean {
		return !!tokenService.getAccessToken();
	}

	private handleError(error: unknown): Error {
		let errorMessage = 'An unexpected error occurred';

		if (error instanceof AxiosError) {
			const data = error.response?.data;
			errorMessage =
				data?.error_description ||
				data?.errors?.message ||
				data?.message ||
				error.message ||
				errorMessage;
		} else if (error instanceof Error) {
			errorMessage = error.message;
		}

		return new Error(errorMessage);
	}
}

export const authService = new AuthService();
