'use client';

import { AdCard } from './AdCard';
import { AdCardSkeleton } from './AdCardSkeleton';
import { Title } from './Title';

interface Item {
	id?: number;
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

interface IProps {
	title: string;
	items: Item[];
}

export const AdCardGroup = ({ title, items }: IProps) => {
	return (
		<div className="flex flex-col gap-5">
			<Title text={title} size="lg" className="font-bold" />
			<div className="grid grid-cols-1 gap-5 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
				{items.length > 0
					? items.map(item => (
							<AdCard
								key={item.id}
								title={item.title}
								description={item.description}
								price={item.price.price}
								images={item.imgUrls}
								isNew={
									item.status === 'CREATED' && item.createdAt
										? new Date(item.createdAt) >
											new Date(Date.now() - 1 * 24 * 60 * 60 * 1000)
										: false
								}
							/>
						))
					: [...Array(4)].map((_, index) => <AdCardSkeleton key={index} />)}
			</div>
		</div>
	);
};
