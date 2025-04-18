export const getAuthHeaders = (): Record<string, string> => {
	if (typeof window === 'undefined') return {};

	const accessToken = localStorage.getItem('access_token');
	if (!accessToken) return {};

	return {
		'x-access-token': accessToken
	};
};

export const getHeaders = (): Record<string, string> => {
	return {
		'Content-Type': 'application/json',
		...getAuthHeaders()
	};
}; 
