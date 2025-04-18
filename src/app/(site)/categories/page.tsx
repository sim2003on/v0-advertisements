import { getTranslations } from 'next-intl/server';

import { CategoryList, PageHeader } from '@/components/features/categories';
import { Container } from '@/components/layout';

export default async function CategoriesPage() {
	const t = await getTranslations('categoriesPage');
	return (
		<Container>
			<PageHeader title={t('title')} desc={t('desc')} />
			<CategoryList />
		</Container>
	);
}
