import { apiWithUrlEncoded } from '@/libs/api/axios';
import { StoredTokens } from '@/types/auth.types';
import Cookies from 'js-cookie';

const ACCESS_TOKEN_KEY = 'access_token';
const REFRESH_TOKEN_KEY = 'refresh_token';

const COOKIE_OPTIONS = {
	httpOnly: false,
	secure: false,
	sameSite: 'lax' as const,
	path: '/',
};

const isLocalStorageAvailable = (): boolean => {
	try {
		const testKey = '__storage_test__';
		localStorage.setItem(testKey, testKey);
		localStorage.removeItem(testKey);
		return true;
	} catch (e) {
		return false;
	}
};

export class TokenService {
	// Получение access токена из localStorage
	public getAccessToken(): string | null {
		if (!isLocalStorageAvailable()) return null;
		return localStorage.getItem(ACCESS_TOKEN_KEY);
	}

	// Получение refresh токена из кук
	public getRefreshToken(): string | null {
		return Cookies.get(REFRESH_TOKEN_KEY) || null;
	}

	// Сохранение access токена в localStorage
	public setAccessToken(token: string): void {
		if (!isLocalStorageAvailable()) return;
		localStorage.setItem(ACCESS_TOKEN_KEY, token);
	}

	// Сохранение refresh токена в куки
	public setRefreshToken(token: string): void {
		Cookies.set(REFRESH_TOKEN_KEY, token, {
			expires: 30,
			secure: false,
			sameSite: 'lax'
		});
	}

	// Удаление обоих токенов
	public clearTokens(): void {
		if (isLocalStorageAvailable()) {
			localStorage.removeItem(ACCESS_TOKEN_KEY);
		}
		Cookies.remove(REFRESH_TOKEN_KEY);
	}

	// Получение access токена из localStorage
	public getAccessTokenFromLocalStorage(): string | null {
		if (!isLocalStorageAvailable()) return null;
		return localStorage.getItem(ACCESS_TOKEN_KEY) || null;
	}

	// получение refresh токена из кук
	public getRefreshTokenFromCookies(): string | null {
		return Cookies.get(REFRESH_TOKEN_KEY) || null;
	}

	// Получение обоих токенов
	public getStoredTokens(): { access_token: string | null; refresh_token: string | null } {
		return {
			access_token: this.getAccessToken(),
			refresh_token: this.getRefreshToken()
		};
	}

	public async refreshTokens(): Promise<StoredTokens | null> {
		const tokens = this.getStoredTokens();
		if (!tokens.access_token || !tokens.refresh_token) return null;

		try {
			const body = new URLSearchParams();
			body.append('grant_type', 'refresh_token');
			body.append('client_id', 'buy-and-sell-client-fe');
			body.append('refresh_token', tokens.refresh_token);

			const response = await apiWithUrlEncoded.post(
				'/realms/buy-and-sell/protocol/openid-connect/token',
				body.toString()
			);

			const newTokens = response.data;

			return ({
				access_token: newTokens.access_token,
				refresh_token: newTokens.refresh_token,
				expires_in: newTokens.expires_in,
				refresh_expires_in: newTokens.refresh_expires_in,
			});
		} catch {
			this.clearTokens();
			return null;
		}
	}
}

export const tokenService = new TokenService();
