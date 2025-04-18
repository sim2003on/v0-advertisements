import { apiWithToken } from '@/libs/api/axios';
import { IAdvertisement, ICreateAdvertisementDto } from '@/types/advertisement.types';

class AdvertisementService {
	async createAdvertisement(data: ICreateAdvertisementDto): Promise<IAdvertisement> {
		const response = await apiWithToken.post<IAdvertisement>('/advertisements', data);
		return response.data;
	}

	async getAdvertisement(id: number): Promise<IAdvertisement> {
		const response = await apiWithToken.get<IAdvertisement>(`/advertisements/${id}`);
		return response.data;
	}

	async updateAdvertisement(id: number, data: Partial<ICreateAdvertisementDto>): Promise<IAdvertisement> {
		const response = await apiWithToken.patch<IAdvertisement>(`/advertisements/${id}`, data);
		return response.data;
	}

	async deleteAdvertisement(id: number): Promise<void> {
		await apiWithToken.delete(`/advertisements/${id}`);
	}

	async uploadImage(file: File, onProgress?: (progress: number) => void): Promise<string> {
		const formData = new FormData();
		formData.append('file', file);

		const response = await apiWithToken.post<string>('/advertisements/images', formData, {
			headers: {
				'Content-Type': 'multipart/form-data',
			},
			onUploadProgress: (progressEvent) => {
				if (onProgress && progressEvent.total) {
					const progress = Math.round((progressEvent.loaded * 100) / progressEvent.total);
					onProgress(progress);
				}
			},
		});

		return response.data;
	}

	async deleteImage(imageUrl: string): Promise<void> {
		await apiWithToken.delete(`/advertisements/images/${encodeURIComponent(imageUrl)}`);
	}
}

export const advertisementService = new AdvertisementService(); 
