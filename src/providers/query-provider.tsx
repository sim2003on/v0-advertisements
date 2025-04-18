'use client';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import React from 'react';

interface IProps {
	children: React.ReactNode;
}

export default function QueryProvider({ children }: IProps) {
	const [queryClient] = React.useState(() => new QueryClient());
	return (
		<QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
	);
}
