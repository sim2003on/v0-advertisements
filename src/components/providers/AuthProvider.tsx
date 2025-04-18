'use client';

import { PropsWithChildren, useEffect } from 'react';

import { useAuthStore } from '@/stores/authStore';

export const AuthProvider = ({ children }: PropsWithChildren) => {
	const { checkAuth } = useAuthStore();

	useEffect(() => {
		checkAuth();
	}, [checkAuth]);

	return <>{children}</>;
};
