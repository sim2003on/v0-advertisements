import { getLocale } from 'next-intl/server';

import { itemService } from '@/services/item.service';

import { AdCardGroup } from './AdCardGroup';

interface Item {
	id?: number;
	category: string;
	title: string;
	description: string;
	price: {
		price: number;
		currency: string;
	};
	imgUrls: string[];
	createdAt?: string;
	status?: string;
}

interface AdCardGroupWrapperProps {
	categoryId: number;
}

export const AdCardGroupWrapper = async ({
	categoryId
}: AdCardGroupWrapperProps) => {
	const locale = await getLocale();
	let items: Item[] = [];
	const categoryTitle = 'Category';

	try {
		items = await itemService.getItemsByCategory(categoryId, locale);
	} catch (error) {
		console.error('Failed to fetch items:', error);
	}

	return (
		<AdCardGroup title={items[0]?.category || categoryTitle} items={items} />
	);
};
