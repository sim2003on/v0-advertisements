import { useCallback } from 'react';

import { useLoadingStore } from '@/stores/loadingStore';

export const useLoading = () => {
	const { showLoading, hideLoading } = useLoadingStore();

	const withLoading = useCallback(
		async <T,>(promise: Promise<T>): Promise<T> => {
			try {
				showLoading();
				return await promise;
			} finally {
				hideLoading();
			}
		},
		[showLoading, hideLoading]
	);

	return {
		showLoading,
		hideLoading,
		withLoading,
	};
}; 
