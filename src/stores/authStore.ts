import { authService } from '@/services/auth.service';
import { create } from 'zustand';

interface AuthState {
	isAuthenticated: boolean;
	isLoading: boolean;
	error: string | null;
	login: (email: string, password: string) => Promise<void>;
	logout: () => void;
	checkAuth: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
	isAuthenticated: authService.isAuthenticated(),
	isLoading: false,
	error: null,

	login: async (email: string, password: string) => {
		set({ isLoading: true, error: null });
		try {
			await authService.login(email, password);
			set({ isAuthenticated: true });
		} catch (error) {
			set({ error: error instanceof Error ? error.message : 'Ошибка при входе' });
		} finally {
			set({ isLoading: false });
		}
	},

	logout: () => {
		authService.logout();
		set({ isAuthenticated: false });
	},

	checkAuth: () => {
		const isAuthenticated = authService.isAuthenticated();
		set({ isAuthenticated });
	}
})); 
