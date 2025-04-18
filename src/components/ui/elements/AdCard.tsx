// components/AdCard.tsx
'use client';

import Image from 'next/image';
import Link from 'next/link';

import { Badge, Card, CardContent } from '@/components/ui/primitives';

import { useImageHover } from '@/hooks';

// components/AdCard.tsx

// components/AdCard.tsx

interface AdCardProps {
	title: string;
	description: string;
	price: number;
	images: string[];
	isNew?: boolean;
}

export const AdCard = ({
	title,
	description,
	price,
	images,
	isNew = false
}: AdCardProps) => {
	const { currentImageIndex, handleMouseMove } = useImageHover(images);

	return (
		<Card className="group w-full max-w-full overflow-hidden p-0 transition-all duration-300 hover:shadow-md">
			<div className="relative">
				<div
					className="relative aspect-[3/2] w-full cursor-pointer overflow-hidden bg-gray-100"
					onMouseMove={handleMouseMove}
				>
					<Image
						src={images[currentImageIndex] || '/placeholder.svg'}
						alt={`${title} - Image ${currentImageIndex + 1}`}
						fill
						sizes="any"
						priority
						className="object-cover"
					/>
					<div className="absolute bottom-2 left-1/2 flex -translate-x-1/2 transform gap-2">
						{images.map((_, index) => (
							<span
								key={index}
								className={`h-2 w-2 rounded-full transition-all ${
									currentImageIndex === index
										? 'bg-primary'
										: 'border border-primary/50 bg-white/70'
								}`}
							/>
						))}
					</div>
				</div>
				{isNew && (
					<div className="absolute left-2 top-2">
						<Badge className="text-primary-foreground">New</Badge>
					</div>
				)}
			</div>
			<CardContent className="mb-0 grid gap-1 p-5">
				<Link href="#">
					<h3 className="text-lg font-semibold leading-tight transition-all duration-300 hover:text-primary">
						{title}
					</h3>
				</Link>
				<p className="line-clamp-1 text-muted-foreground">{description}</p>
				<div className="pt-1">
					<span className="text-lg font-bold">${price.toFixed(2)}</span>
				</div>
			</CardContent>
		</Card>
	);
};
