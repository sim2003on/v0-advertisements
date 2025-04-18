'use client';

import { ChevronLeft } from 'lucide-react';
import { useTranslations } from 'next-intl';
import Link from 'next/link';

import { Title } from '@/components/ui/elements';
import { Button } from '@/components/ui/primitives';

export function NotFoundContent() {
	const t = useTranslations('notFound');
	const tCommon = useTranslations('common');

	return (
		<div className="flex flex-col items-center gap-6">
			<Title
				text={t('title')}
				size="xl"
				className="text-center text-3xl font-bold leading-snug text-green-600 sm:text-4xl md:text-5xl"
			/>

			<p className="text-base text-gray-900">{t('desc')}</p>
			<Button variant="outline" asChild>
				<Link
					href="/"
					className="group relative flex items-center justify-center px-4 py-2 hover:bg-green-50"
				>
					<ChevronLeft
						size={16}
						className="absolute left-4 top-[11.7px] -translate-x-2 opacity-0 transition-all duration-300 ease-in-out group-hover:translate-x-0 group-hover:opacity-100"
					/>
					<span className="transition-all duration-300 group-hover:pl-6">
						{tCommon('actions.goBack')}
					</span>
				</Link>
			</Button>
		</div>
	);
}
