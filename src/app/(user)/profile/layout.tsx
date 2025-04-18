import React from 'react';

import { Container, Header } from '@/components/layout';

export default function ProfileLayout({
	children
}: {
	children: React.PropsWithChildren<React.ReactNode>;
}) {
	return (
		<>
			<Header isProfilePage />
			<Container>{children}</Container>
		</>
	);
}
