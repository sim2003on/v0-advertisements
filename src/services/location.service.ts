import { apiWithoutToken } from '@/libs/api/axios';
import { ILocation } from '@/types/location.types';

class LocationService {
	public async getCountries(): Promise<ILocation[]> {
		try {
			const response = await apiWithoutToken.get('/api/v1/public/const/countries');
			return response.data;
		} catch (error) {
			console.error('Error fetching countries:', error);
			throw error;
		}
	}

	public async getRegions(countryId: number): Promise<ILocation[]> {
		try {
			const response = await apiWithoutToken.get(`/api/v1/public/const/country/${countryId}/regions`);
			return response.data;
		} catch (error) {
			console.error('Error fetching regions:', error);
			throw error;
		}
	}

	public async getCities(regionId: number): Promise<ILocation[]> {
		try {
			const response = await apiWithoutToken.get(`/api/v1/public/const/region/${regionId}/cities`);
			return response.data;
		} catch (error) {
			console.error('Error fetching cities:', error);
			throw error;
		}
	}
}

export const locationService = new LocationService(); 
