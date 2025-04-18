'use client';

import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import toast from 'react-hot-toast';

import { Spinner } from '@/components/ui/primitives';

import { ProfileSidebar } from './ProfileSidebar';
import { ProfileTabs } from './ProfileTabs';
import { useUserStore } from '@/stores/userStore';

const containerVariants = {
	hidden: { opacity: 0 },
	visible: {
		opacity: 1,
		transition: {
			staggerChildren: 0.2,
			delayChildren: 0.3
		}
	}
};

const itemVariants = {
	hidden: { y: 20, opacity: 0 },
	visible: {
		y: 0,
		opacity: 1,
		transition: {
			type: 'spring',
			damping: 12,
			stiffness: 100
		}
	}
};

export const ProfileContent = () => {
	const { user, isLoading, fetchProfile } = useUserStore();
	const router = useRouter();

	useEffect(() => {
		fetchProfile().catch(error => {
			console.error('Error fetching profile:', error);
			toast.error('Не удалось загрузить профиль');
			router.push('/login');
		});
	}, [fetchProfile, router]);

	if (isLoading) {
		return (
			<div className="flex h-32 items-center justify-center">
				<Spinner />
			</div>
		);
	}

	if (!user) {
		return (
			<div className="flex h-32 items-center justify-center">
				<Spinner />
			</div>
		);
	}

	return (
		<motion.div
			className="flex flex-col gap-8 md:flex-row"
			variants={containerVariants}
			initial="hidden"
			animate="visible"
		>
			<motion.div className="w-full md:w-1/4" variants={itemVariants}>
				<ProfileSidebar user={user} />
			</motion.div>
			<motion.div className="w-full md:w-3/4" variants={itemVariants}>
				<ProfileTabs user={user} />
			</motion.div>
		</motion.div>
	);
};
