import { tokenService } from '@/services/token.service';
import { userService } from '@/services/user.service';
import { IUser } from '@/types/user.types';
import { create } from 'zustand';

interface UserState {
	user: IUser | null;
	isLoading: boolean;
	error: string | null;
	setUser: (user: IUser) => void;
	clearUser: () => void;
	fetchProfile: () => Promise<void>;
}

export const useUserStore = create<UserState>((set, get) => ({
	user: null,
	isLoading: false,
	error: null,
	setUser: (user) => set({ user }),
	clearUser: () => set({ user: null }),
	fetchProfile: async () => {
		const accessToken = tokenService.getAccessToken();
		if (!accessToken) {
			set({ user: null, isLoading: false });
			return;
		}

		set({ isLoading: true, error: null });
		try {
			const data: IUser = await userService.getProfile();
			set({ user: data, isLoading: false });
		} catch (error: any) {
			console.error('Error fetching user profile:', error);
			set({ error: 'Failed to load profile', isLoading: false });
		}
	},
}));
