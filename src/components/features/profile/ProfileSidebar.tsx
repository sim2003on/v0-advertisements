'use client';

import { LogOut } from 'lucide-react';
import { useLocale, useTranslations } from 'next-intl';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import toast from 'react-hot-toast';

import {
	Avatar,
	AvatarFallback,
	Button,
	Card,
	CardContent,
	CardHeader,
	CardTitle
} from '@/components/ui/primitives';

import { authService } from '@/services/auth.service';

import { formatDate } from '@/utils/dateFormatter';

import { useUserStore } from '@/stores/userStore';
import { IUser } from '@/types/user.types';

interface ProfileSidebarProps {
	user: IUser | null;
}

export function ProfileSidebar({ user }: ProfileSidebarProps) {
	const t = useTranslations('profilePage');
	const tToaster = useTranslations('toaster');
	const locale = useLocale();
	const router = useRouter();
	const { setUser } = useUserStore();

	useEffect(() => {
		if (user) {
			setUser(user);
		}
	}, [user, setUser]);

	const handleLogout = async () => {
		await authService.logout();
		toast.success(tToaster('logoutSuccess'));
		router.push('/login');
	};

	return (
		<Card className="bg-white shadow-md">
			<CardHeader className="rounded-t-lg bg-primary p-4 text-white">
				<CardTitle className="text-lg font-semibold">{t('title')}</CardTitle>
			</CardHeader>
			<CardContent className="pt-6">
				<div className="flex flex-col items-center space-y-4">
					<Avatar className="h-24 w-24 ring-2 ring-emerald-200">
						<AvatarFallback className="bg-emerald-100 text-lg text-emerald-800">
							{user?.username?.charAt(0).toUpperCase() || 'U'}
						</AvatarFallback>
					</Avatar>
					<div className="text-center">
						<h2 className="text-xl font-bold">{user?.username || 'User'}</h2>
						<p className="text-sm text-muted-foreground">
							{user?.createdAt
								? t('memberSince', {
										date: formatDate(user.createdAt, { locale })
									})
								: t('noDate')}
						</p>
					</div>
					<div className="w-full space-y-1 pt-4">
						{[
							{
								icon: LogOut,
								label: t('sidebar.logout'),
								path: '/logout',
								onClick: handleLogout
							}
						].map(item => (
							<Button
								key={item.label}
								variant="ghost"
								className="flex w-full cursor-pointer items-center justify-start gap-2 rounded-md p-2 text-primary transition-colors hover:bg-emerald-50"
								onClick={item.onClick}
							>
								<item.icon size={18} />
								<span>{item.label}</span>
							</Button>
						))}
					</div>
				</div>
			</CardContent>
		</Card>
	);
}
