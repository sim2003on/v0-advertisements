'use client';

import { motion } from 'framer-motion';

interface IProps {
	title: string;
	desc: string;
}

export const PageHeader = ({ title, desc }: IProps) => {
	return (
		<div className="mb-10 text-center">
			<motion.h1
				className="text-3xl font-bold text-primary sm:text-4xl md:text-5xl"
				initial={{ opacity: 0, y: -10 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ duration: 0.5 }}
			>
				{title}
			</motion.h1>

			<motion.p
				className="mx-auto mt-4 max-w-3xl text-lg text-muted-foreground"
				initial={{ opacity: 0 }}
				animate={{ opacity: 1 }}
				transition={{ delay: 0.2, duration: 0.5 }}
			>
				{desc}
			</motion.p>
		</div>
	);
};
