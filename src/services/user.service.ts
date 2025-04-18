import { apiWithToken } from "@/libs/api/axios";
import { IUpdateProfile } from "@/types/user.types";

class UserService {
	public async getProfile(): Promise<any> {
		try {
			const response = await apiWithToken.get('/api/v1/public/profiles');
			return response.data;
		} catch (error) {
			console.error('Error fetching user profile:', error);
			throw error;

		}
	}

	public async updateProfile(data: IUpdateProfile): Promise<any> {
		try {
			const response = await apiWithToken.patch('api/v1/public/profiles/update', data);
			return response.data;
		} catch (error) {
			console.error('Error updating user profile:', error);
			throw error;
		}
	}
}

export const userService = new UserService();
