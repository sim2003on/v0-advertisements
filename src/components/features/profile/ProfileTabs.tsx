'use client';

import { useTranslations } from 'next-intl';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

import {
	Button,
	Card,
	CardContent,
	CardHeader,
	CardTitle,
	Tabs,
	TabsContent,
	TabsList,
	TabsTrigger
} from '@/components/ui/primitives';

import { FavoritesContent } from './FavoritesContent';
import { MyAdsContent } from './MyAdsContent';
import { PersonalInfoForm } from './PersonalInfoForm';
import { IUser } from '@/types/user.types';

interface ProfileTabsProps {
	user: IUser | null;
}

export function ProfileTabs({ user }: ProfileTabsProps) {
	const t = useTranslations('profilePage');
	const router = useRouter();
	const [activeTab, setActiveTab] = useState('my-ads');

	return (
		<Card className="bg-white shadow-md">
			<CardHeader className="rounded-t-lg bg-primary p-5 text-white">
				<div className="flex items-center justify-between">
					<CardTitle className="text-lg font-semibold">
						{t('accountManagement')}
					</CardTitle>
					<Button
						onClick={() => router.push('/add')}
						className="flex cursor-pointer items-center gap-2 bg-white text-primary transition-colors hover:bg-emerald-100"
					>
						{t('actions.createAd')}
					</Button>
				</div>
			</CardHeader>
			<CardContent className="p-0">
				<Tabs
					defaultValue="my-ads"
					className="w-full"
					onValueChange={setActiveTab}
				>
					<TabsList className="w-full rounded-none bg-emerald-50 p-0">
						{[
							{ value: 'my-ads', label: t('tabs.myAds') },
							{ value: 'favorites', label: t('tabs.favorites') },
							{ value: 'personal-info', label: t('tabs.personalInfo') }
						].map(tab => (
							<TabsTrigger
								key={tab.value}
								value={tab.value}
								className="flex-1 cursor-pointer py-3 text-sm font-medium transition-colors hover:bg-emerald-100 data-[state=active]:bg-white data-[state=active]:text-primary"
							>
								{tab.label}
							</TabsTrigger>
						))}
					</TabsList>
					<TabsContent value="my-ads" className="p-6">
						<MyAdsContent />
					</TabsContent>
					<TabsContent value="favorites" className="p-6">
						<FavoritesContent />
					</TabsContent>
					<TabsContent value="personal-info" className="p-6">
						<PersonalInfoForm user={user} />
					</TabsContent>
				</Tabs>
			</CardContent>
		</Card>
	);
}
