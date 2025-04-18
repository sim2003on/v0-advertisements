'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useTranslations } from 'next-intl';
import { useState } from 'react';
import { toast } from 'react-hot-toast';

import { Button, Input, Label } from '@/components/ui/primitives';

import { userService } from '@/services/user.service';

import { IUser } from '@/types/user.types';

interface PersonalInfoFormProps {
	user: IUser | null;
}

export function PersonalInfoForm({ user }: PersonalInfoFormProps) {
	const t = useTranslations('common.fields');
	const tProfile = useTranslations('profilePage');
	const tToaster = useTranslations('toaster');
	const queryClient = useQueryClient();
	const [formData, setFormData] = useState({
		username: user?.username || '',
		firstName: user?.firstName || '',
		email: user?.email || '',
		lastName: user?.lastName || ''
	});

	const { mutate: updateProfile, isPending } = useMutation({
		mutationFn: userService.updateProfile,
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ['user'] });
			toast.success(tToaster('profileUpdated'));
		},
		onError: error => {
			toast.error(tToaster('profileUpdateError'));
		}
	});

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setFormData({ ...formData, [e.target.id]: e.target.value });
	};

	const handleSubmit = () => {
		updateProfile(formData);
	};

	return (
		<div className="space-y-6">
			<div>
				<Label htmlFor="username" className="text-sm font-medium">
					{t('username')}
				</Label>
				<Input
					id="username"
					value={formData.username}
					onChange={handleChange}
					className="mt-1 rounded-md border-emerald-200 transition-colors focus:border-emerald-500 focus:ring-emerald-500"
				/>
			</div>
			<div>
				<Label htmlFor="firstName" className="text-sm font-medium">
					{t('firstName')}
				</Label>
				<Input
					id="firstName"
					value={formData.firstName}
					onChange={handleChange}
					className="mt-1 rounded-md border-emerald-200 transition-colors focus:border-emerald-500 focus:ring-emerald-500"
				/>
			</div>
			<div>
				<Label htmlFor="lastName" className="text-sm font-medium">
					{t('lastName')}
				</Label>
				<Input
					id="lastName"
					value={formData.lastName}
					onChange={handleChange}
					className="mt-1 rounded-md border-emerald-200 transition-colors focus:border-emerald-500 focus:ring-emerald-500"
				/>
			</div>
			<div>
				<Label htmlFor="email" className="text-sm font-medium">
					{t('email')}
				</Label>
				<Input
					id="email"
					type="email"
					value={formData.email}
					onChange={handleChange}
					className="mt-1 rounded-md border-emerald-200 transition-colors focus:border-emerald-500 focus:ring-emerald-500"
				/>
			</div>
			<Button
				onClick={handleSubmit}
				disabled={isPending}
				className="cursor-pointer bg-primary text-white transition-colors disabled:opacity-50"
			>
				{isPending
					? tProfile('actions.saving')
					: tProfile('actions.saveChanges')}
			</Button>
		</div>
	);
}
