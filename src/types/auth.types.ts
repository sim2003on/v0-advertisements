export interface LoginCredentials {
	username: string;
	password: string;
}

export interface RegisterCredentials {
	email: string;
	password: string;
	username: string;
	firstName: string;
	lastName: string;
}

export interface KeyCloakLoginResponse {
	access_token: string;
	refresh_token: string;
	expires_in?: number;
	refresh_expires_in?: number;
	token_type?: string;
	scope?: string;
}

export interface StoredTokens {
	access_token: string;
	refresh_token: string;
	expires_in?: number | undefined;
	refresh_expires_in?: number | undefined;
}

export interface RegisterResponse {
	id: string;
	email: string;
	username?: string;
	firstName: string;
	lastName: string;
}

export interface AuthStore {
	isAuth: boolean;
	isLoading: boolean;
	error: string | null;
	setIsAuth: (value: boolean) => void;
	checkAuth: () => Promise<void>;
	logout: () => Promise<void>;
}

export interface LoginResponse {
	access_token: string;
	refresh_token: string;
	expires_in: number;
	refresh_expires_in: number;
}
