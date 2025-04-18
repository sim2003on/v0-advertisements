'use client';

import { useTranslations } from 'next-intl';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { PropsWithChildren, ReactNode } from 'react';

import {
	Button,
	Card,
	CardContent,
	CardFooter,
	CardHeader,
	CardTitle
} from '@/components/ui/primitives';

import { cn } from '@/utils/tw-merge';

interface IAuthWrapperProps {
	heading: string;
	backButtonLabel?: string;
	backButtonHref?: string;
	children?: ReactNode;
	className?: string;
}

export const AuthWrapper = ({
	children,
	heading,
	backButtonLabel,
	backButtonHref,
	className
}: PropsWithChildren<IAuthWrapperProps>) => {
	const pathname = usePathname();
	const tLogin = useTranslations('signInPage');
	const tRegister = useTranslations('signUpPage');

	const isLoginPage = pathname === '/login';

	return (
		<div className="flex min-h-screen items-center justify-center px-5 py-8">
			<Card
				className={cn(
					'w-full max-w-2xl p-10 shadow-lg',
					'duration-500 animate-in fade-in',
					className
				)}
			>
				<CardHeader className="text-center">
					<CardTitle className="text-primary">{heading}</CardTitle>
				</CardHeader>
				<CardContent>{children}</CardContent>
				<CardFooter className="-mt-2">
					{backButtonLabel && backButtonHref && (
						<Link className="mx-auto" href={backButtonHref} passHref>
							<Button asChild variant="ghost">
								<span className="text-md text-wrap md:text-nowrap">
									{backButtonLabel}
									<span className="text-primary">
										{isLoginPage ? tLogin('highlight') : tRegister('highlight')}
									</span>
								</span>
							</Button>
						</Link>
					)}
				</CardFooter>
			</Card>
		</div>
	);
};
