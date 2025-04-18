'use client';

import { motion } from 'framer-motion';
import type { LucideIcon } from 'lucide-react';
import { useLocale, useTranslations } from 'next-intl';
import Link from 'next/link';

import { cn } from '@/utils/tw-merge';

interface Category {
	id: number;
	name_en: string;
	name_ru: string;
	name_hy: string;
	icon: LucideIcon;
	count: number;
	color: string;
	iconColor: string;
}

interface CategoryCardProps {
	category: Category;
	index: number;
}

const cardVariants = {
	hidden: { opacity: 0, y: 20, scale: 0.95 },
	visible: {
		opacity: 1,
		y: 0,
		scale: 1,
		transition: { duration: 0.5, ease: 'easeOut' }
	}
};

const iconVariants = {
	hidden: { scale: 0.8, opacity: 0 },
	visible: {
		scale: 1,
		opacity: 1,
		transition: { delay: 0.2, duration: 0.3, type: 'spring', stiffness: 200 }
	}
};

export const CategoryCard = ({ category, index }: CategoryCardProps) => {
	const t = useTranslations('categoriesPage.categoriesCard');
	const locale = useLocale() as 'en' | 'ru' | 'hy';
	const { id, icon: Icon, count, color, iconColor } = category;
	const title = category[`name_${locale}`] || category.name_en;

	return (
		<motion.div
			variants={cardVariants}
			whileHover={{ y: -8, transition: { duration: 0.1 } }}
		>
			<Link href={`/categories/${id}`} className="group block">
				<div className="overflow-hidden rounded-xl border border-border transition-all duration-200 hover:shadow-lg">
					<div
						className={cn('flex flex-col items-center p-6 text-center', color)}
					>
						<motion.div
							className={cn(
								'mb-4 rounded-full p-3',
								iconColor,
								'bg-white/80 dark:bg-black/20'
							)}
							variants={iconVariants}
						>
							<Icon className={cn('h-8 w-8', iconColor)} />
						</motion.div>
						<motion.h3
							className="mb-1 text-lg font-medium text-white"
							initial={{ opacity: 0 }}
							animate={{ opacity: 1 }}
							transition={{ delay: 0.3 + index * 0.05 }}
						>
							{title}
						</motion.h3>
						<motion.p
							className="text-sm text-gray-300"
							initial={{ opacity: 0 }}
							animate={{ opacity: 1 }}
							transition={{ delay: 0.4 + index * 0.05 }}
						>
							{count + t('listings')}
						</motion.p>
					</div>
				</div>
			</Link>
		</motion.div>
	);
};
