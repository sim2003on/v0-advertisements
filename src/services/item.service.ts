import { apiWithoutToken, apiWithToken } from '@/libs/api/axios';
import { IAdvertisementForm } from '@/types/item.types';

interface IMark {
	id: number;
	mark: string;
}

interface IModel {
	id: number;
	model: string;
}

class ItemService {
	public async getItemsByCategory(categoryId: number, locale: string): Promise<any> {
		try {
			const response = await apiWithoutToken.get(`/api/v1/public/${locale}/items/category/${categoryId}?page=1&size=8`);
			return response.data.content;
		} catch (error) {
			console.error('Error fetching items by category:', error);
			throw error;
		}
	}

	public async createItem(data: IAdvertisementForm, categoryId: number, locale: string): Promise<any> {
		try {
			const response = await apiWithToken.post(`/api/v1/public/${locale}/items/${categoryId}`, data);
			return response.data;
		} catch (error) {
			console.error('Error creating item:', error);
			throw error;
		}
	}

	public async getFormData(categoryId: number): Promise<any> {
		try {
			const response = await apiWithoutToken.get(`/api/v1/public/add/${categoryId}/form`);
			return response.data;
		} catch (error) {
			console.error('Error fetching form data:', error);
			throw error;
		}
	}

	public async getCarMarks(): Promise<IMark[]> {
		try {
			const response = await apiWithoutToken.get('/api/v1/public/const/category/auto/marks');
			return response.data;
		} catch (error) {
			console.error('Error fetching car marks:', error);
			throw error;
		}
	}

	public async getCarModels(markId: number): Promise<IModel[]> {
		try {
			const response = await apiWithoutToken.get(`/api/v1/public/const/autoMark/${markId}/models`);
			return response.data;
		} catch (error) {
			console.error('Error fetching car models:', error);
			throw error;
		}
	}
}

export const itemService = new ItemService();
