import axios from 'axios';

const baseURL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000/api';

export const api = axios.create({
	baseURL,
	headers: {
		'Content-Type': 'application/json',
	},
});

// Добавляем перехватчик для обработки ошибок
api.interceptors.response.use(
	(response) => response,
	(error) => {
		if (error.response) {
			// Обработка ошибок от сервера
			console.error('API Error:', error.response.data);
		} else if (error.request) {
			// Обработка ошибок сети
			console.error('Network Error:', error.request);
		} else {
			// Обработка других ошибок
			console.error('Error:', error.message);
		}
		return Promise.reject(error);
	}
); 
