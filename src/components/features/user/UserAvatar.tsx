'use client';

import { LogOut, User } from 'lucide-react';
import { useTranslations } from 'next-intl';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React from 'react';
import toast from 'react-hot-toast';

import {
	Button,
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger
} from '@/components/ui/primitives';

import { useAuthStore } from '@/stores/authStore';
import { useUserStore } from '@/stores/userStore';

const UserAvatarSkeleton = () => (
	<div className="flex items-center gap-2">
		<div className="h-10 w-10 animate-pulse rounded-full bg-gray-200" />
		<div className="hidden md:block">
			<div className="h-4 w-20 animate-pulse rounded bg-gray-200" />
		</div>
	</div>
);

export const UserAvatar = () => {
	const t = useTranslations('header');
	const tToaster = useTranslations('toaster');
	const router = useRouter();
	const { user, fetchProfile } = useUserStore();
	const { isAuthenticated, logout, checkAuth } = useAuthStore();
	const [isOpen, setIsOpen] = React.useState(false);
	const [mounted, setMounted] = React.useState(false);

	React.useEffect(() => {
		setMounted(true);
		if (isAuthenticated && !user) {
			fetchProfile();
		}
	}, [isAuthenticated, user]);

	const handleLogout = (): void => {
		logout();
		toast.success(tToaster('logoutSuccess'));
		router.push('/');
	};

	if (!mounted) {
		return <UserAvatarSkeleton />;
	}

	if (!isAuthenticated) {
		return (
			<Button asChild className="h-10 w-10 rounded-full bg-primary/20 p-0">
				<Link href="/auth/login">
					<User className="h-5 w-5" />
				</Link>
			</Button>
		);
	}

	return (
		<>
			<DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
				<DropdownMenuTrigger className="flex items-center gap-2">
					<div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/20">
						<span className="select-none text-sm font-medium">
							{user?.firstName?.[0] || '?'}
						</span>
					</div>
					<span className="hidden select-none text-sm font-medium md:block">
						{user?.firstName || 'User'}
					</span>
				</DropdownMenuTrigger>
				<DropdownMenuContent className="w-56 p-2" align="end">
					<DropdownMenuItem className="h-10 cursor-pointer" asChild>
						<Link href="/profile" className="flex items-center">
							<User className="mr-2 h-4 w-4" />
							{t('profile.title')}
						</Link>
					</DropdownMenuItem>
					<DropdownMenuItem
						className="h-10 cursor-pointer"
						onClick={handleLogout}
					>
						<LogOut className="mr-2 h-4 w-4" />
						{t('profile.logout')}
					</DropdownMenuItem>
				</DropdownMenuContent>
			</DropdownMenu>
			{isOpen && (
				<div
					className="fixed inset-0 z-40 bg-black/20"
					onClick={() => setIsOpen(false)}
				/>
			)}
		</>
	);
};
