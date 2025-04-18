import React from 'react';

import { Footer } from '@/components/layout';
import { Header } from '@/components/layout/header/Header';

export default function SiteLayout({
	children
}: React.PropsWithChildren<React.ReactNode>) {
	return (
		<div className="flex min-h-full flex-col">
			<Header />
			<main className="my-5 h-full flex-auto">{children}</main>
			<Footer />
		</div>
	);
}
