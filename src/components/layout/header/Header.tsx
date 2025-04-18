import { getTranslations } from 'next-intl/server';
import Link from 'next/link';

import { UserAvatar } from '@/components/features/user/UserAvatar';
import { Logo, Search } from '@/components/ui/elements';
import { Button } from '@/components/ui/primitives';

import { LanguageSelector } from '../../ui/elements/LanguageSelector';
import { Container } from '../Container';

import { PostAdButton } from './PostAdButton';

interface IHeaderProps {
	isAuthPage?: boolean;
	isProfilePage?: boolean;
}

export const Header = async ({ isAuthPage, isProfilePage }: IHeaderProps) => {
	const t = await getTranslations('header');
	const tActions = await getTranslations('common.actions');

	return (
		<header className="w-fullrelative sticky inset-y-0 z-20 h-[75px] border-b bg-secondary-bg py-4">
			<Container>
				<div className="flex items-center justify-between gap-4">
					{/* Logo */}
					<Logo />

					{/* Categories link */}
					{!isAuthPage && !isProfilePage && (
						<Button
							asChild
							className="hidden items-center gap-3 text-[12px] transition-all duration-200 hover:bg-primary/75 md:flex lg:text-sm"
						>
							<Link href="/categories">{t('categoriesBtn')}</Link>
						</Button>
					)}

					{/* Search if not auth page */}
					{!isAuthPage && !isProfilePage && (
						<div className="hidden md:block">
							<Search />
						</div>
					)}

					{/* Actions */}
					<div className="flex items-center justify-end gap-10">
						{!isAuthPage && !isProfilePage ? (
							<>
								{/* Search on mobile */}
								<div className="flex md:hidden">
									<Search />
								</div>

								{/* Post ad button */}
								<PostAdButton />

								{/* User avatar - always visible */}
								{<UserAvatar />}

								{/* Language selector */}
								<LanguageSelector />
							</>
						) : (
							<>
								<Button
									className="text-[12px] transition-all duration-200 hover:bg-primary/75 lg:text-sm"
									asChild
								>
									<Link href="/">{tActions('goBack')}</Link>
								</Button>
								<LanguageSelector />
							</>
						)}
					</div>
				</div>
			</Container>
		</header>
	);
};
