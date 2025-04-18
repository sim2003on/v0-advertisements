import { PropsWithChildren } from 'react';

import { Footer, Header } from '@/components/layout';

export default function AuthLayout({ children }: PropsWithChildren<unknown>) {
	return (
		<>
			<Header isAuthPage />
			{children}
			<Footer />
		</>
	);
}
