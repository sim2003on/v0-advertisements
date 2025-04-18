import { Container } from '@/components/layout';
import { AdCardList, Filters, Title } from '@/components/ui/elements';

export default async function CategoryPage({
	params
}: {
	params: Promise<{ id: string }>;
}) {
	const { id } = await params;
	return (
		<Container className="flex flex-col gap-5">
			<Title size="xl" className="font-bold" text={'Electronics'} />
			<div className="flex gap-[60px] border-t pt-5">
				<Filters />
				<AdCardList title="Top Ads" />
			</div>
		</Container>
	);
}
