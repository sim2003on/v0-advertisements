import type { Metadata } from 'next';
import { NextIntlClientProvider } from 'next-intl';
import { getLocale, getMessages } from 'next-intl/server';
import { Roboto } from 'next/font/google';
import React from 'react';
import { Toaster as ToastProvider } from 'react-hot-toast';

import { AuthProvider } from '@/components/providers/AuthProvider';

import QueryProvider from '@/providers/query-provider';

import '@/styles/globals.css';

const roboto = Roboto({
	weight: ['400', '500', '700'],
	subsets: ['latin', 'cyrillic'],
	display: 'swap'
});

export const metadata: Metadata = {
	title: 'AdSpot'
};

export default async function RootLayout({
	children
}: Readonly<{
	children: React.ReactNode;
}>) {
	const locale = await getLocale();
	const messages = await getMessages();
	return (
		<html lang={locale}>
			<head>
				<link rel="icon" href="/images/icons/favicon.png" type="image/png" />
			</head>
			<body className={roboto.className}>
				<ToastProvider />
				<NextIntlClientProvider messages={messages}>
					<QueryProvider>
						<AuthProvider>{children}</AuthProvider>
					</QueryProvider>
				</NextIntlClientProvider>
			</body>
		</html>
	);
}
