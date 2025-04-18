'use client';

import { useTranslations } from 'next-intl';
import Link from 'next/link';
import { useEffect, useState } from 'react';

import { Button } from '@/components/ui/primitives';

import { useAuthStore } from '@/stores/authStore';

export const PostAdButton = () => {
	const t = useTranslations('header');
	const isAuthenticated = useAuthStore(state => state.isAuthenticated);
	const [mounted, setMounted] = useState(false);

	useEffect(() => {
		setMounted(true);
	}, []);

	if (!mounted) {
		return (
			<Button
				className="hidden transition-all duration-200 hover:bg-primary/75 lg:flex"
				asChild
			>
				<Link href="/login">{t('postAdBtn')}</Link>
			</Button>
		);
	}

	return (
		<Button
			className="hidden transition-all duration-200 hover:bg-primary/75 lg:flex"
			asChild
		>
			<Link href={isAuthenticated ? '/add' : '/login'}>{t('postAdBtn')}</Link>
		</Button>
	);
};
