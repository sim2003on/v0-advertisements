import { PropsWithChildren, ReactNode } from 'react';

import { cn } from '@/utils/tw-merge';

interface IContainerProps {
	children: ReactNode;
	className?: string;
}

export const Container = ({
	children,
	className
}: PropsWithChildren<IContainerProps>) => {
	return (
		<div
			className={cn('mx-auto w-full max-w-7xl overflow-hidden px-4', className)}
		>
			{children}
		</div>
	);
};
