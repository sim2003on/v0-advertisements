'use client';

import { Card, CardContent } from '@/components/ui/primitives';

export const AdCardSkeleton = () => {
	return (
		<Card className="w-full max-w-full overflow-hidden p-0">
			<div className="relative">
				<div className="relative aspect-[3/2] w-full animate-pulse bg-gray-200" />
			</div>
			<CardContent className="grid gap-1 p-5">
				<div className="h-6 w-3/4 animate-pulse rounded bg-gray-200" />
				<div className="h-4 w-full animate-pulse rounded bg-gray-200" />
				<div className="pt-1">
					<div className="h-6 w-1/3 animate-pulse rounded bg-gray-200" />
				</div>
			</CardContent>
		</Card>
	);
};
